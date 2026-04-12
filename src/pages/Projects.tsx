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
    longDescription: "Built with React, TypeScript, Tailwind CSS, and Framer Motion. Features a mystical design system with ethereal colors, ornamental borders, and smooth animations. Hosted on GitHub Pages for maximum compatibility.",
    status: "Active",
    tags: ["React", "TypeScript", "Tailwind"],
    emoji: "🏰",
    github: "#",
  },
  {
    id: "2",
    title: "Game Review Engine",
    description: "A personal game review and tracking system with rating algorithms.",
    longDescription: "Tracks playtime, genres, ratings, and generates personalized game recommendations based on review history. Features a custom scoring system and export functionality.",
    status: "Active",
    tags: ["Python", "SQLite", "API"],
    emoji: "🎮",
    github: "#",
  },
  {
    id: "3",
    title: "Digital Art Pipeline",
    description: "Automated workflow for processing and organizing digital art assets.",
    longDescription: "Batch processing tool that handles image optimization, metadata tagging, watermarking, and gallery generation. Streamlines the art-to-web pipeline significantly.",
    status: "Paused",
    tags: ["Node.js", "Sharp", "CLI"],
    emoji: "🎨",
  },
  {
    id: "4",
    title: "Discord Bot — Arcane",
    description: "A multi-purpose Discord bot with moderation, music, and RPG features.",
    longDescription: "Custom-built bot featuring role management, music streaming, a text-based RPG system, and community engagement tools. Serves multiple communities.",
    status: "Active",
    tags: ["Discord.js", "Node.js", "MongoDB"],
    emoji: "🤖",
    github: "#",
    link: "#",
  },
  {
    id: "5",
    title: "Resource Curator",
    description: "A curated database of development tools and creative resources.",
    longDescription: "Web scraper and curator that aggregates and categorizes useful tools, libraries, and resources. Features community voting and personal recommendation scores.",
    status: "Complete",
    tags: ["Python", "Web Scraping", "React"],
    emoji: "📚",
    github: "#",
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
