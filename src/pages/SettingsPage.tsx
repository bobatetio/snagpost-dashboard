import { useState } from "react";
import { Check } from "lucide-react";
import { MOCK_USER } from "../data/mock";

const NOTIFICATION_PREFS = [
  { id: "new_posts",  label: "New posts from tracked profiles", sub: "We'll let you know when a creator you follow shares a new post." },
  { id: "groups",     label: "Group activity",                  sub: "Round-ups of new captures inside the Facebook Groups you track." },
  { id: "bookmarks",  label: "Bookmark milestones",             sub: "Nudges when your saved-post collection hits 25, 100, 500…" },
  { id: "digest",     label: "Weekly digest",                   sub: "A Monday-morning summary of the past week's captures." },
  { id: "marketing",  label: "Product news",                    sub: "Occasional emails about new features and changes." },
] as const;

/* Settings — account basics + pricing tiers. Static UI for the MVP roadmap. */

const TIERS = [
  {
    name: "Free",
    price: "$0",
    tag: "Current plan",
    features: ["Up to 3 tracked profiles", "100 captured posts / month", "Basic analytics"],
    cta: "Current plan",
    primary: false,
  },
  {
    name: "Pro",
    price: "$12",
    tag: "Most popular",
    features: ["Unlimited tracked profiles", "Unlimited captures", "Full analytics + exports", "Group tracking (early access)"],
    cta: "Upgrade to Pro",
    primary: true,
  },
  {
    name: "Team",
    price: "$29",
    tag: "Per seat / mo",
    features: ["Everything in Pro", "Shared boards across team", "Role-based access", "Priority support"],
    cta: "Talk to sales",
    primary: false,
  },
];

export function SettingsPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    new_posts: true,
    groups: true,
    bookmarks: false,
    digest: true,
    marketing: false,
  });

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-sub">Manage your account, password and subscription.</p>
        </div>
      </header>

      <section className="settings-card">
        <h2 className="settings-card-title">Account</h2>
        <div className="settings-grid">
          <label className="settings-field">
            <span>Name</span>
            <input type="text" defaultValue={MOCK_USER.name} />
          </label>
          <label className="settings-field">
            <span>Email</span>
            <input type="email" defaultValue={MOCK_USER.email} />
          </label>
          <label className="settings-field">
            <span>Password</span>
            <input type="password" defaultValue="••••••••" />
          </label>
        </div>
        <button type="button" className="settings-save">Save changes</button>
      </section>

      <section className="settings-card">
        <h2 className="settings-card-title">Notifications</h2>
        <ul className="notif-prefs">
          {NOTIFICATION_PREFS.map((p) => (
            <li key={p.id} className="notif-pref">
              <div className="notif-pref-text">
                <span className="notif-pref-label">{p.label}</span>
                <span className="notif-pref-sub">{p.sub}</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={prefs[p.id]}
                className="notif-pref-toggle"
                data-on={prefs[p.id] || undefined}
                onClick={() => setPrefs((prev) => ({ ...prev, [p.id]: !prev[p.id] }))}
              >
                <span className="notif-pref-toggle-thumb" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <header className="page-section-head">
          <h2 className="page-section-title">Plans & pricing</h2>
          <p className="page-section-sub">Pick the tier that fits how much you capture.</p>
        </header>
        <div className="pricing-grid">
          {TIERS.map((t) => (
            <article key={t.name} className="pricing-card" data-primary={t.primary || undefined}>
              <header className="pricing-card-head">
                <span className="pricing-card-tag">{t.tag}</span>
                <h3 className="pricing-card-name">{t.name}</h3>
                <span className="pricing-card-price">
                  <strong>{t.price}</strong>
                  <span>/ month</span>
                </span>
              </header>
              <ul className="pricing-card-features">
                {t.features.map((f) => (
                  <li key={f}>
                    <Check size={14} strokeWidth={2.5} /> {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="pricing-card-cta"
                data-primary={t.primary || undefined}
                disabled={t.cta === "Current plan"}
              >
                {t.cta}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
