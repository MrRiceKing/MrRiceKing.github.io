import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxItem {
  type: "image" | "video" | "audio";
  src: string;
  title: string;
  description?: string;
  thumbnail?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  const item = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-5xl max-h-[90vh] w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-secondary/80 hover:bg-secondary rounded-full p-2 text-foreground transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-secondary/80 hover:bg-secondary rounded-full p-2 text-foreground transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="flex flex-col items-center">
            {item.type === "image" && (
              <img
                src={item.src}
                alt={item.title}
                className="max-h-[70vh] max-w-full object-contain rounded-lg"
              />
            )}
            {item.type === "video" && (
              <video
                src={item.src}
                controls
                className="max-h-[70vh] max-w-full rounded-lg"
              />
            )}
            {item.type === "audio" && (
              <div className="ornamental-border rounded-lg p-8 w-full max-w-md">
                <div className="text-6xl text-center mb-4">🎵</div>
                <audio src={item.src} controls className="w-full" />
              </div>
            )}
            <div className="mt-4 text-center">
              <h3 className="font-heading text-lg text-foreground">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              )}
              <p className="text-xs text-muted-foreground/50 mt-2">
                {currentIndex + 1} / {items.length}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, currentIndex, open, close, navigate: setCurrentIndex };
}
