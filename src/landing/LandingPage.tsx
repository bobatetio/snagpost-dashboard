import { AffiliateBanner } from "./AffiliateBanner";
import { AlternatingSection } from "./AlternatingSection";
import { FAQ } from "./FAQ";
import { FeatureGrid } from "./FeatureGrid";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { IntegrationCallout } from "./IntegrationCallout";
import { Nav } from "./Nav";
import { Pricing } from "./Pricing";
import { VideoDemo } from "./VideoDemo";

/* Public marketing landing page. Shown at `/` when signed out. */
export function LandingPage() {
  return (
    <div className="landing min-h-full bg-white font-display text-ink">
      <Nav />
      <main>
        <Hero />
        <VideoDemo />
        <IntegrationCallout />
        <FeatureGrid />

        <AlternatingSection
          title="Streamline Your CRM with SocialPulse"
          variant="leads"
          bullets={[
            {
              title: "Tag and sort conversations",
              body: "Organize threads with customizable tags for easy retrieval and management.",
            },
            {
              title: "Add and view notes",
              body: "Attach context to any conversation so important details and follow-ups never slip.",
            },
            {
              title: "Set reminders",
              body: "Never lose a hot lead — schedule nudges so you reply at the right moment.",
            },
          ]}
          cta="Start improving your CRM"
        />

        <AlternatingSection
          flip
          title="Enhance Team Collaboration"
          variant="profiles"
          bullets={[
            {
              title: "Seamless team sync",
              body: "Keep tags, notes, and folders in sync across every member of your team in real time.",
            },
            {
              title: "Manage roles and permissions",
              body: "Create role-based access so each member sees the captures they need — and nothing else.",
            },
          ]}
          cta="Start collaborating today"
        />

        <AlternatingSection
          title="Boost Sales and Lead Management"
          variant="folders"
          bullets={[
            {
              title: "Track lead interactions",
              body: "Monitor every touch — captured posts, comments, DMs — in one tidy timeline.",
            },
            {
              title: "Set automated reminders",
              body: "Schedule reminders to follow up at the perfect time, so opportunities never slip away.",
            },
          ]}
          cta="Start improving your lead management"
        />

        <Pricing />
        <FAQ />
        <AffiliateBanner />
      </main>
      <Footer />
    </div>
  );
}
