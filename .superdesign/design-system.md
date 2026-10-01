# Design system — Andrew Adrian Ansah portfolio

## Product
Personal portfolio for Andrew Adrian Ansah: CS student at the University of Alberta (from Ghana), mechanistic-interpretability researcher (sparse autoencoders, emergent misalignment), full-stack developer (EW Analytics, GIS/React/Java), founder of two prelaunch ventures (heavy-spoon.com, instafurnish.shop). Audiences: recruiters (30-second scan), engineers judging craft, peers wanting to know who he is. The site's own quality is the portfolio piece.

## Page structure (single page, five sections, then /updates)
1. Hero: availability pill, headline "problems worth thinking about" style heading, lede, primary CTA "See selected work", secondary "Download CV (PDF)", portrait (3:4).
2. Work: tabs (Work experience / Research / Projects), entry cards with title, period, role, story, tag chips; "Founder ventures" two cards each with a browser-frame live preview of the site, name, status badge "Prelaunch".
3. Capabilities and tech stack: four groups (Languages, ML & research, plus two more) as chip lists.
4. About: paragraphs, portrait, Education, Leadership, Elsewhere (LinkedIn, GitHub).
5. Contact: form (name, email, message) + direct details.
Sticky header: A4 wordmark, Work / About / Updates, theme toggle, "Get in touch".

## Baseline tokens (current site — used for the faithful reproduction ONLY)
Dark warm charcoal #141312, surface #1c1a18, text #f5f3f0, muted #a8a29a, brass accent #c9a961; ui-serif display over system-ui sans; max content width 72rem; square-ish cards with 1px lines.

## Exploration rule
Reproduction rounds use the baseline tokens exactly. Exploration rounds define their own palette/type in the prompt; whichever the prompt states is the style. Every direction must keep: the section order and all real content above (do not invent projects, dates or links), accessible contrast (WCAG AA), a mobile-first responsive layout that works from 360px, visible focus states, restrained motion that respects prefers-reduced-motion, no webfont-dependent layout shift.
