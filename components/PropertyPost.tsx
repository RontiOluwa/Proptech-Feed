"use client";

import { useState } from "react";
import {
  Heart,
  ChatCircle,
  PaperPlaneRight,
  BookmarkSimple,
  MapPin,
  DotsThree,
  Key,
  Tag,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";
import type { PropertyPostData } from "@/types";

const DOT = (
  <span className="w-1 h-1 rounded-full bg-[var(--text-tet)] shrink-0 inline-block" />
);

function ImageSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="mb-4">
      <div className="relative rounded-xl overflow-hidden h-[240px]">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / images.length)}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Property ${i + 1}`}
              className="h-full object-cover shrink-0"
              style={{ width: `${100 / images.length}%` }}
            />
          ))}
        </div>

        {current > 0 && (
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/75 transition-colors z-10"
          >
            <CaretLeft size={15} weight="bold" />
          </button>
        )}
        {current < images.length - 1 && (
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/75 transition-colors z-10"
          >
            <CaretRight size={15} weight="bold" />
          </button>
        )}
        <div className="absolute top-2.5 right-2.5 bg-black/55 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-white text-[11px] font-medium z-10">
          {current + 1} / {images.length}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-2.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-200 ${
              i === current
                ? "w-4 h-1.5 bg-[var(--selected)]"
                : "w-1.5 h-1.5 bg-[var(--text-tet)] hover:bg-[var(--text-secondary)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function PropertyPostSkeleton() {
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
      <div className="sk h-3 w-3/4 rounded mb-3" />
      <div className="sk h-2.5 w-48 rounded mb-3" />
      <div className="sk rounded-xl h-[240px] w-full mb-4" />
      <div className="flex gap-6 mb-3">
        <div className="sk h-5 w-12 rounded" />
        <div className="sk h-5 w-12 rounded" />
        <div className="sk h-5 w-8 rounded" />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[0,1,2].map(i => <div key={i} className="sk w-6 h-6 rounded-full -ml-1 first:ml-0" />)}
        </div>
        <div className="sk h-2.5 w-36 rounded" />
      </div>
    </div>
  );
}

export default function PropertyPost({ data }: { data: PropertyPostData }) {
  const isRent = data.tag === "For Rent";

  return (
    <div className="bg-[var(--base)] border border-[var(--border1)] rounded-2xl px-5 pt-5 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar with green ring */}
        <div className="shrink-0 rounded-full p-[2px] bg-[var(--primary-main)]">
          {data.user.avatar ? (
            <img
              src={data.user.avatar}
              alt={data.user.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover block"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              style={{ background: data.user.bg }}
            >
              {data.user.initials}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-[var(--text-primary)] tracking-tight">
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

        <DotsThree size={20} className="text-[var(--text-secondary)] cursor-pointer shrink-0" />
      </div>

      {/* Caption */}
      <p className="text-[15px] font-medium text-[var(--text-primary)] leading-snug mb-3">
        {data.caption}
      </p>

      {/* Location + Tag inline */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin size={15} className="text-[var(--text-secondary)] shrink-0" />
          <span className="text-[14px] text-[var(--text-secondary)] tracking-tight">
            {data.location}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--selected)]">
          {isRent ? <Key size={14} weight="bold" /> : <Tag size={14} weight="bold" />}
          <span className="text-[14px] font-semibold tracking-tight">{data.tag}</span>
        </div>
      </div>

      {/* Image slider */}
      <ImageSlider images={data.images} />

      {/* Actions */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-1 flex items-center gap-[18px] text-[var(--text-secondary)]">
          <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
            <Heart size={22} />
            <span className="text-base font-medium tracking-tight">{data.likes}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <ChatCircle size={22} />
            <span className="text-base font-medium tracking-tight">{data.comments}</span>
          </button>
          <button className="hover:text-[var(--text-primary)] transition-colors">
            <PaperPlaneRight size={22} />
          </button>
        </div>
        <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-accent transition-colors">
          <BookmarkSimple size={22} />
          <span className="text-base font-medium tracking-tight">{data.saves}</span>
        </button>
      </div>

      {/* Liked by */}
      {data.likedBy && data.likedBy.avatars.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {data.likedBy.avatars.slice(0, 3).map((a, i) => (
              <img
                key={i}
                src={a}
                alt=""
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover border-2 border-[var(--base)]"
                style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 3 - i }}
              />
            ))}
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] tracking-tight">
            Liked by{" "}
            <span className="font-semibold text-[var(--text-primary)]">{data.likedBy.names}</span>
          </p>
        </div>
      )}

      {/* Top comment — desktop only */}
      {data.topComment && (
        <div className="hidden lg:block mt-3 pt-3 border-t border-[var(--border1)]">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-[var(--text-primary)]">{data.topComment.user}</span>
            <span className="text-[var(--text-secondary)] truncate">{data.topComment.text}</span>
          </div>
          <button className="text-[13px] text-[var(--text-tet)] mt-1 hover:text-[var(--text-secondary)] transition-colors">
            View all {data.commentCount} comments
          </button>
        </div>
      )}
    </div>
  );
}
