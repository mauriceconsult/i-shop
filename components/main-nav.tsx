"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  if (routes.length === 0) return null; // ← clean empty state

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex mx-6 items-center space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-black",
              route.active ? "text-black" : "text-neutral-500",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden ml-4 text-gray-600 hover:text-black transition"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="
          md:hidden absolute top-16 left-0 right-0
          bg-white border-b shadow-sm z-50
          flex flex-col px-6 py-4 space-y-4
        "
        >
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-black",
                route.active ? "text-black" : "text-neutral-500",
              )}
            >
              {route.label}
            </Link>
          ))}

          {/* Seller CTA in mobile menu too */}
          <Link
            href="/sell"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-600 hover:text-black transition pt-2 border-t border-gray-100"
          >
            🏪 Open Your Store
          </Link>
        </div>
      )}
    </>
  );
};

export default MainNav;
