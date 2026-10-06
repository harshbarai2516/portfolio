import { profile } from "../data/profile";
import { navItems } from "../data/navigation";
import { site } from "../data/site";
import type { About, NavItem, Profile, SiteData } from "../types";
import { about } from "@/data/about";

// Every page and component gets its data from these functions.
// Today they read local files. When the backend is ready, only the
// bodies below change; no component needs to be touched.

export async function getProfile(): Promise<Profile> {
  return profile;
}

export async function getNav(): Promise<NavItem[]> {
  return navItems;
}

export async function getSite(): Promise<SiteData> {
  return site;
}

// update the types import to: import type { About, NavItem, Profile, SiteData } from "@/types";

export async function getAbout(): Promise<About> {
  return about;
}