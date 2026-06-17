"use client";

import Link from "next/link";
import React, { useState } from "react";
import SwiperDynamic from "@/components/shared/SwiperDynamic";
import Image from "next/image";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Section9({
  blogs = [],
  displayBtn,
}: {
  blogs: any[];
  displayBtn: string;
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="sec-9-home-1">
      <div className="custom-container position-relative">
        <div className={`swiper-btn ${displayBtn} align-items-center justify-content-between`}>
          <div className="swiper-btn-next" style={{ cursor: "pointer" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
              <path d="M10.25 6.75L4.75 12L10.25 17.25" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19.25 12H5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="swiper-btn-prev" style={{ cursor: "pointer" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 12H4.75" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="block-card-swiper">
          <div className="container">
            <div className="row align-items-stretch g-5">
              <div className="col-lg-6">
                <div
                  id="gallery-background"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 0,
                    transition: "background-image 0.8s ease-in-out",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${blogs[currentSlideIndex]?.img})`,
                  }}
                />

                <SwiperDynamic
                  className="gallery-left position-relative"
                  spaceBetween={10}
                  slidesPerView={1}
                  loop={blogs.length > 1}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  navigation={{
                    nextEl: ".swiper-btn-next",
                    prevEl: ".swiper-btn-prev",
                  }}
                  onSlideChange={(swiper: any) => setCurrentSlideIndex(swiper.realIndex)}
                >
                  {blogs.map((slide) => (
                    <div key={slide._id} className="swiper-slide">
                      <div className="article">
                        <div className="card-body">
                          <Link href={`/category/${slide.category?.toLowerCase()}`} className="badge bg-2 mb-3 text-capitalize">
                            {slide.category.replace(/-/g, " ") || "General"}
                          </Link>
                          <h5 className="card-title mb-0 !text-[#f8f9fa] ">
                            <Link href={`/blog/${slide.slug}`}>{slide.title}</Link>
                          </h5>
                          <p className="card-text !text-[#f8f9fa] mb-0 fs-7 mt-3 line-clamp-3">
                            {slide.description}
                          </p>
                          <div className="bottom mt-auto d-flex flex-wrap align-items-center gap-2 pt-5">
                            <div className="author d-flex align-items-center gap-2">
                              <Image
                                className="avatar avatar-md rounded-circle object-fit-cover"
                                src={slide.authorImg} // Using the enriched prop
                                alt={slide.authorName} // Using the enriched prop
                                width={41}
                                height={41}
                                unoptimized
                              />
                              <span className="fs-7 text-[#f8f9fa] fw-regular">
                                {slide.authorName}
                              </span>
                            </div>
                            <span className="fs-7 text-[#f8f9fa] ps-3 border-start border-[#f8f9fa]-50">
                              {slide.formattedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </SwiperDynamic>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}