import Footer from "@/components/footer";
import "./globals.css";
import { Urbanist } from "next/font/google"
import Navbar from "@/components/navbar";

const font = Urbanist({ subsets: ['latin'] })

export const Metadata = {
  title: "Shop",
  description: "Shop"
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
