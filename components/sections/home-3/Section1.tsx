import Link from "next/link";
import card10Data from "@/public/data/cardHome-3.json";
import ArticleCard10 from "@/components/cards/ArticleCard10";
import SwiperDynamic from "@/components/shared/SwiperDynamic";

export default function Section1() {
  const card10data = card10Data.sec1Card10;
  return (
    <>
      {/*Home 3 Section 1*/}
      <section className="sec-1-home-3 pt-4 pb-4">
        <div className="container">
          <div className="rounded-16 bg">
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
                  {card10data.map((card, idx) => (
                    <div key={idx} className="swiper-slide p-3 rounded-16 border-200">
                      <ArticleCard10 card={card} idx={idx} />
                    </div>
                  ))}
                </SwiperDynamic>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
