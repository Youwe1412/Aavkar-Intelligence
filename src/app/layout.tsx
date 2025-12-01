import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { BackgroundWrapper } from "@/components/interactive/BackgroundWrapper";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollWrapper } from "@/components/layout/SmoothScrollWrapper";
import { Chatbot } from "@/components/interactive/Chatbot";
import { CustomCursor } from "@/components/ui/CustomCursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
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
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} antialiased text-white`}
      >
        <BackgroundWrapper />
        <Navbar />
        <div className="grain-overlay" />
        <div className="vignette-overlay" />
        <SmoothScrollWrapper>
          {children}
        </SmoothScrollWrapper>
        <Chatbot />
        <CustomCursor />
      </body>
    </html>
  );
}
