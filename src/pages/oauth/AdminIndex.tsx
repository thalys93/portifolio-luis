import { Avatar } from '@/components/ui/avatar'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { GithubReturn } from '@/utils/githubUser.interface'
import { AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { FolderRoot, Cog, DoorClosed, House, Database, GitCommitVertical, Blocks, Code } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import appInfo from '@/utils/app.info.json'
import { useCookies } from 'react-cookie'

function AdminIndex() {
    const [cookies] = useCookies(['GithubUser', "authToken"])

    React.useEffect(() => {
        function checkToken() {
            if (!cookies.GithubUser || !cookies.authToken) {
                if (window.location.pathname === '/admin/dashboard') {
                    window.location.pathname = '/oauth/login'
                }
            }
        }

        checkToken()
    }), []

    const [userData, setUserData] = React.useState<GithubReturn>()
    const [toastOpen, setToastOpen] = React.useState(false)
    const location = useLocation()
    React.useEffect(() => {
        function checkUser() {
            const GithubUser = cookies.GithubUser
            if (GithubUser !== null) {
                setUserData(GithubUser)
            }
        }

        checkUser()
    }, [])

    async function handleLogout() {
        // Remove cookies
        document.cookie = 'GithubUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

        if (!cookies.GithubUser && !cookies.authToken) {
            window.location.pathname = '/oauth/login'
        }
    }

    function LogoutDialog() {
        return (
            <AlertDialog open={toastOpen} onOpenChange={setToastOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Realizando Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            Deseja sair da sua conta?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='flex flex-row items-center gap-2'>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className='bg-red-600 text-stone-50 mt-2' onClick={handleLogout}>Sair</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader className='flex flex-row items-center justify-center mt-3 select-none'>
                    <Avatar className='flex justify-center items-center bg-slate-700 transition-all hover:scale-90'>
                        <AvatarImage src={userData?.photoURL} />
                        <AvatarFallback className='uppercase'>{userData?.displayName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start'>
                        <h1 select-none>{userData?.displayName}</h1>
                        <span className='text-stone-500 text-sm'>developer</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className='select-none'>Ferramentas</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem className='ml-[2rem]'>
                                    <Link to="dashboard">
                                        <SidebarMenuButton className='flex flex-row items-center justify-start gap-3'>
                                            <House fill='#fff' fillOpacity={location.pathname === '/admin/dashboard' ? 1 : 0} size={28} />
                                            <span> Home </span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                                <SidebarMenuItem className='ml-[2rem]'>
                                    <Link to="projects">
                                        <SidebarMenuButton className='flex flex-row items-center justify-start gap-3'>
                                            <FolderRoot fill='#fff' fillOpacity={location.pathname === '/admin/projects' ? 1 : 0} size={28} />
                                            <span> Projetos </span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                                <SidebarMenuItem className='ml-[2rem]'>
                                    <Link to="experiences">
                                        <SidebarMenuButton className='flex flex-row items-center justify-start gap-3'>
                                            <Code fill='#fff' fillOpacity={location.pathname === '/admin/experiences' ? 1 : 0} size={28} />
                                            <span> Experiências </span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                                <SidebarMenuItem className='ml-[2rem]' aria-disabled>
                                    <Link to="services">
                                        <SidebarMenuButton className='flex flex-row items-center justify-start gap-3'>
                                            <Blocks fill='#fff' fillOpacity={location.pathname === '/admin/services' ? 1 : 0} size={28} />
                                            <span> Serviços </span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            </SidebarMenu>
                            <Collapsible>
                                <SidebarGroup>
                                    <SidebarGroupLabel asChild>
                                        <CollapsibleTrigger className='flex flex-row gap-2 items-center'>
                                            <Cog size={28} />
                                            Informações do Sistema
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
                                    <CollapsibleContent className='animate__animated animate__fadeIn'>
                                        <SidebarMenu className='gap-3 select-none'>
                                            <SidebarMenuItem className='ml-[2rem] flex flex-row items-center justify-start gap-3 mt-2'>
                                                <Database size={20} className='text-stone-500' />
                                                <span className='text-stone-500'> Versão {appInfo.version} </span>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem className='ml-[2rem] flex flex-row items-center justify-start gap-3'>
                                                <GitCommitVertical size={20} className='text-stone-500' />
                                                <span className='text-stone-500'> Edição {appInfo.name} </span>
                                            </SidebarMenuItem>
                                        </SidebarMenu>
                                    </CollapsibleContent>
                                </SidebarGroup>
                            </Collapsible>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarGroup>
                        <SidebarGroupLabel className='select-none'>Utilitários</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem className='ml-[2rem]'>
                                    <SidebarMenuButton onClick={() => setToastOpen(true)} className='flex flex-row items-center justify-start gap-3'>
                                        <DoorClosed size={28} />
                                        <span> Sair </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarFooter>
            </Sidebar>
            <SidebarTrigger className='ml-3 mt-3' />
            <LogoutDialog />
            <Outlet />
        </SidebarProvider>
    )
}

export default AdminIndex