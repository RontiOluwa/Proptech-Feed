/**
 * GET /api/right-panel
 *
 * Returns all three data sets rendered in the desktop right sidebar:
 *   - trendingLocations  — most-posted areas right now
 *   - hotRequests        — active buy/rent requests from the community
 *   - topCommunities     — largest groups users can join
 *
 * The 700 ms delay is a development convenience to make the skeleton
 * loading state visible. Remove before production.
 */
import { NextResponse } from "next/server";
import type { RightPanelData } from "@/types";

const data: RightPanelData = {
  trendingLocations: [
    { id: "1", name: "Lekki Epe",              postCount: 120 },
    { id: "2", name: "2 Bedroom Rental Abuja", postCount: 60  },
    { id: "3", name: "Ajah",                   postCount: 250 },
  ],
  hotRequests: [
    {
      id: "1",
      requestType: "Buy",
      area: "Lekki Phase 1, Lagos",
      description: "Looking for a 4-bed detached in Lekki Phase 1",
      priceRange: "₦180M – ₦230M",
      responses: 12,
    },
    {
      id: "2",
      requestType: "Rent",
      area: "Ikoyi",
      description: "2-bed serviced apartment in Ikoyi, max ₦15M/yr",
      priceRange: "₦10M – ₦15M",
      responses: 7,
    },
  ],
  topCommunities: [
    { id: "1", name: "Lekki Landlords",        memberCount: "12.4k members" },
    { id: "2", name: "Abuja Developers Group", memberCount: "5.6k members"  },
    { id: "3", name: "House hunting Circle",   memberCount: "1.4k members"  },
  ],
};

export async function GET() {
  await new Promise((r) => setTimeout(r, 700));
  return NextResponse.json(data);
}
