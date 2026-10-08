import type { ReactNode } from "react";
import ScrollThreadOverlay from "./ScrollThreadOverlay";

export default function ScrollThread({ children }: { children: ReactNode }) {
  return (
    <main className="relative">
      <ScrollThreadOverlay />
      {/* no z-index: section water (z-0) < thread (z-1) < text (z-2) < ball (z-20) */}
      <div className="relative">{children}</div>
    </main>
  );
}
