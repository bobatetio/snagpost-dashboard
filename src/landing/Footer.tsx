import { Wordmark } from "./Wordmark";

const COLS = [
  {
    heading: "Product",
    links: ["Pricing", "Features", "Chrome extension", "Affiliate program", "FAQ"],
  },
  {
    heading: "Legal",
    links: ["Privacy policy", "Terms & conditions", "Refund policy"],
  },
];

const SOCIAL = [
  {
    label: "X (Twitter)",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.962 6.817h-3.31l7.73-8.835L1.5 2.25h6.83l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Facebook",
    path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.507 1.493-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.99 22 12z",
  },
  {
    label: "Instagram",
    path: "M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-3a1 1 0 100 2 1 1 0 000-2z",
  },
  {
    label: "LinkedIn",
    path: "M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zM8 17V10H6v7zm-1-8a1 1 0 100-2 1 1 0 000 2zm11 8v-4c0-1.657-1.343-3-3-3-.79 0-1.5.31-2 .81V10h-2v7h2v-4a1 1 0 112 0v4z",
  },
];

export function Footer() {
  return (
    <footer className="bg-band-2 py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark light />
            <p className="mt-4 max-w-sm text-sm text-white/65">
              SocialPulse is a Chrome extension built for creators and teams who don't want
              to miss what's working on Facebook.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/15"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.heading}>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                {c.heading}
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          Copyright © {new Date().getFullYear()} SocialPulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
