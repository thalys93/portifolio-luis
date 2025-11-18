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
import { Home, FolderGit2, LogOut, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { FirebaseAuth } from "@/services/firebase";

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
                    <div className="px-2 py-4 text-lg font-poppins select-none">Portifólio Gestor</div>
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