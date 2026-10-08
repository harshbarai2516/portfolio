import Marquee from "@/components/ui/Marquee";

type Props = { items: string[] };

export default function TickerBand({ items }: Props) {
  return (
    <section aria-label="Highlights" className="relative h-44 sm:h-56">
      {/* water: continues the hero waves down into the profile zone */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(180deg, #1b8cb4, #0d6f96)" }}
      />
      <div className="relative z-[2] h-full overflow-hidden">
      {/* back band */}
      <div className="absolute left-[-5%] top-1/2 w-[110%] -translate-y-1/2 rotate-2 border-y-2 border-ink bg-accent py-3 text-paper">
        <Marquee
          items={items}
          reverse
          speed={45}
          className="font-mono text-sm uppercase tracking-[0.2em]"
          sepClassName="text-ink"
        />
      </div>

      {/* front band */}
      <div className="absolute left-[-5%] top-1/2 w-[110%] -translate-y-1/2 -rotate-2 border-y-2 border-ink bg-ink py-4 text-paper">
        <Marquee
          items={items}
          speed={38}
          className="text-3xl font-black uppercase tracking-tight sm:text-4xl"
          sepClassName="text-accent"
        />
      </div>
      </div>
    </section>
  );
}