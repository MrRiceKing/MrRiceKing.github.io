import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, SectionTitle, OrnamentalCard, StarRating, Badge } from "@/components/shared";
import { Filter } from "lucide-react";

interface Game {
  id: string;
  title: string;
  genre: string;
  rating: number;
  playtime: string;
  review: string;
  coverEmoji: string;
  platform: string;
}

const games: Game[] = [
  {
    id: "1",
    title: "Warframe",
    genre: "Action Shooter",
    rating: 5,
    playtime: "2000+ hrs",
    review: "This game is a living, breathing universe of sci-fi action. Among the greatest free-to-play experiences, with in-depth story telling and various gameplay styles. I recommend putting at least 100 hours into it to truly understand the depth of the game and what it has to offer. The grind may be long, but the payoff is beyond worth it. This game has an extrodinary community built on paying it forward, helping new and old players alike, as well as finding ways to make the game more enjoyable for all types of players. The developers are also very active and listen to the community, which is a rare thing in the gaming industry.",
    coverEmoji: "🥷",
    platform: "PC",
  },  
  {
    id: "2",
    title: "Elden Ring",
    genre: "RPG",
    rating: 5,
    playtime: "200+ hrs",
    review: "A masterpiece of open-world design. The Lands Between offers unparalleled freedom and challenge. FromSoftware at their absolute peak.",
    coverEmoji: "⚔️",
    platform: "PC",
  },
  {
    id: "3",
    title: "Garry's Mod",
    genre: "Sandbox",
    rating: 5,
    playtime: "4000+ hrs",
    review: "At it's core this game is a playground for creativity and experimentation. Beyond that, the community has created countless mods, game modes, and experiences that keep the game fresh and exciting. It's a testament to the power of user-generated content and an absolute relic of gaming history.",
    coverEmoji: "🎁",
    platform: "PC",
  },
  {
    id: "4",
    title: "#",
    genre: "#",
    rating: 0,
    playtime: "#",
    review: "#",
    coverEmoji: "🎯",
    platform: "PC",
  },
  {
    id: "5",
    title: "#",
    genre: "#",
    rating: 4,
    playtime: "#",
    review: "#",
    coverEmoji: "🏛️",
    platform: "PC",
  },
  {
    id: "6",
    title: "#",
    genre: "#",
    rating: 5,
    playtime: "#",
    review: "#",
    coverEmoji: "🌾",
    platform: "PC",
  },
];

const genres = ["All", ...Array.from(new Set(games.map((g) => g.genre)))];

const Gaming = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [expandedGame, setExpandedGame] = useState<string | null>(null);

  const filteredGames = selectedGenre === "All" ? games : games.filter((g) => g.genre === selectedGenre);

  return (
    <PageWrapper>
      <SectionTitle>🎮 Gamer Profile</SectionTitle>
      <p className="text-muted-foreground font-body mb-8 max-w-2xl">
        A curated collection of games I've journeyed through, with personal reviews and ratings.
        These are the worlds that have shaped my gaming identity.
      </p>

      {/* Genre filter */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3 py-1.5 rounded-full text-xs font-body transition-all duration-300 ${
              selectedGenre === genre
                ? "bg-primary/20 text-primary border border-primary/30 box-glow"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGames.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            layout
          >
            <OrnamentalCard>
              <div
                className="cursor-pointer"
                onClick={() => setExpandedGame(expandedGame === game.id ? null : game.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{game.coverEmoji}</div>
                  <Badge variant="primary">{game.platform}</Badge>
                </div>
                <h3 className="font-heading text-lg text-foreground mb-1">{game.title}</h3>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="accent">{game.genre}</Badge>
                  <span className="text-xs text-muted-foreground font-body">{game.playtime}</span>
                </div>
                <StarRating rating={game.rating} />
                <motion.div
                  initial={false}
                  animate={{ height: expandedGame === game.id ? "auto" : 0, opacity: expandedGame === game.id ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="ornamental-divider my-3" />
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {game.review}
                  </p>
                </motion.div>
                <p className="text-[10px] text-muted-foreground/50 mt-2 font-body">
                  {expandedGame === game.id ? "Click to collapse" : "Click to read review"}
                </p>
              </div>
            </OrnamentalCard>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Gaming;
