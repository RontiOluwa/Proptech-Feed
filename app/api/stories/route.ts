/**
 * GET /api/stories
 *
 * Returns the ordered list of story avatars shown in the horizontal
 * stories bar at the top of the feed.
 *
 * The artificial 600 ms delay simulates network latency so the
 * skeleton loading state in StoriesBar is clearly visible during
 * development. Remove or reduce it before going to production.
 */
import { NextResponse } from "next/server";
import type { Story } from "@/types";

const stories: Story[] = [
  { id: "1",  name: "Alex",        avatarUrl: "https://i.pravatar.cc/60?img=5"  },
  { id: "2",  name: "Jordan",      avatarUrl: "https://i.pravatar.cc/60?img=12" },
  { id: "3",  name: "Taylor",      avatarUrl: "https://i.pravatar.cc/60?img=33" },
  { id: "4",  name: "Jamie",       avatarUrl: "https://i.pravatar.cc/60?img=11" },
  { id: "5",  name: "Morgan",      avatarUrl: "https://i.pravatar.cc/60?img=15" },
  { id: "6",  name: "Emerson",     avatarUrl: "https://i.pravatar.cc/60?img=47" },
  { id: "7",  name: "Sydney",      avatarUrl: "https://i.pravatar.cc/60?img=44" },
  { id: "8",  name: "Quinn",       avatarUrl: "https://i.pravatar.cc/60?img=60" },
  { id: "9",  name: "Parker",      avatarUrl: "https://i.pravatar.cc/60?img=52" },
  { id: "10", name: "Hayden",      avatarUrl: "https://i.pravatar.cc/60?img=9"  },
];

export async function GET() {
  await new Promise((r) => setTimeout(r, 600));
  return NextResponse.json(stories);
}
