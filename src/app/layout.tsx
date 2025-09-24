import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Kosmic Apps — AI-Powered Accessibility Tools",
  description: "Indie iOS studio building AI-powered accessibility tools for neurodivergent users. Focused, intuitive utilities that empower people to thrive.",
  keywords: ["accessibility", "neurodivergent", "AI tools", "iOS apps", "indie studio", "mobile apps", "productivity", "wellness", "inclusive design"],
  authors: [{ name: "Kosmic Apps" }],
  openGraph: {
    title: "Kosmic Apps — AI-Powered Accessibility Tools",
    description: "Indie iOS studio building AI-powered accessibility tools for neurodivergent users. Focused, intuitive utilities that empower people to thrive.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kosmic Apps — AI-Powered Accessibility Tools",
    description: "Indie iOS studio building AI-powered accessibility tools for neurodivergent users. Focused, intuitive utilities that empower people to thrive.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="skip-link focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0">
          Skip to main content
        </a>
        <SiteNav />
        <main id="main-content">
        {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
