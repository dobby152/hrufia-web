"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { HeroAnimation } from "@/components/HeroAnimation";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { Marquee } from "@/components/Marquee";
import { VisualizationWizard } from "@/components/VisualizationWizard";

const stats = [
  { value: "200+", label: "Dokončených projektů" },
  { value: "30+", label: "Let zkušeností" },
  { value: "98%", label: "Spokojených klientů" },
  { value: "0", label: "Nedodržených termínů" },
];

const services = [
  {
    icon: (
      <svg className="w-7 h-7 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Rekonstrukce bytů",
    description: "Kompletní rekonstrukce od bourání po finální úklid. Koupelny, kuchyně, podlahy, elektřina – vše pod jednou střechou.",
    href: "/sluzby#rekonstrukce",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: "Malování",
    description: "Profesionální malířské práce. Stěny, stropy, fasády. Čistá práce, precizní zakrývání, kvalitní barvy.",
    href: "/sluzby#malovani",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Stěhování",
    description: "Bezstarostné stěhování bytů i kanceláří. Balení, transport, montáž nábytku. Pojištěno, spolehlivé.",
    href: "/sluzby#stehovani",
  },
];

const testimonials = [
  {
    text: "Rekonstrukci koupelny zvládli za 3 týdny přesně podle plánu. Perfektní práce, uklizené a čisté.",
    author: "Jana Nováková",
    role: "Rekonstrukce bytu, Praha 6",
    initials: "JN",
  },
  {
    text: "Stěhovali jsme třípokojový byt. Rychlé, opatrné, nic se nepoškodilo. Příště zase s HRUFIA.",
    author: "Martin Dvořák",
    role: "Stěhování, Praha → Brno",
    initials: "MD",
  },
  {
    text: "Vymalovali celý byt 3+1 za víkend. Čistá práce, férová cena. Doporučuji všem.",
    author: "Petra Svobodová",
    role: "Malování bytu, Praha 4",
    initials: "PS",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Poptávka",
    desc: "Napište nám nebo zavolejte. Probereme vaše představy a termíny.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Zaměření",
    desc: "Přijedeme, prohlédneme prostor a připravíme detailní cenovou nabídku.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Realizace",
    desc: "Pracujeme rychle a čistě. Průběžně informujeme o postupu prací.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Předání",
    desc: "Zkontrolujeme kvalitu, uklidíme a předáme hotový prostor.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-warm-gray via-cream to-cream" />
          <motion.div
            className="absolute top-20 -right-20 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(226,168,75,0.06) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(45,74,62,0.04) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-charcoal/5 rounded-full px-5 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-amber rounded-full animate-pulse" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-charcoal">
                Rekonstrukce · Malování · Stěhování
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.8rem,6vw,5rem)] text-charcoal leading-[1.05] mb-6 tracking-tight"
            >
              Proměníme váš
              <br />
              <span className="gradient-text">prostor k životu</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-stone text-lg md:text-xl max-w-lg leading-relaxed mb-10"
            >
              Od holých stěn po útulný domov. Profesionální tým, férové ceny a
              termíny, které dodržujeme.{" "}
              <span className="text-charcoal font-medium">Přes 30 let.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/kontakt"
                className="magnetic-btn group relative bg-charcoal text-cream px-9 py-4 font-semibold tracking-[0.12em] uppercase text-sm rounded-sm text-center overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-charcoal transition-colors duration-300">
                  Nezávazná poptávka
                </span>
                <div className="absolute inset-0 bg-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
              <Link
                href="/realizace"
                className="group flex items-center justify-center gap-3 border-2 border-charcoal/15 text-charcoal px-9 py-4 font-semibold tracking-[0.12em] uppercase text-sm hover:border-charcoal/40 transition-all duration-300 rounded-sm"
              >
                Naše realizace
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* AI Visualization CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6"
            >
              <button
                onClick={() => setWizardOpen(true)}
                className="group relative w-full sm:w-auto bg-gradient-to-r from-amber to-amber-light text-charcoal px-10 py-5 font-semibold tracking-[0.1em] uppercase text-sm rounded-sm overflow-hidden shadow-lg shadow-amber/20 hover:shadow-xl hover:shadow-amber/30 transition-shadow duration-500"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                  Chci vidět svoji rekonstrukci
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
              <p className="text-stone-light text-xs mt-2 tracking-wide">
                AI vizualizace powered by Nano Banana
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="bg-white rounded-sm shadow-2xl shadow-charcoal/10 p-4 sm:p-8 border border-charcoal/5 relative">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber -translate-x-2 -translate-y-2" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber translate-x-2 translate-y-2" />
              <div className="pt-12">
                <HeroAnimation />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 6.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 -left-5 bg-charcoal text-cream px-5 py-3 rounded-sm shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-amber rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="font-display text-sm text-cream block leading-tight">Hotovo!</span>
                <span className="text-[11px] text-cream/50">Rekonstrukce dokončena</span>
              </div>
            </motion.div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="absolute -bottom-4 -right-4 bg-amber text-charcoal px-4 py-2 rounded-sm shadow-lg animate-float"
            >
              <span className="font-display text-2xl block leading-tight">98%</span>
              <span className="text-[10px] font-medium tracking-wider uppercase opacity-70">Spokojenost</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-light">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 border-2 border-charcoal/20 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-charcoal/30 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Stats */}
      <section className="py-20 bg-charcoal relative overflow-hidden diagonal-top">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="text-center relative"
              >
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-cream/10" />
                )}
                <div className="font-display text-5xl md:text-6xl text-amber mb-2 tracking-tight">
                  {s.value}
                </div>
                <div className="text-cream/50 text-sm tracking-wider uppercase">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end mb-16">
            <div className="lg:col-span-7">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-amber font-semibold text-sm tracking-[0.25em] uppercase mb-4 block"
              >
                Co děláme
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-[3.5rem] text-charcoal leading-[1.1]"
              >
                Služby šité
                <br />
                <span className="text-stone-light">na míru</span>
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <p className="text-stone text-lg leading-relaxed">
                Každý prostor je jiný. Proto ke každé zakázce přistupujeme
                individuálně s důrazem na kvalitu a vaše představy.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 md:py-36 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            label="Jak to funguje"
            title="Od poptávky po předání klíčů"
            description="Průhledný postup bez překvapení. Víte přesně, co se děje a kdy."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-20">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="group relative bg-cream/50 hover:bg-cream p-8 rounded-sm border border-charcoal/5 hover:border-amber/20 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber/10 group-hover:bg-amber/20 rounded-sm flex items-center justify-center text-amber transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="font-display text-5xl text-charcoal/[0.06] group-hover:text-amber/20 transition-colors duration-500">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-xl text-charcoal mb-3">{item.title}</h3>
                <p className="text-stone leading-relaxed text-[15px]">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 items-center">
                    <svg className="w-8 h-8 text-charcoal/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-amber/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:sticky lg:top-32"
              >
                <span className="text-amber font-semibold text-sm tracking-[0.25em] uppercase mb-4 block">
                  Reference
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight mb-6">
                  Co říkají
                  <br />
                  naši klienti
                </h2>
                <p className="text-stone text-lg leading-relaxed mb-8">
                  Nejlepší reklamou je spokojený zákazník. Přečtěte si, co o nás říkají ti, pro které jsme pracovali.
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-amber"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-stone text-sm">4.9 / 5</span>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.author}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="bg-white p-8 md:p-10 rounded-sm border border-charcoal/5 relative group hover:shadow-lg transition-shadow duration-500"
                >
                  <div className="absolute top-8 right-8 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                    </svg>
                  </div>
                  <p className="text-charcoal text-lg leading-relaxed mb-8 relative z-10">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center">
                      <span className="text-cream font-semibold text-sm">{t.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">{t.author}</p>
                      <p className="text-stone text-sm">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 bg-charcoal relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber/[0.03] blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg className="w-8 h-8 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-tight mb-6">
            Máte v plánu
            <br />
            <span className="gradient-text">rekonstrukci?</span>
          </h2>
          <p className="text-cream/50 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Ozvěte se nám. Probereme vaše představy a připravíme nezávaznou
            cenovou nabídku do 48 hodin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="magnetic-btn group relative bg-amber text-charcoal px-10 py-4 font-semibold tracking-[0.12em] uppercase text-sm rounded-sm overflow-hidden"
            >
              <span className="relative z-10">Chci nezávaznou nabídku</span>
              <div className="absolute inset-0 bg-amber-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
            <a
              href="tel:+420123456789"
              className="text-cream/60 hover:text-amber transition-colors duration-300 font-medium tracking-wide flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +420 123 456 789
            </a>
          </div>
        </motion.div>
      </section>

      {/* AI Visualization Wizard */}
      <VisualizationWizard
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
    </>
  );
}
