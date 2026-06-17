// Server component for Section4 - no "use client"
import Swiper1Sec4 from "@/components/sections/home-4/Swiper1Sec4";
import Link from "next/link";
import Section4Interactive from "./Section4Interactive";

export default function Section4Server() {
    return (
        <>
            {/*Home 4 Section 4*/}
            <section className="sec-4-home-4 sec-padding">
                <div className="container">
                    <div className="row g-4 align-items-stretch">
                        <div className="col-lg-7 col-12">
                            <div className="block-subscribe h-100">
                                <div className="decorate-1" data-background="/assets/imgs/template/decorate-1.png" />
                                {/* Client component will handle interactive tabs */}
                                <Section4Interactive />
                            </div>
                        </div>
                        <div className="col-lg-5 col-12">
                            <div className="block-contact-me p-5 bg-white rounded-16 h-100 border-200 position-relative">
                                <div className="decorate-1" data-background="/assets/imgs/template/decorate-3.png" />
                                <Swiper1Sec4 />
                                <h3 className="fs-3 fw-medium mt-4 z-1">Let's make something awesome together</h3>
                                <Link href="/page-contact" className="view-more mt-3 z-1">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow" />
                                    </span>
                                    <span className="button-text">Contact me</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
