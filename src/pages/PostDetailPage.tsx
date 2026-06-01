import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, ExternalLink, FolderPlus, Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { usePosts } from "../data/store";
import { AddToFolderModal } from "../components/AddToFolderModal";

const TYPE_LABELS = {
  video: "Video",
  slideshow: "Slideshow",
  carousel: "Carousel",
  photo: "Photo",
  link: "Link",
} as const;

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts = usePosts();
  const post = posts.find((p) => p.id === id);
  const [adding, setAdding] = useState(false);

  if (!post) {
    return (
      <div className="empty">
        <h2 className="empty-title">Post not found.</h2>
        <p className="empty-sub">It may have been removed since capture.</p>
        <Link to="/library" className="btn-primary">Back to library</Link>
      </div>
    );
  }

  const dateStr = post.postedAt
    ? new Date(post.postedAt).toLocaleString("en-US", {
        weekday: "short", month: "short", day: "numeric",
        hour: "numeric", minute: "2-digit",
      })
    : "Unknown";

  return (
    <>
      <button type="button" className="detail-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={14} strokeWidth={1.75} />
        Back
      </button>

      <div className="detail-grid">
        <div className="detail-media">
          {post.thumbnailUrl ? (
            <img src={post.thumbnailUrl} alt={post.caption} />
          ) : (
            <div style={{ aspectRatio: "16/10", background: "var(--surface-soft)" }} />
          )}
        </div>

        <div className="detail-side">
          <div className="detail-meta">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="type-pill" data-type={post.type} style={{ position: "static" }}>
                {TYPE_LABELS[post.type]}
              </span>
              <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>{dateStr}</span>
            </div>

            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{post.profileDisplayName}</div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>@{post.profileUsername}</div>
            </div>

            <p className="detail-caption">{post.caption}</p>

            <div className="detail-stats-grid">
              <div className="detail-stat">
                <Heart size={16} strokeWidth={1.75} color="var(--pill-video-fg)" />
                <span className="detail-stat-value">{formatCount(post.stats.likes)}</span>
                <span className="detail-stat-label">Likes</span>
              </div>
              <div className="detail-stat">
                <MessageCircle size={16} strokeWidth={1.75} color="var(--pill-link-fg)" />
                <span className="detail-stat-value">{formatCount(post.stats.comments)}</span>
                <span className="detail-stat-label">Comments</span>
              </div>
              <div className="detail-stat">
                <Share2 size={16} strokeWidth={1.75} color="var(--pill-carousel-fg)" />
                <span className="detail-stat-value">{formatCount(post.stats.shares)}</span>
                <span className="detail-stat-label">Shares</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1 }}>
                View on Facebook
                <ExternalLink size={14} strokeWidth={1.75} />
              </a>
              <button type="button" className="btn-secondary" onClick={() => setAdding(true)} aria-label="Add to folder">
                <FolderPlus size={14} strokeWidth={1.75} />
                Add to folder
              </button>
            </div>
          </div>
        </div>
      </div>

      {adding && <AddToFolderModal postId={post.id} onClose={() => setAdding(false)} />}
    </>
  );
}
