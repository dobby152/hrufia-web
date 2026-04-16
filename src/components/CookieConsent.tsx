"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("hrufia-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("hrufia-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("hrufia-cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-charcoal text-cream rounded-sm shadow-2xl border border-cream/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h3 className="font-display text-lg text-cream mb-2">
                  Soubory cookies
                </h3>
                <p className="text-cream/50 text-sm leading-relaxed">
                  Tento web používá cookies pro zajištění správné funkčnosti a
                  analýzu návštěvnosti. Více informací najdete v{" "}
                  <Link
                    href="/zasady-ochrany-osobnich-udaju"
                    className="text-amber hover:underline"
                  >
                    zásadách ochrany osobních údajů
                  </Link>
                  .
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={decline}
                  className="px-6 py-2.5 text-sm font-medium text-cream/60 hover:text-cream border border-cream/20 hover:border-cream/40 rounded-sm transition-all duration-300"
                >
                  Odmítnout
                </button>
                <button
                  onClick={accept}
                  className="px-6 py-2.5 text-sm font-semibold bg-amber text-charcoal hover:bg-amber-light rounded-sm transition-all duration-300"
                >
                  Přijmout vše
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
