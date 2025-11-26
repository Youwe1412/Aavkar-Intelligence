import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { FluidBackground } from "@/components/interactive/FluidBackground";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Applied Intelligence by Aavkar",
  description: "We design AI-native workflows, copilots, and digital employees for media, businesses, educators, and healthcare teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-midnight text-white`}
      >
        <FluidBackground />
        <div className="grain-overlay" />
        <div className="vignette-overlay" />
        {children}
      </body>
    </html>
  );
}
