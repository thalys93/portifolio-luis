import HomePage from "@/subdomains/admin/pages/home/HomePage";
import LoginPage from "@/subdomains/admin/pages/login/LoginPage";
import ProjectPage from "@/subdomains/admin/pages/projects/ProjectPage";
import ProjectsPage from "@/subdomains/admin/pages/projects/ProjectsPage";
import CategoryPage from "@/subdomains/admin/pages/categories/CategoryPage";
import CategoriesPage from "@/subdomains/admin/pages/categories/CategoriesPage";
import SkillsPage from "@/subdomains/admin/pages/skills/SkillsPage";
import SkillPage from "@/subdomains/admin/pages/skills/SkillPage";

import ThemesPage from '@/subdomains/admin/pages/themes/ThemesPage';
import ThemePage from '@/subdomains/admin/pages/themes/ThemePage';

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
  },
  {
    path: "skills",
    element: SkillsPage,
  },
  {
    path: "skills/:id?",
    element: SkillPage,
  },
  {
    path: "themes",
    element: ThemesPage,
  },
  {
    path: "themes/:id?",
    element: ThemePage,
  }
];