// The ocean is split into real depth zones. Each page section is one zone.
// `top` and `bottom` are the water colours at the start and end of a section;
// each zone's top equals the previous zone's bottom, so the dive is seamless.

export type ZoneKey = "sunlight" | "twilight" | "midnight" | "abyss" | "hadal";

export type Zone = {
  name: string;
  top: string;
  bottom: string;
};

export const zones: Record<ZoneKey, Zone> = {
  sunlight: { name: "Sunlight zone", top: "#0d6f96", bottom: "#0a5a86" },
  twilight: { name: "Twilight zone", top: "#0a5a86", bottom: "#082f5c" },
  midnight: { name: "Midnight zone", top: "#082f5c", bottom: "#031a38" },
  abyss: { name: "Abyssal plain", top: "#031a38", bottom: "#020a16" },
  // the Mariana Trench: the deepest point on Earth (Challenger Deep, ~10,935 m)
  hadal: { name: "Hadal zone", top: "#031a38", bottom: "#01050c" },
};

export const formatDepth = (m: number) => `${Math.round(m).toLocaleString("en-US")} m`;
