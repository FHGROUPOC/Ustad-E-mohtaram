"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Geist } from "next/font/google";
import PublicLayout from "@/components/PublicLayout"; // Import the wrapper
import SessionProvider from "@/components/SessionProvider";
import BecomeAuthorModal from "@/components/BecomeAuthorModal";
import { Toaster } from "react-hot-toast";


const geist = Geist({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <html lang="en">
      <body
        className={`${geist.className} ${isDashboard ? "dashboard-body" : "public-body"}`}
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
