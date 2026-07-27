import { useQuery } from "@tanstack/react-query";
import type { PublicCatalogService } from "@/types/catalog-service";
import { SITE } from "@/shared/consts/site";

async function fetchPublicServices(): Promise<PublicCatalogService[]> {
  const base = SITE.leadzApiUrl.replace(/\/$/, "");
  const url = `${base}/api/v0/public/companies/${SITE.leadzCompanySlug}/services`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch services: ${response.status}`);
  }

  return (await response.json()) as PublicCatalogService[];
}

export function usePublicServices() {
  return useQuery({
    queryKey: ["leadz", "services", SITE.leadzCompanySlug],
    queryFn: fetchPublicServices,
    staleTime: 5 * 60 * 1000,
  });
}
