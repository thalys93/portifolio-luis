import { Platform } from "../enums/platform";

export function getPlatform(): { platform: Platform; isProduction: boolean } {
  const firstSegment = window.location.pathname.split('/')[1]?.toLowerCase();
  const { hostname } = window.location;
  const isProduction = hostname.includes('web.app') || hostname.includes('firebaseapp.com');

  const platform = firstSegment === 'admin' ? Platform.ADMIN : Platform.PORTIFOLIO;

  return { platform, isProduction };
}
