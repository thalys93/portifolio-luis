import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from '../Index'
import About from '../pages/about'
import Contact from '../pages/contact'
import Home from '../pages/home'
import Project from '../pages/project'
import Projects from '../pages/projects'
import React from 'react'
import Login from '../pages/oauth/Login'
import Dashboard from '../pages/oauth/Dashboard'
import AdminProjects from '../pages/oauth/AdminProjects'
import AdminProject from '../pages/oauth/Project'
import NewProject from '../pages/oauth/NewProject'
import AdminIndex from '@/pages/oauth/AdminIndex'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
        children: [
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/projects',
                element: <Projects />,
            },
            {
                path: '/project/:id/:name',
                element: <Project />,
            },
            {
                path: '/contact',
                element: <Contact />,
            }
        ]
    },
    {
        path: "oauth",
        children: [
            {
                path: "login",
                element: <Login />
            },
        ],
    },
    {
        path: "admin",
        element: <AdminIndex />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "projects",
                element: <AdminProjects />,                
            },
            {
                path: "projects/:id/:name",
                element: <AdminProject />
            },
            {
                path: "projects/new",
                element: <NewProject />
            }
        ]
    }
])


export function AppRoutes() {
    React.useEffect(() => {
        if (window.location.pathname === '/') {
            window.location.pathname = '/home'
        }
    }), []

    return (
        <RouterProvider router={router} />
    )
}

