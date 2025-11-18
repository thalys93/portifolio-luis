import { adminRoutes } from "./routes";
import { Route, Routes } from "react-router-dom";
import NotFound from "@/subdomains/portifolio/layout/NotFound";
import AdminGuard from "@/middlewares/AdminGuard";

export function AdminRoutes() {
    const routes = Object.entries(adminRoutes);
    return (
        <Routes>
            {routes.map(([key, route]) => {
                const Element = route.element;
                const isPublic = route.path === "oauth/login";
                const elementNode = isPublic ? <Element /> : (
                    <AdminGuard>
                        <Element />
                    </AdminGuard>
                );
                return <Route key={key} path={route.path} element={elementNode} />;
            })}

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}