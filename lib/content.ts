/**
 * Single source of truth for page copy.
 *
 * This is the code copy of CONTENT.md — when one changes, update the other in
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
  problem: string;
  bullets?: string[];
  tags: string[];
  links: Link[];
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
  heading: "I like solving problems — in code, and in how models think.",
  lede: "I'm Andrew, a computer science student at the University of Alberta. I split my time between mechanistic interpretability research on language models and shipping full-stack software, and I'm building two ventures of my own on the side.",
  portrait: {
    src: "/images/About.jpg",
    alt: "Portrait of Andrew Adrian Ansah",
    width: 624,
    height: 811,
  },
} as const;

/** Paid / employed roles — EW Analytics only. Research roles live below. */
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
      "Investigating how one SAE latent can absorb a more general concept, and how a single concept fragments across latents as dictionary size grows — and what that means for the reliability of SAE latents as interpretability units.",
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
    recognition: ["MechInterp — Spotlight", "CogInterp", "UniReps — Honorable Mention"],
  },
];

export const projects: Project[] = [
  {
    slug: "homebatch",
    title: "HomeBatch",
    status: "In development, not yet public",
    problem:
      "Marketplace connecting Edmonton home cooks with customers buying single meals, bulk freezer batches, and recurring subscriptions.",
    bullets: [
      "15 feature modules across customer, vendor, and admin roles",
      "8-migration Postgres schema with row-level security",
      "6 Supabase edge functions for Stripe checkout, payouts, and email",
    ],
    tags: ["React", "TypeScript", "Supabase", "Stripe Connect", "Vitest", "Playwright"],
    // TODO (CONTENT.md): add a repo or waitlist link once one exists.
    links: [],
  },
  {
    slug: "study-buddy-ai",
    title: "Study Buddy AI",
    problem:
      "Educational bot that helps students revise notes, using Retrieval Augmented Generation for information extraction and LangChain for natural language processing.",
    tags: ["Python", "LangChain", "Google AI", "NumPy"],
    // TODO (CONTENT.md): no URL given in the CV yet.
    links: [],
  },
  {
    slug: "ace-budget-ai",
    title: "Ace Budget AI",
    status: "Hackathon project",
    problem:
      "AI-powered personal finance platform with receipt scanning, email parsing, and predictive budgeting.",
    tags: ["Next.js", "TypeScript", "Python Flask", "TensorFlow", "spaCy", "Hugging Face", "Docker"],
    // TODO (CONTENT.md): get the repo/devpost URL from Andrew.
    links: [],
  },
  {
    slug: "handmouseapp",
    title: "HandMouseApp",
    problem:
      "Real-time hand-gesture mouse control: webcam-based cursor, click, double-click, and drag.",
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
    "I'm a computer science student at the University of Alberta who likes solving problems — that's the constant, more than any one stack or subfield. Lately that's meant mechanistic interpretability research on one side and full-stack product work on the other.",
    "I was recently part of the Edmonton Unlimited Student Founders Launch program, and I'm the founder of two prelaunch ventures, heavy-spoon.com and instafurnish.shop — still getting there, but building in public toward launch.",
    "Day to day, I work at EW Analytics building software solutions to people's problems, and I serve as VP Secretary of the ColorStack UofA chapter. Outside of code, I play guitar for fun.",
  ],
  education: [{ period: "Sep 2023 – May 2027", detail: "University of Alberta, Computer Science" }],
} as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
] as const;
