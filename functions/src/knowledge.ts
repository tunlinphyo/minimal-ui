export type KnowledgeItem = {
  id: string;
  title: string;
  tags: string[];
  content: string;
};

export const knowledgeBase: KnowledgeItem[] = [
  {
    id: "about",
    title: "About Tun Lin Phyo",
    tags: ["about", "bio", "profile", "introduction"],
    content: `
Tun Lin Phyo is a software engineer based in Japan.
He focuses on frontend development, TypeScript, Web Components, Firebase, and UI engineering.
He is interested in becoming a data engineer.
    `,
  },
  {
    id: "skills",
    title: "Technical Skills",
    tags: ["skills", "tech stack", "frontend", "firebase"],
    content: `
Tun works with TypeScript, JavaScript, Vite, Firebase Hosting, Firebase Functions,
Firestore, Web Components, custom elements, CSS, and frontend architecture.
    `,
  },
  {
    id: "projects",
    title: "Projects",
    tags: ["projects", "portfolio", "work"],
    content: `
Tun has built custom Web Component systems, calendar components, routing concepts,
Firebase-based apps, and UI experiments using modern CSS.
    `,
  },
  {
    id: "contact",
    title: "Contact",
    tags: ["contact", "email", "linkedin", "github"],
    content: `
Visitors can contact Tun through the contact links on his portfolio website.
For serious work, they should use the official contact form or LinkedIn link.
    `,
  },
];