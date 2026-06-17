// Section1.tsx
import ArticleCard1 from "@/components/cards/ArticleCard1";
import SwiperDynamic from "@/components/shared/SwiperDynamicServer";

export default function Section1({ blogs = [] }: { blogs: any[] }) {
  // Logic to get only the latest blog from each unique category
  const latestByCategory = Array.from(
    blogs
      .reduce((map, blog) => {
        if (!map.has(blog.category)) {
          map.set(blog.category, blog);
        }
        return map;
      }, new Map())
      .values(),
  );

  return (
    <>
      <section
        className="sec-1-home-1"
        style={{
          backgroundImage: "url('/assets/imgs/page/bg-home1-sec1.png')",
        }}
      >
        <div className="container d-none d-md-block">
          <div className="row mb-5">
            <div className="col-12">
              <div className="text-center">
                <h1 className="ds-2 lh-1 mb-2 text-anime-style-2">
                  Your Gateway to Global News
                </h1>
                <p className="fs-5 mt-0 text-anime-style-2">
                  Breaking Stories from Every Corner of the Globe
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          {latestByCategory.length > 0 ? (
            <SwiperDynamic
              className="swiper swiper-card-hero py-2"
              autoplay={{ delay: 5000 }}
              loop={latestByCategory.length > 1}
              spaceBetween={30}
              centeredSlides={true}
              breakpoints={{
                1200: { slidesPerView: 3 },
                992: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                576: { slidesPerView: 1 },
                0: { slidesPerView: 1 },
              }}
            >
              {latestByCategory.map((blog: any, idx) => (
                <div key={blog._id || idx}>
                  <ArticleCard1
                    card={{
                      _id: blog._id,
                      title: blog.title,
                      description: blog.description,
                      category: blog.category,
                      img: blog.img,
                      imgalt: blog.title,
                      createdAt: blog.createdAt,
                      slug: blog.slug,
                      blog_detail: blog.blog_detail,
                      commentCount: blog.commentCount || 0,
                      viewCount: blog.viewCount || 0,
                    }}
                    idx={idx}
                  />
                </div>
              ))}
            </SwiperDynamic>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted italic">No active blogs found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
