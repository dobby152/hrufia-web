"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { useState } from "react";

const contactInfo = [
  {
    label: "Telefon",
    value: "+420 775 237 973",
    href: "tel:+420775237973",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "E-mail",
    value: "fiala.fr@seznam.cz",
    href: "mailto:fiala.fr@seznam.cz",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Adresa",
    value: "Na Tribulkách 157, Černé Budy, 285 06 Sázava",
    href: undefined,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: "Pracovní doba",
    value: "Po–Pá 7:00–17:00",
    href: undefined,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    jmeno: "", telefon: "", email: "", sluzba: "", zprava: "",
  });

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Kontakt"
          title="Ozvěte se nám"
          description="Rádi vám připravíme nezávaznou cenovou nabídku. Stačí nám napsat nebo zavolat."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mt-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="bg-white rounded-sm border border-charcoal/5 p-12 text-center">
                <div className="w-16 h-16 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-charcoal mb-3">Děkujeme!</h3>
                <p className="text-stone">Vaši zprávu jsme přijali. Ozveme se vám do 24 hodin.</p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSending(true);
                  try {
                    const res = await fetch("/api/poptavka", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_POPTAVKA_API_TOKEN}`,
                      },
                      body: JSON.stringify(formData),
                    });
                    if (res.ok) setSubmitted(true);
                  } finally {
                    setSending(false);
                  }
                }}
                className="bg-white rounded-sm border border-charcoal/5 p-8 md:p-10 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Jméno *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.jmeno}
                      onChange={(e) => setFormData((p) => ({ ...p, jmeno: e.target.value }))}
                      className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-sm focus:outline-none focus:border-amber transition-colors"
                      placeholder="Jan Novák"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefon}
                      onChange={(e) => setFormData((p) => ({ ...p, telefon: e.target.value }))}
                      className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-sm focus:outline-none focus:border-amber transition-colors"
                      placeholder="+420 ..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-sm focus:outline-none focus:border-amber transition-colors"
                    placeholder="jan@email.cz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Typ služby
                  </label>
                  <select
                    value={formData.sluzba}
                    onChange={(e) => setFormData((p) => ({ ...p, sluzba: e.target.value }))}
                    className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-sm focus:outline-none focus:border-amber transition-colors"
                  >
                    <option value="">Vyberte službu...</option>
                    <option value="rekonstrukce">Rekonstrukce bytu</option>
                    <option value="malovani">Malování</option>
                    <option value="stehovani">Stěhování</option>
                    <option value="jine">Jiné</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Zpráva *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.zprava}
                    onChange={(e) => setFormData((p) => ({ ...p, zprava: e.target.value }))}
                    className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-sm focus:outline-none focus:border-amber transition-colors resize-none"
                    placeholder="Popište, co potřebujete – rozsah, termín, rozpočet..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-charcoal text-cream py-4 font-semibold tracking-wide uppercase text-sm hover:bg-amber hover:text-charcoal transition-all duration-300 rounded-sm disabled:opacity-60"
                >
                  {sending ? "Odesílám..." : "Odeslat poptávku"}
                </button>
                <p className="text-stone text-xs text-center">
                  Odesláním formuláře souhlasíte se zpracováním osobních údajů za účelem vyřízení poptávky.
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((c) => (
              <div key={c.label} className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-amber/10 rounded-sm flex items-center justify-center shrink-0 text-amber">
                  {c.icon}
                </div>
                <div>
                  <p className="text-sm text-stone mb-1">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-charcoal font-medium hover:text-amber transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-charcoal font-medium">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-6 mt-6 border-t border-charcoal/10">
              <h3 className="font-display text-xl text-charcoal mb-4">Rychlá odpověď</h3>
              <p className="text-stone leading-relaxed">
                Na poptávky odpovídáme většinou do 24 hodin. Pro urgentní
                záležitosti volejte přímo na telefon.
              </p>
            </div>

            <div className="bg-charcoal rounded-sm p-8 text-center">
              <p className="text-cream/60 text-sm mb-2">Zavolejte nám</p>
              <a
                href="tel:+420775237973"
                className="font-display text-2xl text-amber hover:text-amber-light transition-colors"
              >
                +420 775 237 973
              </a>
              <p className="text-cream/40 text-sm mt-2">Po–Pá 7:00–17:00</p>
            </div>

            {/* Company details */}
            <div className="pt-6 mt-6 border-t border-charcoal/10">
              <h3 className="font-display text-xl text-charcoal mb-4">Fakturační údaje</h3>
              <div className="text-stone text-sm space-y-1.5">
                <p className="text-charcoal font-medium">HRUFIA s.r.o.</p>
                <p>Na Tribulkách 157, Černé Budy</p>
                <p>285 06 Sázava</p>
                <p className="pt-2">IČO: 07059744</p>
                <p>DIČ: CZ07059744</p>
                <p className="pt-2 text-stone-light text-xs">
                  Zapsána v OR vedeném Městským soudem v Praze, sp. zn. C 293923
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
