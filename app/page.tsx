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
      </div>
      
  );
}
