"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}
    >
      {label && (
        <span className="text-amber font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
          {label}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-stone text-lg leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
