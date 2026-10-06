export type NavItem = { label: string; href: string; num: string };

export type Social = { label: string; href: string };

export type Profile = {
  name: string;
  role: string;
  tagline: { lead: string; words: string[] };
  bio: string;
  email: string;
  education: string;
  location: string;
  timezone: string;
  availability: { open: boolean; label: string };
  stack: string[];
  socials: Social[];
};

export type About = {
  headline: string;
  paragraphs: string[];
  principles: { title: string; text: string }[];
};

export type Tool = { name: string; note: string };

export type ToolGroup = { title: string; blurb: string; tools: Tool[] };

export type Toolbox = {
  headline: string;
  groups: ToolGroup[];
  learning: string[];
};

export type ProjectCategory = "AI" | "Web" | "Tool";

export type VisualKind = "chat" | "dashboard" | "code" | "graph" | "cards";

export type Project = {
  slug: string;
  title: string;
  headline: string; // newspaper-style headline for featured stories
  summary: string;
  year: string;
  category: ProjectCategory;
  stack: string[];
  featured: boolean;
  status: "Shipped" | "Building";
  metrics: { label: string; value: string }[];
  links: { live?: string; code?: string }; // empty/missing = hidden
  visual: VisualKind; // wireframe drawn until a real screenshot is added
  image?: string; // optional screenshot path, e.g. "/projects/lumen.png"
};

export type ProjectsData = { lead: string; projects: Project[] };

export type ContactData = {
  headline: string;
  blurb: string;
  topics: string[];
  responseTime: string;
};

export type IssueMeta ={ vol: string; no: string; date: string };

export type SiteData = { issue: IssueMeta; ticker: string[] };