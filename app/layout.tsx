"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Geist, Noto_Nastaliq_Urdu } from "next/font/google";
import PublicLayout from "@/components/PublicLayout"; // Import the wrapper
import SessionProvider from "@/components/SessionProvider";
import BecomeAuthorModal from "@/components/BecomeAuthorModal";
import { Toaster } from "react-hot-toast";

// Default English Font
const geist = Geist({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist", // CSS variable setup
});

// Custom Urdu Font
const notoUrdu = Noto_Nastaliq_Urdu({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-noto-urdu", // CSS variable setup
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  
  // Check karein agar pathname urdu page ka hai (e.g., '/ur' ya '/urdu')
  const isUrdu = pathname?.startsWith("/ur") || pathname?.includes("/urdu");

  return (
    /* 
      FIX: Humne 'dir' attribute ko hata diya hai taake grid system aur alignments 
      bilkul English design ki tarah intact rahein aur layout na toote.
    */
    <html 
      lang={isUrdu ? "ur" : "en"} 
      className={`${geist.variable} ${notoUrdu.variable}`}
    >
      <body
        className={`${isUrdu ? "font-urdu" : geist.className} ${
          isDashboard ? "dashboard-body" : "public-body"
        }`}
      >
        {/* If it's NOT a dashboard, wrap children in PublicLayout.
            This loads the CSS via JS imports, enabling instant CSS updates.
        */}
        {!isDashboard ? (
          <SessionProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
              containerStyle={{
                zIndex: 10001,
              }}
            />
            <BecomeAuthorModal />
            <PublicLayout>{children}</PublicLayout>
          </SessionProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}