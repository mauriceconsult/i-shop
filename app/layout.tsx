import Footer from "@/components/footer";
import "./globals.css";
import { Urbanist } from "next/font/google";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { CurrencyProvider } from "@/context/currency-context";

const font = Urbanist({ subsets: ["latin"] });

export const Metadata = {
  title: "Shop",
  description: "Shop",
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
        <CurrencyProvider>
        {children}
        </CurrencyProvider>
        <Footer />
      </body>
    </html>
  );
}
