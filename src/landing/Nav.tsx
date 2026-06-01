import { Link } from "react-router";
import { Wordmark } from "./Wordmark";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Pricing", href: "#pricing" },
  { label: "Affiliate", href: "#cta" },
  { label: "Support", href: "#faq" },
];

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-24 max-w-[1320px] items-center gap-8 px-8">
        <Link to="/" className="inline-flex shrink-0">
          <Wordmark light size={26} />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-9 text-[15px] font-medium text-white/70 lg:flex">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-xl border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.09] sm:inline-flex"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="hidden rounded-xl border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.09] sm:inline-flex"
          >
            Sign Up
          </Link>
          <a
            href="https://chrome.google.com/webstore/category/extensions"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-brand to-brand-mid px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(141,114,255,0.6)] transition hover:brightness-110"
          >
            <img src="/cta-chrome.png" alt="" className="h-5 w-5 object-contain" />
            Add Social Pulse to Chrome
          </a>
        </div>
      </div>
    </header>
  );
}
