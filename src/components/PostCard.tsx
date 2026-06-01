import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, ExternalLink, MoreHorizontal, FolderPlus } from "lucide-react";
import { useNavigate } from "react-router";
import type { FacebookPost } from "../lib/types";
import { MOCK_PROFILES } from "../data/mock";

interface PostCardProps {
  post: FacebookPost;
  bookmarked?: boolean;
  onAddToFolder: () => void;
  onToggleBookmark?: () => void;
}

const TYPE_LABELS: Record<FacebookPost["type"], string> = {
  video: "Video",
  slideshow: "Slideshow",
  carousel: "Carousel",
  photo: "Photo",
  link: "Link",
};

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function formatRelative(iso: string | null, capturedAt: number): string {
  const ts = iso ? Date.parse(iso) : capturedAt;
  if (!Number.isFinite(ts)) return "";
  const diff = Date.now() - ts;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export function PostCard({ post, bookmarked, onAddToFolder, onToggleBookmark }: PostCardProps) {
  const profile = MOCK_PROFILES.find((p) => p.id === post.profileId);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!cardRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  const isTextOnly = !post.thumbnailUrl;

  return (
    <article
      ref={cardRef}
      className={`post-card${isTextOnly ? " post-card-text" : ""}`}
      onClick={() => navigate(`/post/${post.id}`)}
      role="link"
      aria-label={post.caption}
    >
      <div className="post-card-head">
        <div className="post-card-creator">
          {profile?.avatarUrl ? (
            <img className="post-card-avatar" src={profile.avatarUrl} alt="" />
          ) : (
            <span className="post-card-avatar" aria-hidden="true" />
          )}
          <div className="post-card-creator-text">
            <span className="post-card-creator-name">{post.profileDisplayName}</span>
            <span className="post-card-time">{formatRelative(post.postedAt, post.capturedAt)}</span>
          </div>
        </div>
        <span className="post-card-type-pill" data-type={post.type}>{TYPE_LABELS[post.type]}</span>
      </div>

      {!isTextOnly && (
        <div className="post-thumb" style={{ marginTop: 10 }}>
          <img src={post.thumbnailUrl ?? undefined} alt="" loading="lazy" />
        </div>
      )}

      {menuOpen && (
        <div className="card-menu-popover" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="card-menu-item"
            onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onAddToFolder(); }}
          >
            <FolderPlus size={14} strokeWidth={1.75} />
            Add to board
          </button>
        </div>
      )}

      <div className="post-body">
        <p className="post-caption">{post.caption}</p>

        <div className="post-meta" style={{ alignItems: "center" }}>
          <div className="post-card-stats">
            <span className="post-stat" title="Likes">
              <Heart size={13} strokeWidth={1.75} />
              {formatCount(post.stats.likes)}
            </span>
            <span className="post-stat" title="Comments">
              <MessageCircle size={13} strokeWidth={1.75} />
              {formatCount(post.stats.comments)}
            </span>
            <span className="post-stat" title="Shares">
              <Share2 size={13} strokeWidth={1.75} />
              {formatCount(post.stats.shares)}
            </span>
          </div>
          <div className="post-card-actions">
            <button
              type="button"
              className="post-card-action"
              data-active={!!bookmarked}
              onClick={(e) => { e.stopPropagation(); onToggleBookmark?.(); }}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
              title={bookmarked ? "Remove bookmark" : "Bookmark"}
            >
              <Bookmark size={14} strokeWidth={1.75} fill={bookmarked ? "currentColor" : "none"} />
            </button>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="post-card-action"
              onClick={(e) => e.stopPropagation()}
              aria-label="View on Facebook"
              title="View on Facebook"
            >
              <ExternalLink size={14} strokeWidth={1.75} />
            </a>
            <button
              type="button"
              className="post-card-action"
              onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
              aria-label="More actions"
            >
              <MoreHorizontal size={14} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
