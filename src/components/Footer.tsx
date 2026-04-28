"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70 relative overflow-hidden">
      {/* Decorative top line */}
      <div className="h-1 bg-gradient-to-r from-amber/0 via-amber to-amber/0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="HRUFIA"
                className="h-20 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="text-cream/70 max-w-sm leading-relaxed mb-8">
              Profesionální rekonstrukce bytů, malování a stěhování. Pracujeme
              poctivě, dodržujeme termíny a za naší prací si stojíme.
            </p>
            {/* Trust badges */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl text-amber">30+</span>
                <span className="text-[10px] uppercase tracking-wider text-cream/60">Let</span>
              </div>
              <div className="w-px bg-cream/10" />
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl text-amber">200+</span>
                <span className="text-[10px] uppercase tracking-wider text-cream/60">Projektů</span>
              </div>
              <div className="w-px bg-cream/10" />
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl text-amber">98%</span>
                <span className="text-[10px] uppercase tracking-wider text-cream/60">Spokojenost</span>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-display text-lg text-cream mb-5">Navigace</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/sluzby", label: "Služby" },
                { href: "/realizace", label: "Realizace" },
                { href: "/o-nas", label: "O nás" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 hover:text-amber transition-colors duration-300"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-amber transition-all duration-300" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg text-cream mb-5">Služby</h4>
            <div className="flex flex-col gap-3">
              <Link href="/sluzby#rekonstrukce" className="hover:text-amber transition-colors">
                Rekonstrukce
              </Link>
              <Link href="/sluzby#malovani" className="hover:text-amber transition-colors">
                Malování
              </Link>
              <Link href="/sluzby#stehovani" className="hover:text-amber transition-colors">
                Stěhování
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-display text-lg text-cream mb-5">Kontakt</h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+420123456789"
                className="flex items-center gap-3 hover:text-amber transition-colors group"
              >
                <div className="w-9 h-9 bg-cream/5 group-hover:bg-amber/10 rounded-sm flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                +420 123 456 789
              </a>
              <a
                href="mailto:info@hrufia.cz"
                className="flex items-center gap-3 hover:text-amber transition-colors group"
              >
                <div className="w-9 h-9 bg-cream/5 group-hover:bg-amber/10 rounded-sm flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                info@hrufia.cz
              </a>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-cream/5 rounded-sm flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                Praha a okolí
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/50 text-sm">
            &copy; {new Date().getFullYear()} HRUFIA s.r.o. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-cream/50 text-sm">IČO: 07059744</span>
            <span className="text-cream/30">·</span>
            <Link href="/zasady-ochrany-osobnich-udaju" className="text-cream/50 hover:text-amber text-sm transition-colors">
              Ochrana osobních údajů
            </Link>
            <span className="text-cream/30">·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-cream/50 hover:text-amber text-sm transition-colors flex items-center gap-1.5 group"
            >
              Zpět nahoru
              <svg
                className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
