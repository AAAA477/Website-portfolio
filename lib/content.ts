/**
 * Single source of truth for page copy.
 *
 * This is the code copy of CONTENT.md; when one changes, update the other in
 * the same sitting. CONTENT.md carries the full TODO list and sourcing notes;
 * this file carries only what's confirmed enough to render.
 */

export type Link = {
  label: string;
  href: string;
};

export type WorkEntry = {
  org: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
};

export type ResearchEntry = {
  org: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
  recognition?: string[];
};

export type Project = {
  slug: string;
  title: string;
  status?: string;
  /** Narrative copy, not a resume bullet list. See CONTENT.md for sourcing. */
  story: string;
  tags: string[];
  links: Link[];
};

export type Update = {
  date: string;
  text: string;
};

export const site = {
  name: "Andrew Adrian Ansah",
  shortName: "Andrew Ansah",
  role: "Undergraduate Researcher & Full-Stack Developer",
  email: "aaaansah@gmail.com",
  phone: "780-710-9134",
  phoneHref: "+17807109134",
  location: "Edmonton, Canada",
  linkedin: "https://linkedin.com/in/andrew-adrian-ansah",
  github: "https://github.com/AAAA477",
  cv: "/cv-andrew-ansah.pdf",
  description:
    "Andrew Ansah is a computer science student at the University of Alberta working across AI research and software engineering: mechanistic interpretability of language models and full-stack delivery of production web systems.",
  // TODO (CONTENT.md): confirm this is still accurate before publishing.
  availability: "Open to internships and freelance work",
} as const;

export const hero = {
  heading: "I like solving problems, in code and in how models think.",
  lede: "I'm Andrew, a computer science student at the University of Alberta. I split my time between mechanistic interpretability research on language models and shipping full-stack software, and I'm building two ventures of my own on the side.",
  portrait: {
    src: "/images/About.jpg",
    alt: "Portrait of Andrew Adrian Ansah",
    width: 624,
    height: 811,
  },
} as const;

/** Paid / employed roles (EW Analytics only). Research roles live below. */
export const workExperience: WorkEntry[] = [
  {
    org: "EW Analytics Consult",
    role: "Full-Stack Developer",
    period: "Nov 2025 – Present",
    location: "Remote",
    bullets: [
      "Lead a team of 3 delivering full-stack software across GIS portals, management systems, and automation tooling using GeoNode, Google Apps Script, React, and Java.",
      "Built automation software that eliminated repetitive manual workflows, reducing deployment time by 40%.",
      "Customized the MapStore (React) UI and built repeatable data pipelines in PostGIS/GeoServer, cutting manual publishing time in half.",
    ],
    tags: ["GeoNode", "React", "Java", "PostGIS", "GeoServer", "MapStore"],
  },
];

/** Research roles, kept distinct from paid work experience. */
export const research: ResearchEntry[] = [
  {
    org: "Neubahar Labs",
    role: "Undergraduate Researcher",
    period: "Sep 2026 – Present",
    location: "Edmonton, Canada",
    bullets: [
      "Building an analysis framework for learned representations, used to study feature absorption and feature splitting in sparse autoencoders (SAEs).",
      "Investigating how one SAE latent can absorb a more general concept, and how a single concept fragments across latents as dictionary size grows, and what that means for the reliability of SAE latents as interpretability units.",
    ],
    tags: ["Sparse autoencoders", "Mechanistic interpretability"],
  },
  {
    org: "Algoverse AI Research",
    role: "Researcher",
    period: "May 2025 – Present",
    location: "Remote",
    bullets: [
      "Investigated emergent misalignment in language models (0.5B–32B parameters), demonstrating it occurs reliably across model scales using LoRA fine-tuning and activation steering.",
      "Built linear probes and early-warning indicators on adapter weights to detect misaligned behavior before it manifests at the output level.",
      "Co-authored and open-sourced models on HuggingFace.",
    ],
    tags: ["LoRA", "Activation steering", "Linear probes", "HuggingFace"],
    recognition: ["MechInterp (Spotlight)", "CogInterp", "UniReps (Honorable Mention)"],
  },
];

/**
 * Project copy as narrative prose rather than resume bullets, at Andrew's
 * request. Every fact here (module counts, stack, competition context) is
 * still sourced straight from the CV; only the framing device (told as a
 * short story rather than listed as line items) is new. The "why" sentence
 * that opens each one is a reasonable inference from the CV, not a quote from
 * Andrew, so it's flagged in CONTENT.md as a TODO for him to confirm or
 * rewrite in his own words before this goes live.
 */
export const projects: Project[] = [
  {
    slug: "homebatch",
    title: "HomeBatch",
    status: "In development, not yet public",
    story:
      "HomeBatch is a marketplace for Edmonton home cooks, built so someone can sell anything from a single dinner to a full freezer batch to a standing weekly subscription. It's still pre-launch, but it's already a real system underneath: 15 feature modules spanning customer, vendor and admin roles, an 8-migration Postgres schema with row-level security, and six Supabase edge functions handling Stripe checkout, payouts and email.",
    tags: ["React", "TypeScript", "Supabase", "Stripe Connect", "Vitest", "Playwright"],
    // TODO (CONTENT.md): add a repo or waitlist link once one exists.
    links: [],
  },
  {
    slug: "study-buddy-ai",
    title: "Study Buddy AI",
    story:
      "Study Buddy AI is a bot built to make revising notes feel less like re-reading and more like asking a question. It uses Retrieval Augmented Generation to pull the right passage out of a student's own material, and LangChain to turn that into a natural answer rather than a raw document dump.",
    tags: ["Python", "LangChain", "Google AI", "NumPy"],
    // TODO (CONTENT.md): no URL given in the CV yet.
    links: [],
  },
  {
    slug: "ace-budget-ai",
    title: "Ace Budget AI",
    status: "Hackathon project",
    story:
      "Ace Budget AI came out of a hackathon built around one annoyance: nobody wants to type in every receipt just to see where their money went. It reads receipts and parses emails automatically, then runs a TensorFlow and spaCy pipeline to predict where spending is headed, on a Next.js frontend over a Python Flask backend, containerized with Docker.",
    tags: ["Next.js", "TypeScript", "Python Flask", "TensorFlow", "spaCy", "Hugging Face", "Docker"],
    // TODO (CONTENT.md): get the repo/devpost URL from Andrew.
    links: [],
  },
  {
    slug: "handmouseapp",
    title: "HandMouseApp",
    story:
      "HandMouseApp started from a simple question: could a webcam replace a mouse? It tracks hand landmarks in real time with OpenCV and Mediapipe, and turns that tracking into cursor movement, clicks, double-clicks and drags through a PyQt5 interface.",
    tags: ["Python", "OpenCV", "Mediapipe", "PyQt5"],
    // TODO (CONTENT.md): get the repo URL from Andrew.
    links: [],
  },
];

export type Venture = {
  name: string;
  href: string;
  status: string;
  description: string;
};

export const ventures: Venture[] = [
  {
    name: "heavy-spoon.com",
    href: "https://heavy-spoon.com",
    status: "Prelaunch",
    // TODO (CONTENT.md): Andrew to provide a one/two-sentence description.
    description: "Details coming soon.",
  },
  {
    name: "instafurnish.shop",
    href: "https://instafurnish.shop",
    status: "Prelaunch",
    // TODO (CONTENT.md): Andrew to provide a one/two-sentence description.
    description: "Details coming soon.",
  },
];

export const capabilities = [
  {
    title: "Languages",
    items: ["Python", "C/C++", "JavaScript", "TypeScript", "HTML5", "CSS"],
  },
  {
    title: "ML & research",
    items: [
      "LoRA fine-tuning",
      "Activation steering",
      "Linear probes",
      "Sparse autoencoders",
      "RAG",
      "LangChain",
      "TensorFlow",
      "spaCy",
      "Hugging Face",
      "NumPy",
      "Pandas",
      "OpenCV",
    ],
  },
  {
    title: "Web & backend",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "PostGIS",
      "GeoServer",
      "Flask",
    ],
  },
  {
    title: "Tools & testing",
    items: ["Git", "Docker", "GitHub Actions", "Jupyter Notebook", "Vitest", "Playwright"],
  },
] as const;

export const about = {
  paragraphs: [
    "I'm a computer science student at the University of Alberta who likes solving problems. That's the constant, more than any one stack or subfield. Lately that's meant mechanistic interpretability research on one side and full-stack product work on the other.",
    "I was recently part of the Edmonton Unlimited Student Founders Launch program, and I'm the founder of two prelaunch ventures, heavy-spoon.com and instafurnish.shop. Still getting there, but building in public toward launch.",
    "Day to day, I work at EW Analytics building software solutions to people's problems. Outside of code, I play guitar for fun.",
  ],
  education: [{ period: "Sep 2023 – May 2027", detail: "University of Alberta, Computer Science" }],
  /** Community / organizational roles, distinct from paid work and research. */
  leadership: [
    {
      org: "ColorStack, UofA chapter",
      role: "VP Secretary",
      // TODO (CONTENT.md): confirm term/dates; "Ongoing" used until then.
      period: "Ongoing",
    },
  ],
  /** Graduation photo (NCUK Accra), background removed. A real photo, not a stock image. */
  photo: {
    src: "/images/photo_2024-05-02_20-49-53-removebg-preview.png",
    alt: "Andrew Adrian Ansah in academic regalia at his NCUK Accra graduation",
    width: 408,
    height: 612,
  },
} as const;

/**
 * Real, dated milestones only, pulled straight from the CV. This is meant to
 * grow over time; add the newest entry at the top. See CONTENT.md before
 * adding anything without a confirmed date.
 */
export const updates: Update[] = [
  {
    date: "September 2026",
    text: "Started as an Undergraduate Researcher at Neubahar Labs, studying feature absorption and feature splitting in sparse autoencoders.",
  },
  {
    date: "November 2025",
    text: "Started as a Full-Stack Developer at EW Analytics Consult, leading a team of three across GIS portals, management systems and automation tooling.",
  },
  {
    date: "May 2025",
    text: "Started researching emergent misalignment in language models with Algoverse AI Research; the work went on to be recognized at MechInterp, CogInterp and UniReps.",
  },
];

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Updates", href: "/updates/" },
] as const;
