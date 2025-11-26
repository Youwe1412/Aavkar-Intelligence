import type { Metadata } from "next";
import "./globals.css";
import { FluidBackground } from "@/components/interactive/FluidBackground";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

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
      <body className="antialiased bg-midnight text-white font-sans">
        <FluidBackground />
        <div className="grain-overlay" />
        <div className="vignette-overlay" />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
