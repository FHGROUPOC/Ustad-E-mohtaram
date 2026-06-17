import SwiperDynamic from "@/components/shared/SwiperDynamic";
import ArticleCard7 from "@/components/cards/ArticleCard7";
import ArticleCard5 from "@/components/cards/ArticleCard5";

export default function Section3({ blogs = [] }: { blogs: any[] }) {
  const topRow = blogs.slice(0, 6); // Featured styles
  const bottomRow = blogs.slice(6, 12); // Recent work

  const SwiperProps = {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: blogs.length > 4,
    autoplay: { delay: 5000 },
    breakpoints: {
      1200: { slidesPerView: 4 },
      992: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1 },
    },
  };

  return (
    <section className="sec-3-home-4 pb-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <h4 className="mb-4 fw-bold">Featured Portfolio</h4>
            <SwiperDynamic
              className="swiper swiper-popup-search"
              slidesPerView={3}
              spaceBetween={15}
              loop={blogs.length > 3}
              breakpoints={{
                992: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                0: { slidesPerView: 1 },
              }}
            >
              {topRow.map((card, index) => (
                <div className="swiper-slide" key={card._id}>
                  <ArticleCard7 card={card} idx={index} />
                </div>
              ))}
            </SwiperDynamic>
          </div>
        </div>
{/* 
        <div className="row g-4">
          <div className="col-12">
            <h4 className="mb-4 fw-bold">More from this Author</h4>
            <SwiperDynamic {...SwiperProps}>
              {bottomRow.map((card, index) => (
                <div className="swiper-slide" key={card._id}>
                  <ArticleCard5 card={card} idx={index} />
                </div>
              ))}
            </SwiperDynamic>
          </div>
        </div> */}
      </div>
    </section>
  );
}
