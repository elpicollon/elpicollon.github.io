// Channel data for the Picolo CRT site.
// Home is CH 03 (the classic VCR/console channel). Projects are sequential channels.
// CH 04 is the biography / about page.

export interface ChannelConfig {
  n?: number;
  name: string;
  namePt?: string;
  show: string;
  showPt?: string;
  type: 'home' | 'project' | 'about';
  path: string;
  year?: string;
  disc?: string;
  discPt?: string;
  swatch?: string;
  status?: string;
  role?: string;
  stack?: string;
  blurb?: string;
  image?: string;
}

export const CHANNELS: ChannelConfig[] = [
  {
    n: 3,
    name: "Home",
    namePt: "Início",
    show: "AI-First Product Design",
    showPt: "Product Design AI-First",
    type: "home",
    path: "/",
  },
  {
    n: 4,
    name: "About Rodrigo",
    namePt: "Sobre Rodrigo",
    show: "About Rodrigo",
    showPt: "Sobre Rodrigo",
    year: "2026",
    disc: "Biography",
    discPt: "Biografia",
    swatch: "s5",
    role: "UX/UI Designer",
    stack: "Teaching / Strategy / Craft",
    blurb: "Learn more about Rodrigo Picolo's professional trajectory, academic background, teaching, and certifications.",
    path: "/sobre",
    type: "about",
    image: "/assets/image-rp.webp"
  },
  {
    n: 5,
    name: "AI Notetaker — Leads2b",
    namePt: "IA Notetaker — Leads2b",
    show: "AI Notetaker — Leads2b",
    showPt: "IA Notetaker — Leads2b",
    year: "2025",
    disc: "Product Design",
    discPt: "Design de Produto",
    swatch: "s1",
    role: "Lead Product Designer",
    stack: "iOS / Real-time / AI",
    blurb: "A mobile-first AI notetaker that captures, transcribes and structures sales conversations in real time — turning raw calls into actionable CRM records.",
    path: "/projeto/ia-notetaker-app",
    type: "project",
    image: "/assets/projects/ia-notetaker-app/card-home.webp"
  },
  {
    n: 6,
    name: "Transcriptions & AI Insights",
    namePt: "Transcrições & Insights com IA",
    show: "Transcriptions & AI Insights",
    showPt: "Transcrições & Insights com IA",
    year: "2024",
    disc: "Product Design",
    discPt: "Design de Produto",
    swatch: "s2",
    role: "Product Designer",
    stack: "Web / NLP / Dashboards",
    blurb: "A web platform that transcribes meetings and surfaces AI-driven insights — sentiment, objections and next steps — inside a focused review experience.",
    path: "/projeto/transcricoes-insights-ia",
    type: "project",
    image: "/assets/projects/transcricoes-insights-ia/card-home.webp"
  },
  {
    n: 7,
    name: "Medical Office — Web App",
    namePt: "Medical Office — Web App",
    show: "Medical Office — Web App",
    showPt: "Medical Office — Web App",
    year: "2021",
    disc: "Product Design",
    discPt: "Design de Produto",
    swatch: "s3",
    role: "UX/UI Designer",
    stack: "Web / Scheduling / Maps",
    blurb: "A patient-facing web app to find clinics, compare availability and book appointments, balancing dense medical data with a calm, trustworthy interface.",
    path: "/projeto/medical-office",
    type: "project",
    image: "/assets/projects/medical-office/card-home.webp"
  },
  {
    n: 8,
    name: "Company Import",
    namePt: "Importação de Empresas",
    show: "Company Import",
    showPt: "Importação de Empresas",
    year: "2025",
    disc: "Product Design",
    discPt: "Design de Produto",
    swatch: "s4",
    role: "Product Designer",
    stack: "B2B / Data import / SaaS",
    blurb: "A bulk company-import flow for a B2B platform — taming a messy spreadsheet-to-database process into a guided, forgiving, error-tolerant experience.",
    path: "/projeto/importacao-empresas",
    type: "project",
    image: "/assets/projects/importacao-empresas/capa.webp"
  }
];

export const HOME_CHANNEL = 3;
export const channelByNumber = (n: number) => CHANNELS.find((c) => c.n === n);
export const channelByPath = (path: string) => CHANNELS.find((c) => c.path === path);
export const channelOrder = CHANNELS.map((c) => c.n).filter((n): n is number => n !== undefined);
