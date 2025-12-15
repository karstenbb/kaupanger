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
          <main className="max-w-lg mx-auto relative min-h-screen">
            {children}
          </main>
          <BottomNav />
          <CookieConsent />
        </QueryProvider>
      </body>
    </html>
  );
}
