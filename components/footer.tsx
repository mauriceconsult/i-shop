// i-shop/components/footer.tsx
import Link from "next/link";
import VendlyLogo from "./ui/vendly-logo";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <VendlyLogo variant="white" size={32} />
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Maxnovate Limited. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-x-6">
            <Link
              href="/legal/terms"
              className="text-sm text-gray-600 hover:text-black"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/privacy"
              className="text-sm text-gray-600 hover:text-black"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/seller-agreement"
              className="text-sm text-gray-600 hover:text-black"
            >
              Seller Agreement
            </Link>
            <Link
              href="/sell"
              className="text-sm text-gray-600 hover:text-black"
            >
              Sell on Platform
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
