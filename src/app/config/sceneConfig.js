export const INITIAL_GALAXY_DELAY_MS = 2200;
export const GALAXY_BRIDGE_DELAY_MS = 1400;
export const NAV_ENTER_DURATION_MS = 1280;
export const NAV_EXIT_DURATION_MS = 560;
export const HERO_ENTER_DURATION_MS = 1280;
export const HERO_EXIT_DURATION_MS = 1320;
export const BLOG_ENTER_DURATION_MS = 980;
export const BLOG_EXIT_DURATION_MS = 620;

export function normalizePathname(pathname) {
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  return normalizedPathname === "/blog" ? "/blog" : "/";
}
