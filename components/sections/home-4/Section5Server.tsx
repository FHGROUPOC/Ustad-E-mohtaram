// Server component for Section5 - no "use client"
import ArticleCard9 from "@/components/cards/ArticleCard9";
import ArticleCard10 from "@/components/cards/ArticleCard10";
import DataCard from "@/public/data/cardHome-4.json";
import SectionTitle from "@/components/elements/TitleWhite";
import Swiper1Sec2 from "@/components/sections/home-3/Swiper1sec2";
import Section5Interactive from "./Section5Interactive";

interface Section5ServerProps {
    display: string;
}

export default function Section5Server({ display }: Section5ServerProps) {
    return (
        <>
            {/*Home 3 Section 2*/}
            <section className="sec-5-home-4 pb-70 overflow-hidden">
                <div className="container">
                    <div className="row g-lg-4 g-5">
                        <div className="col-lg-8">
                            <div className={display} id="toppagination">
                                <SectionTitle title="Latest" description="Real-Time Updates That Matter" />
                            </div>
                            <div className="row mt-2 g-4">
                                {/* Client component will handle paginated articles */}
                                <Section5Interactive />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-md-6 col-lg-12 col-12">
                                    <div className="d-flex align-items-center gap-2 mt-4 mt-lg-4 mt-md-0 mb-3">
                                        <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path d="M0.582044 11.7285C8.79451 13.4712 10.252 14.8614 12.125 22.7372C13.8067 14.8768 15.2308 13.4992 23.4018 11.8279C15.1894 10.0852 13.7319 8.69503 11.8589 0.81924C10.1769 8.67956 8.75306 10.0571 0.582044 11.7285Z" fill="#0E0E0F" />
                                        </svg>
                                        <h5 className="mb-0">Weekly trending</h5>
                                    </div>
                                    <div className="d-flex flex-wrap gap-3">
                                        {DataCard.sec5Card10.map((card, index) => (
                                            <ArticleCard10 key={index} card={card} idx={index} />
                                        ))}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex align-items-center gap-2 mt-5 mb-3">
                                                <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path d="M0.582044 11.7285C8.79451 13.4712 10.252 14.8614 12.125 22.7372C13.8067 14.8768 15.2308 13.4992 23.4018 11.8279C15.1894 10.0852 13.7319 8.69503 11.8589 0.81924C10.1769 8.67956 8.75306 10.0571 0.582044 11.7285Z" fill="#0E0E0F" />
                                                </svg>
                                                <h5 className="mb-0">Popular tags</h5>
                                            </div>
                                            <ul className="list-unstyled d-flex flex-wrap gap-3 ps-0">
                                                <li>
                                                    <a href="#" className="tag-item">
                                                        <span>Pepple</span>
                                                        <span className="number">168</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="tag-item">
                                                        <span>Fashion</span>
                                                        <span className="number">68</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="tag-item">
                                                        <span>Intelligence</span>
                                                        <span className="number">116</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="tag-item">
                                                        <span>Food</span>
                                                        <span className="number">78</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="tag-item">
                                                        <span>Business</span>
                                                        <span className="number">26</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="tag-item">
                                                        <span>Design</span>
                                                        <span className="number">25</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
