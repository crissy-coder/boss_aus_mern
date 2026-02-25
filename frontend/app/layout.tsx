import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeScript from "@/components/ThemeScript";
import FixedThemeToggle from "@/components/FixedThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BOSS Group",
  description: "BOSS Group - Your trusted partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeScript />
        <ThemeProvider>
          <SiteLayout>{children}</SiteLayout>
          <FixedThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
