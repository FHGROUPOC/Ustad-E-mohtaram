import DataCard from "@/public/data/cardArchive-2.json";


import ArticleCard12 from "@/components/cards/ArticleCard12";
import SwiperDynamic from "@/components/shared/SwiperDynamic";
export default function Section1() {
  return (
    <>
      {/*Archive 2 Section 1*/}
      <section className="sec-1-archive-2">
        <div className="container">
          <div className="row mt-5">
            <div className="col-12">
              <SwiperDynamic
                className="swiper slider-1 rounded-16"
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                centeredSlides={false}
                loop={true}
                autoplay={{
                  delay: 2000,
                }}
              >
                {DataCard.sec1Card12Top.map((card, idx) => (
                  <div className="swiper-slide" key={idx}>
                    <ArticleCard12 card={card} idx={idx} />
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
