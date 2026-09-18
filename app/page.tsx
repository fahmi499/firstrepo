"use client";

import { useState, type FormEvent } from "react";
import { Fraunces, Inter } from "next/font/google";
import styles from "./contact.module.css";

// Fraunces matches the original design's serif headings.
// Inter stands in for "General Sans" (not available on Google Fonts) as the body sans-serif.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const NAME_MAX = 30;
const WORD_MAX = 50;

function wordsOf(text: string): string[] {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/) : [];
}

function isValidIndianPhone(value: string): boolean {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return /^[6-9]\d{9}$/.test(digits);
}

type Errors = {
  name?: boolean;
  phone?: boolean;
  issue?: boolean;
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const wordCount = wordsOf(issue).length;

  function handleIssueChange(value: string) {
    const words = wordsOf(value);
    if (words.length > WORD_MAX) {
      setIssue(words.slice(0, WORD_MAX).join(" "));
    } else {
      setIssue(value);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(false);

    const nextErrors: Errors = {
      name: name.trim().length === 0,
      phone: !isValidIndianPhone(phone),
      issue: issue.trim().length === 0,
    };
    setErrors(nextErrors);

    if (!nextErrors.name && !nextErrors.phone && !nextErrors.issue) {
      setSubmitted(true);
      setName("");
      setPhone("");
      setIssue("");
    }
  }

  return (
    <div className={`${styles.page} ${fraunces.variable} ${inter.variable}`}>
      <div className={styles.nav}>
        <div className={styles.word}>
          <span>Hamidi</span>
          <small>Dental &amp; Skin Care Clinic</small>
        </div>
        <ul className={styles.navLinks}>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Find a dentist</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      <div className={styles.shell}>
        {/* LEFT: contact info */}
        <div className={styles.info}>
          <div className={styles.infoTop}>
            <p className={styles.eyebrow}>Contact</p>
            <h1>We&apos;re easy to reach, and easier to talk to.</h1>
            <p className={styles.lede}>
              Call, message, or drop your details in the form and someone
              from our care team will get back to you within one business
              day.
            </p>
          </div>

          <div className={styles.contactBlock}>
            <div className={styles.contactRow}>
              <div className={styles.iconBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className={styles.contactText}>
                <p className={styles.label}>Call or message</p>
                <p className={styles.value}>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                  <span className={styles.waPill}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.3-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36l.55.01c.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.3.48-.14.16-.31.36-.44.48-.15.14-.3.3-.13.58.17.29.77 1.27 1.65 2.05 1.13 1.01 2.09 1.32 2.37 1.47.29.15.46.13.63-.05.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.14.26.1 1.65.78 1.94.92.28.15.47.22.54.34.07.13.07.71-.17 1.4z" />
                    </svg>
                    WhatsApp
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.contactRow}>
              <div className={styles.iconBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 6l-10 7L2 6" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </div>
              <div className={styles.contactText}>
                <p className={styles.label}>Email us</p>
                <p className={styles.value}>
                  <a href="mailto:hello@hamididental.com">hello@hamididental.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.socialBlock}>
            <p className={styles.label}>Keep in touch</p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.3" cy="6.7" r="1" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.55.45-1 1-1z" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.infoHours}>
            Open <strong>Mon–Sat, 9am–7pm</strong>. Emergencies answered
            anytime.
          </div>

          <svg className={styles.infoMotif} width={220} height={220} viewBox="0 0 220 220" fill="none">
            <circle cx={150} cy={150} r={95} stroke="rgba(243,238,226,0.10)" strokeWidth={1} />
            <circle cx={150} cy={150} r={65} stroke="rgba(201,154,70,0.28)" strokeWidth={1} />
            <path d="M110 165c6-18 10-27 20-27s14 9 20 27" stroke="rgba(243,238,226,0.22)" strokeWidth={1.4} strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* RIGHT: form */}
        <div className={styles.formPanel}>
          <h2>Tell us what&apos;s going on</h2>
          <p className={styles.sub}>
            A short note is all we need — name, a way to reach you, and
            what&apos;s bothering you. We&apos;ll follow up to find the
            right time to see you.
          </p>

          <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <div className={styles.field}>
              <div className={styles.fieldHead}>
                <label htmlFor="name">Name</label>
                <span className={`${styles.counter} ${name.length >= NAME_MAX ? styles.counterWarn : ""}`}>
                  {name.length}/{NAME_MAX}
                </span>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                maxLength={NAME_MAX}
                placeholder="John Smith"
                autoComplete="name"
                className={`${styles.input} ${errors.name ? styles.inputErr : ""}`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: false }));
                }}
              />
              {errors.name && <p className={styles.errMsg}>Enter your name.</p>}
            </div>

            <div className={styles.field}>
              <div className={styles.fieldHead}>
                <label htmlFor="phone">Phone number</label>
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                className={`${styles.input} ${errors.phone ? styles.inputErr : ""}`}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors((prev) => ({ ...prev, phone: false }));
                }}
              />
              {errors.phone && (
                <p className={styles.errMsg}>Enter a valid 10-digit mobile number.</p>
              )}
            </div>

            <div className={styles.field}>
              <div className={styles.fieldHead}>
                <label htmlFor="issue">What&apos;s bothering you</label>
                <span className={`${styles.counter} ${wordCount >= WORD_MAX ? styles.counterWarn : ""}`}>
                  {wordCount}/{WORD_MAX} words
                </span>
              </div>
              <textarea
                id="issue"
                name="issue"
                placeholder="A dull ache in my lower left molar for the past two days, worse when I drink anything cold."
                className={`${styles.textarea} ${errors.issue ? styles.inputErr : ""}`}
                value={issue}
                onChange={(e) => {
                  handleIssueChange(e.target.value);
                  setErrors((prev) => ({ ...prev, issue: false }));
                }}
              />
              {errors.issue && (
                <p className={styles.errMsg}>Let us know what&apos;s bothering you.</p>
              )}
            </div>

            <div className={styles.consent}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <circle cx={12} cy={12} r={9} />
                <path d="M12 8v5" />
                <circle cx={12} cy={16} r={0.5} fill="currentColor" />
              </svg>
              <span>
                By submitting, you&apos;re allowing Hamidi Dental &amp; Skin
                Care Clinic to contact you by phone, message, or email about
                your enquiry.
              </span>
            </div>

            <button type="submit" className={styles.submit}>
              Send message
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>

            {submitted && (
              <div className={styles.success}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx={12} cy={12} r={10} />
                  <path d="M8 12l3 3 5-6" />
                </svg>
                <span>Message sent — we&apos;ll be in touch shortly.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
