import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, Calendar, TrendingUp, Download } from "lucide-react";
import { MOCK_GROUPS, MOCK_PROFILES } from "../data/mock";
import { usePosts, useBookmarks, toggleBookmark } from "../data/store";
import { PostCard } from "../components/PostCard";

/* Per-group detail. Header = group meta + key stats. Then the tracked
 * profiles list, then a feed of posts captured from those profiles. */

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString();
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function GroupDetailPage() {
  const { id } = useParams();
  const group = MOCK_GROUPS.find((g) => g.id === id);
  const allPosts = usePosts();
  const bookmarks = useBookmarks();

  if (!group) return <Navigate to="/groups" replace />;

  const profiles = group.trackedProfileIds
    .map((pid) => MOCK_PROFILES.find((p) => p.id === pid))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const posts = allPosts.filter((p) => group.trackedProfileIds.includes(p.profileId));

  // Engagement totals + day-of-week distribution.
  const totals = posts.reduce(
    (a, p) => ({
      likes: a.likes + p.stats.likes,
      comments: a.comments + p.stats.comments,
      shares: a.shares + p.stats.shares,
    }),
    { likes: 0, comments: 0, shares: 0 },
  );
  const totalEng = totals.likes + totals.comments + totals.shares;

  const dayCounts = [0, 0, 0, 0, 0, 0, 0];
  for (const p of posts) {
    const d = new Date(p.postedAt ?? p.capturedAt);
    if (Number.isNaN(d.getTime())) continue;
    const mon0 = (d.getDay() + 6) % 7;
    dayCounts[mon0] += 1;
  }
  const peak = Math.max(...dayCounts);
  const peakIdx = dayCounts.indexOf(peak);

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <Link to="/groups" className="page-back">
            <ArrowLeft size={14} strokeWidth={2} /> All groups
          </Link>
          <h1 className="page-title">{group.name}</h1>
          <p className="page-sub">{group.description}</p>
        </div>
        <button type="button" className="page-cta">
          <Download size={14} strokeWidth={2} /> Export
        </button>
      </header>

      <section className="group-stats">
        <div className="group-stat">
          <span className="group-stat-num">{formatNumber(group.memberCount)}</span>
          <span className="group-stat-label">Group members</span>
        </div>
        <div className="group-stat">
          <span className="group-stat-num">{profiles.length}</span>
          <span className="group-stat-label">Tracked profiles</span>
        </div>
        <div className="group-stat">
          <span className="group-stat-num">{posts.length}</span>
          <span className="group-stat-label">Captured posts</span>
        </div>
        <div className="group-stat">
          <span className="group-stat-num">{formatNumber(totalEng)}</span>
          <span className="group-stat-label">Total engagement</span>
        </div>
      </section>

      <section className="group-section">
        <header className="page-section-head">
          <h2 className="page-section-title">Tracked profiles</h2>
          <p className="page-section-sub">Members of this group whose posts we capture.</p>
        </header>
        <div className="group-profile-grid">
          {profiles.map((p) => (
            <Link key={p.id} to={`/profile/${p.id}`} className="group-profile-card">
              <img className="group-profile-avatar" src={p.avatarUrl} alt="" />
              <div className="group-profile-body">
                <strong>{p.displayName}</strong>
                <span>@{p.username} · {formatNumber(p.followers)} followers</span>
              </div>
              <span className="group-profile-g" title="From this group">G</span>
            </Link>
          ))}
        </div>
      </section>

      {peak > 0 && (
        <section className="group-section">
          <header className="page-section-head">
            <h2 className="page-section-title">
              <Calendar size={14} strokeWidth={2} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />
              Posting pattern
            </h2>
            <p className="page-section-sub">
              Peak day: <strong style={{ color: "var(--ink-primary)" }}>{DAYS[peakIdx]}</strong>{" "}
              · {peak} {peak === 1 ? "post" : "posts"}
            </p>
          </header>
          <div className="group-dow">
            {DAYS.map((day, i) => {
              const isPeak = i === peakIdx;
              const heightPct = peak > 0 ? (dayCounts[i] / peak) * 100 : 0;
              return (
                <div key={i} className="group-dow-col" data-peak={isPeak || undefined}>
                  <span className="group-dow-count">{dayCounts[i]}</span>
                  <div className="group-dow-track">
                    <div className="group-dow-fill" style={{ height: `${heightPct}%` }} />
                  </div>
                  <span className="group-dow-label">{day}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="group-section">
        <header className="page-section-head">
          <h2 className="page-section-title">
            <TrendingUp size={14} strokeWidth={2} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />
            Recent posts from this group
          </h2>
          <p className="page-section-sub">{posts.length} captured · sorted by recency.</p>
        </header>
        <div className="discovery-grid">
          {[...posts]
            .sort((a, b) => (b.postedAt ?? b.capturedAt).toString().localeCompare((a.postedAt ?? a.capturedAt).toString()))
            .slice(0, 12)
            .map((p) => (
              <PostCard
                key={p.id}
                post={p}
                bookmarked={bookmarks.has(p.id)}
                onToggleBookmark={() => toggleBookmark(p.id)}
                onAddToFolder={() => { /* Wire to AddToFolderModal in a follow-up */ }}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
