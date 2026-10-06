import type { Toolbox } from "../types";

// Placeholder content: edit names and notes to match what you actually use.
export const toolbox: Toolbox = {
  headline: "The tools I reach for, and why I trust them.",
  groups: [
    {
      title: "Frontend",
      blurb: "Interfaces that feel fast and look intentional.",
      tools: [
        { name: "Next.js", note: "App Router, server components, routing" },
        { name: "React", note: "Composable UI and state" },
        { name: "TypeScript", note: "Typed data from API to component" },
        { name: "Tailwind CSS", note: "Design tokens and quick iteration" },
        { name: "Framer Motion", note: "Purposeful, consistent motion" },
      ],
    },
    {
      title: "Backend",
      blurb: "Simple, reliable logic behind the screen.",
      tools: [
        { name: "Node.js", note: "APIs and server-side logic" },
        { name: "REST APIs", note: "Clean contracts between front and back" },
        { name: "PostgreSQL", note: "Relational data modelling" },
        { name: "MongoDB", note: "Flexible document storage" },
      ],
    },
    {
      title: "AI",
      blurb: "Using models as a product feature, not a gimmick.",
      tools: [
        { name: "LLM APIs", note: "Chat, tool use and structured output" },
        { name: "Prompt design", note: "Reliable, testable instructions" },
        { name: "RAG", note: "Grounding answers in your own data" },
      ],
    },
    {
      title: "Workflow",
      blurb: "How the work gets shipped.",
      tools: [
        { name: "Git & GitHub", note: "Small commits, clear history" },
        { name: "VS Code", note: "Daily editor" },
        { name: "Vercel", note: "Deploys and previews" },
        { name: "Figma", note: "Wireframes before code" },
      ],
    },
  ],
  learning: ["Agents", "Vector databases", "Testing", "System design"],
};