"use client";

export function Marquee() {
  const items = [
    "Rekonstrukce",
    "Malování",
    "Stěhování",
    "Koupelny",
    "Kuchyně",
    "Podlahy",
    "Elektřina",
    "Obklady",
    "Sádrokartony",
    "Fasády",
  ];

  return (
    <div className="overflow-hidden py-6 bg-charcoal/[0.03] border-y border-charcoal/5">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-stone-light/60 font-display text-xl md:text-2xl tracking-wide"
          >
            {item}
            <span className="mx-8 text-amber/40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
