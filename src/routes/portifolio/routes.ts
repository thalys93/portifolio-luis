import HomePage from "@/subdomains/portifolio/pages/Home/HomePage";
import ProjectDetailPage from "@/subdomains/portifolio/pages/ProjectDetail/ProjectDetailPage";
import ProjectsPage from "@/subdomains/portifolio/pages/Projects/ProjectsPage";

export const portifolioRoutes = [
    {
        path: "",
        element: HomePage
    },
    {
        path: "projects",
        element: ProjectsPage
    },
    {
        path: "projects/:id",
        element: ProjectDetailPage
    },
    {
        path: "project/:id",
        element: ProjectDetailPage
    }
]