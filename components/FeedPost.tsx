/**
 * FeedPost — a plain text / request / general post card.
 *
 * Also exports <TextPostSkeleton> which FeedSection renders while
 * the /api/posts response is in-flight.
 */
import {
  Heart,
  ChatCircle,
  PaperPlaneRight,
  BookmarkSimple,
  MapPin,
  DotsThree,
} from "@phosphor-icons/react/dist/ssr";

/** Shimmer placeholder matching the FeedPost card layout. */
export function TextPostSkeleton() {
  return (
    <div className="bg-[var(--base)] border border-[var(--border1)] rounded-2xl px-5 pt-5 pb-6">
      <div className="flex items-start gap-2">
        <div className="sk w-10 h-10 rounded-full shrink-0 mt-0.5" />
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5 pt-0.5">
            <div className="sk h-3 w-32 rounded" />
            <div className="sk h-2.5 w-24 rounded" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="sk h-2.5 w-full rounded" />
            <div className="sk h-2.5 w-5/6 rounded" />
            <div className="sk h-2.5 w-4/5 rounded" />
          </div>
          <div className="sk h-2.5 w-36 rounded" />
          <div className="flex gap-6 pt-1">
            <div className="sk h-5 w-12 rounded" />
            <div className="sk h-5 w-12 rounded" />
            <div className="sk h-5 w-8 rounded"  />
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeedPostProps {
  user: { name: string; type: string; avatar: string };
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

/** Bullet separator used between metadata tokens. */
const DOT = (
  <span className="w-1 h-1 rounded-full bg-[var(--text-tet)] shrink-0 inline-block" />
);

/**
 * Renders an avatar image when a URL is provided; falls back to a
 * coloured circle with the user's initials otherwise.
 */
function AvatarImg({ src, name, size = 40 }: { src: string; name: string; size?: number }) {
  const colors   = ["#105b48", "#1a4a72", "#6c3483", "#7b241c", "#1e6449", "#b7770d"];
  const bg       = colors[name.charCodeAt(0) % colors.length];
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
      style={{ width: size, height: size, background: bg, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

export default function FeedPost({
  user,
  time,
  category,
  content,
  location,
  likes,
  comments,
  saves,
  topComment,
  commentCount,
  likedBy,
  commentAvatar = "",
}: FeedPostProps) {
  return (
    <div className="bg-[var(--base)] border border-[var(--border1)] rounded-2xl px-5 pt-5 pb-6">
      <div className="flex items-start gap-2">
        <AvatarImg src={user.avatar} name={user.name} size={40} />

        <div className="flex-1 min-w-0">
          {/* Post body (header + content + actions) separated from comment section by a divider. */}
          <div className="border-b border-[var(--border1)] pb-4 flex flex-col gap-2">

            {/* Name / type / time row */}
            <div className="flex items-center h-10">
              <div className="flex-1 flex flex-col justify-center gap-0.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-medium text-[var(--text-primary)] tracking-tight whitespace-nowrap">
                      {user.name}
                    </span>
                  </div>
                  {DOT}
                  <span className="text-[13px] text-[var(--text-tet)] tracking-tight">{user.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] text-[var(--text-tet)] tracking-tight">{category}</span>
                  {DOT}
                  <span className="text-[13px] text-[var(--text-tet)] tracking-tight">{time}</span>
                </div>
              </div>
              <DotsThree size={16} className="text-[var(--text-secondary)] shrink-0 cursor-pointer" />
            </div>

            {/* Post body text */}
            <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed">
              {content}
            </p>

            {/* Location tag */}
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-[var(--text-secondary)] shrink-0" />
              <span className="text-[13px] font-medium text-[var(--text-secondary)] tracking-tight">
                {location}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex-1 flex items-center gap-[18px]">
                <button className="flex items-center gap-2 hover:text-red-400 transition-colors text-[var(--text-secondary)]">
                  <Heart size={24} />
                  <span className="text-base font-medium tracking-tight">{likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors text-[var(--text-secondary)]">
                  <ChatCircle size={24} />
                  <span className="text-base font-medium tracking-tight">{comments}</span>
                </button>
                <button className="flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <PaperPlaneRight size={24} />
                </button>
              </div>
              <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-accent transition-colors">
                <BookmarkSimple size={24} />
                <span className="text-base font-medium tracking-tight">{saves}</span>
              </button>
            </div>

            {/* Stacked liked-by avatars */}
            {likedBy.avatars.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {likedBy.avatars.slice(0, 3).map((a, i) => (
                    <img
                      key={i}
                      src={a}
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-cover border border-[var(--base)]"
                      style={{ marginRight: i < 2 ? "-6px" : 0, zIndex: 3 - i }}
                    />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] tracking-tight">
                  Liked by{" "}
                  <span className="font-medium text-[var(--text-primary)]">{likedBy.names}</span>
                </p>
              </div>
            )}
          </div>

          {/* Comment section — hidden on mobile to match the provided design */}
          <div className="hidden lg:flex flex-col gap-2 pt-4">
            <div className="flex items-center h-10">
              <div className="flex-1 flex flex-col gap-1 justify-center">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-[var(--text-primary)]">{topComment.user}</span>
                  <span className="text-[var(--text-secondary)] flex-1 min-w-0 tracking-tight">
                    {topComment.text}
                  </span>
                </div>
                <button className="text-[13px] text-[var(--text-tet)] tracking-tight text-left w-fit hover:text-[var(--text-secondary)] transition-colors">
                  View all {commentCount} comments
                </button>
              </div>
            </div>

            {/* Add-comment input row */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2">
                <AvatarImg src={commentAvatar} name="You" size={32} />
                <span className="text-sm font-medium text-[var(--text-disabled)] whitespace-nowrap">
                  Add a comment...
                </span>
              </div>
              <button className="opacity-50 text-base font-medium text-[var(--text-secondary)] tracking-tight">
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
