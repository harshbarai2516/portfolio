import { profile } from "../data/profile";
import { navItems } from "../data/navigation";
import { site } from "../data/site";
import { about } from "../data/about";
import { toolbox } from "../data/toolbox";
import { projects } from "../data/projects";
import { contact } from "../data/contact";
import type {
  About,
  ContactData,
  NavItem,
  Profile,
  ProjectsData,
  SiteData,
  Toolbox,
} from "../types";

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

export async function getAbout(): Promise<About> {
  return about;
}

export async function getToolbox(): Promise<Toolbox> {
  return toolbox;
}

export async function getProjects(): Promise<ProjectsData> {
  return projects;
}

export async function getContact(): Promise<ContactData> {
  return contact;
}