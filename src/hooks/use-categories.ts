import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "@/services/firebase";
import type { Category } from "@/types/portfolio";

async function fetchCategories(): Promise<Category[]> {
  const snap = await getDocs(collection(FirebaseDB, "categories"));
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Category, "id">),
  }));
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
