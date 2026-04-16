"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ServiceCard({
  icon,
  title,
  description,
  href,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        className="group block bg-white rounded-sm p-8 md:p-10 shadow-sm hover:shadow-2xl hover:shadow-charcoal/10 transition-all duration-700 border border-charcoal/5 hover:border-amber/20 relative overflow-hidden h-full"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber via-amber-light to-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

        {/* Background number */}
        <span className="absolute top-6 right-6 font-display text-7xl text-charcoal/[0.03] group-hover:text-amber/[0.08] transition-colors duration-700">
          0{index + 1}
        </span>

        <div className="relative z-10">
          <div className="w-14 h-14 bg-amber/10 rounded-sm flex items-center justify-center mb-8 group-hover:bg-amber/20 group-hover:scale-110 transition-all duration-500">
            {icon}
          </div>
          <h3 className="font-display text-2xl text-charcoal mb-4 group-hover:text-amber transition-colors duration-300">
            {title}
          </h3>
          <p className="text-stone leading-relaxed mb-8">{description}</p>
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-charcoal/50 group-hover:text-amber transition-colors duration-300 uppercase tracking-[0.15em]">
            Zjistit více
            <svg
              className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
