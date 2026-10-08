import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import Navbar from "../../components/layout/Navbar";
import CursorBubbles from "@/components/thread/CursorBubbles";
import { getNav, getProfile } from "@/lib/data";
import "./globals.css";

// The CSS variable names differ from Tailwind's own --font-serif/--font-mono on
// purpose: globals.css maps one onto the other (a variable can't point at itself).
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProfile();
  return {
    title: `${p.name} | ${p.role}`,
    description: `Portfolio of ${p.name}, ${p.role}.`,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, nav] = await Promise.all([getProfile(), getNav()]);

  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>
        <Navbar
          name={profile.name}
          items={nav}
          cta={{ label: "Hire me", href: "#contact" }}
        />
        {children}
        <CursorBubbles />
      </body>
    </html>
  );
}