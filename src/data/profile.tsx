import type { Profile } from "../types";

export const profile: Profile = {
  name: "Harsh Barai",
  role: "AI Full-Stack Developer",
  tagline: {
    lead: "I build web products that",
    words: ["think", "scale", "ship", "learn"],
  },
  bio: "Placeholder: a 2-3 line bio goes here. We'll replace it with yours.",
  email: "harshbarai52@gmail.com", // confirm this one
  education: "B.Tech, Pune University",
  location: "India",
  timezone: "Asia/Kolkata",
  availability: { open: true, label: "Available for hire" },
  stack: ["Next.js", "TypeScript", "Node.js", "AI"],
  socials: [
    { label: "GitHub", href: "https://github.com/harshbarai2516" },
    { label: "LinkedIn", href: "" }, // empty = hidden automatically
  ],
};