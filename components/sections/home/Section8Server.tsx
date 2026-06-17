import Image from "next/image";
import SectionTitle from "@/components/elements/TitleWhite";
import Section8Interactive from "./Section8Interactive";

export default function Section8Server() {
    return (
        <>
            {/*Home 1 Section 8*/}
            <section className="sec-8-home-1 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <SectionTitle title="Podcast List" description="Explore Thought-Provoking Episodes" />
                        </div>
                    </div>
                    <div className="row mt-2 g-4">
                        <div className="col-lg-4 col-12">
                            <div className="row g-4 align-items-stretch">
                                <div className="col-lg-12 col-md-6 col-12">
                                    <div className="block-app">
                                        <div className="decorate-1" data-background="/assets/imgs/template/decorate-3.png" />
                                        <span className="text-dark fs-5 fw-regular">Build your wealth through knowledge.</span>
                                        <ul className="list-unstyled d-flex flex-wrap gap-3 ps-0 mb-0">
                                            <li className="d-flex align-items-center gap-2">
                                                <Image width={20} height={20} className="dark-mode-invert" src="/assets/imgs/template/icons/app-1.svg" alt="magzin" />
                                                <p className="m-0 fw-medium">Apple Podcast</p>
                                            </li>
                                            <li className="d-flex align-items-center gap-2">
                                                <Image width={20} height={20} className="dark-mode-invert" src="/assets/imgs/template/icons/app-2.svg" alt="magzin" />
                                                <p className="m-0 fw-medium">Spotify</p>
                                            </li>
                                            <li className="d-flex align-items-center gap-2">
                                                <Image width={20} height={20} className="dark-mode-invert" src="/assets/imgs/template/icons/app-3.svg" alt="magzin" />
                                                <p className="m-0 fw-medium">SoundCloud</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-6 col-12">
                                    <div className="block-discover article p-5 bg-31">
                                        <h5 className="text-white changeless mb-4 mt-4 position-relative z-2">Listen, Learn, and be Inspired</h5>
                                        <a href="#" className="view-more changeless white z-3 w-12rem">
                                            <span className="circle" aria-hidden="true">
                                                <span className="icon arrow" />
                                            </span>
                                            <span className="button-text fw-semi-bold">Discover more</span>
                                        </a>
                                        <div className="card-corner no-border">
                                            <a href="link-post" className="arrow-box">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M19 12H4.75" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </a>
                                            <div className="curve-one" />
                                            <div className="curve-two" />
                                        </div>
                                        <div className="card-corner-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-12">
                            {/* Client component will handle podcast cards with interactivity */}
                            <Section8Interactive />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

