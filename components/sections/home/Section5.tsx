"use client";
import SectionTitle from "@/components/elements/TitleWhite";
import AuthorCard from "@/components/cards/AuthorCard";
import SwiperDynamic from "@/components/shared/SwiperDynamic";
import Link from "next/link";

// Define the type for your Author (Barber/Admin)
interface Author {
  _id: string;
  name: string;
  role?: string; // e.g.,
  image?: string;
  slug: string;
  shopName?: string; // Relevant to your shop-based structure
}

const triggerAuthorForm = () => {
  window.dispatchEvent(new Event("openBecomeAuthor"));
};

export default function Section5({ authors = [] }: { authors: Author[] }) {
  return (
    <>
      <section
        className="sec-5-home-1 sec-padding overflow-hidden"
        style={{
          backgroundImage: "url('/assets/imgs/page/bg-home1-sec5.png')",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-white">
              <SectionTitle
                title="Top Authors"
                description="Writers You’ll Want to Follow"
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-end">
                <h6 className="ds-6 mb-0 text-anime-style-2">
                  Leading experts in the fields{" "}
                  <br className="d-none d-lg-block" />
                  provide you with in-depth knowledge
                </h6>
              </div>
            </div>
          </div>

          <div className="row py-5">
            <div className="col-md-12 col-11 mx-auto position-relative">
              {authors.length > 0 ? (
                <SwiperDynamic
                  className="swiper slider-4 rounded-16"
                  slidesPerView={4}
                  spaceBetween={30}
                  slidesPerGroup={1}
                  loop={authors.length > 4}
                  autoplay={{ delay: 5000 }}
                  breakpoints={{
                    1200: { slidesPerView: 4 },
                    992: { slidesPerView: 3 },
                    768: { slidesPerView: 2 },
                    0: { slidesPerView: 1 },
                  }}
                  navigation={{
                    nextEl: ".swiper-btn-next-auth",
                    prevEl: ".swiper-btn-prev-auth",
                  }}
                >
                  {authors.map((author, idx) => (
                    <div key={author._id || idx}>
                      <AuthorCard
                        card={{
                          name: author.name,
                          img:
                            author.image ||
                            `https://ui-avatars.com/api/?size=360&name=${author.name || "Admin"}&background=random&color=fff`,
                          job: author.role || "Barber Specialist",
                          link: `/author/${author.slug}`,
                        }}
                        idx={idx}
                      />
                    </div>
                  ))}
                </SwiperDynamic>
              ) : (
                <p className="text-white text-center">No authors found.</p>
              )}

              {/* Navigation Arrows */}
              <div className="d-flex align-items-center gap-2 swiper-btn custom-nav-pos">
                <div className="swiper-btn-next-auth btn-nav">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10.25 6.75L4.75 12L10.25 17.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.25 12H5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="swiper-btn-prev-auth btn-nav">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M13.75 6.75L19.25 12L13.75 17.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 12H4.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-white text-center">
              <div className="block-btn d-flex flex-wrap align-items-center gap-3 justify-content-center">
                <button
                  onClick={triggerAuthorForm}
                  className="btn bg-white text-dark hover-up"
                >
                  Become an author
                </button>
                <p className="mb-0">Join the content creation community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .btn-nav {
          width: 45px;
          height: 45px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-nav:hover {
          background: white;
          color: black;
        }
      `}</style>
    </>
  );
}
