# Page dependency trees

## / (Home)
Entry: `app/page.tsx`
- `components/Hero.tsx` (`lib/content.ts`, `lib/motion.ts`, next/image `public/images/hero-headshot.jpg`)
- `components/Work.tsx` (`lib/content.ts`, `lib/motion.ts`, `components/VentureEmbed.tsx`)
- `components/Capabilities.tsx` (`lib/content.ts`, `lib/motion.ts`)
- `components/About.tsx` (`components/AboutPhoto.tsx`, `lib/content.ts`)
- `components/Contact.tsx` (`lib/content.ts`)
Shell (from `app/layout.tsx`): `SiteHeader` (`ThemeToggle`), `SlideRail`, `SlideCounter`, `SiteFooter`, `Motion`; styles `app/globals.css`.

## /updates
Entry: `app/updates/page.tsx` (`lib/content.ts`) + same shell.
