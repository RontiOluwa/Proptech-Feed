/**
 * BottomNav — mobile-only fixed navigation bar + floating action button.
 *
 * Both elements use `lg:hidden` so they are completely absent on desktop.
 *
 * FAB (floating action button):
 *   Fixed at bottom-right, sits above the nav bar (bottom-[72px]).
 *   Opens <CreatePostModal> on tap.
 *
 * Bottom nav tabs:
 *   Feed / Search / List / Notification / Profile.
 *   The "List" tab also opens <CreatePostModal>.
 *   The active tab is highlighted with the primary green colour.
 *   `pb-safe` adds padding for the iOS home indicator bar.
 */
"use client";

import { useState } from "react";
import { House, MagnifyingGlass, Bell, User, Plus } from "@phosphor-icons/react/dist/ssr";
import CreatePostModal from "./CreatePostModal";

const tabs = [
  { icon: House,           label: "Feed",         action: "nav"  },
  { icon: MagnifyingGlass, label: "Search",        action: "nav"  },
  { icon: Plus,            label: "List",          action: "post" }, // opens modal
  { icon: Bell,            label: "Notification",  action: "nav"  },
  { icon: User,            label: "Profile",       action: "nav"  },
];

export default function BottomNav() {
  const [activeTab, setActiveTab]   = useState(0);
  const [modalOpen, setModalOpen]   = useState(false);

  function handleTabPress(index: number, action: string) {
    if (action === "post") {
      setModalOpen(true);
    } else {
      setActiveTab(index);
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="lg:hidden fixed bottom-[72px] right-4 z-50 w-14 h-14 bg-[var(--primary-main)] rounded-full flex items-center justify-center shadow-lg shadow-black/40"
        aria-label="Create post"
      >
        <Plus size={26} weight="bold" className="text-white" />
      </button>

      {/* Bottom nav bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--base)] border-t border-[var(--border1)]">
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {tabs.map(({ icon: Icon, label, action }, i) => {
            const isActive = action === "nav" && activeTab === i;
            const isPost   = action === "post";
            return (
              <button
                key={label}
                onClick={() => handleTabPress(i, action)}
                className="flex flex-col items-center gap-[3px] px-3 py-1"
              >
                {isPost ? (
                  /* "List" tab gets a small green pill background */
                  <div className="w-10 h-7 rounded-full bg-[var(--primary-main)] flex items-center justify-center">
                    <Icon size={18} weight="bold" className="text-white" />
                  </div>
                ) : (
                  <Icon
                    size={22}
                    weight={isActive ? "fill" : "regular"}
                    className={isActive ? "text-[var(--primary-main)]" : "text-[var(--text-secondary)]"}
                  />
                )}
                <span
                  className={`text-[10px] font-medium ${
                    isPost
                      ? "text-[var(--primary-main)]"
                      : isActive
                      ? "text-[var(--primary-main)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Create-post sheet modal */}
      <CreatePostModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
