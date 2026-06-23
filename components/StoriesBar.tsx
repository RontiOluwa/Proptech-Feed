/**
 * StoriesBar — horizontal scrollable strip of user story avatars.
 *
 * Data is fetched from GET /api/stories on mount.
 * While loading, shimmer skeleton circles are shown.
 *
 * Navigation arrows appear/disappear dynamically:
 *   - Left arrow  → only when scrolled past the first item.
 *   - Right arrow → only when there are hidden items to the right.
 * Both arrows overlay the strip with a matching gradient fade behind them
 * so the edge avatars don't hard-clip under the button.
 */
"use client";

import { useRef, useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { Story } from "@/types";

/** How many pixels to scroll per arrow click — roughly 3 avatars. */
const SCROLL_AMOUNT = 220;

/** Shown while /api/stories is loading. */
function StoriesSkeleton() {
  return (
    <div className="flex flex-row items-start gap-4 px-2 pb-2 pt-2 overflow-hidden">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
          <div className="sk w-[60px] h-[60px] rounded-full" />
          <div className="sk h-2 w-10 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function StoriesBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [stories, setStories]               = useState<Story[]>([]);
  const [loading, setLoading]               = useState(true);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* Fetch stories from the API on mount. */
  useEffect(() => {
    fetch("/api/stories")
      .then((r) => r.json())
      .then((data: Story[]) => {
        setStories(data);
        setLoading(false);
      });
  }, []);

  /**
   * Recalculate which directional arrows should be visible.
   * A 4 px threshold avoids flickering at sub-pixel scroll positions.
   */
  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  /* Re-attach scroll listener whenever stories change (i.e., after load). */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, [stories]);

  const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left:  SCROLL_AMOUNT, behavior: "smooth" });

  if (loading) return <StoriesSkeleton />;

  return (
    <div className="relative">

      {/* Scrollable avatar strip */}
      <div
        ref={scrollRef}
        className="stories-scroll flex flex-row items-start gap-4 overflow-x-auto pb-2 pt-2 px-2"
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
          >
            {/* Green gradient ring — same visual style as Instagram stories */}
            <div
              className="rounded-full p-[2px]"
              style={{ background: "linear-gradient(135deg, #105b48, #a8dc66)" }}
            >
              <div className="p-[2px] rounded-full bg-[#0d0d0d]">
                <img
                  src={story.avatarUrl}
                  alt={story.name}
                  width={56}
                  height={56}
                  className="w-[56px] h-[56px] rounded-full object-cover block"
                />
              </div>
            </div>
            <span className="text-[11px] text-[var(--text-secondary)] tracking-tight max-w-[62px] truncate text-center leading-tight">
              {story.name}
            </span>
          </div>
        ))}
      </div>

      {/* Left arrow + fade */}
      {canScrollLeft && (
        <>
          <div
            className="absolute top-0 left-0 bottom-2 w-16 pointer-events-none"
            style={{ background: "linear-gradient(to left, transparent, #0d0d0d 75%)" }}
          />
          <div className="absolute left-1 top-0 bottom-2 flex items-center justify-center">
            <button
              onClick={scrollLeft}
              className="bg-[var(--base)] border border-[var(--border1)] rounded-full w-7 h-7 flex items-center justify-center shadow z-10"
            >
              <CaretLeft size={14} className="text-[var(--text-secondary)]" />
            </button>
          </div>
        </>
      )}

      {/* Right arrow + fade */}
      {canScrollRight && (
        <>
          <div
            className="absolute top-0 right-0 bottom-2 w-16 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, #0d0d0d 75%)" }}
          />
          <div className="absolute right-1 top-0 bottom-2 flex items-center justify-center">
            <button
              onClick={scrollRight}
              className="bg-[var(--base)] border border-[var(--border1)] rounded-full w-7 h-7 flex items-center justify-center shadow z-10"
            >
              <CaretRight size={14} className="text-[var(--text-secondary)]" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
