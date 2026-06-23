/**
 * GET /api/posts?page=1
 *
 * Paginated feed endpoint.  Returns PAGE_SIZE posts per request plus
 * metadata the client needs for infinite scroll:
 *
 *   { posts: AnyPost[], hasMore: boolean, nextPage: number | null }
 *
 * Page 1 → ids 1–7   (initial feed)
 * Page 2 → ids 8–14  (loaded when the user reaches the bottom)
 * Page 3+ → hasMore: false, no further fetches triggered
 *
 * Delays:
 *   page 1 — 800 ms  (shows initial skeleton while the feed hydrates)
 *   page 2+ — 1000 ms (shows the inline preloader during infinite scroll)
 * Remove both delays before going to production.
 */
import { NextResponse } from "next/server";
import type { AnyPost } from "@/types";

const PAGE_SIZE = 7;

const allPosts: AnyPost[] = [
  // ── Page 1 ────────────────────────────────────────────────────────────
  {
    id: "1",
    type: "text",
    user: { name: "Maurice U", type: "Individual", avatar: "https://i.pravatar.cc/40?img=5" },
    time: "Just Now",
    category: "General",
    content:
      "How is everyone holding up with the flooding in Lekki this week? Stay safe out there — and let me know if anyone needs a temporary place to crash 🙏",
    location: "Lekki Phase 1, Lagos",
    likes: 8, comments: 8, saves: 2,
    topComment: { user: "tunde_b", text: "Roads around Admiralty are still bad. Thanks for checking in 🙏" },
    commentCount: 7,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=12", "https://i.pravatar.cc/24?img=33", "https://i.pravatar.cc/24?img=44"],
      names: "miracle.h and 7 others",
    },
    commentAvatar: "https://i.pravatar.cc/32?img=11",
  },
  {
    id: "2",
    type: "property",
    user: { name: "Temi A.", type: "Agent", initials: "TA", bg: "#105b48", avatar: "https://i.pravatar.cc/40?img=45" },
    time: "1h ago", category: "Property",
    caption: "🏠 New listing just dropped! 3BR apartment in a serene estate in Lekki Phase 1. Available immediately. Swipe for more photos!",
    location: "Lekki Phase 1, Lagos", price: "₦4,500,000 / yr", tag: "For Rent",
    tagColor: "bg-blue-500/20 text-blue-400", beds: 3, baths: 2, sqft: "1,800 sqft",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=480&fit=crop",
    ],
    likes: 22, comments: 6, saves: 11,
    topComment: { user: "john_realty", text: "Is this still available? DM me!" },
    commentCount: 6,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=12", "https://i.pravatar.cc/24?img=33", "https://i.pravatar.cc/24?img=44"],
      names: "miracle.h and 21 others",
    },
  },
  {
    id: "3",
    type: "video",
    user: { name: "Kemi B.", type: "Agent", avatar: "https://i.pravatar.cc/40?img=3" },
    time: "30m ago", category: "Property",
    caption: "🎥 Virtual tour of this stunning 5BR mansion in Maitama, Abuja. The views from the rooftop are unmatched! Book a physical inspection today.",
    location: "Maitama, Abuja",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=760&fit=crop",
    likes: 37, comments: 14, saves: 19,
    topComment: { user: "ade.invest", text: "Wow, this place is gorgeous! What's the asking price?" },
    commentCount: 14,
  },
  {
    id: "4",
    type: "text",
    user: { name: "Sarah K.", type: "Agent", avatar: "https://i.pravatar.cc/40?img=47" },
    time: "2h ago", category: "Request",
    content: "Looking for a 3BR apartment in Ikoyi. Budget: ₦5M - ₦8M/year. Prefer serviced estate with 24hr power. DM me if you have something! 🏠",
    location: "Ikoyi, Lagos",
    likes: 14, comments: 5, saves: 9,
    topComment: { user: "lagos_realty", text: "I have exactly what you're looking for! Check my listing." },
    commentCount: 5,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=15", "https://i.pravatar.cc/24?img=9", "https://i.pravatar.cc/24?img=60"],
      names: "david.a and 13 others",
    },
    commentAvatar: "https://i.pravatar.cc/32?img=52",
  },
  {
    id: "5",
    type: "property",
    user: { name: "Emeka D.", type: "Developer", initials: "ED", bg: "#1a4a72", avatar: "https://i.pravatar.cc/40?img=60" },
    time: "3h ago", category: "Property",
    caption: "🔑 Luxury 4BR detached duplex in Banana Island. Smart home features, rooftop terrace, and 24hr power. Priced to sell!",
    location: "Banana Island, Ikoyi, Lagos", price: "₦280,000,000", tag: "For Sale",
    tagColor: "bg-green-500/20 text-green-400", beds: 4, baths: 4, sqft: "3,500 sqft",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=480&fit=crop",
    ],
    likes: 45, comments: 13, saves: 28,
    topComment: { user: "invest.ng", text: "What's the payment plan? Flexible?" },
    commentCount: 13,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=5", "https://i.pravatar.cc/24?img=20", "https://i.pravatar.cc/24?img=47"],
      names: "proptech.ng and 44 others",
    },
  },
  {
    id: "6",
    type: "text",
    user: { name: "Chidi Obi", type: "Developer", avatar: "https://i.pravatar.cc/40?img=60" },
    time: "4h ago", category: "General",
    content: "Just finished a snagging inspection on a new build in Banana Island. Found 47 defects including structural cracks in 2 rooms. Always do your snagging before taking possession! 📋🔍",
    location: "Banana Island, Lagos",
    likes: 31, comments: 12, saves: 18,
    topComment: { user: "arch.amara", text: "This is exactly why I tell all my clients to hire a professional snagger!" },
    commentCount: 12,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=5", "https://i.pravatar.cc/24?img=33", "https://i.pravatar.cc/24?img=47"],
      names: "proptech.ng and 30 others",
    },
    commentAvatar: "https://i.pravatar.cc/32?img=12",
  },
  {
    id: "7",
    type: "text",
    user: { name: "Ngozi A.", type: "Individual", avatar: "https://i.pravatar.cc/40?img=44" },
    time: "5h ago", category: "Request",
    content: "Anyone know a good shortlet apartment in VI for next weekend? Need it for 3 nights. Budget is around ₦80k–₦120k total. Clean and secure please! 🙏",
    location: "Victoria Island, Lagos",
    likes: 6, comments: 19, saves: 3,
    topComment: { user: "shortlets_ng", text: "Check our profile! We have options starting from ₦25k/night in VI." },
    commentCount: 19,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=44", "https://i.pravatar.cc/24?img=11", "https://i.pravatar.cc/24?img=15"],
      names: "ella.homes and 5 others",
    },
    commentAvatar: "https://i.pravatar.cc/32?img=47",
  },

  // ── Page 2 ────────────────────────────────────────────────────────────
  {
    id: "8",
    type: "text",
    user: { name: "Femi O.", type: "Agent", avatar: "https://i.pravatar.cc/40?img=20" },
    time: "6h ago", category: "General",
    content: "Pro tip: Before signing any lease in Lagos, always run a proper title search. We've seen too many cases where buyers pay for land that's under government acquisition. Due diligence saves millions! 🏡",
    location: "Lagos Island, Lagos",
    likes: 52, comments: 24, saves: 41,
    topComment: { user: "legal.ng", text: "This cannot be overemphasized! Always verify with the Lands Registry." },
    commentCount: 24,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=20", "https://i.pravatar.cc/24?img=7", "https://i.pravatar.cc/24?img=30"],
      names: "temi.homes and 51 others",
    },
    commentAvatar: "https://i.pravatar.cc/32?img=20",
  },
  {
    id: "9",
    type: "property",
    user: { name: "Amaka I.", type: "Agent", initials: "AI", bg: "#6c3483", avatar: "https://i.pravatar.cc/40?img=25" },
    time: "7h ago", category: "Property",
    caption: "✨ Newly built 2BR terrace house in Gwarinpa. BQ included. Estate with 24hr security and light. Book inspection today!",
    location: "Gwarinpa, Abuja", price: "₦95,000,000", tag: "For Sale",
    tagColor: "bg-green-500/20 text-green-400", beds: 2, baths: 2, sqft: "1,200 sqft",
    images: [
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=480&fit=crop",
    ],
    likes: 18, comments: 9, saves: 14,
    topComment: { user: "abuja.realty", text: "Price is fair for Gwarinpa. Is it flexible?" },
    commentCount: 9,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=25", "https://i.pravatar.cc/24?img=36", "https://i.pravatar.cc/24?img=7"],
      names: "abuja.homes and 17 others",
    },
  },
  {
    id: "10",
    type: "text",
    user: { name: "Bola T.", type: "Individual", avatar: "https://i.pravatar.cc/40?img=25" },
    time: "8h ago", category: "Request",
    content: "Anyone have a warehouse space to let in Apapa or Orile? Need about 5,000sqft for logistics. Pls DM with details and pricing 🙏",
    location: "Apapa, Lagos",
    likes: 9, comments: 33, saves: 7,
    topComment: { user: "warehouse.ng", text: "We have exactly what you need in Orile — 6,000sqft available now." },
    commentCount: 33,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=25", "https://i.pravatar.cc/24?img=36", "https://i.pravatar.cc/24?img=41"],
      names: "logistics.hub and 8 others",
    },
    commentAvatar: "https://i.pravatar.cc/32?img=25",
  },
  {
    id: "11",
    type: "video",
    user: { name: "Dami L.", type: "Agent", avatar: "https://i.pravatar.cc/40?img=16" },
    time: "9h ago", category: "Property",
    caption: "🎥 Walk-through of this amazing 3BR penthouse on the 14th floor overlooking the Lagos lagoon. Fully furnished and move-in ready!",
    location: "Eko Atlantic, Lagos",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=760&fit=crop",
    likes: 91, comments: 38, saves: 55,
    topComment: { user: "luxury.ng", text: "The view is incredible! What's the monthly rent?" },
    commentCount: 38,
  },
  {
    id: "12",
    type: "text",
    user: { name: "Jide A.", type: "Developer", avatar: "https://i.pravatar.cc/40?img=32" },
    time: "10h ago", category: "General",
    content: "We just delivered 45 units in our Lekki Gardens Phase 2 development — 6 months ahead of schedule. Proud of the team! Next project: 200-unit affordable housing in Ibeju-Lekki. 🏗️",
    location: "Lekki Gardens, Lagos",
    likes: 204, comments: 47, saves: 88,
    topComment: { user: "prop.investors", text: "Congratulations! Any units still available in Phase 2?" },
    commentCount: 47,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=32", "https://i.pravatar.cc/24?img=50", "https://i.pravatar.cc/24?img=58"],
      names: "arch.collective and 203 others",
    },
    commentAvatar: "https://i.pravatar.cc/32?img=32",
  },
  {
    id: "13",
    type: "property",
    user: { name: "Zara M.", type: "Agent", initials: "ZM", bg: "#7b241c", avatar: "https://i.pravatar.cc/40?img=16" },
    time: "11h ago", category: "Property",
    caption: "🌊 Waterfront 5BR smart villa on a private estate in Oniru. Floor-to-ceiling glass, infinity pool, cinema room. A rare find in Lagos!",
    location: "Oniru, Victoria Island, Lagos", price: "₦750,000,000", tag: "For Sale",
    tagColor: "bg-green-500/20 text-green-400", beds: 5, baths: 6, sqft: "5,200 sqft",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=480&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=480&fit=crop",
    ],
    likes: 138, comments: 52, saves: 96,
    topComment: { user: "ultra.luxury.ng", text: "This is the best listing I've seen all year. Do you have a virtual tour?" },
    commentCount: 52,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=16", "https://i.pravatar.cc/24?img=50", "https://i.pravatar.cc/24?img=58"],
      names: "luxury.ng and 137 others",
    },
  },
  {
    id: "14",
    type: "text",
    user: { name: "Kunle P.", type: "Individual", avatar: "https://i.pravatar.cc/40?img=38" },
    time: "12h ago", category: "General",
    content: "Just closed on my first property investment at 28! 2BR apartment in Yaba — fully tenanted with 10% annual yield. Starting earlier than I ever thought was possible 🎉💪",
    location: "Yaba, Lagos",
    likes: 317, comments: 89, saves: 142,
    topComment: { user: "young.investors", text: "This is so inspiring! Would love to know more about your strategy." },
    commentCount: 89,
    likedBy: {
      avatars: ["https://i.pravatar.cc/24?img=38", "https://i.pravatar.cc/24?img=22", "https://i.pravatar.cc/24?img=55"],
      names: "finance.hub and 316 others",
    },
    commentAvatar: "https://i.pravatar.cc/32?img=38",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));

  /* Simulate realistic network latency for development skeletons. */
  await new Promise((r) => setTimeout(r, page === 1 ? 800 : 1000));

  const start   = (page - 1) * PAGE_SIZE;
  const end     = start + PAGE_SIZE;
  const posts   = allPosts.slice(start, end);
  const hasMore = end < allPosts.length;

  return NextResponse.json({ posts, hasMore, nextPage: hasMore ? page + 1 : null });
}
