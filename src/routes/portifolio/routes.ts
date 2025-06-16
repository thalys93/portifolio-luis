import HomePage from "@/subdomains/portifolio/pages/Home/HomePage";

export const portifolioRoutes = [
    {
        path: "",
        element: HomePage
    },
    {
        path: "project/:id",
        element: HomePage
    }
]