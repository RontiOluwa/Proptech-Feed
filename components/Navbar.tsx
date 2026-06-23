/**
 * Top navigation bar.
 *
 * Responsive behaviour:
 *   Mobile  (< lg) — logo + "Sign In" text + hamburger icon.
 *                    Tapping the hamburger opens a full-height slide-in drawer.
 *   Desktop (≥ lg) — logo + nav links + bell + "List Property" + green Sign In pill.
 *
 * Height: 56 px mobile / 80 px desktop — must match the
 * `calc(100vh - 80px)` offset used in page.tsx for the desktop column layout.
 */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Bell,
  CaretDown,
  List,
  X,
  EnvelopeSimple,
  Rocket,
  BookmarkSimple,
  Users,
  Plus,
  House,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";

const navLinks = [
  { label: "Feed",               active: true  },
  { label: "Rent",               dropdown: true },
  { label: "Buy",                dropdown: true },
  { label: "Snagging"                          },
  { label: "Shortlets"                         },
  { label: "Find Professionals"                },
];

const quickLinks = [
  { icon: House,           label: "Feed"        },
  { icon: MagnifyingGlass, label: "Explore"     },
  { icon: EnvelopeSimple,  label: "Messages"    },
  { icon: Rocket,          label: "My Boosts"   },
  { icon: BookmarkSimple,  label: "Saved"        },
  { icon: Users,           label: "Communities" },
];

const filters = ["Location", "Listing Type", "Budget", "User Type"];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Lock body scroll while the drawer is open. */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <nav className="bg-[var(--base)] border-b border-[var(--border1)] flex items-center px-4 lg:px-6 h-[56px] lg:h-20 sticky top-0 z-50 w-full">

        {/* Brand logo */}
        <div className="flex items-center flex-1 lg:flex-1">
          <Image
            src="/images/logo.png"
            alt="Expert Listing"
            width={140}
            height={32}
            className="h-7 w-auto object-contain"
            priority
          />
        </div>

        {/* Primary nav links — desktop only */}
        <div className="hidden lg:flex items-center shrink-0">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className={`flex items-center gap-1 px-2.5 py-3 cursor-pointer ${
                link.active ? "border-b-[1.5px] border-[var(--selected)]" : ""
              }`}
            >
              <span
                className={`text-[15px] font-medium whitespace-nowrap leading-snug tracking-tight ${
                  link.active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                }`}
              >
                {link.label}
              </span>
              {link.dropdown && (
                <CaretDown size={14} className="text-[var(--text-secondary)]" />
              )}
            </div>
          ))}
        </div>

        {/* Right actions — desktop */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-6">
          <Bell size={20} className="text-[var(--text-secondary)] cursor-pointer" />
          <span className="text-[var(--text-secondary)] text-base font-medium cursor-pointer whitespace-nowrap">
            List Property
          </span>
          <button className="bg-[var(--primary-main)] text-white rounded-full px-[18px] h-10 text-base font-medium">
            Sign In
          </button>
        </div>

        {/* Right actions — mobile */}
        <div className="flex lg:hidden items-center gap-4">
          <span className="text-[var(--text-primary)] text-[14px] font-medium">Sign In</span>
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-[var(--text-secondary)] p-1"
            aria-label="Open navigation menu"
          >
            <List size={22} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}

      {/* Backdrop — tap to close */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel — slides in from the right */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-[70] h-full w-[300px] bg-[#141414] border-l border-[var(--border1)] flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-[56px] border-b border-[var(--border1)] shrink-0">
          <Image
            src="/images/logo.png"
            alt="Expert Listing"
            width={120}
            height={28}
            className="h-6 w-auto object-contain"
          />
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-[var(--text-secondary)] p-1"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-6">

          {/* Nav section */}
          <div>
            <p className="text-[11px] font-semibold text-[var(--text-secondary)] tracking-widest uppercase px-2 mb-2">
              Browse
            </p>
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  className={`flex items-center justify-between w-full px-3 py-3 rounded-xl transition-colors text-left ${
                    link.active ? "bg-[var(--primary-main)]/15" : "hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`text-[15px] font-medium tracking-tight ${
                      link.active ? "text-[var(--selected)]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {link.label}
                  </span>
                  {link.dropdown && (
                    <CaretDown size={14} className="text-[var(--text-secondary)]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--border1)]" />

          {/* Quick links */}
          <div>
            <p className="text-[11px] font-semibold text-[var(--text-secondary)] tracking-widest uppercase px-2 mb-2">
              Quick Links
            </p>
            <div className="flex flex-col gap-0.5">
              {quickLinks.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                >
                  <Icon size={18} className="text-[var(--text-secondary)] shrink-0" />
                  <span className="text-[15px] font-medium text-[var(--text-secondary)] tracking-tight">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--border1)]" />

          {/* Filters */}
          <div>
            <p className="text-[11px] font-semibold text-[var(--text-secondary)] tracking-widest uppercase px-2 mb-2">
              Filter Feed
            </p>
            <div className="bg-[var(--base)] border border-[var(--border1)] rounded-xl overflow-hidden">
              {filters.map((filter, i) => (
                <button
                  key={filter}
                  className={`flex items-center gap-2 w-full px-4 py-4 hover:bg-white/5 transition-colors text-left ${
                    i < filters.length - 1 ? "border-b border-[var(--border1)]" : ""
                  }`}
                >
                  <span className="flex-1 text-[14px] font-medium text-[var(--text-secondary)] tracking-tight">
                    {filter}
                  </span>
                  <CaretDown size={14} className="text-[var(--text-secondary)] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky footer — primary CTAs */}
        <div className="shrink-0 px-4 py-4 border-t border-[var(--border1)] flex flex-col gap-3">
          <button className="bg-[var(--primary-main)] flex items-center justify-center gap-2 w-full py-3 rounded-full hover:opacity-90 transition-opacity">
            <Plus size={14} weight="bold" className="text-white" />
            <span className="text-[15px] font-semibold text-white tracking-tight">List Property</span>
          </button>
          <button className="border border-[var(--border1)] flex items-center justify-center w-full py-3 rounded-full hover:bg-white/5 transition-colors">
            <span className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">Sign In</span>
          </button>
        </div>
      </div>
    </>
  );
}
