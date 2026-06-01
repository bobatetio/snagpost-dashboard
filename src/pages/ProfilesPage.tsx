import { Link } from "react-router";
import { Check, ArrowUpRight } from "lucide-react";
import { MOCK_PROFILES } from "../data/mock";
import { usePosts } from "../data/store";

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString();
}

export function ProfilesPage() {
  const posts = usePosts();

  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.profileId, (counts.get(p.profileId) ?? 0) + 1);

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1 className="page-title">Profiles</h1>
          <p className="page-sub">Creators you're tracking across Facebook and Groups.</p>
        </div>
      </header>

      <div className="profiles-grid">
        {MOCK_PROFILES.map((p) => (
          <Link key={p.id} to={`/profile/${p.id}`} className="profile-list-card">
            <div className="profile-list-top">
              <img className="profile-list-avatar" src={p.avatarUrl} alt="" />
              <div className="profile-list-id">
                <h3 className="profile-list-name">
                  {p.displayName}
                  {p.verified && (
                    <span className="verified-badge" title="Verified profile">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </h3>
                <span className="profile-list-handle">@{p.username}</span>
              </div>
              <span className="profile-list-go" aria-hidden="true">
                <ArrowUpRight size={14} strokeWidth={2} />
              </span>
            </div>

            {p.bio && <p className="profile-list-bio">{p.bio}</p>}

            <div className="profile-list-foot">
              <div className="profile-list-metric">
                <span className="profile-list-metric-num">{formatCount(p.followers)}</span>
                <span className="profile-list-metric-lbl">Followers</span>
              </div>
              <span className="profile-list-divider" aria-hidden="true" />
              <div className="profile-list-metric">
                <span className="profile-list-metric-num">{counts.get(p.id) ?? 0}</span>
                <span className="profile-list-metric-lbl">Captured</span>
              </div>
              {p.fromGroup && (
                <span className="profile-list-group-g" title={`From ${p.fromGroup}`}>G</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
