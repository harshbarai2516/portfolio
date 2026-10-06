import Marquee from "@/components/ui/Marquee";

type Props = { items: string[] };

export default function TickerBand({ items }: Props) {
  return (
    <section
      aria-label="Highlights"
      className="relative h-44 overflow-hidden sm:h-56"
    >
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
    </section>
  );
}