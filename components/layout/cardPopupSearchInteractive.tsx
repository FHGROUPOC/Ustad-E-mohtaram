"use client";
import SwiperDynamic from "@/components/shared/SwiperDynamic";
import ArticleCard10 from "@/components/cards/ArticleCard10";
import cardPopupSearch from "@/public/data/cardHome-1.json";

export default function cardPopupSearchInteractive({ open, onClose }: { open: boolean; onClose: () => void }) {
    const cardPopupSearch1 = cardPopupSearch.cardPopupSearch;

    return (
        <>
            <div className={`popup-search d-none d-md-block ${open ? "show" : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="popup-search-content position-relative">
                                <a href="#" className="close-popup position-absolute top-0 end-0 m-3" onClick={onClose}>
                                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                        <path d="M17.25 6.75L6.75 17.25" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.75 6.75L17.25 17.25" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <h5 className="mb-4">Search</h5>
                                <form action="#" className="d-flex flex-wrap flex-lg-nowrap gap-2">
                                    <input className="form-control" type="text" placeholder="What Are You Looking For?" />
                                    <button className="btn btn-dark" type="submit">
                                        Search
                                    </button>
                                </form>
                                <div className="block-tag mt-5">
                                    <a href="#" className="tag-item">
                                        <span>Pepple</span>
                                        <span className="number">168</span>
                                    </a>
                                    <a href="#" className="tag-item">
                                        <span>Fashion</span>
                                        <span className="number">68</span>
                                    </a>
                                    <a href="#" className="tag-item">
                                        <span>Intelligence</span>
                                        <span className="number">116</span>
                                    </a>
                                    <a href="#" className="tag-item">
                                        <span>Food </span>
                                        <span className="number">78</span>
                                    </a>
                                    <a href="#" className="tag-item">
                                        <span>Business</span>
                                        <span className="number">26</span>
                                    </a>
                                    <a href="#" className="tag-item">
                                        <span>Design</span>
                                        <span className="number">25</span>
                                    </a>
                                    <a href="#" className="tag-item">
                                        <span>Technology</span>
                                        <span className="number">85</span>
                                    </a>
                                    <a href="#" className="tag-item">
                                        <span>Science</span>
                                        <span className="number">120</span>
                                    </a>
                                    <a href="#" className="tag-item">
                                        <span>Innovation</span>
                                        <span className="number">63</span>
                                    </a>
                                </div>
                                <div className="mt-5">
                                    <div className="block-recomment">
                                        <h5>Recommended for you</h5>
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
                                            {cardPopupSearch1.map((card, idx) => (
                                                <ArticleCard10 key={idx} card={card} idx={idx} />
                                            ))}
                                        </SwiperDynamic>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`popup-search-overlay ${open ? "active" : ""}`} onClick={onClose} />
        </>
    );
}
