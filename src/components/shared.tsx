import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <div className={`p-6 md:p-10 max-w-6xl mx-auto relative ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-8 ${className}`}
    >
      <h2 className="font-heading text-2xl md:text-3xl text-foreground text-glow-purple tracking-wide">
        {children}
      </h2>
      <svg width="200" height="12" viewBox="0 0 200 12" className="mt-3">
        <defs>
          <linearGradient id="secDiv" x1="0" y1="6" x2="200" y2="6">
            <stop stopColor="hsl(174, 80%, 50%)" stopOpacity="0.6" />
            <stop offset="0.5" stopColor="hsl(280, 60%, 50%)" stopOpacity="0.4" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="0" y1="6" x2="180" y2="6" stroke="url(#secDiv)" strokeWidth="1" />
        <circle cx="0" cy="6" r="2" fill="hsl(174, 80%, 50%)" opacity="0.6" />
        <circle cx="190" cy="6" r="1.5" fill="hsl(280, 80%, 60%)" opacity="0.3" />
      </svg>
    </motion.div>
  );
}

export function OrnamentalCard({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.015, y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative ornamental-border rounded-lg p-5 transition-all duration-300 overflow-hidden ${
        hover ? "hover:box-glow-hover hover:border-primary/30 cursor-pointer" : ""
      } ${className}`}
    >
      {/* Shimmer overlay on hover */}
      {hover && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000"
            style={{
              background: "linear-gradient(90deg, transparent, hsla(174, 80%, 50%, 0.03), transparent)",
            }}
          />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 500 }}
          className={`text-sm ${
            i < rating ? "text-gold text-glow-gold" : "text-muted-foreground/30"
          }`}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "primary" | "accent" | "gold";
}) {
  const variants = {
    default: "bg-secondary text-secondary-foreground",
    primary: "bg-primary/20 text-primary border border-primary/30",
    accent: "bg-accent/20 text-accent-foreground border border-accent/30",
    gold: "bg-gold/20 text-gold border border-gold/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-medium transition-colors duration-200 ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

/** Staggered list animation wrapper */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.06,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
