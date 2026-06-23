/**
 * Root page — the main social feed of Expert Listing.
 *
 * Layout (desktop):
 *   [LeftSidebar 270px] | [Feed flex-1, max 716px] | [RightPanel 270px]
 *   Each column scrolls independently; the overall page does not scroll.
 *
 * Layout (mobile):
 *   Full-width feed only. Sidebars are hidden. A fixed bottom nav bar
 *   and a floating "+" FAB are rendered by <BottomNav>.
 */
import Navbar      from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import StoriesBar  from "@/components/StoriesBar";
import CreatePostCard from "@/components/CreatePostCard";
import FeedSection from "@/components/FeedSection";
import RightPanel  from "@/components/RightPanel";
import BottomNav   from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      <Navbar />

      {/*
        On desktop the wrapper is exactly viewport-height minus the navbar so
        the three columns scroll independently without a page-level scrollbar.
        On mobile the wrapper has no fixed height — the page scrolls naturally.
      */}
      <div className="max-w-[1440px] mx-auto lg:h-[calc(100vh-80px)] lg:px-[52px]">
        <div className="flex gap-10 lg:h-full lg:min-h-0">

          {/* Left sidebar — desktop only */}
          <aside className="hidden lg:block w-[270px] shrink-0 py-8 overflow-y-auto">
            <LeftSidebar />
          </aside>

          {/*
            Main feed column.
            `feed-scroll` (globals.css) hides the scrollbar while keeping
            scroll functionality intact.
          */}
          <main className="feed-scroll flex-1 min-w-0
                           lg:max-w-[716px] lg:overflow-y-auto
                           flex flex-col gap-4 lg:gap-6
                           px-4 lg:px-0
                           pt-4 lg:pt-6
                           pb-[90px] lg:pb-6">

            {/* Stories strip — fetches /api/stories */}
            <div className="shrink-0">
              <StoriesBar />
            </div>

            {/* Create-post card — desktop only (mobile uses the FAB) */}
            <div className="hidden lg:block shrink-0">
              <CreatePostCard />
            </div>

            {/* Paginated feed — fetches /api/posts with infinite scroll */}
            <FeedSection />
          </main>

          {/* Right panel — desktop only, fetches /api/right-panel */}
          <aside className="hidden lg:block w-[270px] shrink-0 py-8 overflow-y-auto">
            <RightPanel />
          </aside>

        </div>
      </div>

      {/* Mobile bottom navigation bar + floating "+" action button */}
      <BottomNav />
    </div>
  );
}
