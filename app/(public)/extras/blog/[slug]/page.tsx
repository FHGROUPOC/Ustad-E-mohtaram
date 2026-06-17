import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/single-2/Section1";
import Ads_sm from "@/components/elements/ads_sm";
import ArticleCard5 from "@/components/cards/ArticleCard5";
import { getAuthorById, getBlogBySlug, getBlogs } from "@/lib/functions";
import { notFound } from "next/navigation";

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 1. Unwrap the slug from the Promise (Next.js 15 requirement)
  const { slug } = await params;

  // 2. Fetch the specific blog
  const blog = await getBlogBySlug(slug);
  const author = await getAuthorById(blog.authorId);

  if (!blog) {
    notFound();
  }

  // 3. Fetch related posts (same category)
  const allBlogs = await getBlogs();
  const relatedPosts = allBlogs
    .filter((b: any) => b.category === blog.category && b._id !== blog._id)
    .slice(0, 4);

  return (
    <Layout>
      <main>
        {/* Dynamically render the blog content */}
        <Section1 blog={blog} author={author} />

        {/* <section className="related-post sec-padding bg-white">
          <div className="container">
            <div className="row g-4">
              <div className="col-12">
                <h4 className="mb-0 fw-bold">Recommended for You</h4>
                <hr className="my-4" />
              </div>
              {relatedPosts.map((card: any, idx: number) => (
                <div className="col-6 col-md-4 col-lg-3" key={card._id}>
                  <ArticleCard5 card={card} idx={idx} />
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* <div className="bg-50 py-5">
          <div className="container text-center">
            <Ads_sm />
          </div>
        </div> */}
      </main>
    </Layout>
  );
}
