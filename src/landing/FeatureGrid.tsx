import { Compass, Bell, Users, Zap } from "lucide-react";
import { Link } from "react-router";

const FEATURES = [
  {
    icon: Compass,
    tone: "bg-rose-100 text-rose-600",
    title: "Capture Posts In One Click",
    body: "Save any Facebook post — videos, carousels, photos, text — straight from your feed into your library.",
  },
  {
    icon: Bell,
    tone: "bg-amber-100 text-amber-700",
    title: "Track Creators And Groups",
    body: "Follow the profiles and groups that matter. Get fresh captures the moment they post.",
  },
  {
    icon: Users,
    tone: "bg-lime-100 text-lime-700",
    title: "Organize With Folders",
    body: "Drop captures into folders for hooks, scripts, products, or any project — and find them in seconds.",
  },
  {
    icon: Zap,
    tone: "bg-emerald-100 text-emerald-700",
    title: "Effortless Setup, Built For Speed",
    body: "Install the extension, sign in, and start capturing. No imports, no configuration, no friction.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="bg-brand-soft py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            How SocialPulse Makes Your Life Easier
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-ink-2">
            Streamline captures, enhance communication, and effortlessly manage the social
            content you care about with SocialPulse.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, tone, title, body }) => (
            <div key={title} className="rounded-2xl border border-black/5 bg-white p-5">
              <span className={`mb-4 inline-grid h-10 w-10 place-items-center rounded-lg ${tone}`}>
                <Icon size={18} strokeWidth={2} />
              </span>
              <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-110"
          >
            Start now
          </Link>
        </div>
      </div>
    </section>
  );
}
