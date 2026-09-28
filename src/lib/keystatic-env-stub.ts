/** Client dep prebundle stand-in. The real server route uses Astro's astro:env/server. */
export function getSecret(_name: string): string | undefined {
  return undefined;
}
