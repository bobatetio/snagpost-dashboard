import {
  Clock, Settings, Search, SlidersHorizontal, Plus, Tag, Pencil, Trash2, Check, ChevronDown, Star,
} from "lucide-react";

/* Reproduction of the hero product mockup — a tag-manager extension panel
 * with a faded contacts list behind it and two floating popovers. */

const TAGS = [
  { label: "Skool Leads",  bg: "#ECE9FF", fg: "#5B4FC4", active: true },
  { label: "Follow Ups",   bg: "#E3F0FF", fg: "#2D7FE0" },
  { label: "Clients",      bg: "#FFE9EC", fg: "#E0506A" },
  { label: "Hot Leads",    bg: "#FFF1DD", fg: "#D9893A" },
  { label: "Prospects",    bg: "#F0EAFF", fg: "#7E5BD0" },
  { label: "Closing",      bg: "#E2F6E9", fg: "#46A86A" },
];

const CONTACTS = [
  { name: "Dammy Clifford", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format" },
  { name: "Alias Rogers",   src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" },
  { name: "Peter Lima",     src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format" },
  { name: "Steinberg Till", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format" },
];

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] select-none">
      {/* Faded contacts panel behind */}
      <div className="absolute -left-2 top-10 w-[230px] rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm">
        <ul className="flex flex-col gap-3">
          {CONTACTS.map((c) => (
            <li key={c.name} className="flex items-center gap-2.5">
              <img src={c.src} alt="" className="h-8 w-8 rounded-full object-cover" />
              <div className="flex-1">
                <div className="text-[11px] font-semibold text-white/85">{c.name}</div>
                <div className="mt-1 h-1.5 w-20 rounded-full bg-white/15" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main tag-manager panel */}
      <div className="relative ml-16 rounded-[26px] bg-white p-4 shadow-[0_0_0_5px_rgba(120,150,255,0.35),0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[15px] font-extrabold tracking-tight">
            <span className="text-ink">Social</span>
            <span className="text-brand">Pulse</span>
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-brand-wash px-2.5 py-1 text-[11px] font-semibold text-brand-deep">
            😎 Business Owner <ChevronDown size={12} strokeWidth={2.5} />
          </span>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white">
            <span className="text-[11px] leading-none">✕</span>
          </span>
        </div>

        {/* My Tags row */}
        <div className="mt-4 flex items-center">
          <span className="text-[15px] font-bold text-ink">My Tags <span className="text-ink-3">(5)</span></span>
          <div className="ml-auto flex gap-1.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gray-100 text-ink-2"><Clock size={13} /></span>
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gray-100 text-ink-2"><Settings size={13} /></span>
          </div>
        </div>

        {/* Search + sort */}
        <div className="mt-3 flex gap-2">
          <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-2 text-[11px] text-ink-3">
            <input
              readOnly
              placeholder="Search tag"
              className="w-full bg-transparent outline-none placeholder:text-ink-3"
            />
            <Search size={12} />
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-2 text-[11px] text-ink-3">
            Sort tags by: <SlidersHorizontal size={12} />
          </div>
        </div>

        {/* Add new tag */}
        <button
          type="button"
          className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-brand/40 bg-white py-2.5 text-[12px] font-semibold text-brand-deep"
        >
          <Plus size={13} strokeWidth={2.5} /> Add new tag
        </button>

        {/* Tag rows */}
        <div className="mt-2.5 flex flex-col gap-2">
          {TAGS.map((t) => (
            <div
              key={t.label}
              className="flex items-center rounded-lg px-3 py-2.5"
              style={{ background: t.bg }}
            >
              <span className="text-[12.5px] font-bold" style={{ color: t.fg }}>{t.label}</span>
              {t.active && (
                <div className="ml-auto flex gap-1.5">
                  {[Tag, Pencil, Trash2].map((Ic, i) => (
                    <span
                      key={i}
                      className="grid h-6 w-6 place-items-center rounded-md bg-white/70"
                      style={{ color: t.fg }}
                    >
                      <Ic size={11} strokeWidth={2} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5-star badge */}
      <div className="absolute left-12 top-[150px] flex items-center gap-0.5 rounded-lg bg-white px-2.5 py-1.5 shadow-lg">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Alice Johnson card */}
      <div className="absolute -right-3 top-[280px] flex items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2 shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&auto=format"
          alt=""
          className="h-7 w-7 rounded-full object-cover"
        />
        <span className="text-[12px] font-semibold text-ink">Alice Johnson</span>
        <Clock size={14} className="text-rose-500" />
      </div>

      {/* My Profiles popover */}
      <div className="absolute -right-4 top-[330px] w-[190px] rounded-xl border border-black/5 bg-white p-2.5 shadow-2xl">
        <div className="px-1 pb-1.5 text-[12px] font-bold text-ink">My Profiles</div>
        <ul className="flex flex-col">
          <li className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[11.5px] text-ink-2">
            😎 Business Owner (You)
            <Check size={12} strokeWidth={3} className="ml-auto text-brand" />
          </li>
          <li className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[11.5px] text-ink-2">🥸 Virtual Assistant</li>
          <li className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[11.5px] text-ink-2">🙂 Sales</li>
          <li className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[11.5px] font-semibold text-brand-deep">
            <Plus size={12} strokeWidth={2.5} /> Add new profile
          </li>
        </ul>
      </div>
    </div>
  );
}
