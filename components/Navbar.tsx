/**
 * Top navigation bar.
 *
 * Responsive behaviour:
 *   Mobile  (< lg) — logo + "Sign In" text + hamburger icon only.
 *   Desktop (≥ lg) — logo + nav links + bell + "List Property" + green Sign In pill.
 *
 * Height: 56 px mobile / 80 px desktop — must match the
 * `calc(100vh - 80px)` offset used in page.tsx for the desktop column layout.
 */
import Image    from "next/image";
import { Bell, CaretDown, List } from "@phosphor-icons/react/dist/ssr";

const navLinks = [
  { label: "Feed",             active: true  },
  { label: "Rent",             dropdown: true },
  { label: "Buy",              dropdown: true },
  { label: "Snagging"                        },
  { label: "Shortlets"                       },
  { label: "Find Professionals"              },
];

export default function Navbar() {
  return (
    <nav className="bg-[var(--base)] border-b border-[var(--border1)] flex items-center px-4 lg:px-6 h-[56px] lg:h-20 sticky top-0 z-50 w-full">

      {/* Brand logo — contains both the icon mark and wordmark as one PNG */}
      <div className="flex items-center flex-1 lg:flex-1">
        <Image
          src="/images/logo.png"
          alt="Expert Listing"
          width={140}
          height={32}
          className="h-7 w-auto object-contain"
          priority /* LCP element — load immediately */
        />
      </div>

      {/* Primary nav links — desktop only */}
      <div className="hidden lg:flex items-center shrink-0">
        {navLinks.map((link) => (
          <div
            key={link.label}
            className={`flex items-center gap-1 px-2.5 py-3 cursor-pointer ${
              link.active ? "border-b-[1.5px] border-[var(--selected)]" : ""
            }`}
          >
            <span
              className={`text-[15px] font-medium whitespace-nowrap leading-snug tracking-tight ${
                link.active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
              }`}
            >
              {link.label}
            </span>
            {link.dropdown && (
              <CaretDown size={14} className="text-[var(--text-secondary)]" />
            )}
          </div>
        ))}
      </div>

      {/* Right actions — desktop */}
      <div className="hidden lg:flex flex-1 items-center justify-end gap-6">
        <Bell size={20} className="text-[var(--text-secondary)] cursor-pointer" />
        <span className="text-[var(--text-secondary)] text-base font-medium cursor-pointer whitespace-nowrap">
          List Property
        </span>
        <button className="bg-[var(--primary-main)] text-white rounded-full px-[18px] h-10 text-base font-medium">
          Sign In
        </button>
      </div>

      {/* Right actions — mobile */}
      <div className="flex lg:hidden items-center gap-4">
        <span className="text-[var(--text-primary)] text-[14px] font-medium">Sign In</span>
        <button className="text-[var(--text-secondary)]">
          <List size={22} />
        </button>
      </div>
    </nav>
  );
}
