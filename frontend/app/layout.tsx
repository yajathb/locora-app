import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DarkModeProvider } from "@/app/DarkModeProvider";
import { LocationProvider } from "@/app/LocationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Locora - Discover What's Happening in Brentwood",
  description:
    "Your window into events, places, and opportunities happening in Brentwood right now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Initial theme styles (server-rendered) to avoid white flash before CSS loads */}
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{background-color:#ffffff} @media (prefers-color-scheme: dark){:root{background-color:#0f172a}}`,
          }}
        />

        {/* Inline script to set theme and enable animations before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try {
    var stored = localStorage.getItem('darkMode');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var shouldDark = stored !== null ? stored === 'true' : prefersDark;
    if (shouldDark) document.documentElement.classList.add('dark');
    // Enable animations immediately so CSS rules that depend on this class are active before paint
    document.documentElement.classList.add('animations-enabled');
  } catch (e) { /* ignore */ }
})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DarkModeProvider>
          <LocationProvider>
            <Navbar />
            {children}
            <Footer />
          </LocationProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
