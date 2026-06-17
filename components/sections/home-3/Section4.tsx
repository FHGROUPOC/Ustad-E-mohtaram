import SwiperDynamic from "@/components/shared/SwiperDynamic";
import card10Data from "@/public/data/cardHome-3.json";
import ArticleCard10 from "@/components/cards/ArticleCard10";

export default function Section4() {
  // Use sec1Card10 since sec4Card10 doesn't exist
  const card10data = card10Data.sec1Card10;

  return (
    <>
      {/*Home 3 Section 4*/}
      <section className="sec-4-home-3 sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SwiperDynamic
                className="swiper swiper-popup-search"
                slidesPerView={3}
                spaceBetween={15}
                slidesPerGroup={1}
                centeredSlides={false}
                loop={true}
                breakpoints={{
                  1200: {
                    slidesPerView: 3,
                  },
                  992: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 1,
                  },
                  576: {
                    slidesPerView: 1,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
              >
                {card10data.map((card: any, idx: number) => (
                  <div key={idx} className="swiper-slide">
                    <ArticleCard10 card={card} idx={idx} />
                  </div>
                ))}
              </SwiperDynamic>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}