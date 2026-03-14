// i-shop/components/footer.tsx
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Maxnovate Limited. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-x-6">
            <Link
              href="/legal/terms"
              className="text-xs text-gray-500 hover:text-black transition"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/privacy"
              className="text-xs text-gray-500 hover:text-black transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/seller-agreement"
              className="text-xs text-gray-500 hover:text-black transition"
            >
              Seller Agreement
            </Link>
            <Link
              href="/sell"
              className="text-xs text-gray-500 hover:text-black transition"
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
