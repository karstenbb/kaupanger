import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers";
import { BottomNav } from "@/components/layout/bottom-nav";
import { CookieConsent } from "@/components/cookie-consent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K.I.L Fotball",
  description: "Offisiell app for K.I.L Fotballklubb",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0A0E1A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" className="dark">
      <body className={inter.className}>
        <QueryProvider>
          <main className="w-full max-w-lg md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto relative min-h-screen md:pl-20 lg:pl-24">
            {children}
          </main>
          <BottomNav />
          <CookieConsent />
        </QueryProvider>
      </body>
    </html>
  );
}
