import HomePage from "@/subdomains/admin/pages/home/HomePage";
import LoginPage from "@/subdomains/admin/pages/login/LoginPage";
import ProjectPage from "@/subdomains/admin/pages/projects/ProjectPage";
import ProjectsPage from "@/subdomains/admin/pages/projects/ProjectsPage";
import CategoryPage from "@/subdomains/admin/pages/categories/CategoryPage";
import CategoriesPage from "@/subdomains/admin/pages/categories/CategoriesPage";

export const adminRoutes = [
  {
    path: "oauth/login",
    element: LoginPage,
  },
  {
    path: "home",
    element: HomePage,
  },
  {
    path: "projects",
    element: ProjectsPage,
  },
  {
    path: "projects/:id?",
    element: ProjectPage,
  },
  {
    path: "categories",
    element: CategoriesPage,
  },
  {
    path: "categories/:id?",
    element: CategoryPage,
  }
];