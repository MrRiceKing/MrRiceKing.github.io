import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, SectionTitle } from "@/components/shared";
import { Lightbox, useLightbox } from "@/components/Lightbox";
import { Image, Video, Music, LayoutGrid } from "lucide-react";

interface GalleryItem {
  type: "image" | "video" | "audio";
  src: string;
  thumbnail?: string;
  title: string;
  description?: string;
}

const galleryItems: GalleryItem[] = [
  { type: "image", src: "https://picsum.photos/seed/art1/800/600", title: "Ethereal Landscape", description: "Digital painting exploring mystical terrain" },
  { type: "image", src: "https://picsum.photos/seed/art2/600/800", title: "Crystal Guardian", description: "Character concept art" },
  { type: "image", src: "https://picsum.photos/seed/art3/800/500", title: "Ancient Ruins", description: "Environment concept piece" },
  { type: "image", src: "https://picsum.photos/seed/art4/700/700", title: "Moonlit Grove", description: "Atmospheric study" },
  { type: "image", src: "https://picsum.photos/seed/art5/900/600", title: "Dragon's Perch", description: "Fantasy illustration" },
  { type: "image", src: "https://picsum.photos/seed/art6/600/900", title: "The Wanderer", description: "Character portrait" },
  { type: "video", src: "", thumbnail: "https://picsum.photos/seed/vid1/800/450", title: "Animation Reel 2024", description: "Compilation of animation work" },
  { type: "audio", src: "", title: "Ambient Soundscape - Forest", description: "Original ambient composition" },
  { type: "image", src: "https://picsum.photos/seed/art7/800/600", title: "Starfall Valley", description: "Landscape illustration" },
];

const categories = [
  { label: "All", value: "all", icon: LayoutGrid },
  { label: "Art", value: "image", icon: Image },
  { label: "Video", value: "video", icon: Video },
  { label: "Audio", value: "audio", icon: Music },
];

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const lightbox = useLightbox();

  const filtered = filter === "all" ? galleryItems : galleryItems.filter((item) => item.type === filter);

  // Masonry column assignment
  const getSpanClass = (index: number) => {
    const pattern = [
      "col-span-1 row-span-1",
      "col-span-1 row-span-2",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
    ];
    return pattern[index % pattern.length];
  };

  return (
    <PageWrapper>
      <SectionTitle>🎨 Gallery</SectionTitle>
      <p className="text-muted-foreground font-body mb-8 max-w-2xl">
        A collection of my creative works — art, videos, and audio compositions.
        Click any piece to view it in detail.
      </p>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body transition-all duration-300 ${
              filter === cat.value
                ? "bg-primary/20 text-primary border border-primary/30 box-glow"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <cat.icon className="h-3.5 w-3.5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={`${item.title}-${i}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className={`${getSpanClass(i)} group cursor-pointer relative overflow-hidden rounded-lg ornamental-border transition-all duration-300 hover:box-glow-hover hover:border-primary/30`}
            onClick={() => lightbox.open(i)}
          >
            {item.type === "image" && (
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            )}
            {item.type === "video" && (
              <div className="w-full h-full relative">
                <img
                  src={item.thumbnail || ""}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/60 rounded-full p-3 backdrop-blur-sm">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            )}
            {item.type === "audio" && (
              <div className="w-full h-full flex flex-col items-center justify-center fantasy-gradient p-4">
                <Music className="h-10 w-10 text-primary mb-2 animate-pulse-glow" />
                <span className="font-heading text-xs text-foreground text-center">{item.title}</span>
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <div>
                <h3 className="font-heading text-sm text-foreground">{item.title}</h3>
                {item.description && (
                  <p className="text-[10px] text-muted-foreground font-body">{item.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Lightbox
        items={filtered}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.close}
        onNavigate={lightbox.navigate}
      />
    </PageWrapper>
  );
};

export default Gallery;
