/**
 * Left sidebar — desktop only (hidden on mobile).
 *
 * Contains three sections:
 *   1. Quick-nav links (Messages, Boosts, Saved, Communities)
 *   2. Feed filter dropdowns (Location, Listing Type, Budget, User Type)
 *   3. "Create Post" primary action button
 */
import {
  EnvelopeSimple,
  Rocket,
  BookmarkSimple,
  Users,
  CaretDown,
  Plus,
} from "@phosphor-icons/react/dist/ssr";

const quickLinks = [
  { icon: EnvelopeSimple, label: "Messages"    },
  { icon: Rocket,         label: "My Boosts"   },
  { icon: BookmarkSimple, label: "Saved"        },
  { icon: Users,          label: "Communities" },
];

/** Filter labels rendered as expandable dropdown rows. */
const filters = ["Location", "Listing Type", "Budget", "User Type"];

export default function LeftSidebar() {
  return (
    <div className="flex flex-col gap-6">

      {/* Quick-nav card */}
      <div className="bg-[var(--base)] border border-[var(--border1)] rounded-xl overflow-hidden p-2">
        {quickLinks.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-2 w-full px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-left"
          >
            <Icon size={20} className="text-[var(--text-secondary)] shrink-0" />
            <span className="text-base font-medium text-[var(--text-secondary)] tracking-tight">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Filter dropdowns card */}
      <div className="bg-[var(--base)] border border-[var(--border1)] rounded-xl overflow-hidden">
        {filters.map((filter, i) => (
          <button
            key={filter}
            className={`flex items-center gap-2 w-full px-6 py-5 hover:bg-white/5 transition-colors text-left ${
              /* Divider between rows, not after the last one */
              i < filters.length - 1 ? "border-b border-[var(--border1)]" : ""
            }`}
          >
            <span className="flex-1 text-base font-medium text-[var(--text-secondary)] tracking-tight">
              {filter}
            </span>
            <CaretDown size={16} className="text-[var(--text-secondary)] shrink-0" />
          </button>
        ))}
      </div>

      {/* Primary CTA */}
      <button className="bg-[var(--primary-main)] flex items-center justify-center gap-2 w-full py-2 rounded-full hover:opacity-90 transition-opacity">
        <Plus size={12} weight="bold" className="text-white" />
        <span className="text-base font-medium text-white tracking-tight">Create Post</span>
      </button>
    </div>
  );
}
