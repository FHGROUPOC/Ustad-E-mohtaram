import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/single-2/Section1";
import ArticleCard5 from "@/components/cards/ArticleCard5";
import Comments from "@/components/Comments";
// import SocialShare from "@/components/elements/SocialShare";
import { getBlogBySlug, getAuthorById, getBlogs } from "@/lib/functions";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

// --- 1. TYPE DEFINITIONS ---
interface PageProps {
  params: Promise<{ slug: string }>;
}

// --- 2. DYNAMIC METADATA SECTION ---
// This handles SEO, Facebook (Open Graph), and X (Twitter) previews
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Post Not Found | Mixplate Magazine",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${blog.title} | Mixplate Magazine`,
    description: blog.metaDescription || "Expert insights and latest updates.",
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      url: `https://multi-blogs-web.vercel.app/blog/${slug}`,
      siteName: "Mixplate Magazine",
      images: [
        {
          url: blog.img || "/assets/imgs/page/default-share.png",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
        ...previousImages,
      ],
      locale: "en_US",
      type: "article",
      publishedTime: blog.createdAt,
      authors: [blog.postedby || "Staff"],
    },  
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.metaDescription,
      images: [blog.img || "/assets/imgs/page/default-share.png"],
    },
    keywords: [blog.category, "Mixplate", "Lahore", "Expert Tips"],
  };
}

// --- 3. MAIN PAGE COMPONENT ---
export default async function Single_2({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) return notFound();

  // Fetch current blog and all active blogs in parallel for speed
  const [blog, allBlogs] = await Promise.all([getBlogBySlug(slug), getBlogs()]);

  if (!blog) return notFound();

  const author = await getAuthorById(blog.authorId);
  const serializedComments = JSON.parse(JSON.stringify(blog.comments || []));

  // Filter out the current post from the recommended list
  const recommendedBlogs = allBlogs
    .filter((b: any) => b.slug !== slug)
    .slice(0, 4);

  return (
    <Layout>
      {/* Main Blog Content Section */}
      <Section1 blog={blog} author={author} />

      {/* Social Sharing Integration */}
      {/* <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <SocialShare title={blog.title} slug={slug} />
          </div>
        </div>
      </div> */}

      {/* Recommended Posts Section */}
      <section className="related-post sec-padding bg-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-12">
              <h5 className="mb-0 text-uppercase tracking-widest fs-9 fw-bold text-gray-400">
                Recommended for You
              </h5>
            </div>

            {recommendedBlogs.length > 0 ? (
              recommendedBlogs.map((card: any, idx: number) => (
                <div className="col-6 col-md-4 col-lg-3" key={card._id || idx}>
                  <ArticleCard5 card={card} idx={idx} />
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-muted">
                  Explore more stories on our homepage.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <div className="container pb-20">
        <div className="row">
          <div className="col-lg-12 col-12 mx-auto">
            <div className="mt-10">
              <Comments
                blogId={blog._id?.toString() || ""}
                initialComments={serializedComments}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
