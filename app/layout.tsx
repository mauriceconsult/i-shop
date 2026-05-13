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
  title: "Vendly", // Better to make it more specific
  description: "Shop",
  // You can add more fields here
  icons: {
    icon: "/favicon.ico",
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
