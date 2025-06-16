import { Platform } from "@/shared/enums/platform";
import { PortifolioRoutes } from "./portifolio";

type RouteProps = {
    rule: Platform,
    isProduction: boolean;
}

export function Routes({ isProduction, rule }: RouteProps) {
    return (
        <>
            {rule === Platform.PORTIFOLIO && <PortifolioRoutes />}
            {rule === Platform.ADMIN}
        </>
    )
}