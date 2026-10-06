import ScrollThread from "@/components/thread/ScrollThread";
import Hero from "@/components/sections/hero/Hero";
import TickerBand from "@/components/sections/TickerBand";
import ProfileSection from "@/components/sections/profile/ProfileSection";
import SectionStub from "@/components/sections/SectionStub";
import { getAbout, getProfile, getSite } from "@/lib/data";

export default async function Home() {
  const [profile, site, about] = await Promise.all([
    getProfile(),
    getSite(),
    getAbout(),
  ]);

  return (
    <ScrollThread>
      <Hero profile={profile} issue={site.issue} />
      <TickerBand items={site.ticker} />
      <ProfileSection profile={profile} about={about} />
      <SectionStub id="toolbox" num="03" title="Toolbox" />
      <SectionStub id="projects" num="04" title="Projects" />
      <SectionStub id="contact" num="05" title="Contact" />
    </ScrollThread>
  );
}