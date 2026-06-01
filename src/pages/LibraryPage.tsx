import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PostCard } from "../components/PostCard";
import { Dropdown } from "../components/Dropdown";
import { AddToFolderModal } from "../components/AddToFolderModal";
import { ProfileHeader } from "../components/ProfileHeader";
import { useBookmarks, usePosts, toggleBookmark } from "../data/store";
import { MOCK_PROFILES } from "../data/mock";
import type { DateRange, FilterType, SortOrder } from "../lib/types";

const TYPE_CHIPS: { id: FilterType; label: string; tone: FilterType }[] = [
  { id: "all",       label: "All",       tone: "all" },
  { id: "video",     label: "Video",     tone: "video" },
  { id: "slideshow", label: "Slideshow", tone: "slideshow" },
  { id: "carousel",  label: "Carousel",  tone: "carousel" },
  { id: "photo",     label: "Photo",     tone: "photo" },
  { id: "link",      label: "Link",      tone: "link" },
];

const DATE_OPTIONS = [
  { id: "7d",  label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
  { id: "all", label: "All time" },
] as const;

const SORT_OPTIONS = [
  { id: "recent",   label: "Most recent" },
  { id: "likes",    label: "Most reactions" },
  { id: "comments", label: "Most comments" },
  { id: "shares",   label: "Most shares" },
] as const;

interface LibraryPageProps {
  postIdSubset?: string[];
  showProfileHeader?: string; // profile id to render header for
}

export function LibraryPage({ postIdSubset, showProfileHeader }: LibraryPageProps) {
  const allPosts = usePosts();
  const bookmarks = useBookmarks();
  const [filter, setFilter] = useState<FilterType>("all");
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [sort, setSort] = useState<SortOrder>("recent");
  const [search, setSearch] = useState("");
  const [addingToFolderId, setAddingToFolderId] = useState<string | null>(null);

  const profile = showProfileHeader ? MOCK_PROFILES.find((p) => p.id === showProfileHeader) : null;

  const visible = useMemo(() => {
    const now = Date.now();
    const cutoff = dateRange === "all" ? 0
      : dateRange === "7d"  ? now - 7  * 24 * 60 * 60 * 1000
      : dateRange === "30d" ? now - 30 * 24 * 60 * 60 * 1000
      : now - 90 * 24 * 60 * 60 * 1000;

    let scope = postIdSubset ? allPosts.filter((p) => postIdSubset.includes(p.id)) : allPosts;
    if (showProfileHeader) scope = scope.filter((p) => p.profileId === showProfileHeader);
    if (filter !== "all") scope = scope.filter((p) => p.type === filter);
    if (cutoff > 0) {
      scope = scope.filter((p) => {
        const t = p.postedAt ? Date.parse(p.postedAt) : p.capturedAt;
        return t >= cutoff;
      });
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      scope = scope.filter((p) =>
        p.caption.toLowerCase().includes(q) ||
        p.profileUsername.toLowerCase().includes(q) ||
        p.profileDisplayName.toLowerCase().includes(q),
      );
    }

    return [...scope].sort((a, b) => {
      switch (sort) {
        case "likes":    return b.stats.likes - a.stats.likes;
        case "comments": return b.stats.comments - a.stats.comments;
        case "shares":   return b.stats.shares - a.stats.shares;
        case "recent":
        default: {
          const aT = a.postedAt ? Date.parse(a.postedAt) : a.capturedAt;
          const bT = b.postedAt ? Date.parse(b.postedAt) : b.capturedAt;
          return bT - aT;
        }
      }
    });
  }, [allPosts, postIdSubset, filter, dateRange, sort, search, showProfileHeader]);

  return (
    <>
      {profile && (
        <ProfileHeader profile={profile} postsCollected={visible.length} posts={visible} />
      )}

      <div className="filters-bar">
        {TYPE_CHIPS.map((c) => (
          <button
            key={c.id}
            type="button"
            className="type-chip"
            data-tone={c.tone}
            data-active={filter === c.id}
            onClick={() => setFilter(c.id)}
          >
            {c.label}
          </button>
        ))}
        <div className="filters-spacer" />
        <div className="search-bar search-bar-inline">
          <Search size={14} strokeWidth={1.75} />
          <input
            type="search"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Dropdown<DateRange>
          label="Date"
          value={dateRange}
          onChange={setDateRange}
          options={DATE_OPTIONS as unknown as { id: DateRange; label: string }[]}
        />
        <Dropdown<SortOrder>
          label="Sort"
          value={sort}
          onChange={setSort}
          align="right"
          options={SORT_OPTIONS as unknown as { id: SortOrder; label: string }[]}
        />
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          <h2 className="empty-title">No posts match these filters.</h2>
          <p className="empty-sub">Reset a filter or capture more from the extension.</p>
        </div>
      ) : (
        <div className="library-grid">
          {visible.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              bookmarked={bookmarks.has(post.id)}
              onToggleBookmark={() => toggleBookmark(post.id)}
              onAddToFolder={() => setAddingToFolderId(post.id)}
            />
          ))}
        </div>
      )}

      {addingToFolderId && (
        <AddToFolderModal postId={addingToFolderId} onClose={() => setAddingToFolderId(null)} />
      )}
    </>
  );
}
