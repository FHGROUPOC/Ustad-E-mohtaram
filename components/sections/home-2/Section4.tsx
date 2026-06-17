import SectionTitle from "@/components/elements/TitleDark";

import SwiperDynamic from "@/components/shared/SwiperDynamic";
import cardHome2 from "@/public/data/cardHome-2.json";
import ArticleCard7 from "@/components/cards/ArticleCard7";
import ArticleCard6 from "@/components/cards/ArticleCard6";
export default function Section4() {
    const Card7Data = cardHome2.sec4Card7;
    const Card6Data = cardHome2.sec4Card6;
    return (
        <>
            {/*Home 2 Section 4*/}
            <section className="sec-4-home-2 pb-70 pt-5 bg-800 changeless">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <SectionTitle title="Staff Picks" description="Handpicked by Our Editorial Team" classList="bg-800 border-700" />
                        </div>
                    </div>
                    <div className="row my-4">
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
                                {Card7Data.map((card, idx) => (
                                    <div key={idx}>
                                        <ArticleCard7 card={card} idx={idx} />
                                    </div>
                                ))}
                            </SwiperDynamic>
                        </div>
                    </div>
                    <div className="row g-4">
                        {Card6Data.map((card, idx) => (
                            <ArticleCard6 key={idx} card={card} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
