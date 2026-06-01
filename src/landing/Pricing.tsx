import { Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const PLANS = [
  {
    tier: "BASIC",
    monthly: 9.99,
    yearly: 6.99,
    perks: [
      "Up to 100 captures / month",
      "5 tracked profiles",
      "3 folders",
      "Browser extension",
    ],
  },
  {
    tier: "PROFESSIONAL",
    monthly: 24.99,
    yearly: 17.49,
    perks: [
      "Unlimited captures",
      "Unlimited profiles & groups",
      "Unlimited folders",
      "Engagement analytics",
      "Priority support",
    ],
    highlight: true,
  },
  {
    tier: "ENTERPRISE",
    monthly: 49.99,
    yearly: 34.99,
    perks: [
      "Everything in Professional",
      "Team workspaces (up to 10)",
      "Shared folders & boards",
      "SSO & permissions",
      "Dedicated account manager",
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative overflow-hidden bg-band py-24 text-white">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(141,114,255,0.25)_0%,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Choose the Right Plan for You
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            Find the perfect plan to match your needs and capture every post that matters.
          </p>

          <div className="mt-7 inline-flex items-center gap-1 rounded-full bg-white/10 p-1">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                !yearly ? "bg-white text-band" : "text-white/70"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                yearly ? "bg-white text-band" : "text-white/70"
              }`}
            >
              Yearly
              <span className="ml-1 rounded-full bg-emerald-300/90 px-1.5 py-px text-[10px] font-bold text-emerald-900">
                save 30%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.tier}
              className={`relative rounded-2xl border p-7 ${
                p.highlight
                  ? "border-brand/60 bg-gradient-to-b from-brand/25 to-band-2"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Most popular
                </span>
              )}
              <div className="text-xs font-bold tracking-[0.18em] text-white/70">{p.tier}</div>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-5xl font-bold tracking-tight">
                  ${(yearly ? p.yearly : p.monthly).toFixed(2)}
                </span>
                <span className="mb-2 text-sm text-white/60">/ month</span>
              </div>
              <div className="text-xs text-white/60">
                {yearly ? "billed yearly" : "billed monthly"}
              </div>
              <Link
                to="/signup"
                className={`mt-6 block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-white text-band hover:bg-white/90"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                Start free trial
              </Link>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check size={14} strokeWidth={3} className="mt-0.5 text-brand" />
                    <span className="text-white/80">{perk}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 text-xs text-white/50">No credit card required</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
