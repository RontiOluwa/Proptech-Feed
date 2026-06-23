# Expert Listing

A real estate social media platform where agents, developers, and individuals share property listings, updates, and market insights — built with Next.js 15, React 19, and Tailwind CSS.

---

## Features

- **Social feed** — infinite-scroll timeline with three post types: text/request, property listings, and video posts
- **Stories bar** — horizontal story strip with gradient-fade overlay arrows and smooth scroll-on-click navigation
- **Property listings** — image slider (For Rent / For Sale) with stacked liked-by avatars and inline location tags
- **Video posts** — native HTML5 video with play/pause toggle and poster thumbnail
- **Right panel** — Trending Locations, Hot Requests, and Top Communities discovery widgets
- **Skeleton loading** — shimmer placeholder for every section (stories, each post type, right panel) before data arrives
- **Responsive layout** — 3-column desktop with independent column scrolling; mobile-first single-column with bottom nav and floating action button
- **Mobile navigation drawer** — slide-in panel from the right with nav links, quick links, feed filters, and primary CTAs
- **Mobile create-post sheet** — slide-up bottom sheet with auto-growing textarea, post-type tabs, attachment buttons, and property-specific fields
- **Next.js API Routes** — all data served from local route handlers with simulated latency for realistic UX testing

---

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 15.3.3 (App Router, Turbopack)        |
| Language   | TypeScript 5                                  |
| UI Library | React 19                                      |
| Styling    | Tailwind CSS 3.4                              |
| Icons      | Phosphor Icons (`@phosphor-icons/react`)      |
| Fonts      | Plus Jakarta Sans (primary), Nunito (rounded) |

---

## Project Structure

```
expertlisting/
├── app/
│   ├── api/
│   │   ├── posts/route.ts          # GET /api/posts?page=N  (paginated feed)
│   │   ├── stories/route.ts        # GET /api/stories
│   │   └── right-panel/route.ts    # GET /api/right-panel
│   ├── globals.css                 # CSS custom properties, shimmer animation, scrollbar hide
│   ├── layout.tsx                  # Root layout (Google Fonts, metadata)
│   └── page.tsx                    # Root page — 3-column desktop / mobile feed layout
├── components/
│   ├── Navbar.tsx                  # Top nav + mobile slide-in navigation drawer
│   ├── LeftSidebar.tsx             # Desktop quick-nav, filters, Create Post button
│   ├── StoriesBar.tsx              # Horizontal story strip with overlay arrows
│   ├── CreatePostCard.tsx          # Desktop composer card (Property / General / Request tabs)
│   ├── CreatePostModal.tsx         # Mobile slide-up sheet for composing posts
│   ├── FeedSection.tsx             # Infinite-scroll feed (IntersectionObserver)
│   ├── FeedPost.tsx                # Text / request post card + TextPostSkeleton
│   ├── PropertyPost.tsx            # Property listing card + PropertyPostSkeleton
│   ├── VideoPost.tsx               # Video post card + VideoPostSkeleton
│   ├── RightPanel.tsx              # Discovery widgets + RightPanelSkeleton
│   └── BottomNav.tsx               # Mobile bottom nav bar + floating action button
├── public/
│   └── images/logo.png             # Company logo
├── types/
│   └── index.ts                    # Shared TypeScript interfaces (AnyPost union, API shapes)
├── next.config.ts                  # Remote image domains (Unsplash, Pravatar, Figma)
└── tailwind.config.ts              # Extended colors and font families
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd expertlisting

# Install dependencies
npm install

# Start the development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # ESLint check
```

---

## API Routes

All data is served from Next.js route handlers inside `app/api/`. Each endpoint includes a simulated network delay to make skeleton loading states visible during development.

### `GET /api/stories`

Returns 10 story objects.

```json
[
  { "id": "s1", "name": "Tunde Bakare", "avatarUrl": "https://..." },
  ...
]
```

### `GET /api/posts?page=1`

Returns a paginated page of feed posts. Page size is 7. Currently 2 pages (14 posts total).

```json
{
  "posts": [ { "id": "p1", "type": "text", ... }, ... ],
  "hasMore": true,
  "nextPage": 2
}
```

Post types are a discriminated union keyed on `type`:

| `type`       | Component      | Description                                   |
| ------------ | -------------- | --------------------------------------------- |
| `"text"`     | `FeedPost`     | Plain text / request / general post           |
| `"property"` | `PropertyPost` | For Rent / For Sale listing with image slider |
| `"video"`    | `VideoPost`    | Video post with play/pause                    |

### `GET /api/right-panel`

Returns all three right-panel sections in one request.

```json
{
  "trendingLocations": [...],
  "hotRequests": [...],
  "topCommunities": [...]
}
```

---

## Mobile UX

### Navigation Drawer

Tapping the hamburger icon in the navbar opens a 300 px slide-in panel from the right.

**Contents:**

- Logo + close button
- **Browse** — Feed, Rent, Buy, Snagging, Shortlets, Find Professionals
- **Quick Links** — Feed, Explore, Messages, My Boosts, Saved, Communities
- **Filter Feed** — Location, Listing Type, Budget, User Type
- **Sticky footer** — List Property (primary) + Sign In (outlined)

Tapping the backdrop or the X button closes the drawer. Body scroll is locked while open.

### Create Post Sheet

Tapping the floating **+** button or the **List** tab in the bottom nav opens a slide-up bottom sheet (max 90dvh).

**Contents:**

- Drag handle + "Create Post" header with close button
- **Tabs** — Property | General | Request (active tab highlighted in green)
- **Audience selector** — "Everyone" pill with caret
- **Auto-growing textarea** — placeholder text adapts to the selected tab; height expands as the user types
- **Property extras** — Listing Type and Price fields shown only on the Property tab
- **Sticky footer** — Image / Video / Location attachment buttons + Post button (disabled until text is entered)

Body scroll is locked while the sheet is open. The textarea is auto-focused after the slide-in animation completes.

---

## Design System

### Colors (CSS custom properties)

| Token              | Value                    | Usage                                |
| ------------------ | ------------------------ | ------------------------------------ |
| `--base`           | `#141414`                | Card / component background          |
| `--primary-main`   | `#105b48`                | Buttons, active states, avatar rings |
| `--selected`       | `#a8dc66`                | Active nav underline, selected dot   |
| `--border1`        | `rgba(255,255,255,0.07)` | Card borders, dividers               |
| `--text-primary`   | `#f0f0f0`                | Headings, names                      |
| `--text-secondary` | `rgba(255,255,255,0.55)` | Body copy, labels                    |

Page background: `#0d0d0d`

### Shimmer Skeleton

The `.sk` utility class in `globals.css` applies a moving gradient shimmer to any element:

```css
.sk {
  background: linear-gradient(90deg, #1e1e1e 25%, #2c2c2c 50%, #1e1e1e 75%);
  background-size: 400% 100%;
  animation: sk-shimmer 1.6s ease-in-out infinite;
}
```

Use it directly on placeholder `<div>` elements — no extra JS needed.

---

## Infinite Scroll

`FeedSection` uses a single `IntersectionObserver` attached to a 1 px sentinel element that always stays in the DOM (never conditionally rendered). This is critical — removing it from the DOM during the initial load phase would prevent the observer from attaching.

Mutable state (`isFetching`, `hasMore`, `nextPage`) is stored in refs rather than React state so the stable `fetchPage` callback (empty `useCallback` deps) always reads the latest values without causing the effect to re-subscribe.

```
scroll down → sentinel enters viewport → fetchPage() → append posts → sentinel exits viewport
```

---

## Layout

### Desktop (lg and above)

```
┌────────────────────────────────────────────────────────────┐
│                         Navbar                             │
├──────────────┬─────────────────────────┬───────────────────┤
│              │      StoriesBar          │                   │
│ LeftSidebar  │   CreatePostCard         │   RightPanel      │
│   270 px     │   FeedSection (scroll)   │    270 px         │
│   (scroll)   │   max-width 716 px       │   (scroll)        │
└──────────────┴─────────────────────────┴───────────────────┘
```

Each column scrolls independently. The page itself does not scroll.

### Mobile

```
┌─────────────────────────┐
│  Navbar  [logo] [≡]     │  ← hamburger opens slide-in drawer
├─────────────────────────┤
│  StoriesBar             │
│  FeedSection (scroll)   │
│                         │
│        [+]              │  ← FAB opens create-post sheet
├─────────────────────────┤
│ Feed Search + Notif Me  │  ← "+" tab also opens create-post sheet
└─────────────────────────┘
```

---

## License

Private — all rights reserved.
