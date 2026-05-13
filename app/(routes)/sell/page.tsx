"use client"; 

import Link from "next/link";
import Container from "@/components/ui/container";
import { Store, TrendingUp, Globe, Smartphone } from "lucide-react";
import { useState } from "react";

const SellPage = () => {
  const [agreed, setAgreed] = useState(false); 

  return (
    <div className="bg-white">
      <Container>
        <div className="py-20 px-4 text-center">
          {/* Hero */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Selling Today
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
            Join thousands of creators and businesses selling on our platform.
            Accept payments globally via card or mobile money.
          </p>

          <Link
            href={process.env.NEXT_PUBLIC_ADMIN_URL ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-x-2
              bg-black text-white
              px-8 py-3 rounded-full
              font-semibold text-sm
              hover:opacity-75 transition
            "
          >
            <Store className="h-4 w-4" />
            Create Your Store — It&apos;s Free
          </Link>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="space-y-2">
              <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Store className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Easy Setup</h3>
              <p className="text-sm text-gray-500">
                Create your store in minutes. Add products, set prices, go live.
              </p>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Mobile Money</h3>
              <p className="text-sm text-gray-500">
                Accept MTN MoMo and Airtel Money. Payouts straight to your phone.
              </p>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Globe className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Global Payments</h3>
              <p className="text-sm text-gray-500">
                Accept cards via Stripe for customers worldwide.
              </p>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Real-time Analytics
              </h3>
              <p className="text-sm text-gray-500">
                Track revenue, sales, and inventory from your dashboard.
              </p>
            </div>
          </div>

          {/* Pricing transparency */}
          <div className="mt-20 bg-gray-50 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-500 mb-6">
              No monthly fees. No hidden charges.
            </p>
            <div className="text-4xl font-bold text-gray-900">
              10%
              <span className="text-lg font-normal text-gray-500 ml-2">
                per transaction
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              You keep 90% of every sale. We only earn when you do.
            </p>
          </div>

          {/* Agreement + Final CTA */}
          <div className="mt-16 flex flex-col items-center gap-y-4">
            <div className="flex items-start gap-x-3 max-w-md text-left">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                className="mt-1 accent-black cursor-pointer"
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label
                htmlFor="agree"
                className="text-sm text-gray-500 cursor-pointer"
              >
                I have read and agree to the{" "}
                <Link
                  href="/legal/seller-agreement"
                  className="underline hover:text-black"
                >
                  Seller Agreement
                </Link>{" "}
                and{" "}
                <Link
                  href="/legal/terms"
                  className="underline hover:text-black"
                >
                  Terms of Service
                </Link>
              </label>
            </div>

            <Link
              href={agreed ? (process.env.NEXT_PUBLIC_ADMIN_URL ?? "#") : "#"}
              target={agreed ? "_blank" : undefined}
              rel={agreed ? "noopener noreferrer" : undefined}
              onClick={(e) => !agreed && e.preventDefault()}
              className={`inline-flex items-center gap-x-2 px-8 py-3 rounded-full font-semibold text-sm transition
                ${agreed
                  ? "bg-black text-white hover:opacity-75"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                }`}
            >
              <Store className="h-4 w-4" />
              Create Your Store
            </Link>

            {!agreed && (
              <p className="text-xs text-gray-400">
                Please accept the terms above to continue.
              </p>
            )}
          </div>

        </div>
      </Container>
    </div>
  );
};

export default SellPage;