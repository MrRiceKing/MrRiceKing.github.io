import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, SectionTitle, OrnamentalCard, Badge } from "@/components/shared";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  status: "Active" | "Paused" | "Complete";
  tags: string[];
  link?: string;
  github?: string;
  emoji: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Fantasy Portfolio",
    description: "This very website — a legendary portfolio with fantasy realism aesthetics.",
    longDescription: "Built with React, TypeScript, Tailwind CSS, and Framer Motion. Features a mystical design system with ethereal colors, ornamental borders, and smooth animations. Hosted on GitHub Pages for maximum compatibility. While this site is initially generated with AI, it has used as a foundation for me to learn and implement my own custom designs, animations, and features.",
    status: "Active",
    tags: ["React", "TypeScript", "Tailwind"],
    emoji: "🏰",
    github: "https://mrriceking.github.io",
  },
  {
    id: "2",
    title: "TheRiceKingdom - Discord Server",
    description: "A vibrant community server for Citizens of TheRiceKingdom.",
    longDescription: "TheRiceKingdom has long been a hub for gamers and creators to connect, share experiences, and build lasting friendships. It's a place that lives within the hearts of it's Citizens and a sanctuary for those who seek to build meaningful connections, as well as a space for creative expression and collaboration.",
    status: "Active",
    tags: ["Discord", "Community", "Collaboration", "Gaming", "Art"],
    emoji: "👥",
    link: "https://discord.gg/59fvxyjfKD",
  },
  {
    id: "3",
    title: "Discord Bot - Argus",
    description: "A utility bot for managing and enhancing the Discord experience.",
    longDescription: "Argus is a multi-functional bot designed to streamline server management, provide entertainment, and enhance user engagement. It features moderation tools, custom commands, and interactive features that make it an invaluable asset for any Discord community.",
    status: "Paused",
    tags: ["Discord.js", "Node.js"],
    emoji: "🤖",
  },
  {
    id: "4",
    title: "Discord Bot — Zephyrus",
    description: "A custom-built bot for bridging the gap between in-game communication and Discord.",
    longDescription: "Zephyrus is a specialized bot that integrates with various games to provide real-time updates, notifications, and in-game event tracking directly within Discord. It aims to enhance the gaming experience by keeping players informed and connected.",
    status: "Paused",
    tags: ["Discord.js", "Node.js", "MongoDB"],
    emoji: "🤖",
  },
  {
    id: "5",
    title: "Project DCR",
    description: "A dungeon crawler, roguelike game.",
    longDescription: "A dungeon crawler game with rogue-like mechanics. A learning project to better understand game development principles.",
    status: "Paused",
    tags: ["C#", "Game Development", "Blender", "s&box Editor", "Game Design"],
    emoji: "🎮",
  },
];

const statusColors: Record<string, "primary" | "gold" | "accent"> = {
  Active: "primary",
  Paused: "gold",
  Complete: "accent",
};

const Projects = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <PageWrapper>
      <SectionTitle>⚔️ Projects</SectionTitle>
      <p className="text-muted-foreground font-body mb-8 max-w-2xl">
        Current and past projects — each one a quest in its own right.
        Click any project to reveal the full chronicle.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            layout
          >
            <OrnamentalCard>
              <div
                className="cursor-pointer"
                onClick={() => setExpanded(expanded === project.id ? null : project.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{project.emoji}</span>
                  <Badge variant={statusColors[project.status]}>{project.status}</Badge>
                </div>
                <h3 className="font-heading text-lg text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground font-body mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: expanded === project.id ? "auto" : 0,
                    opacity: expanded === project.id ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="ornamental-divider my-3" />
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
                    {project.longDescription}
                  </p>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-body"
                      >
                        <Github className="h-3.5 w-3.5" /> Source
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-body"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </OrnamentalCard>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Projects;
