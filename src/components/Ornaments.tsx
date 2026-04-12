import { motion } from "framer-motion";

/** Ornamental corner flourish — mirrors based on position */
export function CornerOrnament({
  position,
  className = "",
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const transforms: Record<string, string> = {
    "top-left": "",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1)",
  };
  const positions: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className={`absolute ${positions[position]} pointer-events-none ${className}`}
      style={{ transform: transforms[position] }}
    >
      <path
        d="M2 58V30C2 14.536 14.536 2 30 2H58"
        stroke="url(#cornerGrad)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M6 58V34C6 18.536 18.536 6 34 6H58"
        stroke="url(#cornerGrad)"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.2"
      />
      <circle cx="2" cy="58" r="2" fill="url(#cornerDot)" opacity="0.6" />
      <circle cx="58" cy="2" r="2" fill="url(#cornerDot)" opacity="0.6" />
      <defs>
        <linearGradient id="cornerGrad" x1="2" y1="58" x2="58" y2="2">
          <stop stopColor="hsl(174, 80%, 50%)" />
          <stop offset="1" stopColor="hsl(280, 80%, 60%)" />
        </linearGradient>
        <radialGradient id="cornerDot">
          <stop stopColor="hsl(174, 80%, 60%)" />
          <stop offset="1" stopColor="hsl(174, 80%, 40%)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/** Ornamental horizontal divider with diamond center */
export function OrnamentalDividerSVG({ className = "", width = 300 }: { className?: string; width?: number }) {
  return (
    <svg
      width={width}
      height="20"
      viewBox={`0 0 ${width} 20`}
      fill="none"
      className={`${className}`}
    >
      {/* Left line */}
      <line
        x1="0"
        y1="10"
        x2={width / 2 - 15}
        y2="10"
        stroke="url(#divGradL)"
        strokeWidth="1"
      />
      {/* Right line */}
      <line
        x1={width / 2 + 15}
        y1="10"
        x2={width}
        y2="10"
        stroke="url(#divGradR)"
        strokeWidth="1"
      />
      {/* Center diamond */}
      <path
        d={`M${width / 2} 3L${width / 2 + 7} 10L${width / 2} 17L${width / 2 - 7} 10Z`}
        stroke="hsl(174, 80%, 50%)"
        strokeWidth="1"
        fill="hsl(174, 80%, 50%, 0.15)"
      />
      {/* Inner diamond */}
      <path
        d={`M${width / 2} 6L${width / 2 + 4} 10L${width / 2} 14L${width / 2 - 4} 10Z`}
        fill="hsl(174, 80%, 50%, 0.3)"
      />
      {/* Small dots */}
      <circle cx={width / 2 - 25} cy="10" r="1.5" fill="hsl(280, 80%, 60%, 0.4)" />
      <circle cx={width / 2 + 25} cy="10" r="1.5" fill="hsl(280, 80%, 60%, 0.4)" />
      <defs>
        <linearGradient id="divGradL" x1="0" y1="10" x2={width / 2 - 15} y2="10">
          <stop stopColor="transparent" />
          <stop offset="1" stopColor="hsl(174, 60%, 40%, 0.5)" />
        </linearGradient>
        <linearGradient id="divGradR" x1={width / 2 + 15} y1="10" x2={width} y2="10">
          <stop stopColor="hsl(280, 60%, 50%, 0.5)" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Animated glowing orb decoration */
export function GlowOrb({
  color = "teal",
  size = 200,
  className = "",
}: {
  color?: "teal" | "purple" | "gold";
  size?: number;
  className?: string;
}) {
  const colors = {
    teal: "174, 80%, 50%",
    purple: "280, 80%, 60%",
    gold: "45, 80%, 60%",
  };

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, hsla(${colors[color]}, 0.08) 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/** Animated frame border for cards/sections */
export function AnimatedFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />
      {children}
    </div>
  );
}

/** Floating rune symbols */
export function FloatingRunes({ count = 6 }: { count?: number }) {
  const runes = ["✧", "◈", "✦", "⬥", "◇", "✶", "⟡", "⬡"];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="absolute text-primary/10 font-heading select-none"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            fontSize: `${Math.random() * 20 + 12}px`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          {runes[i % runes.length]}
        </motion.span>
      ))}
    </div>
  );
}
