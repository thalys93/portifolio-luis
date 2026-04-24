import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,  
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Home, FolderGit2, LogOut, Tag, Globe, Brain, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FirebaseAuth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { InteractiveMenu, type InteractiveMenuItem } from "@/components/ui/modern-mobile-menu";
import { useTheme } from "@/shared/context/ThemeContext";

function SidebarModeSection() {
  const { colorMode } = useTheme();
  const isLightMode = colorMode === "light";

  return (
    <div
      className={`flex items-center justify-between rounded-md border px-2 py-2 ${
        isLightMode
          ? "border-amber-300/60 bg-amber-100/50"
          : "border-indigo-400/40 bg-indigo-500/10"
      }`}
    >
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium ${
          isLightMode ? "text-amber-800" : "text-indigo-200"
        }`}
      >
        {isLightMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        {isLightMode ? "Modo claro ativo" : "Modo escuro ativo"}
      </span>
      <ThemeToggle />
    </div>
  );
}

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { colorMode, toggleColorMode } = useTheme();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut(FirebaseAuth);
  };

  const mobileMenuItems = React.useMemo<InteractiveMenuItem[]>(
    () => [
      { id: "/home", to: "/home", label: "Home", icon: Home },
      { id: "/projects", to: "/projects", label: "Projetos", icon: FolderGit2 },
      { id: "/categories", to: "/categories", label: "Categorias", icon: Tag },
      { id: "/skills", to: "/skills", label: "Skills", icon: Brain },
      // { id: "__mode__", label: colorMode === "light" ? "Escuro" : "Claro", icon: colorMode === "light" ? Moon : Sun },
    ],
    [colorMode]
  );

  const activeMobileItemId = React.useMemo(() => {
    const knownPaths = ["/home", "/projects", "/categories", "/skills"];
    return knownPaths.find((path) => location.pathname.startsWith(path)) ?? "/home";
  }, [location.pathname]);

  const handleMobileItemClick = React.useCallback(
    (item: InteractiveMenuItem) => {
      if (item.id === "__mode__") {
        toggleColorMode();
      }
    },
    [toggleColorMode]
  );

  if (isMobile) {
    return (
      <main className="min-h-screen bg-background pb-24 text-foreground">
        <header className="flex h-12 border-b border-border/80 bg-card/30 px-4 backdrop-blur-sm justify-between items-center">      
          <div className="font-display text-sm font-semibold tracking-wide text-foreground">Thalys Dev - Admin</div>                 
          <ThemeToggle/>
        </header>
        <section className="p-4">{children}</section>
        <InteractiveMenu
          items={mobileMenuItems}
          activeId={activeMobileItemId}
          onItemClick={handleMobileItemClick}
        />
      </main>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-sidebar-border">
        <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
          <div className="select-none font-display text-lg font-semibold tracking-tight text-sidebar-foreground">
            <Globe className="mb-0.5 mr-2 inline-block h-4 w-4 text-sidebar-primary" aria-hidden />
            Gestor
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Navegação
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/home")}>
                    <Link to="/home">
                      <Home className="h-4 w-4" /> Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/projects")}>
                    <Link to="/projects">
                      <FolderGit2 className="h-4 w-4" /> Projetos
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/categories")}>
                    <Link to="/categories">
                      <Tag className="h-4 w-4" /> Categorias
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/skills")}>
                    <Link to="/skills">
                      <Brain className="h-4 w-4" /> Habilidades
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-2">
          <SidebarModeSection />
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-center rounded-none border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
          <div className="px-2 py-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
            v1.0
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-h-screen bg-background text-foreground">
        <header className="flex h-12 items-center gap-3 border-b border-border/80 bg-card/30 px-4 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1" />
          <div className="font-display text-sm font-semibold tracking-wide text-foreground">Painel</div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
