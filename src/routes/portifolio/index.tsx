import { Route, Routes } from "react-router-dom";
import { portifolioRoutes } from "./routes";
import NotFound from "@/subdomains/portifolio/layout/NotFound";

export function PortifolioRoutes() {
    const routes = Object.entries(portifolioRoutes);
    return (
        <Routes>
            {routes.map(([key, route]) => {
                const Element = route.element;
                return <Route key={key} path={route.path} element={<Element />} />;
            })}

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}