// components/navbar.tsx
import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import { Store } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const Navbar = async () => {
  const categories = await getCategories();
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-8 flex h-16 items-center justify-between">
          {/* Left — Logo */}
          <Link href="/" className="ml-4 lg:ml-0">
            <p className="font-bold text-xl">SHOP</p>
          </Link>

          {/* Center — Navigation */}
          <MainNav data={categories} />

          {/* Right — Actions */}
          <div className="flex items-center gap-x-4">
            {/* Become a Seller CTA */}
            <Link
              href="/sell"
              className="
      hidden md:flex items-center gap-x-1
      text-sm font-medium text-gray-600
      hover:text-black transition
      border border-gray-300 rounded-full
      px-4 py-1.5
      hover:border-black
    "
            >
              <Store className="h-3.5 w-3.5" />
              Open Your Store
            </Link>

            {/* Cart */}
            <NavbarActions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
