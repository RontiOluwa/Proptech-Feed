/**
 * FeedSection — paginated, infinitely-scrolling post list.
 *
 * Flow:
 *   1. On mount, fetches page 1 from GET /api/posts.
 *   2. Shows typed skeleton placeholders (text / property / video) while loading.
 *   3. Once posts arrive, renders them via <PostCard>.
 *   4. A 1 px sentinel <div> sits at the bottom of the list.
 *      IntersectionObserver fires when the sentinel enters the viewport
 *      (or comes within 200 px of it) and triggers the next page fetch.
 *   5. While the next page loads, <Preloader> shows shimmer skeletons below
 *      the existing posts.
 *   6. After the last page, "You're all caught up ✓" is shown.
 *
 * Why refs instead of state for isFetching / hasMore / nextPage:
 *   The IntersectionObserver callback is set up once (stable fetchPage ref).
 *   State reads inside a stale closure would give wrong values; refs always
 *   return the latest value without requiring the effect to re-subscribe.
 *
 * Why the sentinel must always be in the DOM:
 *   If we used an early `return` for the skeleton phase, the sentinel would
 *   never mount, sentinelRef.current would be null when the effect runs, and
 *   the observer would never attach — breaking infinite scroll entirely.
 */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import FeedPost,     { TextPostSkeleton }     from "./FeedPost";
import PropertyPost, { PropertyPostSkeleton } from "./PropertyPost";
import VideoPost,    { VideoPostSkeleton }    from "./VideoPost";
import type { AnyPost } from "@/types";

interface PostsResponse {
  posts: AnyPost[];
  hasMore: boolean;
  nextPage: number | null;
}

/** Skeleton sequence shown on the initial page-1 load. */
const INITIAL_SKELETONS = [
  "text", "property", "video", "text", "property", "text", "text",
] as const;

/** Three shimmer cards displayed below the feed while the next page loads. */
function Preloader() {
  return (
    <>
      <TextPostSkeleton />
      <PropertyPostSkeleton />
      <TextPostSkeleton />
    </>
  );
}

/** Selects the correct component for a given post discriminated union. */
function PostCard({ post }: { post: AnyPost }) {
  if (post.type === "property") return <PropertyPost data={post} />;
  if (post.type === "video")    return <VideoPost    data={post} />;
  return                               <FeedPost     {...post}   />;
}

export default function FeedSection() {
  const [posts, setPosts]                   = useState<AnyPost[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore]       = useState(false);
  const [exhausted, setExhausted]           = useState(false);

  const sentinelRef   = useRef<HTMLDivElement>(null);
  const nextPageRef   = useRef(1);          // next page number to request
  const isFetchingRef = useRef(false);      // guard against concurrent fetches
  const hasMoreRef    = useRef(true);       // mirror of hasMore for the observer closure

  /** Fetches one page and appends it to the post list. */
  const fetchPage = useCallback(async () => {
    if (isFetchingRef.current || !hasMoreRef.current) return;
    isFetchingRef.current = true;

    const page = nextPageRef.current;
    if (page === 1) setInitialLoading(true);
    else            setLoadingMore(true);

    try {
      const res  = await fetch(`/api/posts?page=${page}`);
      const data: PostsResponse = await res.json();

      /* Replace list on first load; append on subsequent pages. */
      setPosts((prev) => page === 1 ? data.posts : [...prev, ...data.posts]);

      hasMoreRef.current  = data.hasMore;
      nextPageRef.current = data.nextPage ?? nextPageRef.current;
      if (!data.hasMore) setExhausted(true);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, []); // stable — relies on refs, not state

  /* Kick off the initial fetch. */
  useEffect(() => { fetchPage(); }, [fetchPage]);

  /*
   * Attach a single IntersectionObserver to the sentinel element.
   * rootMargin: "200px" pre-fetches the next page before the user
   * reaches the very bottom, keeping the scroll experience seamless.
   */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) fetchPage(); },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchPage]);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">

      {/* Initial skeleton — same DOM layer as real posts */}
      {initialLoading && INITIAL_SKELETONS.map((type, i) => {
        if (type === "property") return <PropertyPostSkeleton key={i} />;
        if (type === "video")    return <VideoPostSkeleton    key={i} />;
        return                          <TextPostSkeleton     key={i} />;
      })}

      {/* Real post cards */}
      {!initialLoading && posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Inline preloader while the next page is in-flight */}
      {loadingMore && <Preloader />}

      {/*
        Sentinel — always rendered so the observer is active from first mount.
        Keeping it outside the conditional blocks is what makes infinite scroll
        work; see the file-level comment for the full explanation.
      */}
      <div ref={sentinelRef} className="h-px" />

      {/* End-of-feed message */}
      {exhausted && !loadingMore && (
        <p className="text-center py-6 text-[13px] text-[var(--text-tet)] tracking-tight">
          You&apos;re all caught up ✓
        </p>
      )}
    </div>
  );
}
