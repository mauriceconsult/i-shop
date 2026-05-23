import Footer from "@/components/footer";
import "./globals.css";
import { Urbanist } from "next/font/google";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { CurrencyProvider } from "@/context/currency-context";
import type { Metadata } from "next"; 

const font = Urbanist({ subsets: ["latin"] });

// Correct metadata export
export const metadata: Metadata = {
  title: {
    default: "Vendly — Online Marketplace",
    template: "%s | Vendly",
  },
  description:
    "Shop from local vendors and entrepreneurs across Uganda. Fast delivery via Dukaboda.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Vendly — Online Marketplace",
    description: "Shop from local vendors across Uganda.",
    images: [{ url: "/logo.svg", width: 200, height: 60, alt: "Vendly" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        <CurrencyProvider>{children}</CurrencyProvider>
        <Footer />
      </body>
    </html>
  );
}
