import { useEffect, useRef, useState } from "react";
import { ExternalLink, Check, Bookmark, Bell, MoreVertical } from "lucide-react";
import type { CreatorProfile, FacebookPost } from "../lib/types";

interface ProfileHeaderProps {
  profile: CreatorProfile;
  postsCollected: number;
  posts?: FacebookPost[];
}

function formatStat(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString();
}

export function ProfileHeader({ profile, postsCollected, posts = [] }: ProfileHeaderProps) {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const overflowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!overflowOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!overflowRef.current?.contains(e.target as Node)) setOverflowOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOverflowOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [overflowOpen]);

  const totals = posts.reduce(
    (a, p) => ({
      likes: a.likes + p.stats.likes,
      comments: a.comments + p.stats.comments,
      shares: a.shares + p.stats.shares,
    }),
    { likes: 0, comments: 0, shares: 0 },
  );
  const total = totals.likes + totals.comments + totals.shares;
  const avg = posts.length > 0 ? Math.round(total / posts.length) : 0;

  return (
    <div className="profile-block">
      <header className="profile-hero">
        <img
          className="profile-hero-img"
          src={profile.coverUrl}
          alt=""
          loading="lazy"
        />
        <div className="profile-hero-fade" aria-hidden="true" />

        <div className="profile-hero-content">
          <div className="profile-hero-top">
            <div className="profile-hero-id">
              <img
                className="profile-hero-avatar"
                src={profile.avatarUrl}
                alt={profile.displayName}
              />
              <div className="profile-hero-id-body">
                <h1 className="profile-hero-name">
                  {profile.displayName}
                  {profile.verified && (
                    <span className="verified-badge" title="Verified profile">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                  {profile.fromGroup && (
                    <span className="profile-group-pill" title={`Tracked from ${profile.fromGroup}`}>
                      <span className="profile-group-pill-g">G</span>
                      {profile.fromGroup}
                    </span>
                  )}
                </h1>
                <div className="profile-hero-handle">@{profile.username}</div>
                {profile.bio && <p className="profile-hero-bio">{profile.bio}</p>}
              </div>
            </div>

            <div className="profile-hero-actions">
              <button type="button" className="profile-action-btn profile-action-icon" title="Bookmark profile" aria-label="Bookmark">
                <Bookmark size={14} strokeWidth={2} />
                <span className="profile-action-label">Save</span>
              </button>
              <button type="button" className="profile-action-btn profile-action-icon" title="Get notifications" aria-label="Get notifications">
                <Bell size={14} strokeWidth={2} />
                <span className="profile-action-label">Alerts</span>
              </button>
              <a
                href={`https://www.facebook.com/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-action-btn profile-action-primary"
              >
                <ExternalLink size={14} strokeWidth={2} />
                <span className="profile-action-label">View on Facebook</span>
              </a>
            </div>

            {/* Mobile overflow menu — tucks the same 3 actions behind a kebab button. */}
            <div className="profile-hero-overflow" ref={overflowRef}>
              <button
                type="button"
                className="profile-hero-overflow-btn"
                onClick={() => setOverflowOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={overflowOpen}
                aria-label="More actions"
              >
                <MoreVertical size={18} strokeWidth={2} />
              </button>
              {overflowOpen && (
                <div className="profile-hero-overflow-menu" role="menu">
                  <button type="button" role="menuitem" className="profile-hero-overflow-item" onClick={() => setOverflowOpen(false)}>
                    <Bookmark size={14} strokeWidth={1.75} /> Save profile
                  </button>
                  <button type="button" role="menuitem" className="profile-hero-overflow-item" onClick={() => setOverflowOpen(false)}>
                    <Bell size={14} strokeWidth={1.75} /> Get alerts
                  </button>
                  <a
                    href={`https://www.facebook.com/${profile.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    className="profile-hero-overflow-item"
                    onClick={() => setOverflowOpen(false)}
                  >
                    <ExternalLink size={14} strokeWidth={1.75} /> View on Facebook
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="profile-stats-strip profile-stats-floating">
            <div className="profile-stat">
              <span className="profile-stat-value">{formatStat(profile.followers)}</span>
              <span className="profile-stat-label">Followers</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{postsCollected}</span>
              <span className="profile-stat-label">Posts captured</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{formatStat(totals.likes)}</span>
              <span className="profile-stat-label">Total likes</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{formatStat(totals.comments)}</span>
              <span className="profile-stat-label">Comments</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{formatStat(totals.shares)}</span>
              <span className="profile-stat-label">Shares</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{formatStat(avg)}</span>
              <span className="profile-stat-label">Avg / post</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
