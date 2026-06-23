/**
 * Shared TypeScript interfaces used across API routes and UI components.
 * Centralising types here ensures the API response shape and component
 * props stay in sync without duplication.
 */

/** A single story circle shown in the horizontal stories bar. */
export interface Story {
  id: string;
  name: string;
  avatarUrl: string;
}

/** Author info on a generic text/video post. */
export interface PostUser {
  name: string;
  type: string;   // e.g. "Agent", "Developer", "Individual"
  avatar: string; // absolute URL to avatar image
}

/**
 * Author info on a property post.
 * `avatar` is optional — if omitted the component falls back to
 * a coloured circle with `initials`.
 */
export interface PropertyUser {
  name: string;
  type: string;
  initials: string; // 1–2 capital letters for the fallback avatar
  bg: string;       // CSS colour string for the fallback circle
  avatar?: string;
}

/** A plain text/request/general post in the feed. */
export interface TextPostData {
  id: string;
  type: "text";
  user: PostUser;
  time: string;
  category: string;
  content: string;
  location: string;
  likes: number;
  comments: number;
  saves: number;
  topComment: { user: string; text: string };
  commentCount: number;
  likedBy: { avatars: string[]; names: string };
  commentAvatar?: string;
}

/** A property listing post (For Rent / For Sale) with an image slider. */
export interface PropertyPostData {
  id: string;
  type: "property";
  user: PropertyUser;
  time: string;
  category: string;
  caption: string;
  location: string;
  price: string;
  tag: string;       // "For Rent" | "For Sale"
  tagColor: string;  // Tailwind class string for the badge colour
  beds: number;
  baths: number;
  sqft: string;
  images: string[];  // ordered list of image URLs shown in the slider
  likes: number;
  comments: number;
  saves: number;
  topComment: { user: string; text: string };
  commentCount: number;
  likedBy?: { avatars: string[]; names: string };
}

/** A video post with a poster thumbnail and an mp4 source. */
export interface VideoPostData {
  id: string;
  type: "video";
  user: PostUser;
  time: string;
  category: string;
  caption: string;
  location: string;
  videoSrc: string; // direct mp4 URL
  poster: string;   // thumbnail shown before the user presses play
  likes: number;
  comments: number;
  saves: number;
  topComment: { user: string; text: string };
  commentCount: number;
}

/** Discriminated union of all post variants rendered in the feed. */
export type AnyPost = TextPostData | PropertyPostData | VideoPostData;

// ── Right-panel types ──────────────────────────────────────────────────────

export interface TrendingLocation {
  id: string;
  name: string;
  postCount: number;
}

export interface HotRequest {
  id: string;
  requestType: string; // "Buy" | "Rent"
  area: string;
  description: string;
  priceRange: string;
  responses: number;
}

export interface TopCommunity {
  id: string;
  name: string;
  memberCount: string; // pre-formatted, e.g. "12.4k members"
}

/** Shape returned by GET /api/right-panel. */
export interface RightPanelData {
  trendingLocations: TrendingLocation[];
  hotRequests: HotRequest[];
  topCommunities: TopCommunity[];
}
