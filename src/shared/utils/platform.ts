import { Platform } from "../enums/platform";

export function getPlatform(): { platform: Platform; isProduction: boolean } {
  const rootPath = window.location.href.replace(`${window.location.origin}/`, '').split('/')[0] as Platform;
  const { hostname } = window.location;
  const isProduction = hostname.includes('web.app');
  let platform = Platform.PORTIFOLIO;

  /**
  * IMPORTANT: Always include new products in the products array below.
  * New products must be added to enable route filtering in the else-if condition.
  * If a product is not added, its routes will not work properly.
 */
  const products = [
    Platform.PORTIFOLIO,
    Platform.ADMIN
  ]

  if (isProduction) {
    platform = hostname.split('.')[0] as Platform;
  } else if (products.includes(rootPath)) {
    platform = rootPath as Platform;
  }

  return {
    platform,
    isProduction,
  };
}
