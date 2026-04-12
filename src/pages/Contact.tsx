import { motion } from "framer-motion";
import { PageWrapper, SectionTitle, OrnamentalCard } from "@/components/shared";
import { Github, gamepad, camera, MessageCircle, DollarSign, Mail, ExternalLink, palette } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", url: "https://github.com/MrRiceKing", color: "hover:text-foreground" },
  { icon: gamepad, label: "Steam", url: "https://steamcommunity.com/id/MrRiceKing", color: "hover:text-primary" },
  { icon: camera, label: "Snapchat", url: "https://www.snapchat.com/@mrriceking-aj", color: "hover:text-destructive" },
  { icon: palette, label: "Artstation", url: "https://www.artstation.com/riceking", color: "hover:text-accent" },
  { icon: Mail, label: "Email", url: "mailto:riceking911@gmail.com", color: "hover:text-primary" },
];

const Contact = () => {
  return (
    <PageWrapper>
      <SectionTitle>✉️ Contact</SectionTitle>
      <p className="text-muted-foreground font-body mb-10 max-w-2xl">
        Want to connect, collaborate, or just say hello? Here are all the ways
        to reach me across the digital realm.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-heading text-lg text-foreground mb-4 text-glow">Social Links</h3>
          <div className="ornamental-divider w-32 mb-6" />
          <div className="space-y-3">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className={`flex items-center gap-4 ornamental-border rounded-lg px-5 py-3.5 transition-all duration-300 hover:box-glow-hover hover:border-primary/30 group ${link.color}`}
              >
                <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-heading text-sm tracking-wider text-foreground">{link.label}</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/50 ml-auto" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Discord + PayPal */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Discord */}
          <OrnamentalCard hover={false} className="text-center">
            <MessageCircle className="h-10 w-10 text-primary mx-auto mb-3 animate-pulse-glow" />
            <h3 className="font-heading text-lg text-foreground text-glow mb-2">Join My Discord</h3>
            <p className="text-sm text-muted-foreground font-body mb-4">
              Join our community of gamers, artists, and creators. Share your work,
              discuss games, and connect with like-minded adventurers.
            </p>
            <a
              href="https://www.discord.gg/59fvxyjfKD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 rounded-lg px-6 py-2.5 font-heading text-sm tracking-wider transition-all duration-300 hover:bg-primary/30 hover:box-glow-hover"
            >
              <MessageCircle className="h-4 w-4" />
              Join Server
            </a>
          </OrnamentalCard>

          {/* PayPal */}
          <OrnamentalCard hover={false} className="text-center">
            <DollarSign className="h-10 w-10 text-gold mx-auto mb-3 animate-pulse-glow" />
            <h3 className="font-heading text-lg text-foreground text-glow-gold mb-2">Support My Work</h3>
            <p className="text-sm text-muted-foreground font-body mb-4">
              If you enjoy my creations and want to support my journey,
              any contribution is deeply appreciated.
            </p>
            <a
              href="https://www.paypal.me/TheRiceKingdom"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 rounded-lg px-6 py-2.5 font-heading text-sm tracking-wider transition-all duration-300 hover:bg-gold/30 hover:shadow-[0_0_20px_hsl(45,80%,60%,0.2)]"
            >
              <DollarSign className="h-4 w-4" />
              PayPal
            </a>
          </OrnamentalCard>

          {/* Contact Form placeholder */}
          <OrnamentalCard hover={false}>
            <h3 className="font-heading text-sm text-foreground mb-3 text-glow-purple">Send a Message</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:box-glow transition-all"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:box-glow transition-all"
              />
              <textarea
                placeholder="Your message..."
                rows={3}
                className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:box-glow transition-all resize-none"
              />
              <button className="w-full bg-primary/20 text-primary border border-primary/30 rounded-lg px-4 py-2.5 font-heading text-xs tracking-widest uppercase transition-all duration-300 hover:bg-primary/30 hover:box-glow-hover">
                Send Message
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground/40 mt-2 font-body text-center">
              * Contact form is decorative — connect a backend to enable
            </p>
          </OrnamentalCard>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Contact;
