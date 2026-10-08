import type { ReactNode } from "react";
import ScrollThreadOverlay from "./ScrollThreadOverlay";

export default function ScrollThread({ children }: { children: ReactNode }) {
  return (
    <main className="relative">
      <ScrollThreadOverlay />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
