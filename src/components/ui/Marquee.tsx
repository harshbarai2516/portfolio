type Props = {
  items: string[];
  reverse?: boolean;
  speed?: number; // seconds per full loop
  className?: string; // text style
  sepClassName?: string; // separator colour
};

export default function Marquee({
  items,
  reverse = false,
  speed = 35,
  className = "",
  sepClassName = "text-accent",
}: Props) {
  const row = [...items, ...items];

  return (
    <div className={`marquee overflow-hidden ${className}`} aria-hidden>
      <div
        className={`marquee-track flex w-max ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((text, i) => (
              <span
                key={i}
                className="flex items-center gap-6 whitespace-nowrap px-6"
              >
                {text}
                <span className={sepClassName}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}