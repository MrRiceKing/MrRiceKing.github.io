import { motion } from "framer-motion";
import { PageWrapper, StaggerContainer, staggerItemVariants } from "@/components/shared";
import { OrnamentalDividerSVG, AnimatedFrame, GlowOrb } from "@/components/Ornaments";
import { Github, MessageCircle, ExternalLink } from "lucide-react";
import avatarImg from "@/assets/avatar.png";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: MessageCircle, label: "Discord", href: "#" },
  { icon: ExternalLink, label: "Portfolio", href: "#" },
];

const Index = () => {
  return (
    <PageWrapper>
      {/* Decorative glow orbs */}
      <GlowOrb color="teal" size={400} className="-top-20 -right-20" />
      <GlowOrb color="purple" size={350} className="top-1/3 -left-32" />

      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-sm text-primary/70 uppercase font-body mb-4"
          >
            ─── Welcome, Traveler ───
          </motion.p>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground text-glow tracking-wider mb-4 relative">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Your Name
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground font-body max-w-xl mx-auto mb-2"
          >
            Creator • Gamer • Digital Artisan
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mt-6 mb-8"
          >
            <OrnamentalDividerSVG width={280} />
          </motion.div>
        </motion.div>

        {/* Social links */}
        <StaggerContainer className="flex gap-4" staggerDelay={0.12}>
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              variants={staggerItemVariants}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group ornamental-border rounded-full p-3 transition-all duration-300 hover:box-glow-hover hover:border-primary/40"
              title={link.label}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </StaggerContainer>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.2 }, y: { duration: 2, repeat: Infinity } }}
        >
          <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 bg-primary/60 rounded-full"
              animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <AnimatedFrame className="ornamental-border rounded-xl p-8 md:p-12 max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl text-foreground text-glow-purple mb-6">About Me</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              className="w-36 h-36 rounded-full flex items-center justify-center shrink-0 relative"
              whileHover={{ scale: 1.08 }}
            >
              {/* Rotating glow ring */}
              <motion.div
                className="absolute inset-[-6px] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "conic-gradient(from 0deg, hsla(174, 80%, 50%, 0.4), hsla(280, 80%, 60%, 0.3), hsla(174, 80%, 50%, 0.05), hsla(280, 80%, 60%, 0.3), hsla(174, 80%, 50%, 0.4))",
                }}
              />
              {/* Inner dark ring to create gap */}
              <div className="absolute inset-[-3px] rounded-full bg-background" />
              {/* Avatar image */}
              <div className="w-full h-full rounded-full ornamental-border overflow-hidden relative z-10">
                <img src={avatarImg} alt="Avatar" className="w-full h-full object-contain p-2" />
              </div>
              {/* Soft ambient glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: "0 0 30px hsla(174, 80%, 50%, 0.2), 0 0 60px hsla(280, 80%, 60%, 0.1)",
                }}
              />
            </motion.div>
            <div className="font-body text-muted-foreground leading-relaxed space-y-3">
              <p>
                Welcome to my corner of the digital realm. I'm a passionate creator who weaves
                between worlds — from crafting digital art to exploring vast gaming universes,
                from building software projects to discovering tools that make the impossible possible.
              </p>
              <p>
                This portfolio is a living chronicle of my journey. Feel free to explore each
                chamber of this sanctuary.
              </p>
            </div>
          </div>
        </AnimatedFrame>
      </motion.section>

      {/* Quick navigation cards */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-20 mb-16"
      >
        <div className="flex justify-center mb-8">
          <OrnamentalDividerSVG width={250} />
        </div>
        <h2 className="font-heading text-xl text-center text-muted-foreground mb-8 tracking-wider">
          Explore
        </h2>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { title: "Gaming", desc: "Reviews & adventures", emoji: "🎮", href: "#/gaming" },
            { title: "Gallery", desc: "Art & creations", emoji: "🎨", href: "#/gallery" },
            { title: "Projects", desc: "Current works", emoji: "⚔️", href: "#/projects" },
            { title: "Resources", desc: "Tools & treasures", emoji: "📜", href: "#/resources" },
            { title: "Contact", desc: "Reach out", emoji: "✉️", href: "#/contact" },
          ].map((card) => (
            <motion.a
              key={card.title}
              href={card.href}
              variants={staggerItemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="ornamental-border rounded-lg p-5 text-center transition-all duration-300 hover:box-glow-hover hover:border-primary/30 group block relative overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 50%, hsla(174, 80%, 50%, 0.06) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <motion.div
                  className="text-3xl mb-2"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {card.emoji}
                </motion.div>
                <h3 className="font-heading text-sm tracking-wider text-foreground group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-body">{card.desc}</p>
              </div>
            </motion.a>
          ))}
        </StaggerContainer>
      </motion.section>
    </PageWrapper>
  );
};

export default Index;
