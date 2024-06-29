import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from '../Index'
import About from '../pages/about'
import Contact from '../pages/contact'
import Home from '../pages/home'
import Project from '../pages/project'
import Projects from '../pages/projects'
import React from 'react'


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
    }
])

function Routes() {
    React.useEffect(() => {
        if (window.location.pathname === '/') {
            window.location.pathname = '/home'
        }
    }), []
    
    return (
        <RouterProvider router={router} />
    )
}

export default Routes