import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../components/header";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Manav Online Market",
    default: "Manav Online Market",
  },
  description: "Taze meyve, sebze ve organik ürünler için online manav",
  keywords: ["manav", "online market", "organik ürünler", "meyve", "sebze"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Suspense fallback={<div className="h-16 bg-white shadow-sm"></div>}>
            <Header />
          </Suspense>

          <main className="bg-light-gray flex-1 text-black">{children}</main>

          <footer className="bg-green-900 text-white p-6 text-center text-sm">
            <p>© {new Date().getFullYear()} Manav Online Market</p>
          </footer>

          <ToastContainer autoClose={2000} />
        </div>
      </body>
    </html>
  );
}
