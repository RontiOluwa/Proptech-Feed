/**
 * CreatePostCard — the composer card shown at the top of the desktop feed.
 *
 * Hidden on mobile — the floating "+" FAB in <BottomNav> serves that role.
 *
 * Features:
 *   - Three tabs: Property | General | Request (controlled by `activeTab` state).
 *   - Textarea that grows automatically via `rows` + `resize-none`.
 *   - "Post" button is disabled until the textarea has non-whitespace content.
 *   - Avatar placeholder is a person silhouette SVG (not a photo) — the user
 *     is not authenticated so there is no real profile picture available.
 */
"use client";

import { useState } from "react";
import { Buildings, MapPin } from "@phosphor-icons/react/dist/ssr";

/** Inline chat-bubble SVG used as the "General" tab icon. */
function ChatBubbleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M14 2H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2l2 2 2-2h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />
    </svg>
  );
}

/** Inline inbox/tray SVG used as the "Request" tab icon. */
function InboxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1.5 10h3l2 2.5L9 10h3.5V3.5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1V10Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />
    </svg>
  );
}

const tabs = [
  { label: "Property", icon: <Buildings size={16} /> },
  { label: "General",  icon: <ChatBubbleIcon />       },
  { label: "Request",  icon: <InboxIcon />            },
];

export default function CreatePostCard() {
  const [text, setText]         = useState("");
  const [activeTab, setActiveTab] = useState(1); // default to "General"

  return (
    <div className="bg-[var(--base)] border border-[var(--border1)] rounded-xl px-4 pb-4 pt-1.5">

      {/* Post-type tabs */}
      <div className="flex items-center gap-0.5">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            className={`flex items-center gap-2 px-4 py-2 text-[13px] font-medium transition-colors ${
              activeTab === i
                ? "text-[var(--primary-main)] border-b border-[var(--primary-main)]"
                : "text-[var(--text-secondary)]"
            }`}
          >
            <span className={activeTab === i ? "text-[var(--primary-main)]" : "text-[var(--text-secondary)]"}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Composer row */}
      <div className="flex items-start gap-2 py-4 w-full">
        {/* Person silhouette — placeholder since user is not logged in */}
        <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[var(--border1)] flex items-center justify-center shrink-0 mt-1 overflow-hidden">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="#555" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#555" />
          </svg>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share an update, ask a question, say hi..."
          rows={2}
          className="flex-1 resize-none bg-transparent text-base font-medium text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] tracking-tight outline-none py-1 leading-relaxed"
        />
      </div>

      {/* Bottom action bar */}
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 flex items-center gap-3">
          <button className="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-white/5 transition-colors">
            <MapPin size={16} className="text-[var(--text-secondary)]" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Location</span>
          </button>
        </div>

        {/* Disabled until the user types something */}
        <button
          disabled={!text.trim()}
          className="bg-[var(--primary-main)] flex items-center justify-center px-4 py-2 rounded-full transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
        >
          <span className="text-base font-medium text-white tracking-tight">Post</span>
        </button>
      </div>
    </div>
  );
}
