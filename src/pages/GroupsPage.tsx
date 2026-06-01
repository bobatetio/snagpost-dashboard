import { Link } from "react-router";
import { ChevronRight, UserPlus, Plus } from "lucide-react";
import { MOCK_GROUPS, MOCK_PROFILES } from "../data/mock";
import { usePosts } from "../data/store";

/* Groups — lists every Facebook group we're tracking. Each card surfaces the
 * tracked profiles inside the group, member count, and a rolling post total
 * pulled from the posts those profiles have made (the mock data treats all
 * posts from a group-affiliated profile as in-group activity). */

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString();
}

export function GroupsPage() {
  const posts = usePosts();

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1 className="page-title">Groups</h1>
          <p className="page-sub">Track profiles and posts from inside Facebook Groups.</p>
        </div>
        <button type="button" className="page-cta">
          <Plus size={14} strokeWidth={2.25} /> Track new group
        </button>
      </header>

      <div className="groups-grid">
        {MOCK_GROUPS.map((g) => {
          const tracked = g.trackedProfileIds
            .map((id) => MOCK_PROFILES.find((p) => p.id === id))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));
          const postCount = posts.filter((p) => g.trackedProfileIds.includes(p.profileId)).length;

          return (
            <Link key={g.id} to={`/groups/${g.id}`} className="group-card">
              <header className="group-card-head">
                {tracked[0]?.avatarUrl ? (
                  <img className="group-card-icon" src={tracked[0].avatarUrl} alt="" />
                ) : (
                  <span className="group-card-icon" aria-hidden="true" />
                )}
                <div className="group-card-meta">
                  <h3 className="group-card-name">{g.name}</h3>
                  <span className="group-card-sub">
                    {formatNumber(g.memberCount)} members · tracked {Math.max(1, Math.round((Date.now() - g.trackedSince) / (24 * 60 * 60 * 1000)))}d
                  </span>
                </div>
                <ChevronRight size={16} strokeWidth={2} className="group-card-chevron" />
              </header>

              <p className="group-card-desc">{g.description}</p>

              <footer className="group-card-foot">
                <span className="group-card-stat">
                  <UserPlus size={12} strokeWidth={2.25} />
                  {tracked.length} {tracked.length === 1 ? "profile" : "profiles"}
                </span>
                <span className="group-card-stat">{postCount} posts</span>
                <div className="group-card-avatars">
                  {tracked.slice(0, 4).map((p, i) => (
                    <img
                      key={p.id}
                      className="group-card-avatar"
                      src={p.avatarUrl}
                      alt=""
                      style={{ marginLeft: i === 0 ? 0 : -8, zIndex: tracked.length - i }}
                      title={p.displayName}
                    />
                  ))}
                </div>
              </footer>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
