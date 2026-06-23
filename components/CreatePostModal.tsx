/**
 * CreatePostModal — mobile-only slide-up sheet for composing a new post.
 *
 * Triggered by the FAB or the "List" tab in <BottomNav>.
 * Animates in from the bottom with a translate-y transition.
 * Body scroll is locked while the sheet is open.
 *
 * Tabs mirror <CreatePostCard>: Property | General | Request.
 */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Buildings,
  MapPin,
  Image as ImageIcon,
  VideoCamera,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";

/** Inline chat-bubble SVG — same as in CreatePostCard. */
function ChatBubbleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M14 2H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2l2 2 2-2h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Inline inbox SVG — same as in CreatePostCard. */
function InboxIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M1.5 10h3l2 2.5L9 10h3.5V3.5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1V10Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const tabs = [
  { label: "Property", icon: <Buildings size={16} /> },
  { label: "General", icon: <ChatBubbleIcon size={16} /> },
  { label: "Request", icon: <InboxIcon size={16} /> },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ open, onClose }: Props) {
  const [activeTab, setActiveTab] = useState(1); // default: General
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* Lock body scroll while open and focus the textarea on open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      /* Small delay lets the slide-up animation start before focus. */
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Auto-grow the textarea as the user types. */
  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  function handleClose() {
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Sheet panel — slides up from bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[90] bg-[#141414] rounded-t-3xl transition-transform duration-300 ease-out ${open ? "translate-y-0" : "translate-y-full"
          }`}
        style={{ maxHeight: "90dvh" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border1)]">
          <h2 className="text-[16px] font-semibold text-[var(--text-primary)] tracking-tight">
            Create Post
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-[var(--text-secondary)]"
            aria-label="Close"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(90dvh - 120px)" }}>

          {/* Post-type tabs */}
          <div className="flex items-center border-b border-[var(--border1)] px-2">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-3.5 text-[13px] font-medium transition-colors border-b-2 -mb-px ${activeTab === i
                    ? "text-[var(--primary-main)] border-[var(--primary-main)]"
                    : "text-[var(--text-secondary)] border-transparent"
                  }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Composer area */}
          <div className="px-5 py-4 flex items-start gap-3">
            {/* Avatar placeholder */}
            <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[var(--border1)] flex items-center justify-center shrink-0 overflow-hidden">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#555" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#555" />
              </svg>
            </div>

            <div className="flex-1 flex flex-col gap-1 pt-1">
              {/* Audience selector */}
              <button className="self-start flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
                <span className="text-[12px] font-semibold text-[var(--text-primary)]">Everyone</span>
                <CaretDown size={11} className="text-[var(--text-secondary)]" />
              </button>

              {/* Auto-growing textarea */}
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleInput}
                placeholder={
                  activeTab === 0
                    ? "Describe your property listing..."
                    : activeTab === 2
                      ? "What are you looking for?"
                      : "Share an update, ask a question, say hi..."
                }
                rows={4}
                className="w-full resize-none bg-transparent text-[16px] font-medium text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none leading-relaxed mt-2"
                style={{ minHeight: 100 }}
              />
            </div>
          </div>

          {/* Property-specific extra fields */}
          {activeTab === 0 && (
            <div className="px-5 pb-4 flex flex-col gap-3">
              <div className="border border-[var(--border1)] rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-[14px] text-[var(--text-secondary)]">Listing type</span>
                <div className="flex items-center gap-1">
                  <span className="text-[14px] font-medium text-[var(--text-primary)]">For Sale</span>
                  <CaretDown size={14} className="text-[var(--text-secondary)]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="px-5 py-4 border-t border-[var(--border1)] flex items-center gap-3">
          {/* Attachment buttons */}
          <div className="flex-1 flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-[var(--text-secondary)]">
              <ImageIcon size={22} />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-[var(--text-secondary)]">
              <VideoCamera size={22} />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-[var(--text-secondary)]">
              <MapPin size={22} />
            </button>
          </div>

          {/* Post button */}
          <button
            disabled={!text.trim()}
            className="bg-[var(--primary-main)] text-white text-[15px] font-semibold px-6 py-2.5 rounded-full transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}
