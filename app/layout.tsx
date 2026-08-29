import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dushyant S. — Freelance Web Designer | Portfolio",
  description:
    "I'm Dushyant S., a freelance web designer helping brands build powerful digital experiences that engage, convert, and grow. View my work and let's collaborate.",
  keywords: [
    "web designer",
    "freelance",
    "portfolio",
    "UI/UX",
    "branding",
    "web development",
  ],
  openGraph: {
    title: "Dushyant S. — Freelance Web Designer",
    description:
      "I design websites that drive results. View my portfolio and let's work together.",
    type: "website",
    images: '/images/image.png'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
