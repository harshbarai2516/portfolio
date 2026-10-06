# Personal Portfolio

A modern, editorial-style developer portfolio designed to feel more like a **front-page newspaper** than a conventional developer website.

Built with **Next.js, TypeScript, Tailwind CSS, Framer Motion**, and a component-driven architecture, the portfolio focuses on strong typography, motion, responsive layouts, and storytelling through projects.

---

## ✦ Live Preview

**Live:** [Add your deployed URL here]

**Source:** [Add your GitHub repository URL here]

---

## About

This portfolio is designed around an editorial / newspaper-inspired visual system.

Instead of presenting projects as a simple grid of cards, the site treats them as **featured stories**, with:

- Editorial typography
- Newspaper-inspired section headers
- Featured project "front page" stories
- Stacked project cards
- Animated reveals
- Interactive hover states
- Project archive
- Contact section
- Responsive layouts across desktop, tablet, and mobile

The goal was to create something that feels **designed**, rather than another portfolio assembled from a template and three suspiciously identical gradient blobs.

---


## ✦ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | Application framework |
| **React** | UI architecture |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling and responsive design |
| **Framer Motion** | Animations and interactions |
| **ESLint** | Code quality |
| **Vercel** | Deployment |

---


## ✦ Design System

The visual system is intentionally minimal and editorial.

### Typography

**Display**

Playfair Display

Used for large editorial headlines and visual hierarchy.

**Monospace**

JetBrains Mono

Used for metadata, labels, navigation, project information, and technical details.

### Visual Language

```text
┌──────────────────────────────────────┐
│ SECTION 04                 PROJECTS  │
├──────────────────────────────────────┤
│                                      │
│ THE FRONT PAGE          03 STORIES   │
├──────────────────────────────────────┤
│                                      │
│ PROJECT STORY                        │
│                                      │
│ Large headline                       │
│ Supporting description               │
│                                      │
│ Metrics      Stack       Links       │
│                                      │
└──────────────────────────────────────┘
```

The design uses:

- Thick borders
- Strong alignment
- Limited color palette
- Accent color for important actions
- Large typography
- Monospace metadata
- Generous whitespace

---

## ✦ Animation Architecture

Animations are intentionally component-level rather than being scattered throughout the application.

### Reveal

Reusable scroll-triggered entrance animation.

```tsx
<Reveal>
  <p>Content</p>
</Reveal>
```

### RevealText

Letter-by-letter text entrance with hover interaction.

```tsx
<RevealText
  text="Frontend Engineer"
  stagger={0.045}
/>
```

### Project Cards

Featured project stories use their own motion behavior so that sticky positioning and animation remain independent.

This prevents page-level animation wrappers from interfering with the project's stacking and layout behavior.

---

## ✦ Data-Driven Projects

Project content is separated from presentation.

A project follows a typed structure similar to:

```ts
type Project = {
  slug: string;
  title: string;
  headline: string;
  summary: string;
  category: string;
  year: number;
  featured: boolean;
  status: string;
  stack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  links: {
    live?: string;
    code?: string;
  };
};
```

This makes adding or modifying projects straightforward without rewriting UI components.

---

## ✦ Performance Principles

The project follows a few simple principles:

- Component-based architecture
- Typed project data
- Reusable UI primitives
- Minimal client-side state
- Animation only where it adds value
- Responsive-first layout
- Optimized image usage
- Separation of content and presentation

---


## License

This project is available for personal and educational use.

If you use the design or architecture as inspiration, please build your own version rather than simply replacing the name and calling it a day. The internet already has enough cloned portfolios.

---

## Author

**Harsh Barai**

Full-Stack Developer

Building scalable web applications, experimenting with AI, and occasionally convincing CSS to behave.

- GitHub: [Your GitHub](https://github.com/harshbarai2516)
- LinkedIn: [Your LinkedIn](www.linkedin.com/in/harsh-barai-86abb5185)
- Portfolio: [Your Website](https://example.com/)
- Email: `harshbarai52@gmail.com`