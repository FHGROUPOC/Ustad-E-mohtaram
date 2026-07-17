import React from "react";
import { Geist } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import PublicLayoutWrapper from "@/components/PublicLayout"; 

// Absolute imports using the @ alias to ensure paths are found
// Suppress TypeScript missing declaration error for side-effect CSS imports
// @ts-ignore: Missing type declarations for CSS modules
import "@/public/assets/css/vendors/bootstrap-grid.min.css";
// @ts-ignore: Missing type declarations for CSS modules
import "@/public/assets/css/vendors/swiper-bundle.min.css";
// @ts-ignore: Missing type declarations for CSS modules
import "@/public/assets/css/vendors/carouselTicker.css";
// @ts-ignore: Missing type declarations for CSS modules
import "@/public/assets/css/main.css";
// @ts-ignore: Missing type declarations for CSS modules
import "@/public/assets/css/additional.css";

const geist = Geist({
  subsets: ["latin"],
});

// --- SEO METADATA CONFIGURATION (100% Google & Social Media Friendly) ---
export const metadata = {
  title: {
    default: "Ustad-e-Mohtaram | Educational Platform",
    template: "%s | Ustad-e-Mohtaram",
  },
  description: "Welcome to Ustad-e-Mohtaram – Your premier destination for quality education, expert mentorship, and comprehensive digital learning resources.",
  keywords: ["Ustad-e-Mohtaram", "Education Platform", "Online Learning", "Mentorship", "Courses"],
  authors: [{ name: "Ustad-e-Mohtaram Team" }],
  metadataBase: new URL("https://ustad-e-mohtaram.vercel.app"),

  // Facebook, LinkedIn, WhatsApp Link Previews
  openGraph: {
    title: "Ustad-e-Mohtaram | Educational Platform",
    description: "Your premier destination for quality education, expert mentorship, and comprehensive digital learning resources.",
    url: "https://ustad-e-mohtaram.vercel.app",
    siteName: "Ustad-e-Mohtaram",
    images: [
      {
        url: "http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdgtk4rthy%2Fimage%2Fupload%2Fv1784194573%2FDar-Ul-Iqaan_lco9zf.png&w=640&q=75", // public folder me mojud image ka sahi path yahan lagayein (Recommended Size: 1200x630)
        width: 1200,
        height: 630,
        alt: "Ustad-e-Mohtaram Cover Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Link Previews
  twitter: {
    card: "summary_large_image",
    title: "Ustad-e-Mohtaram | Educational Platform",
    description: "Your premier destination for quality education, expert mentorship, and comprehensive digital learning resources.",
    images: ["http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdgtk4rthy%2Fimage%2Fupload%2Fv1784194573%2FDar-Ul-Iqaan_lco9zf.png&w=640&q=75"], // public folder ka same banner link
  },
};

export default function PublicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The 'public-interface' class helps keep CSS targeted */}
      <body className={`${geist.className} public-interface`}>
        <SessionProvider>
          {/* This component handles your Header/Footer */}
          <PublicLayoutWrapper>
            {children}
          </PublicLayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}