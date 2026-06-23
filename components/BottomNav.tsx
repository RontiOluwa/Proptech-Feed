/**
 * BottomNav — mobile-only fixed navigation bar + floating action button.
 *
 * Both elements use `lg:hidden` so they are completely absent on desktop.
 *
 * FAB (floating action button):
 *   Fixed at bottom-right, sits above the nav bar (bottom-[72px]).
 *   Mirrors the "Create Post" button in the desktop left sidebar.
 *
 * Bottom nav tabs:
 *   Feed / Search / List / Notification / Profile.
 *   The active tab is highlighted with the primary green colour.
 *   `pb-safe` adds padding for the iOS home indicator bar.
 */
"use client";

import { House, MagnifyingGlass, Rows, Bell, User, Plus } from "@phosphor-icons/react/dist/ssr";

const tabs = [
  { icon: House, label: "Feed", active: true },
  { icon: MagnifyingGlass, label: "Search" },
  { icon: Plus, label: "List" },
  { icon: Bell, label: "Notification" },
  { icon: User, label: "Profile" },
];

export default function BottomNav() {
  return (
    <>
      {/* Floating Action Button */}
      <button className="lg:hidden fixed bottom-[72px] right-4 z-50 w-14 h-14 bg-[var(--primary-main)] rounded-full flex items-center justify-center shadow-lg shadow-black/40">
        <Plus size={26} weight="bold" className="text-white" />
      </button>

      {/* Bottom nav bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--base)] border-t border-[var(--border1)]">
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {tabs.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-[3px] px-3 py-1"
            >
              <Icon
                size={22}
                weight={active ? "fill" : "regular"}
                className={active ? "text-[var(--primary-main)]" : "text-[var(--text-secondary)]"}
              />
              <span
                className={`text-[10px] font-medium ${active ? "text-[var(--primary-main)]" : "text-[var(--text-secondary)]"
                  }`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
