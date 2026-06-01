import { TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { usePosts, useBookmarks, toggleBookmark } from "../data/store";
import { MOCK_PROFILES } from "../data/mock";
import { PostCard } from "../components/PostCard";

/* Discovery — "best of the best" viral content from creators in the network.
 * Sorted by total engagement (likes + comments + shares). Static UI; pulls
 * from the same mock posts so the design reads as production-shaped. */

export function DiscoveryPage() {
  const posts = usePosts();
  const bookmarks = useBookmarks();
  const top = [...posts]
    .sort((a, b) => {
      const ea = a.stats.likes + a.stats.comments + a.stats.shares;
      const eb = b.stats.likes + b.stats.comments + b.stats.shares;
      return eb - ea;
    })
    .slice(0, 12);

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1 className="page-title">Discovery</h1>
          <p className="page-sub">The best of the best — viral posts surfacing across the creators you track.</p>
        </div>
        <span className="discovery-meta">
          <TrendingUp size={14} strokeWidth={2} />
          Sorted by total engagement
        </span>
      </header>

      <section className="discovery-rail">
        {MOCK_PROFILES.map((p) => (
          <Link key={p.id} to={`/profile/${p.id}`} className="discovery-chip">
            <img className="discovery-chip-avatar" src={p.avatarUrl} alt="" />
            <span className="discovery-chip-body">
              <span className="discovery-chip-name">{p.displayName}</span>
              <span className="discovery-chip-meta">
                {p.fromGroup ? (
                  <>
                    <span className="discovery-chip-g" title={`From ${p.fromGroup}`}>G</span>
                    {p.fromGroup}
                  </>
                ) : (
                  `@${p.username}`
                )}
              </span>
            </span>
          </Link>
        ))}
      </section>

      <section className="discovery-grid">
        {top.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            bookmarked={bookmarks.has(p.id)}
            onToggleBookmark={() => toggleBookmark(p.id)}
            onAddToFolder={() => { /* Discovery: read-only for now */ }}
          />
        ))}
      </section>
    </div>
  );
}
