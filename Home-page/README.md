# Global Dental Clinic — Home page (Next.js)

Two files, ported from the frozen homepage artifact:

- `page.tsx` — the page component (App Router, TypeScript, client component)
- `home.module.css` — all styling, as a CSS Module

## Drop-in steps

1. Rename `page.tsx` if needed and place both files together in your Next.js project. Since this is the site's home page, put them directly at `app/page.tsx` and `app/home.module.css` (this will replace the default starter page `create-next-app` generated).
2. If you'd rather keep it as a separate route instead (e.g. `/home`), put both files in `app/home/` instead and visit `/home`.
3. Run the app — no extra npm packages are needed. `next/font/google` handles Fraunces and Inter at build time.

## Notes on fidelity to the frozen design

- **Header/nav bar** — restored (after being removed and re-added a few times during design iteration): a logo mark, the "Global" / "Dental Clinic" stacked wordmark, section links, a "Contact Us" link, and a "Book Appointment" button with a WhatsApp icon. The "Contact Us" link points to `/contact`, assuming you've dropped the contact page in at that route in the same project (as covered in the earlier contact-page files) — update the `href` if yours lives elsewhere.
- **Hero slider**: the 4 rotating gradient backgrounds and the dot navigation are ported to React state (`activeSlide`) with a `setInterval` effect, replacing the original vanilla-JS `goTo()` function. Clicking a dot jumps straight to that slide, same as before.
- **Testimonials scroller**: the left/right arrow buttons call `scrollBy()` on a `ref` to the scroll container, same one-card-at-a-time behavior as the original.
- **Fonts**: Fraunces (headings) is kept as-is from Google Fonts. The original used "General Sans" for body text, which isn't on Google Fonts, so this uses Inter instead (same substitution made in the contact page).
- **Content as data**: the repeated service cards (Orthodontics, Dental Care, Skin Care), the two doctor profiles, and the five testimonials are pulled out into typed arrays at the top of `page.tsx` and rendered with `.map()`, rather than hand-repeated JSX — makes it much easier to add/edit/remove a card later.
- **All buttons and CTAs** (Book an appointment, Call, WhatsApp) are static for now — no click handlers wired to real actions yet. Point them at your booking flow, `tel:`/`wa.me` links, or the contact page when ready.
- **Footer** matches the contact page's brand (Global Dental Clinic, same social icons) — intended to be reused as-is across both pages once you're ready to share a single `<Footer />` component between them.
