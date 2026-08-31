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
    title: "Dushyant S.",
    description:
      "I design websites that drive results. View my portfolio and let's work together.",
    type: "website"

  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>

      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dushyant S.",
              "jobTitle": "Full-Stack Web Developer",
              "url": "https://dushyant-solanki-portfolio.vercel.app",
              "image": "https://dushyant-solanki-portfolio.vercel.app/images/image.png",
              "email": "mailto:dushyantsolanki.dev@gmail.com",
              "telephone": "+91-7623057936",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.linkedin.com/in/dushyantsolanki",
                "https://x.com/Dushyantdotdev",
                "https://www.instagram.com/dushyantsolanky"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "knowsAbout": [
                "Next.js",
                "React",
                "Node.js",
                "TypeScript",
                "AWS",
                "Docker",
                "MongoDB"
              ]
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
