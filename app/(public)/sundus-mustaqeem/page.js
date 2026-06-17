import React from "react";
import Layout from "@/components/layout/Layout";
import SundusMain from "../../../components/sections/sundus-mustaqeem/SundusMain";

// 1. Static Metadata must be exported at the top level
export const metadata = {
  title: "Sundus Mustaqeem | Creative Executive & Editorial Director",
  description:
    "Explore the curated feed, editorial archives, and strategic media frameworks of Sundus Mustaqeem, Creative Executive and CEO of Mixplate Magazine.",
  keywords: [
    "Sundus Mustaqeem",
    "Mixplate Magazine",
    "Editorial Specialist",
    "Digital Magazine Architecture",
    "Brand Blueprinting",
  ],
  authors: [{ name: "Sundus Mustaqeem" }],
  openGraph: {
    title: "Sundus Mustaqeem | Creative Executive & Editorial Director",
    description:
      "Explore the curated feed, editorial archives, and strategic media frameworks of Sundus Mustaqeem.",
    url: "https://multi-blogs-web.vercel.app/sundus-mustaqeem",
    siteName: "Mixplate Magazine",
    images: [
      {
        url: "https://res.cloudinary.com/dmzhgg4m1/image/upload/q_auto/f_auto/v1781034537/miss_sundus_mustaqeem_epbbdb.png",
        width: 1200,
        height: 630,
        alt: "Sundus Mustaqeem Frontal Editorial Portrait",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sundus Mustaqeem | Creative Executive",
    description:
      "Explore the curated feed, editorial archives, and strategic media frameworks of Sundus Mustaqeem.",
    images: [
      "https://res.cloudinary.com/dmzhgg4m1/image/upload/q_auto/f_auto/v1781034537/miss_sundus_mustaqeem_epbbdb.png",
    ],
  },
};

// 2. Clean, focused Page Component structure
const Page = () => {
  return (
    <>
      <Layout>
        <SundusMain />
      </Layout>
    </>
  );
};

export default Page;
