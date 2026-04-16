"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

const services = [
  {
    id: "rekonstrukce",
    title: "Rekonstrukce bytů",
    subtitle: "Kompletní proměna vašeho prostoru",
    description:
      "Provádíme kompletní i částečné rekonstrukce bytů. Od bourání přes elektřinu a vodu až po finální nátěr a úklid. Vše pod jednou střechou, bez starostí.",
    items: [
      "Kompletní rekonstrukce bytů",
      "Rekonstrukce koupelen a kuchyní",
      "Výměna podlah a obkladů",
      "Elektroinstalace a rozvody",
      "Sádrokartonové příčky a podhledy",
      "Výměna oken a dveří",
    ],
    image: "/rekonstrukce.jpg",
  },
  {
    id: "malovani",
    title: "Malování",
    subtitle: "Precizní malířské práce",
    description:
      "Profesionální malování stěn, stropů a fasád. Používáme kvalitní barvy, důkladně zakrýváme nábytek a podlahy. Po nás zůstane čisto.",
    items: [
      "Malování bytů a domů",
      "Strojní malování",
      "Dekorativní techniky",
      "Nátěry fasád",
      "Lakování dveří a oken",
      "Tapetování",
    ],
    image: "/malovani.jpg",
  },
  {
    id: "stehovani",
    title: "Stěhování",
    subtitle: "Bezstarostný přesun vašeho domova",
    description:
      "Stěhujeme byty, kanceláře i jednotlivé kusy nábytku. Balíme, demontujeme, transportujeme a znovu montujeme. Vše pojištěné.",
    items: [
      "Stěhování bytů a domů",
      "Stěhování kanceláří",
      "Balicí služby",
      "Montáž a demontáž nábytku",
      "Přeprava po celé ČR",
      "Pojištění přepravovaných věcí",
    ],
    image: "/stehovani.jpg",
  },
];

export default function SluzbyPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Naše služby"
          title="Všechno, co váš byt potřebuje"
          description="Od drobných oprav po kompletní rekonstrukce. Vždy s důrazem na kvalitu, čistotu a dodržení termínů."
        />

        <div className="mt-20 space-y-32">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="scroll-mt-28"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="text-amber font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
                    {service.subtitle}
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6">
                    {service.title}
                  </h2>
                  <p className="text-stone text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-charcoal">
                        <div className="w-1.5 h-1.5 bg-amber rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 bg-charcoal text-cream px-8 py-3 font-semibold tracking-wide uppercase text-sm hover:bg-amber hover:text-charcoal transition-all duration-300 rounded-sm"
                  >
                    Poptat službu
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="rounded-sm shadow-lg border border-charcoal/5 aspect-[4/3] relative overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-charcoal rounded-sm p-12 md:p-16 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            Nevíte, co přesně potřebujete?
          </h2>
          <p className="text-cream/60 mb-8 max-w-lg mx-auto">
            Nevadí. Zavolejte nám nebo napište a společně najdeme nejlepší řešení pro váš prostor.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-amber text-charcoal px-10 py-4 font-semibold tracking-wide uppercase text-sm hover:bg-amber-light transition-all duration-300 rounded-sm"
          >
            Kontaktujte nás
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
