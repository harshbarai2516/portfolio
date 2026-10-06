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

export type IssueMeta = { vol: string; no: string; date: string };

export type SiteData = { issue: IssueMeta; ticker: string[] };