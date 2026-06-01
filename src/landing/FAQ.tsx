import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const ITEMS = [
  {
    q: "What is SocialPulse, and how can it help me?",
    a: "SocialPulse is a Chrome extension and dashboard that lets you capture, organize, and analyze any Facebook post you come across. It's built for creators, agencies, and teams who study what works on social — without losing hours scrolling and screenshotting.",
  },
  {
    q: "Can I use SocialPulse as a solo creator?",
    a: "Absolutely. The Basic and Professional plans are designed for individuals. You get the extension, captures, profiles, folders, and analytics — no team setup required.",
  },
  {
    q: "How does tracking creators and groups work?",
    a: "Add any public Facebook profile or group you want to follow. SocialPulse pulls fresh posts whenever the extension is open, organizes them by source, and lets you filter by media type, date, and engagement.",
  },
  {
    q: "Is there an affiliate program?",
    a: "Yes — earn 40% recurring commission on every paying customer you refer. Sign up from the affiliate banner below and you'll get your link plus marketing assets within a day.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 space-y-3">
          {ITEMS.map((item, i) => (
            <button
              key={item.q}
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              className={`w-full rounded-2xl border bg-white px-6 py-5 text-left transition ${
                open === i ? "border-brand/40 shadow-[0_8px_24px_-12px_rgba(80,60,200,0.25)]" : "border-black/10 hover:border-black/20"
              }`}
              aria-expanded={open === i}
            >
              <div className="flex items-center gap-4">
                <span className="flex-1 text-[15px] font-semibold text-ink">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-ink-3 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </div>
              {open === i && (
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">{item.a}</p>
              )}
            </button>
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
