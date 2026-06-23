/**
 * RightPanel — desktop-only sidebar showing community discovery widgets.
 *
 * Data is fetched from GET /api/right-panel on mount.
 * While loading, <RightPanelSkeleton> is shown.
 *
 * Sections:
 *   1. Trending Locations  — areas with the most posts today.
 *   2. Hot Requests        — active buy/rent requests from the community.
 *   3. Top Communities     — largest groups users can join.
 *
 * Icons use inline SVGs with a gold (#E8A020) fill to match the Figma design.
 * Phosphor's `MapPin`, `Flame`, and `Users` icons were not used because the
 * design requires a specific filled style that differs from Phosphor's defaults.
 */
"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { RightPanelData } from "@/types";

const GOLD = "#E8A020";

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={GOLD} />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5 0.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" fill={GOLD} />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill={GOLD} />
    </svg>
  );
}

/** Shown while /api/right-panel is loading. */
function RightPanelSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Three cards: 3 rows, 2 rows, 3 rows */}
      {[3, 2, 3].map((rows, si) => (
        <div key={si} className="bg-[var(--base)] border border-[var(--border1)] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="sk w-5 h-5 rounded" />
            <div className="sk h-3 w-32 rounded" />
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="border border-[var(--border1)] rounded-xl p-3 flex flex-col gap-2">
                <div className="sk h-2.5 w-28 rounded" />
                <div className="sk h-2 w-full rounded" />
                <div className="sk h-2 w-3/4 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RightPanel() {
  const [data, setData] = useState<RightPanelData | null>(null);

  /* Fetch all right-panel sections in a single request. */
  useEffect(() => {
    fetch("/api/right-panel")
      .then((r) => r.json())
      .then((d: RightPanelData) => setData(d));
  }, []);

  if (!data) return <RightPanelSkeleton />;

  const { trendingLocations, hotRequests, topCommunities } = data;

  return (
    <div className="flex flex-col gap-4">

      {/* Trending Locations */}
      <div className="bg-[var(--base)] border border-[var(--border1)] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPinIcon />
          <h3 className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
            Trending Locations
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          {trendingLocations.map((loc) => (
            <button key={loc.id} className="text-left hover:bg-white/5 rounded-lg transition-colors w-full">
              <p className="text-[14px] font-semibold text-[var(--text-primary)] tracking-tight leading-snug">
                {loc.name}
              </p>
              <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
                {loc.postCount} post today
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Hot Requests */}
      <div className="bg-[var(--base)] border border-[var(--border1)] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <FlameIcon />
          <h3 className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
            Hot Requests
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          {hotRequests.map((req) => (
            <div key={req.id} className="border border-[var(--border1)] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[13px] font-bold text-[var(--text-primary)]">{req.requestType}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)] inline-block" />
                <span className="text-[13px] font-bold text-[var(--text-primary)]">{req.area}</span>
              </div>
              <p className="text-[12px] text-[var(--text-secondary)] leading-snug mb-2">{req.description}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-[var(--text-secondary)]">{req.priceRange}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)] inline-block" />
                <span className="text-[12px] text-[var(--text-secondary)]">{req.responses} responses</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Communities */}
      <div className="bg-[var(--base)] border border-[var(--border1)] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <UsersIcon />
          <h3 className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
            Top Communities
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          {topCommunities.map((c) => (
            <button
              key={c.id}
              className="flex items-center justify-between w-full border border-[var(--border1)] rounded-xl px-3 py-3 hover:bg-white/5 transition-colors text-left"
            >
              <div>
                <p className="text-[14px] font-semibold text-[var(--text-primary)] tracking-tight">{c.name}</p>
                <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">{c.memberCount}</p>
              </div>
              <ArrowRight size={16} className="text-[var(--text-secondary)] shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
