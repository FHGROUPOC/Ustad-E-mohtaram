import Layout from "@/components/layout/Layout";
import Breadcumb from "@/components/elements/breadcumb";
import Section1 from "@/components/sections/archive-3/Section1";
import Section3 from "@/components/sections/home-4/Section6";
import { getBlogs } from "@/lib/functions";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}

export default async function CategoryArchive({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const allBlogs = await getBlogs();

  // Filter blogs based on category slug
  const filteredBlogs = allBlogs.filter(
    (blog: any) => blog.category.toLowerCase() === slug.toLowerCase(),
  );

  // Format title for Breadcrumb (e.g., "hair-cuts" -> "Hair Cuts")
  const categoryTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Layout>
      <Breadcumb
        page_current={categoryTitle}
        title={categoryTitle}
        count_articles={filteredBlogs.length.toString()}
        description={`Explore the latest ${categoryTitle} trends and professional tips from our expert writter.`}
      />
      {/* Pass the filtered blogs to Section 1 */}
      <Section1
        searchParams={searchParams}
        blogs={filteredBlogs}
        categorySlug={slug}
      />
      <Section3 />
    </Layout>
  );
}
