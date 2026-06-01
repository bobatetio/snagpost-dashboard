/* Mirrors the extension's FacebookPost shape (src/lib/facebook/types.ts in
 * socialpulse/) — when the dashboard pulls real data from the same backend, the
 * payload will match this type. Keeping the shape aligned here avoids a
 * translation layer later. */

export type PostType = "video" | "slideshow" | "carousel" | "photo" | "link";

export interface FacebookPost {
  id: string;
  url: string;
  profileId: string;
  profileUsername: string;
  profileDisplayName: string;
  type: PostType;
  caption: string;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  stats: { likes: number; comments: number; shares: number };
  postedAt: string | null;
  capturedAt: number;
}

export interface CreatorProfile {
  id: string;
  username: string;
  displayName: string;
  verified: boolean;
  followers: number;
  friends: number;
  following: number;
  /** Profile picture URL — used everywhere a creator avatar appears. */
  avatarUrl: string;
  /** Banner image URL — used on the ProfileDetailPage header. */
  coverUrl: string;
  /** One-line bio shown on the profile header. */
  bio?: string;
  /** If the profile was discovered inside a Facebook Group, this holds the
   * group name so the UI can render the "G" affiliation badge. */
  fromGroup?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  /** Total members in the Facebook group (display-only stat). */
  memberCount: number;
  /** Profile IDs (CreatorProfile.id) that we're tracking from inside this group. */
  trackedProfileIds: string[];
  /** Epoch ms when the user first added this group to tracking. */
  trackedSince: number;
}

export interface Folder {
  id: string;
  name: string;
  postIds: string[];
  createdAt: number;
}

export type DateRange = "7d" | "30d" | "90d" | "all";
export type SortOrder = "recent" | "likes" | "comments" | "shares";
export type FilterType = "all" | PostType;

export type NotificationKind = "new_post" | "group_activity" | "bookmark" | "digest" | "system";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  /** Optional avatar/icon source. */
  avatarUrl?: string;
  /** Optional deep link path within the app. */
  href?: string;
  timestamp: number;
  read: boolean;
}
