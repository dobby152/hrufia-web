"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

const values = [
  {
    title: "Kvalita",
    description: "Neděláme kompromisy. Každý detail musí sedět – od rovnosti stěn po čistotu spár.",
    icon: "◆",
  },
  {
    title: "Termíny",
    description: "Když řekneme datum, dodržíme ho. Plánujeme realisticky a komunikujeme otevřeně.",
    icon: "◇",
  },
  {
    title: "Férovost",
    description: "Transparentní ceny bez skrytých poplatků. Co domluvíme, to platí.",
    icon: "□",
  },
  {
    title: "Čistota",
    description: "Po nás zůstane uklizeno. Denně uklízíme pracoviště a chráníme váš majetek.",
    icon: "○",
  },
];

const team = [
  {
    name: "Karel Vavřík",
    role: "Vedoucí stavebních prací",
    description: "Karel má za sebou přes 15 let zkušeností v oboru. Specializuje se na rekonstrukce bytů a rodinných domů.",
  },
];

const timeline = [
  { year: "2018", event: "Založení HRUFIA s.r.o." },
  { year: "2019", event: "Rozšíření o malířské služby" },
  { year: "2021", event: "Přidání stěhovacích služeb" },
  { year: "2023", event: "200+ dokončených projektů" },
  { year: "2025", event: "Rozšíření týmu a působnosti" },
];

export default function ONasPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-amber font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
              O nás
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-charcoal leading-tight mb-6">
              Stavíme na poctivé práci a lidském přístupu
            </h1>
            <div className="space-y-4 text-stone text-lg leading-relaxed">
              <p>
                HRUFIA vznikla v roce 2018 z jednoduché myšlenky – dělat řemeslnou
                práci tak, jak má být. Poctivě, včas a za rozumnou cenu.
              </p>
              <p>
                Začínali jsme jako malý tým dvou kamarádů, kteří měli dost nekvalitních
                rekonstrukcí a nespolehlivých řemeslníků. Dnes jsme tým 15 profesionálů,
                který ročně dokončí přes 80 projektů.
              </p>
              <p>
                Naše filozofie se nezměnila: děláme to, co bychom chtěli mít doma u sebe.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal rounded-sm aspect-square flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber/10 to-transparent" />
            <div className="text-center relative z-10">
              <span className="font-display text-8xl text-amber block mb-4">30+</span>
              <span className="text-cream/60 text-lg tracking-wide uppercase">Let zkušeností</span>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <SectionHeading
          label="Naše hodnoty"
          title="Na čem si zakládáme"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 mb-32">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-sm border border-charcoal/5"
            >
              <span className="text-amber text-3xl block mb-4">{v.icon}</span>
              <h3 className="font-display text-xl text-charcoal mb-3">{v.title}</h3>
              <p className="text-stone leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <SectionHeading
          label="Náš tým"
          title="Lidé za HRUFIA"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-32">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-sm border border-charcoal/5"
            >
              <div className="w-16 h-16 bg-amber/10 rounded-sm flex items-center justify-center mb-6">
                <span className="font-display text-amber text-2xl">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-display text-xl text-charcoal mb-1">{member.name}</h3>
              <p className="text-amber text-sm font-semibold tracking-wide uppercase mb-4">{member.role}</p>
              <p className="text-stone leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <SectionHeading
          label="Naše cesta"
          title="Jak jsme rostli"
        />
        <div className="mt-16 max-w-2xl mx-auto">
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-8 pb-10 relative"
            >
              {i < timeline.length - 1 && (
                <div className="absolute left-[39px] top-10 w-0.5 h-full bg-charcoal/10" />
              )}
              <div className="w-20 shrink-0">
                <div className="w-20 h-10 bg-amber/10 rounded-sm flex items-center justify-center">
                  <span className="font-display text-amber text-lg">{t.year}</span>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-charcoal font-medium">{t.event}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="font-display text-3xl text-charcoal mb-4">Pojďme spolupracovat</h2>
          <p className="text-stone text-lg mb-8 max-w-lg mx-auto">
            Rádi se potkáme, prohlédneme váš prostor a připravíme nabídku na míru.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-charcoal text-cream px-10 py-4 font-semibold tracking-wide uppercase text-sm hover:bg-amber hover:text-charcoal transition-all duration-300 rounded-sm"
          >
            Kontaktujte nás
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
