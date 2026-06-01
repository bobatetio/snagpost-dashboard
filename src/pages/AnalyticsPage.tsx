import { useMemo } from "react";
import { Link } from "react-router";
import { ArrowUpRight, TrendingUp, Heart, MessageCircle, Share2, Sparkles } from "lucide-react";
import { usePosts } from "../data/store";
import { MOCK_PROFILES } from "../data/mock";
import type { PostType } from "../lib/types";

/* Dashboard — top-level overview. Composition inspired by the TradUp reference
 * (3-col layout: stat row, main chart card, right rail, bottom rail) but using
 * the SocialPulse palette + Mona Sans. */

const TYPE_ORDER: PostType[] = ["video", "carousel", "slideshow", "photo", "link"];
const TYPE_LABELS: Record<PostType, string> = {
  video: "Videos", carousel: "Carousels", slideshow: "Slideshows", photo: "Photos", link: "Links",
};
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const;

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function AnalyticsPage() {
  const posts = usePosts();

  const data = useMemo(() => {
    const totals = { likes: 0, comments: 0, shares: 0 };
    const byType: Record<PostType, number> = { video: 0, carousel: 0, slideshow: 0, photo: 0, link: 0 };
    const byProfile = new Map<string, { id: string; count: number; engagement: number }>();
    const byMonth = new Map<number, number>();

    for (const p of posts) {
      totals.likes += p.stats.likes;
      totals.comments += p.stats.comments;
      totals.shares += p.stats.shares;
      byType[p.type] += 1;

      const cur = byProfile.get(p.profileId) ?? { id: p.profileId, count: 0, engagement: 0 };
      cur.count += 1;
      cur.engagement += p.stats.likes + p.stats.comments + p.stats.shares;
      byProfile.set(p.profileId, cur);

      const d = new Date(p.postedAt ?? p.capturedAt);
      if (!Number.isNaN(d.getTime())) {
        const m = d.getMonth();
        byMonth.set(m, (byMonth.get(m) ?? 0) + 1);
      }
    }

    const topProfiles = Array.from(byProfile.values())
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 5)
      .map((v) => ({ ...v, profile: MOCK_PROFILES.find((p) => p.id === v.id)! }));

    const months = MONTHS.map((m, i) => ({ month: m, value: byMonth.get(i) ?? 0 }));

    return { totals, byType, topProfiles, months };
  }, [posts]);

  const total = data.totals.likes + data.totals.comments + data.totals.shares;
  const stats = [
    { label: "Posts captured", value: posts.length,           delta: "+12% this week", up: true },
    { label: "Total reactions", value: data.totals.likes,     delta: "+8% this week",  up: true },
    { label: "Avg engagement", value: posts.length ? Math.round(total / posts.length) : 0, delta: "+4% this week", up: true },
  ];

  const topProfile = data.topProfiles[0];

  // Build SVG line path from monthly values
  const W = 540, H = 200;
  const max = Math.max(1, ...data.months.map((m) => m.value));
  const linePath = data.months
    .map((m, i) => {
      const x = (i / (data.months.length - 1)) * (W - 20) + 10;
      const y = H - 20 - (m.value / max) * (H - 60);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const areaPath = `${linePath} L ${W - 10} ${H - 20} L 10 ${H - 20} Z`;

  return (
    <div className="dash">
      <section className="dash-stats">
        {stats.map((s) => (
          <div key={s.label} className="dash-stat-card">
            <div className="dash-stat-head">
              <span className="dash-stat-label">{s.label}</span>
              <ArrowUpRight size={14} strokeWidth={2} />
            </div>
            <span className="dash-stat-value">{formatCount(s.value)}</span>
            <span className="dash-stat-delta" data-up={s.up || undefined}>
              <TrendingUp size={11} strokeWidth={2} /> {s.delta}
            </span>
          </div>
        ))}
      </section>

      <div className="dash-grid">
        <div className="dash-main">
          {/* Big chart card */}
          <section className="dash-chart">
            <header className="dash-chart-head">
              <div>
                <span className="dash-chart-label">Captures over time</span>
                <span className="dash-chart-value">
                  {formatCount(posts.length)}
                  <span className="dash-chart-delta">+{Math.round((posts.length / Math.max(1, posts.length - 4)) * 4)}%</span>
                </span>
              </div>
              <select className="dash-chart-select" defaultValue="yearly">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </header>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="dash-chart-svg"
              preserveAspectRatio="none"
              role="img"
              aria-label="Captures over time"
            >
              <defs>
                <linearGradient id="dashLineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="var(--brand-purple)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3, 4].map((r) => (
                <line key={r} x1="10" x2={W - 10} y1={20 + r * 40} y2={20 + r * 40} stroke="var(--divider)" strokeDasharray="2 4" />
              ))}
              <path d={areaPath} fill="url(#dashLineFill)" />
              <path d={linePath} fill="none" stroke="var(--brand-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {data.months.map((m, i) => {
                const x = (i / (data.months.length - 1)) * (W - 20) + 10;
                const y = H - 20 - (m.value / max) * (H - 60);
                if (m.value === 0) return null;
                return <circle key={i} cx={x} cy={y} r="3" fill="var(--surface-page)" stroke="var(--brand-purple)" strokeWidth="2" />;
              })}
            </svg>
            <div className="dash-chart-axis">
              {data.months.map((m) => (
                <span key={m.month}>{m.month}</span>
              ))}
            </div>
          </section>

          {/* Bottom rail: top performing posts */}
          <section className="dash-rail">
            <header className="dash-section-head">
              <h2>Top performing posts</h2>
              <Link to="/library" className="dash-section-link">See all <ArrowUpRight size={12} strokeWidth={2.25} /></Link>
            </header>
            <div className="dash-rail-track">
              {[...posts]
                .sort((a, b) => (b.stats.likes + b.stats.comments + b.stats.shares) - (a.stats.likes + a.stats.comments + a.stats.shares))
                .slice(0, 6)
                .map((p) => {
                  const profile = MOCK_PROFILES.find((mp) => mp.id === p.profileId);
                  return (
                    <Link key={p.id} to={`/post/${p.id}`} className="dash-rail-card">
                      <div className="dash-rail-head">
                        <strong>{profile?.displayName ?? p.profileDisplayName}</strong>
                        <span>{new Date(p.postedAt ?? p.capturedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      </div>
                      <span className="dash-rail-value">{formatCount(p.stats.likes)}</span>
                      <div className="dash-rail-foot">
                        <span className="dash-rail-meta">{formatCount(p.stats.comments)} comments</span>
                        <span className="dash-rail-pill" data-up>+{Math.max(1, Math.round((p.stats.shares / Math.max(1, p.stats.likes)) * 100))}%</span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </section>
        </div>

        <aside className="dash-rail-right">
          {/* Featured highlight card */}
          {topProfile && (
            <Link to={`/profile/${topProfile.profile.id}`} className="dash-feature">
              <header className="dash-feature-head">
                <span className="dash-feature-icon"><Sparkles size={14} strokeWidth={2} /></span>
                Top creator
              </header>
              <div className="dash-feature-num">
                {formatCount(topProfile.engagement)}
                <span className="dash-feature-delta">+8.4%</span>
              </div>
              <div className="dash-feature-list">
                {data.topProfiles.slice(0, 4).map((t) => (
                  <div key={t.id} className="dash-feature-row">
                    <span className="dash-feature-name">{t.profile.displayName}</span>
                    <span className="dash-feature-stat">
                      {formatCount(t.engagement)}
                      <span className="dash-feature-up">↑</span>
                    </span>
                  </div>
                ))}
              </div>
            </Link>
          )}

          {/* Right list — top profiles by post count */}
          <section className="dash-side-card">
            <header className="dash-side-head">
              <h3>Top profiles</h3>
              <button type="button" className="dash-side-more" aria-label="More">⋯</button>
            </header>
            <ul className="dash-side-list">
              {data.topProfiles.map((t) => (
                <li key={t.id}>
                  <Link to={`/profile/${t.profile.id}`} className="dash-side-row">
                    <img className="dash-side-avatar" src={t.profile.avatarUrl} alt="" />
                    <div className="dash-side-body">
                      <strong>{t.profile.displayName}</strong>
                      <span>{t.count} captured</span>
                    </div>
                    <span className="dash-side-stat">{formatCount(t.engagement)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Engagement breakdown — Likes / Comments / Shares */}
          <section className="dash-side-card">
            <header className="dash-side-head">
              <h3>Engagement mix</h3>
            </header>
            <ul className="dash-mix">
              <li>
                <span className="dash-mix-icon" data-metric="likes"><Heart size={12} strokeWidth={2} /></span>
                <span>Likes</span>
                <strong>{formatCount(data.totals.likes)}</strong>
              </li>
              <li>
                <span className="dash-mix-icon" data-metric="comments"><MessageCircle size={12} strokeWidth={2} /></span>
                <span>Comments</span>
                <strong>{formatCount(data.totals.comments)}</strong>
              </li>
              <li>
                <span className="dash-mix-icon" data-metric="shares"><Share2 size={12} strokeWidth={2} /></span>
                <span>Shares</span>
                <strong>{formatCount(data.totals.shares)}</strong>
              </li>
            </ul>
          </section>

          {/* Post types snapshot */}
          <section className="dash-side-card">
            <header className="dash-side-head">
              <h3>By type</h3>
            </header>
            <ul className="dash-types">
              {TYPE_ORDER.filter((t) => data.byType[t] > 0).map((t) => {
                const pct = posts.length ? Math.round((data.byType[t] / posts.length) * 100) : 0;
                return (
                  <li key={t}>
                    <span className="dash-types-name" data-tone={t}>{TYPE_LABELS[t]}</span>
                    <span className="dash-types-bar"><span className="dash-types-fill" data-tone={t} style={{ width: `${pct}%` }} /></span>
                    <span className="dash-types-pct">{pct}%</span>
                  </li>
                );
              })}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
