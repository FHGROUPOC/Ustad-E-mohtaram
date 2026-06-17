import ArticleCard2 from "@/components/cards/ArticleCard2";
import ArticleCard3 from "@/components/cards/ArticleCard3";
import ArticleCard4 from "@/components/cards/ArticleCard4";
import TitleWhite from "@/components/elements/TitleWhite";
import SwiperDynamic from "@/components/shared/SwiperDynamicServer";
import { getAuthorById } from "@/lib/functions";

export default async function Section3({ blogs }: { blogs: any[] }) {
  if (!blogs || blogs.length === 0) return null;

  const processedBlogs = await Promise.all(
    blogs.slice(0, 10).map(async (blog: any) => {
      const authorData = await getAuthorById(blog.authorId);

      // Mapping logic
      return {
        ...blog,
        authorData: authorData
          ? {
              name: authorData.name,
              image: authorData.image,
              slug: authorData.slug, // Include the slug here
            }
          : null,

        authorImg:
          authorData?.image ||
          `https://ui-avatars.com/api/?size=160&name=${blog.postedby || "Admin"}&background=random&color=fff`,

        author: authorData?.name || blog.postedby || "Staff",

        // --- FIX: Use authorData.slug if it exists, otherwise fallback to ID ---
        linkAuthor: authorData?.slug
          ? `/author/${authorData.slug}`
          : `/author/${blog.authorId}`,

        pageAuthor: authorData?.slug
          ? `/author/${authorData.slug}`
          : `/author/${blog.authorId}`,
        // ---------------------------------------------------------------------

        badge: blog.category
          ? blog.category.charAt(0).toUpperCase() + blog.category.slice(1)
          : "News",
        bgBadge: blog.category === "business" ? "bg-1" : "bg-2",
        date: new Date(blog.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),

        linkPost: `/blog/${blog.slug}`,
        linkBadge: `/category/${blog.category}`,
        readTime: "5 mins read",
        comment: blog.comments?.length || 0,
        readNum:
          blog.views > 999
            ? `${(blog.views / 1000).toFixed(1)}k`
            : blog.views || 0,
        linkComment: `/blog/${blog.slug}#comments`,
      };
    }),
  );

  // Layout Distribution
  const mainPost = processedBlogs.slice(0, 1);
  const sidePosts = processedBlogs.slice(1, 3);
  const sliderPosts = processedBlogs.slice(0, 3);

  return (
    <section className="sec-3-home-1 sec-padding overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <TitleWhite
              title="Latest News"
              description="Real-Time Updates From Our Authors"
            />
          </div>
        </div>

        <div className="row mt-3 g-4 align-items-stretch">
          <div className="col-lg-7 col-12">
            {mainPost.map((card, idx) => (
              <ArticleCard2 key={`main-${idx}`} card={card} idx={idx} />
            ))}
          </div>

          <div className="col-lg-5 col-12 d-flex flex-column gap-2 justify-content-between">
            {sidePosts.map((card, idx) => (
              <ArticleCard3 key={`side-${idx}`} card={card} idx={idx} />
            ))}
          </div>

          <div className="col-12 mt-4">
            <SwiperDynamic
              className="swiper slider-2 rounded-16 overflow-hidden"
              slidesPerView={3}
              spaceBetween={27}
              loop={sliderPosts.length > 2}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                1200: { slidesPerView: 2 },
                768: { slidesPerView: 1 },
                0: { slidesPerView: 1 },
              }}
            >
              {sliderPosts.map((card, idx) => (
                <div
                  key={`slide-${idx}`}
                  className="rounded-16 overflow-hidden"
                >
                  <ArticleCard4 card={card} />
                </div>
              ))}
            </SwiperDynamic>
          </div>
        </div>
      </div>
    </section>
  );
}
