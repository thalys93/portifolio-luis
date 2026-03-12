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
import { Home, FolderGit2, LogOut, Tag, Globe, Brain, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FirebaseAuth } from "@/services/firebase";
import { signOut } from "firebase/auth";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const handleLogout = async () => {
        await signOut(FirebaseAuth);
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="px-2 py-4 text-lg font-poppins select-none"><Globe className="h-4 w-4 mb-1 mr-1 inline-block" /> Gestor</div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navegação</SidebarGroupLabel>
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
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild isActive={isActive("/themes")}>
                                        <Link to="/themes">
                                            <Palette className="h-4 w-4" /> Temas
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <Button onClick={handleLogout} className="bg-neutral-800 text-white hover:bg-neutral-700"><LogOut className="h-4 w-4" />Sair</Button>
                    <div className="px-2 py-2 text-xs text-muted-foreground">v1.0</div>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset className="min-h-screen bg-background text-foreground">
                <header className="flex h-12 items-center gap-2 border-b px-3">
                    <SidebarTrigger />
                    <div className="font-poppins">Painel</div>
                </header>
                <main className="p-4">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}