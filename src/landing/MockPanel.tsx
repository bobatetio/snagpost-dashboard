import { Bookmark, Folder, Heart, MessageCircle, Search, Sparkles, Users } from "lucide-react";

/* Stylized SocialPulse dashboard panel. Used as a visual stand-in for real
 * product screenshots throughout the landing page. The `variant` switches
 * what's shown in the right pane so each marketing section gets a unique
 * vignette while sharing the same chrome silhouette. */
type Variant = "feed" | "folders" | "profiles" | "leads";

const PROFILES = [
  { name: "Kendall Cooks", handle: "@kendall.cooks", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format" },
  { name: "Marcus Runs",   handle: "@marcus.runs",   src: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&auto=format" },
  { name: "Lila Designs",  handle: "@lila.designs",  src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" },
  { name: "The Cabin WW",  handle: "@cabinww",       src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&auto=format" },
];

export function MockPanel({ variant = "feed" }: { variant?: Variant }) {
  return (
    <div className="relative rounded-2xl border border-black/10 bg-white shadow-[0_30px_60px_-30px_rgba(80,60,200,0.35)]">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-black/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        <div className="ml-auto flex items-center gap-2 text-[10px] text-ink-3">
          <Search size={10} />
          socialpulse.app/library
        </div>
      </div>

      <div className="grid grid-cols-[120px_1fr] gap-0">
        {/* Sidebar */}
        <aside className="border-r border-black/5 p-3">
          <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold text-ink">
            <span className="grid h-4 w-4 place-items-center rounded bg-brand text-white">
              <Sparkles size={9} strokeWidth={2.5} />
            </span>
            SocialPulse
          </div>
          <ul className="space-y-1.5 text-[10.5px] text-ink-2">
            <li className="rounded-md bg-brand-wash px-2 py-1.5 font-semibold text-brand-deep">Profiles</li>
            <li className="flex items-center gap-1.5 px-2 py-1"><Sparkles size={10} /> Discovery</li>
            <li className="flex items-center gap-1.5 px-2 py-1"><Bookmark size={10} /> Bookmarks</li>
            <li className="flex items-center gap-1.5 px-2 py-1"><Users size={10} /> Groups</li>
            <li className="mt-2 px-2 text-[9px] font-semibold uppercase tracking-wider text-ink-3">Folders</li>
            <li className="flex items-center gap-1.5 px-2 py-1"><Folder size={10} /> Recipe hooks</li>
            <li className="flex items-center gap-1.5 px-2 py-1"><Folder size={10} /> Cabin builds</li>
          </ul>
        </aside>

        {/* Main pane */}
        <div className="p-3">
          {variant === "feed" && <FeedPane />}
          {variant === "folders" && <FoldersPane />}
          {variant === "profiles" && <ProfilesPane />}
          {variant === "leads" && <LeadsPane />}
        </div>
      </div>
    </div>
  );
}

function FeedPane() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <span className="rounded-full bg-brand-wash px-2 py-0.5 text-[9.5px] font-semibold text-brand-deep">All</span>
        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[9.5px] font-semibold text-rose-600">Video</span>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9.5px] font-semibold text-amber-700">Carousel</span>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-700">Photo</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-black/5">
            <div className="aspect-[16/10] bg-gradient-to-br from-brand-wash to-brand/30" />
            <div className="space-y-1 p-1.5">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-brand-wash" />
                <div className="text-[8.5px] font-semibold text-ink">{PROFILES[i].name}</div>
              </div>
              <div className="flex gap-2 text-[8px] text-ink-3">
                <span className="inline-flex items-center gap-0.5"><Heart size={7} /> 12.4K</span>
                <span className="inline-flex items-center gap-0.5"><MessageCircle size={7} /> 320</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FoldersPane() {
  const folders = [
    { name: "Hook tested", count: 18 },
    { name: "Cabin builds", count: 9 },
    { name: "Pricing posts", count: 12 },
    { name: "Saved for ads", count: 6 },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {folders.map((f) => (
        <div key={f.name} className="rounded-lg border border-black/5 p-1.5">
          <div className="aspect-[16/10] rounded bg-gradient-to-br from-brand/40 to-brand-wash" />
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-[10px] font-semibold text-ink">{f.name}</span>
            <span className="text-[9px] text-ink-3">{f.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfilesPane() {
  return (
    <div className="space-y-1.5">
      {PROFILES.map((p, i) => (
        <div key={p.name} className="flex items-center gap-2 rounded-lg border border-black/5 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt="" className="h-7 w-7 rounded-full object-cover" />
          <div className="flex-1">
            <div className="text-[10.5px] font-semibold text-ink">{p.name}</div>
            <div className="text-[9px] text-ink-3">{p.handle}</div>
          </div>
          <div className="text-[10.5px] font-bold text-ink">{[124, 76, 22, 38][i]}K</div>
          <div className="text-[9px] text-ink-3">followers</div>
        </div>
      ))}
    </div>
  );
}

function LeadsPane() {
  const leads = [
    { who: "Kendall Cooks",   what: "Wants ad-creative pack",  tone: "bg-emerald-100 text-emerald-700", tag: "Hot" },
    { who: "The Cabin Works", what: "Replying to DM thread",   tone: "bg-amber-100 text-amber-700",     tag: "Reply" },
    { who: "Lila Designs",    what: "Booked discovery call",   tone: "bg-violet-100 text-violet-700",   tag: "Booked" },
    { who: "Marcus Runs",     what: "Pricing PDF sent",        tone: "bg-sky-100 text-sky-700",         tag: "Sent" },
  ];
  return (
    <div className="space-y-1.5">
      {leads.map((l) => (
        <div key={l.who} className="flex items-center gap-2 rounded-lg border border-black/5 p-1.5">
          <div className="h-6 w-6 rounded-full bg-brand-wash" />
          <div className="flex-1">
            <div className="text-[10.5px] font-semibold text-ink">{l.who}</div>
            <div className="text-[9px] text-ink-3">{l.what}</div>
          </div>
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${l.tone}`}>{l.tag}</span>
        </div>
      ))}
    </div>
  );
}
