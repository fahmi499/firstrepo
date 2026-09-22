# Hamidi Dental & Skin Care Clinic — Contact page (Next.js)

Two files, ported from the frozen design:

- `app/contact/page.tsx` — the page component (App Router, TypeScript, client component)
- `app/contact/contact.module.css` — all styling, as a CSS Module

## Drop-in steps

1. Copy the `app/contact/` folder into your Next.js project's `app/` directory.
2. Make sure your project uses the **App Router** (Next.js 13+) and has `next/font` available (built in since Next 13).
3. Run the app and visit `/contact`.

No extra npm packages are needed — `next/font/google` handles the fonts at build time (no `<link>` tags or layout shift).

## Notes on fidelity to the frozen design

- **Fonts**: the original used Google's `Fraunces` for headings (kept as-is) and `General Sans` for body text. General Sans isn't on Google Fonts, so this swaps in `Inter`, a similar clean geometric sans. Swap it for General Sans via `next/font/local` if you have the font files, or another Google Font of your choice.
- **Interactivity**: the name character counter, 50-word cap on the issue field, Indian mobile number validation (10 digits, starts 6–9, optional `+91`/`0` prefix), inline field errors, and the success state are all ported 1:1 into React state/handlers.
- **Consent notice**: still sits visibly above the submit button, per the original spec.
- No backend call is wired up yet — `handleSubmit` currently only validates and shows the success state. Point it at your API route or form service when ready.
