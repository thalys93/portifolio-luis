import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FirebaseDB } from "@/services/firebase";
import type { Project } from "@/types/portfolio";

async function fetchProjects(): Promise<Project[]> {
  const snap = await getDocs(collection(FirebaseDB, "projects"));
  const items = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Project, "id">),
  }));
  return items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

async function fetchProject(id: string): Promise<Project | null> {
  const snap = await getDoc(doc(FirebaseDB, "projects", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Project, "id">) };
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}

export function useProject(id: string | undefined) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => fetchProject(id!),
    enabled: Boolean(id),
  });
}

export function useFeaturedProjects(limit = 4) {
  const query = useProjects();
  return {
    ...query,
    data: query.data?.slice(0, limit),
  };
}
