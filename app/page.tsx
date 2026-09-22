"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import styles from "./home.module.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const SLIDE_COUNT = 4;
const SLIDE_INTERVAL_MS = 4500;

type Card = { title: string; desc: string; icon: ReactNode };

const orthodonticsServices: Card[] = [
  {
    title: "Clear Aligners",
    desc: "Transparent, removable trays that straighten teeth gradually with barely any visibility.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12c0-4 3-8 8-8s8 4 8 8-3 8-8 8-8-4-8-8z" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    title: "Lingual Braces",
    desc: "The same reliable straightening, fixed to the back of the teeth so they stay out of sight.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x={4} y={4} width={16} height={16} rx={3} />
        <path d="M8 12h8M8 8h8M8 16h5" />
      </svg>
    ),
  },
  {
    title: "Self-Ligating Braces",
    desc: "Brackets and archwire work together without coloured bands, for fewer adjustment visits.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={12} r={8} />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: "Ceramic Braces",
    desc: "Tooth-coloured brackets give you all the strength of metal braces with a subtler look.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
      </svg>
    ),
  },
  {
    title: "Children's Orthodontics",
    desc: "Early guidance that helps young jaws and teeth develop the way they're meant to.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={9} cy={7} r={3} />
        <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
        <circle cx={18} cy={8} r={2} />
      </svg>
    ),
  },
  {
    title: "Adult Orthodontics",
    desc: "It's never too late — discreet options built around a busy, grown-up schedule.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={7} r={4} />
        <path d="M4 21c1.2-4.2 4.4-6 8-6s6.8 1.8 8 6" />
      </svg>
    ),
  },
];

const dentalCareServices: Card[] = [
  {
    title: "Dental Implants",
    desc: "Replacement tooth roots that give a fixed or removable crown a strong foundation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-3 0-4 2-4 4 0 3 1 4 1 8 0 2 1 3 2 3s1.5-1.5 1.5-3 .5-2 1.5-2 1.5 1 1.5 2-.5 3 1 3 2-1 2-3c0-4 1-5 1-8 0-2-1-4-4-4-1 0-1.5.5-2 .5S13 3 12 3z" />
      </svg>
    ),
  },
  {
    title: "Crowns & Bridges",
    desc: "Crowns cap a damaged tooth; bridges fill the gap left by one that's missing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l4-11 5 6 5-9 4 14" />
      </svg>
    ),
  },
  {
    title: "Veneers & Laminates",
    desc: "A thin, natural-looking shell bonded over the tooth to refine shape and colour.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z" />
      </svg>
    ),
  },
  {
    title: "Root Canal Treatment",
    desc: "Careful removal of infected pulp to save a tooth that would otherwise be lost.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M6 8l6-4 6 4M6 16l6 4 6-4" />
      </svg>
    ),
  },
  {
    title: "Tooth Extraction",
    desc: "A gentle, well-managed removal when a tooth truly can't be saved.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4h10l1 6-6 10L6 10z" />
      </svg>
    ),
  },
  {
    title: "Dental Fillings",
    desc: "Restoring a cavity's shape and strength once decay has been cleared out.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={12} r={9} />
        <path d="M12 3v18M3 12h18" opacity={0.4} />
        <path d="M9 9l6 6" />
      </svg>
    ),
  },
  {
    title: "Teeth Whitening",
    desc: "Lift years of staining and get back a brighter, more even shade in one visit.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3v4M3 5h4M19 13v4M17 15h4" />
        <path d="M12 21c4-1 7-4 7-9V6l-7-3-7 3v6c0 5 3 8 7 9z" />
      </svg>
    ),
  },
  {
    title: "Cosmetic Dentistry",
    desc: "Shape, colour, and alignment fixes focused purely on the way your smile looks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Consultation & Cleaning",
    desc: "A thorough check, x-rays where needed, and a proper scale-and-polish clean.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={12} r={9} />
        <path d="M8 12h8M12 8v8" opacity={0.5} />
      </svg>
    ),
  },
];

const skinCareServices: Card[] = [
  {
    title: "Acne & Breakout Treatment",
    desc: "A staged plan to calm active breakouts and reduce the marks they leave behind.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={12} r={8} />
        <circle cx={9} cy={10} r={1} fill="currentColor" stroke="none" />
        <circle cx={15} cy={9} r={1} fill="currentColor" stroke="none" />
        <circle cx={13} cy={15} r={1} fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Chemical Peels",
    desc: "Controlled exfoliation that softens texture, tone, and fine surface scarring.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c3 4 6 7 6 11a6 6 0 01-12 0c0-4 3-7 6-11z" />
      </svg>
    ),
  },
  {
    title: "Laser Hair Reduction",
    desc: "Long-term hair reduction, calibrated to your skin type for a comfortable session.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l2-6 4 12 2-6h6" />
      </svg>
    ),
  },
  {
    title: "Anti-Ageing Facials",
    desc: "Firming, collagen-supporting facials built around your skin's own rhythm.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={12} r={4} />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
    ),
  },
  {
    title: "Skin Brightening",
    desc: "Targeted care for pigmentation and dullness, for a more even, brighter tone.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />
      </svg>
    ),
  },
  {
    title: "Scar & Dermabrasion Care",
    desc: "Resurfacing treatments that soften old acne scars and uneven texture over time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x={4} y={4} width={16} height={16} rx={4} />
        <path d="M9 9h6v6H9z" />
      </svg>
    ),
  },
];

const doctors = [
  {
    initials: "AR",
    name: "Dr. Aisha Rahman",
    role: "Orthodontist · MDS Orthodontics & Dentofacial Orthopaedics",
    bio: "Dr. Rahman specialises in comprehensive orthodontic treatment — metal, ceramic, lingual and self-ligating braces, clear aligners, and orthodontic mini-implants — for both children and adults.",
    tags: ["Clear Aligners", "Braces", "Child Orthodontics"],
    altAvatar: false,
  },
  {
    initials: "VN",
    name: "Dr. Vikram Nair",
    role: "General Dentist · BDS, PG Dip. Restorative Dentistry",
    bio: "Dr. Nair leads everyday dental care at the clinic — check-ups, fillings, root canals, crowns and extractions — with a calm, detail-first approach that puts anxious patients at ease.",
    tags: ["Root Canal", "Fillings", "Cleanings"],
    altAvatar: true,
  },
];

const testimonials = [
  { initials: "CP", name: "Chaitra P.", tag: "Braces patient", quote: "Warm, welcoming clinic and the doctor explained every step before starting. Genuinely one of the better dental visits I've had." },
  { initials: "SR", name: "Shefali R.", tag: "Extraction patient", quote: "My wisdom tooth extraction was over before I realised it had started. Barely any pain afterward, and the follow-up call was a nice touch." },
  { initials: "CS", name: "Chinmay S.", tag: "Skin & dental patient", quote: "Went in for a skin consult and stayed on for a dental cleaning too — nice being able to do both in one place, one afternoon." },
  { initials: "RN", name: "Rekha N.", tag: "Parent, child orthodontics", quote: "My daughter was nervous about braces and the team took the time to make her comfortable before we even talked treatment plans." },
  { initials: "AK", name: "Arjun K.", tag: "General check-up", quote: "Clean, well-run clinic and transparent about cost from the first visit. No surprises on the bill, which I appreciated." },
];

function CardGrid({ items, skin }: { items: Card[]; skin?: boolean }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div className={styles.card} key={item.title}>
          <div className={`${styles.icon} ${skin ? styles.skinIcon : ""}`}>{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
          <a className={styles.learn} href="#">
            Learn more →
          </a>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  function scrollTestimonials(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>(`.${styles.testiCard}`);
    const width = card ? card.getBoundingClientRect().width + 20 : 320;
    scroller.scrollBy({ left: direction * width, behavior: "smooth" });
  }

  return (
    <div className={`${styles.page} ${fraunces.variable} ${inter.variable}`}>
      {/* NAV */}
      <div className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.navLogo}>
            <div className={styles.logoMark}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c-3 0-4 2-4 4 0 3 1 4 1 8 0 2 1 3 2 3s1.5-1.5 1.5-3 .5-2 1.5-2 1.5 1 1.5 2-.5 3 1 3 2-1 2-3c0-4 1-5 1-8 0-2-1-4-4-4-1 0-1.5.5-2 .5S13 3 12 3z" />
              </svg>
            </div>
            <div className={styles.word}>
              <span className={styles.wordTop}>Global</span>
              <span className={styles.wordSub}>Dental Clinic</span>
            </div>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#dental-care">Dental Care</a></li>
            <li><a href="#skin-care">Skin Care</a></li>
            <li><a href="#doctors">Doctors</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="contact-us">Contact Us</a></li>
          </ul>
          <div className={styles.navCta}>
            <button className={`${styles.btn} ${styles.btnNavy}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.3-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36l.55.01c.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.3.48-.14.16-.31.36-.44.48-.15.14-.3.3-.13.58.17.29.77 1.27 1.65 2.05 1.13 1.01 2.09 1.32 2.37 1.47.29.15.46.13.63-.05.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.14.26.1 1.65.78 1.94.92.28.15.47.22.54.34.07.13.07.71-.17 1.4z" />
              </svg>
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className={styles.hero} id="home">
        {[styles.s1, styles.s2, styles.s3, styles.s4].map((slideClass, i) => (
          <div
            key={i}
            className={`${styles.heroSlide} ${slideClass} ${i === activeSlide ? styles.heroSlideActive : ""}`}
          />
        ))}

        <svg className={styles.heroMotif} viewBox="0 0 1240 560" preserveAspectRatio="xMaxYMax slice" fill="none">
          <circle cx={1080} cy={470} r={220} stroke="rgba(243,238,226,0.08)" strokeWidth={1} />
          <circle cx={1080} cy={470} r={150} stroke="rgba(201,154,70,0.18)" strokeWidth={1} />
          <path d="M1015 500c8-24 14-36 27-36s19 12 27 36" stroke="rgba(243,238,226,0.16)" strokeWidth={1.5} strokeLinecap="round" fill="none" />
        </svg>

        <div className={styles.heroInner}>
          <p className={`${styles.eyebrow} ${styles.heroEyebrow}`}>Bengaluru&apos;s trusted dental &amp; skin clinic</p>
          <h1>Healthy smiles, clearer skin, all under one roof.</h1>
          <div className={styles.heroCta}>
            <button className={`${styles.btn} ${styles.btnGold}`}>Book an appointment</button>
            <button className={`${styles.btn} ${styles.btnOutline}`}>Call +91 98765 43210</button>
          </div>
          <div className={styles.heroStats}>
            <div>
              <strong>10,000+</strong>
              <span>Patients treated</span>
            </div>
            <div>
              <strong>15+ yrs</strong>
              <span>Combined experience</span>
            </div>
            <div>
              <strong>4.9 / 5</strong>
              <span>Average rating</span>
            </div>
          </div>
        </div>

        <div className={styles.heroDots}>
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              className={i === activeSlide ? styles.heroDotActive : ""}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActiveSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className={styles.trust}>
        <div className={styles.wrap}>
          <div className={styles.trustItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <circle cx={12} cy={12} r={9} />
            </svg>
            Hygiene-first, sterilised equipment
          </div>
          <div className={styles.trustItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <circle cx={12} cy={8} r={4} />
              <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
            </svg>
            Orthodontist + General Dentist on staff
          </div>
          <div className={styles.trustItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l2.4 6.5L21 9l-5 4.4L17.4 21 12 17.3 6.6 21 8 13.4 3 9l6.6-.5z" />
            </svg>
            Dedicated dermatology &amp; skin care wing
          </div>
          <div className={styles.trustItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <rect x={3} y={4} width={18} height={17} rx={2} />
              <path d="M8 2v4M16 2v4M3 10h18" />
            </svg>
            Same-week appointments
          </div>
        </div>
      </div>

      {/* ORTHODONTICS */}
      <section className={styles.section} id="services">
        <svg className={styles.sectionBg} viewBox="0 0 1240 620" preserveAspectRatio="xMaxYMid slice" fill="none">
          <g opacity={0.5} stroke="var(--navy-700)" strokeWidth={1.4}>
            <path d="M980 90h190M980 90v14M1010 90v20M1040 90v14M1070 90v22M1100 90v14M1130 90v18M1160 90v14" />
            <path d="M960 150h210M960 150v16M994 150v24M1028 150v16M1062 150v26M1096 150v16M1130 150v22M1164 150v16" />
          </g>
          <g opacity={0.35} stroke="var(--gold)" strokeWidth={1.4}>
            <path d="M1000 230h170M1000 230v12M1028 230v18M1056 230v12M1084 230v20M1112 230v12M1140 230v16" />
          </g>
          <circle cx={1120} cy={420} r={160} stroke="var(--line)" strokeWidth={1} />
          <circle cx={1120} cy={420} r={110} stroke="rgba(201,154,70,0.25)" strokeWidth={1} />
        </svg>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.eyebrow}>Orthodontics</p>
              <h2>Expert orthodontics services</h2>
              <p className={styles.sub}>
                Straightening care for every age — from a first check-up to finishing retainers, guided by our resident orthodontist.
              </p>
            </div>
            <a className={styles.viewAll} href="#">
              View all services
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <CardGrid items={orthodonticsServices} />
        </div>
      </section>

      {/* ALL DENTAL CARE */}
      <section className={`${styles.section} ${styles.sectionNavy}`} id="dental-care">
        <svg className={styles.sectionBg} viewBox="0 0 1240 640" preserveAspectRatio="xMinYMid slice" fill="none">
          <path
            d="M120 60c-60 0-90 40-90 90 0 60 24 80 24 160 0 40 20 60 40 60s30-30 30-60 10-40 30-40 30 20 30 40-2 60 30 60 40-30 40-60c0-80 24-100 24-160 0-50-30-90-90-90-20 0-30 10-40 10s-8-10-28-10z"
            stroke="rgba(243,238,226,0.12)"
            strokeWidth={2}
            transform="translate(-40,10) scale(1.4)"
          />
          <circle cx={140} cy={120} r={230} stroke="rgba(243,238,226,0.07)" strokeWidth={1} />
          <circle cx={140} cy={520} r={180} stroke="rgba(201,154,70,0.14)" strokeWidth={1} />
          <g opacity={0.5} stroke="rgba(243,238,226,0.14)" strokeWidth={1.3}>
            <path d="M40 380h140M40 380v10M70 380v16M100 380v10M130 380v18M160 380v10" />
          </g>
        </svg>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.eyebrow}>General &amp; restorative</p>
              <h2>All types of dental care</h2>
              <p className={styles.sub}>
                Everyday dentistry, handled with the same care as everything else — cleanings, fillings, and the bigger restorative work too.
              </p>
            </div>
            <a className={styles.viewAll} href="#">
              View all treatments
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <CardGrid items={dentalCareServices} />
        </div>
      </section>

      {/* SKIN CARE */}
      <section className={styles.section} id="skin-care">
        <svg className={styles.sectionBg} viewBox="0 0 1240 620" preserveAspectRatio="xMaxYMid slice" fill="none">
          <path d="M1080 70c40 60 70 100 70 150a70 70 0 01-140 0c0-50 30-90 70-150z" stroke="rgba(124,152,133,0.35)" strokeWidth={1.6} />
          <path d="M1010 260c30 46 52 76 52 114a52 52 0 01-104 0c0-38 22-68 52-114z" stroke="rgba(201,154,70,0.3)" strokeWidth={1.4} />
          <path d="M1150 320c22 34 38 56 38 84a38 38 0 01-76 0c0-28 16-50 38-84z" stroke="rgba(124,152,133,0.25)" strokeWidth={1.3} />
          <circle cx={1050} cy={480} r={150} stroke="var(--line)" strokeWidth={1} />
        </svg>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.eyebrow}>Dermatology</p>
              <h2>Skin care services</h2>
              <p className={styles.sub}>
                A dedicated skin wing for common concerns — acne, ageing, pigmentation — treated with clinical, dermatologist-led care.
              </p>
            </div>
            <a className={styles.viewAll} href="#">
              View all treatments
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <CardGrid items={skinCareServices} skin />
        </div>
      </section>

      {/* DOCTORS */}
      <section className={styles.section} id="doctors">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.eyebrow}>Meet the team</p>
              <h2>Our doctors</h2>
              <p className={styles.sub}>Two specialists, one clinic — so orthodontic and everyday dental care both stay close to home.</p>
            </div>
          </div>
          <div className={styles.doctorGrid}>
            {doctors.map((doc) => (
              <div className={styles.doctorCard} key={doc.name}>
                <div className={`${styles.avatar} ${doc.altAvatar ? styles.avatarAlt : ""}`}>{doc.initials}</div>
                <div>
                  <h3>{doc.name}</h3>
                  <p className={styles.doctorRole}>{doc.role}</p>
                  <p>{doc.bio}</p>
                  <div className={styles.doctorTags}>
                    {doc.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.section} id="testimonials">
        <div className={styles.wrap}>
          <div className={styles.testiHeadRow}>
            <div>
              <p className={styles.eyebrow}>Patient stories</p>
              <h2>What our patients say</h2>
            </div>
            <div className={styles.testiArrows}>
              <button aria-label="Previous" onClick={() => scrollTestimonials(-1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button aria-label="Next" onClick={() => scrollTestimonials(1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.testiScroller} ref={scrollerRef}>
            {testimonials.map((t) => (
              <div className={styles.testiCard} key={t.name}>
                <div className={styles.stars}>★★★★★</div>
                <p>&quot;{t.quote}&quot;</p>
                <div className={styles.testiWho}>
                  <div className={styles.testiAvatar}>{t.initials}</div>
                  <div>
                    <div className={styles.testiName}>{t.name}</div>
                    <div className={styles.testiTag}>{t.tag}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.ctaBand}>
            <div>
              <h2>Ready to come in for a visit?</h2>
              <p>Same-week slots are usually available — call, WhatsApp, or use the contact form to get started.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className={`${styles.btn} ${styles.btnGold}`}>Book an appointment</button>
              <button className={`${styles.btn} ${styles.btnOutline}`}>Message on WhatsApp</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (common across pages) */}
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.footerWord}>
                <span>Global</span> Dental Clinic
              </div>
              <p>Comprehensive dental and dermatology care in one calm, modern clinic — open Mon–Sat, 9am–7pm, with emergencies answered anytime.</p>
              <div className={styles.footerSocial}>
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.55.45-1 1-1z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <rect x={2} y={2} width={20} height={20} rx={5} />
                    <circle cx={12} cy={12} r={4.2} />
                    <circle cx={17.3} cy={6.7} r={1} />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Orthodontics</a></li>
                <li><a href="#dental-care">Dental Care</a></li>
                <li><a href="#skin-care">Skin Care</a></li>
                <li><a href="#doctors">Doctors</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul className={styles.footerLinks}>
                <li><a href="tel:+919876543210">+91 98765 43210</a></li>
                <li><a href="mailto:hello@globaldentalclinic.com">hello@globaldentalclinic.com</a></li>
                <li>Open Mon–Sat, 9am–7pm</li>
              </ul>
            </div>
            <div>
              <h4>Visit Us</h4>
              <p>
                #12, Indiranagar 100 Feet Road,
                <br />
                Bengaluru, Karnataka 560038
              </p>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© 2026 Global Dental Clinic. All rights reserved.</span>
            <span>Design prototype for learning purposes</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
