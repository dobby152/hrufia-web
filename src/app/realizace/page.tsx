"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

const projects = [
  {
    title: "Kompletní rekonstrukce 3+1",
    location: "Praha 6, Dejvice",
    category: "Rekonstrukce",
    duration: "6 týdnů",
    description: "Kompletní proměna bytu 3+1 včetně nové koupelny, kuchyně a podlah. Moderní skandinávský styl.",
    image: "/real-rekonstrukce-byt.jpg",
  },
  {
    title: "Rekonstrukce koupelny",
    location: "Praha 4, Nusle",
    category: "Rekonstrukce",
    duration: "3 týdny",
    description: "Kompletní přestavba koupelny s walk-in sprchou a velkoplošnými obklady.",
    image: "/real-koupelna.jpg",
  },
  {
    title: "Malování kancelářských prostor",
    location: "Praha 1, Staré Město",
    category: "Malování",
    duration: "5 dní",
    description: "Profesionální malování open-space kanceláře o rozloze 450 m². Práce o víkendu bez omezení provozu.",
    image: "/real-kancelar.jpg",
  },
  {
    title: "Stěhování rodinného domu",
    location: "Praha → Říčany",
    category: "Stěhování",
    duration: "2 dny",
    description: "Kompletní stěhování 5pokojového domu včetně balení, demontáže nábytku a zpětné montáže.",
    image: "/real-stehovani.jpg",
  },
  {
    title: "Rekonstrukce kuchyně",
    location: "Praha 5, Smíchov",
    category: "Rekonstrukce",
    duration: "4 týdny",
    description: "Nová kuchyňská linka na míru, rozvody vody a elektřiny, obklady a podlaha.",
    image: "/real-kuchyne.jpg",
  },
  {
    title: "Vymalování bytu 4+kk",
    location: "Praha 10, Vršovice",
    category: "Malování",
    duration: "3 dny",
    description: "Kompletní vymalování bytu včetně přípravy povrchů, tmelení a dvouvrstvého nátěru.",
    image: "/real-malovani-byt.jpg",
  },
];

export default function RealizacePage() {
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Naše práce"
          title="Realizace, na které jsme hrdí"
          description="Každý projekt je pro nás výzva. Podívejte se na ukázky naší práce."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-sm relative overflow-hidden mb-5">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-amber text-charcoal text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-sm mb-2">
                    {p.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl text-charcoal mb-1 group-hover:text-amber transition-colors duration-300">
                {p.title}
              </h3>
              <div className="flex items-center gap-3 text-stone text-sm mb-3">
                <span>{p.location}</span>
                <span className="w-1 h-1 bg-stone-light rounded-full" />
                <span>{p.duration}</span>
              </div>
              <p className="text-stone leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-stone text-lg">
            Chcete vidět více? <a href="/kontakt" className="text-amber font-semibold hover:underline">Ozvěte se nám</a> a rádi vám ukážeme další reference.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
