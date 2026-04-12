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
    title: "Elden Ring",
    genre: "RPG",
    rating: 5,
    playtime: "200+ hrs",
    review: "A masterpiece of open-world design. The Lands Between offers unparalleled freedom and challenge. FromSoftware at their absolute peak.",
    coverEmoji: "⚔️",
    platform: "PC",
  },
  {
    id: "2",
    title: "Final Fantasy XIV",
    genre: "MMORPG",
    rating: 5,
    playtime: "1000+ hrs",
    review: "The greatest MMORPG story ever told. Endwalker brought tears. The community is legendary and the content is endless.",
    coverEmoji: "🔮",
    platform: "PC",
  },
  {
    id: "3",
    title: "Hollow Knight",
    genre: "Metroidvania",
    rating: 5,
    playtime: "80 hrs",
    review: "Atmospheric perfection. The world design, music, and gameplay create an unforgettable experience in Hallownest.",
    coverEmoji: "🦋",
    platform: "PC",
  },
  {
    id: "4",
    title: "Valorant",
    genre: "FPS",
    rating: 4,
    playtime: "500+ hrs",
    review: "Tactical shooter with deep ability mechanics. The competitive grind is real but satisfying. Great agent design.",
    coverEmoji: "🎯",
    platform: "PC",
  },
  {
    id: "5",
    title: "Civilization VI",
    genre: "Strategy",
    rating: 4,
    playtime: "300+ hrs",
    review: "Just one more turn... The diplomacy and empire-building never gets old. A perfect strategy game for long sessions.",
    coverEmoji: "🏛️",
    platform: "PC",
  },
  {
    id: "6",
    title: "Stardew Valley",
    genre: "Simulation",
    rating: 5,
    playtime: "150 hrs",
    review: "The coziest game ever made. Perfect for unwinding after intense gaming sessions. The modding community is incredible.",
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
