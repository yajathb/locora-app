import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import { Analytics } from "@vercel/analytics/next";


const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Locora — The Definitive Guide to Brentwood",
  description:
    "Curated events, places, and community moments in Brentwood, California.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Locora - The Definitive Guide to Brentwood</title>
        {/* Flash-prevention: Paper light #F9F7F4, Paper dark #111418 */}
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{background-color:#F9F7F4} @media (prefers-color-scheme: dark){:root{background-color:#111418}}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try {
    var stored = localStorage.getItem('darkMode');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var shouldDark = stored !== null ? stored === 'true' : prefersDark;
    if (shouldDark) document.documentElement.classList.add('dark');
    document.documentElement.classList.add('animations-enabled');
  } catch (e) {}
})();`,
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
      <Analytics />
        <DarkModeProvider>
            <Navbar />
            {children}
            <Footer />
        </DarkModeProvider>
      </body>
    </html>
  );
}
