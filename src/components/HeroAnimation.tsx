"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

const fadeIn = (delay: number, duration: number = 0.8): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay, duration, ease: "easeOut" as const },
  },
});

const draw = (delay: number, duration: number = 1): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration, ease: "easeInOut" as const },
      opacity: { delay, duration: 0.01 },
    },
  },
});

const slideUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
});

const scaleIn = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
});

const stages = [
  "Hrubá stavba",
  "Elektřina & voda",
  "Omítky",
  "Malování",
  "Zařizování",
];

export function HeroAnimation() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setActiveStage(1), 1500),
      setTimeout(() => setActiveStage(2), 3000),
      setTimeout(() => setActiveStage(3), 4200),
      setTimeout(() => setActiveStage(4), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative">
      {/* Stage indicators */}
      <div className="absolute -top-14 left-0 right-0 flex justify-between px-2">
        {stages.map((stage, i) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ${
                i <= activeStage ? "bg-amber scale-100" : "bg-stone-light/30 scale-75"
              }`}
            />
            <span
              className={`text-[10px] font-medium tracking-wider uppercase transition-colors duration-500 hidden sm:block ${
                i <= activeStage ? "text-charcoal" : "text-stone-light/50"
              }`}
            >
              {stage}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute -top-2 left-0 right-0 h-0.5 bg-charcoal/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-amber rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
          transition={{ duration: 1.2, ease: "easeInOut" as const }}
        />
      </div>

      <motion.svg
        viewBox="0 0 800 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial="hidden"
        animate="visible"
      >
        {/* Room background - perspective wall */}
        <motion.path
          d="M80 50 L720 50 L760 20 L40 20 Z"
          fill="#d8d0c4"
          variants={fadeIn(0, 0.4)}
        />
        <motion.rect
          x="80" y="50" width="640" height="380" rx="0"
          fill="#e8e0d4"
          variants={fadeIn(0, 0.3)}
        />

        {/* Ceiling detail */}
        <motion.line
          x1="80" y1="50" x2="720" y2="50"
          stroke="#c8c0b4" strokeWidth="3"
          variants={draw(0.2, 0.6)}
        />

        {/* Floor with wood pattern */}
        <motion.rect
          x="80" y="390" width="640" height="50" rx="0"
          fill="#c4a882"
          variants={fadeIn(0.3)}
        />
        {/* Herringbone pattern */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.g key={`floor-${i}`} variants={fadeIn(0.4 + i * 0.02)}>
            <rect
              x={80 + i * 40}
              y="390"
              width="38"
              height="24"
              fill={i % 2 === 0 ? "#b89970" : "#c4a882"}
              stroke="#a88960"
              strokeWidth="0.5"
            />
            <rect
              x={80 + i * 40}
              y="414"
              width="38"
              height="26"
              fill={i % 2 === 0 ? "#c4a882" : "#b89970"}
              stroke="#a88960"
              strokeWidth="0.5"
            />
          </motion.g>
        ))}

        {/* Room outline */}
        <motion.path
          d="M80 50 L80 440 L720 440 L720 50"
          stroke="#8a8578" strokeWidth="2" fill="none"
          variants={draw(0.3, 1)}
        />

        {/* Stage 1: Bare structure - exposed brick area */}
        <motion.g variants={fadeIn(0.5)}>
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <rect
                key={`brick-${row}-${col}`}
                x={85 + col * 35 + (row % 2 === 0 ? 0 : 17)}
                y={55 + row * 16}
                width="33"
                height="14"
                rx="1"
                fill={
                  (row + col) % 3 === 0
                    ? "#c4897a"
                    : (row + col) % 3 === 1
                    ? "#b87a6a"
                    : "#d49888"
                }
                stroke="#a06858"
                strokeWidth="0.5"
              />
            ))
          )}
        </motion.g>

        {/* Doorframe */}
        <motion.rect
          x="350" y="180" width="120" height="250" rx="0"
          stroke="#6a5a4a" strokeWidth="4" fill="none"
          variants={draw(0.6, 0.8)}
        />
        <motion.path
          d="M352 180 L410 160 L468 180"
          stroke="#6a5a4a" strokeWidth="3" fill="none"
          variants={draw(0.8, 0.5)}
        />

        {/* Stage 2: Electrical wiring - animated */}
        <motion.path
          d="M200 50 L200 100 Q200 110 210 110 L300 110"
          stroke="#C17817" strokeWidth="2.5" strokeDasharray="8 4"
          fill="none"
          variants={draw(1.3, 0.8)}
        />
        <motion.path
          d="M550 50 L550 90 Q550 100 560 100 L640 100"
          stroke="#C17817" strokeWidth="2.5" strokeDasharray="8 4"
          fill="none"
          variants={draw(1.5, 0.8)}
        />
        <motion.path
          d="M400 50 L400 80"
          stroke="#C17817" strokeWidth="2.5" strokeDasharray="8 4"
          fill="none"
          variants={draw(1.7, 0.4)}
        />
        {/* Outlets */}
        <motion.g variants={scaleIn(1.8)}>
          <rect x="292" y="102" width="20" height="16" rx="3" stroke="#C17817" strokeWidth="2" fill="#faf6f0" />
          <circle cx="299" cy="110" r="2" fill="#C17817" />
          <circle cx="305" cy="110" r="2" fill="#C17817" />
        </motion.g>
        <motion.g variants={scaleIn(2)}>
          <rect x="632" y="92" width="20" height="16" rx="3" stroke="#C17817" strokeWidth="2" fill="#faf6f0" />
          <circle cx="639" cy="100" r="2" fill="#C17817" />
          <circle cx="645" cy="100" r="2" fill="#C17817" />
        </motion.g>
        {/* Water pipe */}
        <motion.path
          d="M130 430 L130 300 Q130 290 140 290 L200 290 Q210 290 210 280 L210 250"
          stroke="#5a9ebe" strokeWidth="3" fill="none"
          variants={draw(2.2, 0.8)}
        />

        {/* Stage 3: Plaster - smooth walls covering brick */}
        <motion.rect
          x="82" y="52" width="265" height="336"
          fill="#f0ebe3"
          variants={fadeIn(2.8, 1)}
        />
        <motion.rect
          x="472" y="52" width="246" height="336"
          fill="#f0ebe3"
          variants={fadeIn(3, 1)}
        />

        {/* Stage 4: Paint - accent wall */}
        <motion.rect
          x="82" y="52" width="265" height="336"
          fill="#1a2744"
          variants={fadeIn(3.8, 1.2)}
        />
        {/* Subtle wall texture */}
        <motion.rect
          x="82" y="52" width="265" height="336"
          fill="url(#wallTexture)"
          variants={fadeIn(4, 0.5)}
        />
        {/* Right wall - clean cream */}
        <motion.rect
          x="472" y="52" width="246" height="336"
          fill="#faf6f0"
          variants={fadeIn(4, 1)}
        />

        {/* Door fill */}
        <motion.rect
          x="353" y="183" width="114" height="247"
          fill="#ddd5c8"
          variants={fadeIn(3.5)}
        />
        <motion.rect
          x="353" y="183" width="114" height="247"
          fill="url(#doorGrain)"
          variants={fadeIn(3.5)}
        />

        {/* Stage 5: Furniture & decor */}

        {/* Window on right wall */}
        <motion.g variants={slideUp(4.5)}>
          <rect x="520" y="90" width="140" height="160" rx="0" fill="#a8d4e8" />
          <rect x="520" y="90" width="140" height="160" rx="0" stroke="#8a8578" strokeWidth="3" fill="none" />
          <line x1="590" y1="90" x2="590" y2="250" stroke="#8a8578" strokeWidth="2" />
          <line x1="520" y1="170" x2="660" y2="170" stroke="#8a8578" strokeWidth="2" />
          {/* Sky gradient */}
          <rect x="522" y="92" width="66" height="76" fill="url(#skyGradient)" />
          <rect x="592" y="92" width="66" height="76" fill="url(#skyGradient)" />
          {/* Curtains */}
          <rect x="510" y="80" width="160" height="12" rx="2" fill="#e8ddd0" />
          <path d="M512 92 Q520 130 512 180 Q518 175 525 180 Q520 130 525 92 Z" fill="#e8ddd0" opacity="0.7" />
          <path d="M668 92 Q660 130 668 180 Q662 175 655 180 Q660 130 655 92 Z" fill="#e8ddd0" opacity="0.7" />
        </motion.g>

        {/* Pendant light */}
        <motion.g variants={slideUp(4.7)}>
          <line x1="400" y1="50" x2="400" y2="100" stroke="#1a2744" strokeWidth="1.5" />
          <ellipse cx="400" cy="105" rx="30" ry="12" fill="none" stroke="#c4956a" strokeWidth="2" />
          <ellipse cx="400" cy="108" rx="25" ry="8" fill="none" stroke="#c4956a" strokeWidth="1.5" />
          <circle cx="400" cy="103" r="4" fill="#C17817" />
        </motion.g>

        {/* Modern sofa */}
        <motion.g variants={slideUp(5)}>
          {/* Sofa base */}
          <rect x="110" y="310" width="200" height="55" rx="12" fill="#c4956a" />
          {/* Back */}
          <rect x="105" y="268" width="18" height="97" rx="8" fill="#b38458" />
          {/* Armrest right */}
          <rect x="297" y="268" width="18" height="97" rx="8" fill="#b38458" />
          {/* Seat cushions */}
          <rect x="125" y="300" width="80" height="30" rx="8" fill="#d4a87a" />
          <rect x="215" y="300" width="80" height="30" rx="8" fill="#d4a87a" />
          {/* Throw pillows */}
          <rect x="118" y="275" width="35" height="35" rx="6" fill="#1a2744" transform="rotate(-5 135 292)" />
          <rect x="268" y="275" width="35" height="35" rx="6" fill="#C17817" opacity="0.8" transform="rotate(5 285 292)" />
          {/* Legs */}
          <rect x="120" y="362" width="4" height="25" rx="1" fill="#6a5a4a" />
          <rect x="296" y="362" width="4" height="25" rx="1" fill="#6a5a4a" />
        </motion.g>

        {/* Coffee table */}
        <motion.g variants={slideUp(5.2)}>
          <rect x="170" y="378" width="80" height="8" rx="2" fill="#8a7560" />
          <rect x="175" y="386" width="3" height="20" rx="1" fill="#6a5a4a" />
          <rect x="242" y="386" width="3" height="20" rx="1" fill="#6a5a4a" />
          {/* Book on table */}
          <rect x="190" y="373" width="25" height="5" rx="1" fill="#1a2744" />
          <rect x="220" y="374" width="18" height="4" rx="1" fill="#C17817" />
        </motion.g>

        {/* Side table + plant */}
        <motion.g variants={slideUp(5.3)}>
          {/* Table */}
          <circle cx="530" cy="368" r="25" fill="#a08a72" />
          <circle cx="530" cy="365" r="25" fill="#b89e82" />
          {/* Leg */}
          <rect x="528" y="390" width="4" height="20" rx="1" fill="#6a5a4a" />
          {/* Plant pot */}
          <path d="M518 340 L522 365 L538 365 L542 340 Z" fill="#c4897a" />
          <rect x="516" y="336" width="28" height="6" rx="2" fill="#d49888" />
          {/* Plant leaves */}
          <ellipse cx="530" cy="318" rx="16" ry="22" fill="#3d6b52" />
          <ellipse cx="520" cy="312" rx="12" ry="18" fill="#4a7d60" />
          <ellipse cx="540" cy="314" rx="10" ry="16" fill="#2d5a42" />
          <ellipse cx="530" cy="305" rx="8" ry="12" fill="#5a8d6a" />
        </motion.g>

        {/* Gallery wall on accent wall */}
        <motion.g variants={slideUp(5.5)}>
          {/* Frame 1 - large */}
          <rect x="130" y="100" width="90" height="70" rx="1" stroke="#faf6f0" strokeWidth="2" fill="#faf6f0" opacity="0.15" />
          <rect x="136" y="106" width="78" height="58" rx="1" fill="#1a3a2e" />
          {/* Abstract art */}
          <circle cx="165" cy="130" r="15" fill="#C17817" opacity="0.6" />
          <circle cx="185" cy="140" r="10" fill="#c4897a" opacity="0.5" />

          {/* Frame 2 - small square */}
          <rect x="240" y="110" width="55" height="55" rx="1" stroke="#faf6f0" strokeWidth="2" fill="#faf6f0" opacity="0.15" />
          <rect x="246" y="116" width="43" height="43" rx="1" fill="#1a3a2e" />
          <path d="M250 155 L260 135 L270 145 L280 125 L285 155 Z" fill="#faf6f0" opacity="0.2" />

          {/* Frame 3 - horizontal */}
          <rect x="160" y="190" width="120" height="60" rx="1" stroke="#faf6f0" strokeWidth="2" fill="#faf6f0" opacity="0.15" />
          <rect x="166" y="196" width="108" height="48" rx="1" fill="#1a3a2e" />
        </motion.g>

        {/* Door handle */}
        <motion.circle cx="455" cy="310" r="6" fill="#c4956a" stroke="#a07850" strokeWidth="1" variants={scaleIn(5.6)} />

        {/* Rug under coffee table */}
        <motion.ellipse
          cx="210" cy="400" rx="110" ry="20"
          fill="#d4a87a" opacity="0.3"
          variants={fadeIn(5)}
        />
        <motion.ellipse
          cx="210" cy="400" rx="90" ry="15"
          fill="#C17817" opacity="0.15"
          variants={fadeIn(5.1)}
        />

        {/* Light glow from pendant */}
        <motion.circle
          cx="400" cy="110" r="120"
          fill="url(#lightGlow)"
          variants={fadeIn(5.8, 1.5)}
        />

        {/* Window light rays */}
        <motion.g variants={fadeIn(5.5, 1)}>
          <polygon points="520,170 400,300 400,390 520,250" fill="url(#lightRay)" />
        </motion.g>

        <defs>
          <radialGradient id="lightGlow">
            <stop offset="0%" stopColor="#C17817" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#C17817" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#C17817" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#b8e0f0" />
          </linearGradient>
          <linearGradient id="lightRay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff8e8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#fff8e8" stopOpacity="0" />
          </linearGradient>
          <pattern id="wallTexture" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="none" />
            <circle cx="2" cy="2" r="0.3" fill="#fff" opacity="0.03" />
          </pattern>
          <pattern id="doorGrain" width="8" height="120" patternUnits="userSpaceOnUse">
            <rect width="8" height="120" fill="none" />
            <line x1="2" y1="0" x2="2" y2="120" stroke="#b89e82" strokeWidth="0.5" opacity="0.3" />
            <line x1="5" y1="0" x2="5" y2="120" stroke="#b89e82" strokeWidth="0.3" opacity="0.2" />
          </pattern>
        </defs>
      </motion.svg>
    </div>
  );
}
