import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/home-4/Section1";
import Section2 from "@/components/sections/home-4/Section2";
import Section3 from "@/components/sections/home-4/Section3";
import Section6 from "@/components/sections/home-4/Section6";
import SectionReviews from "@/components/sections/home-4/SectionReviews";
import { getBlogs } from "@/lib/functions";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";
import User from "@/models/User";
import { getServerSession } from "next-auth"; // ADD THIS
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ADJUST PATH TO YOUR AUTH OPTIONS

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getReviewsByAuthor(authorId: string) {
  try {
    await dbConnect();
    const reviews = await Review.find({ authorId: authorId })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export default async function AuthorProfile({ params }: PageProps) {
  const { slug } = await params;

  // 1. Get the session on the server
  const session = await getServerSession(authOptions);

  await dbConnect();

  const authorData = await User.findOne({ slug: slug }).lean();
  if (!authorData) return notFound();

  const author = JSON.parse(JSON.stringify(authorData));
  const authorIdString = author._id.toString();

  const allBlogs = await getBlogs();
  const authorBlogs = allBlogs.filter(
    (blog: any) => blog.authorId === authorIdString && blog.status === "active",
  );

  const reviews = await getReviewsByAuthor(authorIdString);

  // 2. Now 'session' is defined and safe to use
  const hasReviewed = session?.user?.email
    ? reviews.some((r: any) => r.reviewerEmail === session.user.email)
    : false;

  const uniqueCategories = Array.from(
    new Set(authorBlogs.map((b: any) => b.category)),
  );

  return (
    <Layout>
      <Section1 author={author} />
      <Section2 categories={uniqueCategories} />
      <Section3 blogs={authorBlogs} />
      <SectionReviews
        reviews={reviews}
        author={author}
        hasReviewed={hasReviewed}
        
      />
      <Section6 />
    </Layout>
  );
}
