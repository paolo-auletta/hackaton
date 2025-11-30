"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { DM_Serif_Display } from "next/font/google";

const playfair = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const DISCOVER_SECTIONS = [
  { href: "/genie", label: "Discover" },
  { href: "/genie/chat", label: "Chat" },
  { href: "/genie/preferences", label: "Preferences" },
] as const;

export default function DiscoverLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white text-[#254031]">
      <header className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4 pb-2">
        <div className="flex w-full max-w-5xl items-center gap-8 rounded-full bg-white px-6 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={`${playfair.className} text-md font-semibold text-[#254031] hover:text-[#1c3125]`}
            >
              Genius
            </Link>
          </div>

          <nav className="flex flex-1 items-center justify-center gap-6 text-sm">
            {DISCOVER_SECTIONS.map((item) => {
              const isActive =
                item.href === "/genie"
                  ? pathname === "/genie" ||
                    pathname?.startsWith("/genie/students")
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-[#254031] font-medium"
                      : "text-[#455B50] hover:text-[#254031]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            aria-label="Open profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#254031] text-white text-xs font-medium shadow-sm hover:bg-[#1c3125] transition-colors"
          >
            P
          </button>
        </div>
      </header>

      <main className="pt-24">
        <div className="mx-auto max-w-6xl px-4 pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}
