import React from "react";
import { Geist } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import PublicLayoutWrapper from "@/components/PublicLayout"; 

// Absolute imports using the @ alias to ensure paths are found
import "@/public/assets/css/vendors/bootstrap-grid.min.css";
import "@/public/assets/css/vendors/swiper-bundle.min.css";
import "@/public/assets/css/vendors/carouselTicker.css";
import "@/public/assets/css/main.css";
import "@/public/assets/css/additional.css"; 

const geist = Geist({
  subsets: ["latin"],
});

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