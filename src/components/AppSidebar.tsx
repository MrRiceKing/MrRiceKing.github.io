import { motion } from "framer-motion";
import {
  Home,
  Gamepad2,
  Palette,
  FolderKanban,
  Wrench,
  Mail,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { OrnamentalDividerSVG } from "./Ornaments";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Gaming", url: "/gaming", icon: Gamepad2 },
  { title: "Gallery", url: "/gallery", icon: Palette },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Resources", url: "/resources", icon: Wrench },
  { title: "Contact", url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-heading text-lg text-primary text-glow tracking-wider text-center"
            >
              ✦ Portfolio ✦
            </motion.div>
            <OrnamentalDividerSVG width={120} />
          </div>
        )}
        {collapsed && (
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-primary text-glow text-center text-lg"
          >
            ✦
          </motion.div>
        )}
      </SidebarHeader>

      <SidebarContent className="mt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, i) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={collapsed ? item.title : undefined}
                    >
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-300 ${
                          active
                            ? "text-primary box-glow bg-secondary/50"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                        }`}
                        activeClassName="text-primary box-glow bg-secondary/50"
                      >
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 8 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <item.icon
                            className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                              active
                                ? "text-primary drop-shadow-[0_0_6px_hsl(174,80%,50%,0.6)]"
                                : "group-hover:text-primary/70"
                            }`}
                          />
                        </motion.div>
                        {!collapsed && (
                          <span className="font-heading text-xs tracking-widest uppercase">
                            {item.title}
                          </span>
                        )}
                        {active && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r"
                            style={{
                              boxShadow: "0 0 8px hsl(174, 80%, 50%, 0.6), 0 0 16px hsl(174, 80%, 50%, 0.3)",
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="flex flex-col items-center gap-2">
            <OrnamentalDividerSVG width={120} />
            <p className="text-[10px] text-muted-foreground/40 font-body tracking-wider">
              crafted with ✧
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
