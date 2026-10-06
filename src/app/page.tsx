import ScrollThread from "@/components/thread/ScrollThread";
import Hero from "@/components/sections/hero/Hero";
import TickerBand from "@/components/sections/TickerBand";
import ProfileSection from "@/components/sections/profile/ProfileSection";
import ToolboxSection from "@/components/sections/toolbox/ToolboxSection";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import {
  getAbout,
  getContact,
  getProfile,
  getProjects,
  getSite,
  getToolbox,
} from "@/lib/data";

export default async function Home() {
  const [profile, site, about, toolbox, projects, contact] = await Promise.all([
    getProfile(),
    getSite(),
    getAbout(),
    getToolbox(),
    getProjects(),
    getContact(),
  ]);

  return (
    <ScrollThread>
      <Hero profile={profile} issue={site.issue} />
      <TickerBand items={site.ticker} />
      <ProfileSection profile={profile} about={about} />
      <ToolboxSection toolbox={toolbox} />
      <ProjectsSection data={projects} />
      <ContactSection profile={profile} contact={contact} />
    </ScrollThread>
  );
}