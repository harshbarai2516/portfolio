import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import { getNav, getProfile } from "@/lib/data";
import "./globals.css";

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

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
      </body>
    </html>
  );
}