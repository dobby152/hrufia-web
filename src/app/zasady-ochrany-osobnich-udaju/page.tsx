"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
            Právní informace
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal leading-tight mb-8">
            Zásady ochrany osobních údajů
          </h1>
          <p className="text-stone mb-12 text-lg">
            Poslední aktualizace: 1. 3. 2026
          </p>

          <div className="prose prose-charcoal max-w-none space-y-8 text-charcoal/80 leading-relaxed">
            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">
                1. Správce osobních údajů
              </h2>
              <p>
                Správcem osobních údajů je společnost <strong>HRUFIA s.r.o.</strong>,
                se sídlem Na Tribulkách 157, Černé Budy, 285 06 Sázava, IČO:
                07059744, zapsaná v obchodním rejstříku vedeném Městským soudem v
                Praze, spisová značka C 293923 (dále jen „správce").
              </p>
              <p>
                Kontakt na správce: <a href="mailto:info@hrufia.cz" className="text-amber hover:underline">info@hrufia.cz</a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">
                2. Jaké osobní údaje zpracováváme
              </h2>
              <p>V rámci naší činnosti zpracováváme následující osobní údaje:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Kontaktní údaje</strong> – jméno, příjmení, e-mailová
                  adresa, telefonní číslo, adresa
                </li>
                <li>
                  <strong>Údaje z poptávkového formuláře</strong> – typ
                  požadované služby, popis zakázky, preferovaný termín
                </li>
                <li>
                  <strong>Technické údaje</strong> – IP adresa, typ prohlížeče,
                  operační systém, údaje o návštěvnosti webu (prostřednictvím
                  cookies)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">
                3. Účel zpracování
              </h2>
              <p>Vaše osobní údaje zpracováváme za těmito účely:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Vyřízení poptávky</strong> – zpracování vaší poptávky
                  a příprava cenové nabídky (právní základ: oprávněný zájem,
                  resp. plnění smlouvy)
                </li>
                <li>
                  <strong>Komunikace</strong> – odpovědi na vaše dotazy a
                  korespondence (právní základ: oprávněný zájem)
                </li>
                <li>
                  <strong>Analýza návštěvnosti</strong> – zlepšování našich
                  webových stránek (právní základ: souhlas prostřednictvím cookies)
                </li>
                <li>
                  <strong>Plnění zákonných povinností</strong> – vedení
                  účetnictví, daňové povinnosti (právní základ: zákonná povinnost)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">
                4. Doba uchování údajů
              </h2>
              <p>
                Osobní údaje z poptávkových formulářů uchováváme po dobu 3 let
                od posledního kontaktu. Údaje související s realizovanými
                zakázkami uchováváme po dobu 10 let v souladu s účetními a
                daňovými předpisy. Cookies s analytickými údaji uchováváme
                maximálně 26 měsíců.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">
                5. Předávání údajů třetím stranám
              </h2>
              <p>
                Vaše osobní údaje neprodáváme ani nepředáváme třetím stranám za
                účelem marketingu. Údaje mohou být předány pouze:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Poskytovateli webhostingu za účelem provozu webu</li>
                <li>Účetní kanceláři za účelem vedení účetnictví</li>
                <li>
                  Orgánům státní správy, pokud to vyžaduje zákon
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">
                6. Soubory cookies
              </h2>
              <p>Náš web používá následující typy cookies:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Nezbytné cookies</strong> – zajišťují základní
                  funkčnost webu (nelze je vypnout)
                </li>
                <li>
                  <strong>Analytické cookies</strong> – pomáhají nám pochopit,
                  jak návštěvníci web používají (vyžadují souhlas)
                </li>
              </ul>
              <p className="mt-4">
                Souhlas s cookies můžete kdykoliv odvolat vymazáním cookies ve
                svém prohlížeči.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">
                7. Vaše práva
              </h2>
              <p>
                V souladu s GDPR máte právo na:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Přístup ke svým osobním údajům</li>
                <li>Opravu nepřesných údajů</li>
                <li>Výmaz osobních údajů („právo být zapomenut")</li>
                <li>Omezení zpracování</li>
                <li>Přenositelnost údajů</li>
                <li>Vznesení námitky proti zpracování</li>
                <li>
                  Podání stížnosti u Úřadu pro ochranu osobních údajů (
                  <a
                    href="https://www.uoou.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber hover:underline"
                  >
                    www.uoou.cz
                  </a>
                  )
                </li>
              </ul>
              <p className="mt-4">
                Pro uplatnění svých práv nás kontaktujte na{" "}
                <a href="mailto:info@hrufia.cz" className="text-amber hover:underline">
                  info@hrufia.cz
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">
                8. Zabezpečení údajů
              </h2>
              <p>
                Přijímáme vhodná technická a organizační opatření k ochraně
                vašich osobních údajů před neoprávněným přístupem, ztrátou,
                zničením nebo poškozením. Webové stránky jsou zabezpečeny
                protokolem HTTPS.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
