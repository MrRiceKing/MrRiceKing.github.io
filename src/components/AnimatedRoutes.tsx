import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  in: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  out: {
    opacity: 0,
    y: -15,
    filter: "blur(4px)",
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.35,
};

export function AnimatedRoutes({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
