"use client";

import { useRef, useState } from "react";
import {
  Heart,
  ChatCircle,
  PaperPlaneRight,
  BookmarkSimple,
  MapPin,
  DotsThree,
  Play,
  Pause,
} from "@phosphor-icons/react/dist/ssr";
import type { VideoPostData } from "@/types";

const DOT = (
  <span className="w-1 h-1 rounded-full bg-[var(--text-tet)] shrink-0 inline-block" />
);

export function VideoPostSkeleton() {
  return (
    <div className="bg-[var(--base)] border border-[var(--border1)] rounded-2xl px-5 pt-5 pb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="sk w-10 h-10 rounded-full shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="sk h-3 w-28 rounded" />
          <div className="sk h-2.5 w-20 rounded" />
        </div>
      </div>
      <div className="sk h-3 w-full rounded mb-1.5" />
      <div className="sk h-3 w-2/3 rounded mb-3" />
      <div className="sk rounded-xl h-[380px] w-full mb-3" />
      <div className="sk h-3 w-32 rounded mb-4" />
      <div className="flex gap-6">
        <div className="sk h-5 w-12 rounded" />
        <div className="sk h-5 w-12 rounded" />
        <div className="sk h-5 w-8 rounded" />
      </div>
    </div>
  );
}

export default function VideoPost({ data }: { data: VideoPostData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (!v.paused) {
      v.pause();
      setIsPlaying(false);
    } else {
      try {
        await v.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="bg-[var(--base)] border border-[var(--border1)] rounded-2xl px-5 pt-5 pb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <img
          src={data.user.avatar}
          alt={data.user.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-base font-medium text-[var(--text-primary)] tracking-tight">
              {data.user.name}
            </span>
            {DOT}
            <span className="text-[13px] text-[var(--text-tet)]">{data.user.type}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] text-[var(--text-tet)]">{data.category}</span>
            {DOT}
            <span className="text-[13px] text-[var(--text-tet)]">{data.time}</span>
          </div>
        </div>
        <DotsThree size={16} className="text-[var(--text-secondary)] cursor-pointer" />
      </div>

      <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed mb-3">
        {data.caption}
      </p>

      {/* Video player */}
      <div
        className="relative rounded-xl overflow-hidden mb-3 bg-black cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          className="w-full h-[380px] object-cover"
          poster={data.poster}
          preload="metadata"
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={data.videoSrc} type="video/mp4" />
        </video>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />

        <button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={18} weight="fill" />
          ) : (
            <Play size={18} weight="fill" className="translate-x-[1px]" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-1 mb-3">
        <MapPin size={15} className="text-[var(--text-secondary)] shrink-0" />
        <span className="text-[13px] font-medium text-[var(--text-secondary)] tracking-tight">
          {data.location}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-[18px] text-[var(--text-secondary)]">
          <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
            <Heart size={24} />
            <span className="text-base font-medium tracking-tight">{data.likes}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <ChatCircle size={24} />
            <span className="text-base font-medium tracking-tight">{data.comments}</span>
          </button>
          <button className="hover:text-[var(--text-primary)] transition-colors">
            <PaperPlaneRight size={24} />
          </button>
        </div>
        <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-accent transition-colors">
          <BookmarkSimple size={24} />
          <span className="text-base font-medium tracking-tight">{data.saves}</span>
        </button>
      </div>

      <div className="hidden lg:block mt-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-[var(--text-primary)]">{data.topComment.user}</span>
          <span className="text-[var(--text-secondary)] truncate">{data.topComment.text}</span>
        </div>
        <button className="text-[13px] text-[var(--text-tet)] mt-1 hover:text-[var(--text-secondary)] transition-colors">
          View all {data.commentCount} comments
        </button>
      </div>
    </div>
  );
}
