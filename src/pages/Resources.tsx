import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, SectionTitle, OrnamentalCard, Badge } from "@/components/shared";
import { ExternalLink, Filter } from "lucide-react";

interface Resource {
  name: string;
  description: string;
  category: string;
  url: string;
  emoji: string;
}

const resources: Resource[] = [
  { name: "VS Code", description: "The ultimate code editor with endless extensions.", category: "Development", url: "#", emoji: "💻" },
  { name: "Figma", description: "Collaborative design tool for UI/UX and prototyping.", category: "Art", url: "#", emoji: "🎨" },
  { name: "Obsidian", description: "Knowledge management with linked notes and graphs.", category: "Productivity", url: "#", emoji: "📝" },
  { name: "OBS Studio", description: "Open-source streaming and recording software.", category: "Gaming", url: "#", emoji: "🎥" },
  { name: "Blender", description: "Free 3D creation suite for modeling, animation, and rendering.", category: "Art", url: "#", emoji: "🧊" },
  { name: "Docker", description: "Containerization platform for consistent dev environments.", category: "Development", url: "#", emoji: "🐳" },
  { name: "Notion", description: "All-in-one workspace for notes, tasks, and wikis.", category: "Productivity", url: "#", emoji: "📋" },
  { name: "Discord", description: "Community platform for voice, video, and text communication.", category: "Gaming", url: "#", emoji: "💬" },
  { name: "GitHub", description: "Version control and collaboration for code projects.", category: "Development", url: "#", emoji: "🐙" },
  { name: "Krita", description: "Free digital painting software with powerful brush engines.", category: "Art", url: "#", emoji: "🖌️" },
  { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development.", category: "Development", url: "#", emoji: "🌊" },
  { name: "Steam", description: "The largest digital distribution platform for PC gaming.", category: "Gaming", url: "#", emoji: "🎮" },
];

const categoryList = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = selectedCategory === "All" ? resources : resources.filter((r) => r.category === selectedCategory);

  return (
    <PageWrapper>
      <SectionTitle>📜 Resources</SectionTitle>
      <p className="text-muted-foreground font-body mb-8 max-w-2xl">
        Tools, software, and treasures I've discovered on my journey —
        worthy enough to share with fellow travelers.
      </p>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-body transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-primary/20 text-primary border border-primary/30 box-glow"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((resource, i) => (
          <motion.div
            key={resource.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
              <OrnamentalCard>
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{resource.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading text-sm text-foreground truncate">{resource.name}</h3>
                      <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground font-body line-clamp-2">{resource.description}</p>
                    <Badge variant="accent" >{resource.category}</Badge>
                  </div>
                </div>
              </OrnamentalCard>
            </a>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Resources;
