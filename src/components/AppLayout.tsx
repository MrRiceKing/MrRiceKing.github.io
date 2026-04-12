import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ParticleField } from "./ParticleField";
import { FloatingRunes } from "./Ornaments";
import { AnimatedRoutes } from "./AnimatedRoutes";
import { Menu } from "lucide-react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex w-full relative">
      {/* Global ambient effects */}
      <ParticleField />
      <FloatingRunes count={8} />

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, hsla(174, 80%, 50%, 0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, hsla(280, 80%, 60%, 0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, hsla(45, 80%, 60%, 0.02) 0%, transparent 70%)",
            filter: "blur(80px)",
            animationDelay: "5s",
          }}
        />
      </div>

      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        <header className="h-14 flex items-center border-b border-border/50 backdrop-blur-md bg-background/40 sticky top-0 z-40">
          <SidebarTrigger className="ml-3 text-muted-foreground hover:text-primary transition-colors">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          <div className="ml-4 flex-1 mr-6 flex items-center justify-center">
            <svg width="200" height="2" className="w-full max-w-md">
              <defs>
                <linearGradient id="headerLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="30%" stopColor="hsl(174, 60%, 40%)" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="hsl(280, 60%, 50%)" stopOpacity="0.3" />
                  <stop offset="70%" stopColor="hsl(174, 60%, 40%)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <line x1="0" y1="1" x2="100%" y2="1" stroke="url(#headerLine)" strokeWidth="1" />
            </svg>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <AnimatedRoutes>{children}</AnimatedRoutes>
        </main>
      </div>
    </div>
  );
}
