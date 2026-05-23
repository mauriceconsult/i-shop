// components/navbar.tsx
import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import { Store } from "lucide-react";
import { VendlyLogo } from "./ui/vendly-logo";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const Navbar = async () => {
  const categories = await getCategories();
  return (
    <div className="border-b">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          {/* Left — Logo */}
          <Link href="/" className="ml-4 lg:ml-0">
            <VendlyLogo size={40} />
          </Link>

          {/* Center — Navigation */}
          <MainNav data={categories} />

          {/* Right — Actions */}
          <div className="flex items-center gap-x-4">
            {/* Become a Seller CTA */}
            <Link
              href="/sell"
              className="
  hidden md:flex items-center gap-x-2
  text-sm font-semibold
  bg-black text-white
  hover:bg-neutral-800
  transition-all duration-200
  rounded-full
  px-5 py-2
  shadow-sm hover:shadow-md
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
