"use client";
import SwiperDynamic from "@/components/shared/SwiperDynamicServer";
import { useState } from "react";
import Image from "next/image";
import Marquee from "@/util/MarqueeServer";

interface Blog {
  _id?: string;
  img?: string;
  imgalt?: string;
}

export default function Section4({ blogs = [] }: { blogs: Blog[] }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const socialBlogs = blogs.slice(0, 3);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail(""); // Clear input
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Failed to connect to server.");
    }
  };

  return (
    <>
      <section className="sec-4-home-1 pb-70">
        <div className="container">
          <div className="row align-items-stretch g-4">
            {/* Newsletter Column */}
            <div className="col-lg-7 col-12">
              <div className="block-subscribe h-100">
                <div
                  className="decorate-1"
                  style={{
                    backgroundImage:
                      "url('/assets/imgs/template/decorate-1.png')",
                  }}
                />
                <div className="block-title d-flex align-items-center gap-1 fs-7 text-600">
                  <svg
                    className="dark-mode-invert"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4.75 7.75C4.75 6.64543 5.64543 5.75 6.75 5.75H17.25C18.3546 5.75 19.25 6.64543 19.25 7.75V16.25C19.25 17.3546 18.3546 18.25 17.25 18.25H6.75C5.64543 18.25 4.75 17.3546 4.75 16.25V7.75Z"
                      stroke="#0E0E0F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.5 6.5L12 12.25L18.5 6.5"
                      stroke="#0E0E0F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="fs-7 fw-regular">Newsletter</span>
                </div>
                <div className="block-title">
                  <h4 className="my-3">
                    Subscribe to our newsletter{" "}
                    <br className="d-none d-lg-block" />
                    and Stay updated each week
                  </h4>
                  <p className="fs-7 mb-5 text-600">
                    You’ll only receive updates on new articles—no spam,{" "}
                    <br className="d-none d-lg-block" />
                    just the latest Mixplate Author insights.
                  </p>
                </div>
                <form className="position-relative" onSubmit={handleSubscribe}>
                  <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center mb-3">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === "loading"}
                    />
                    <button
                      className="btn btn-dark"
                      type="submit"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {message && (
                    <p
                      className={`fs-8 mb-2 ${status === "success" ? "text-success" : "text-danger"}`}
                    >
                      {message}
                    </p>
                  )}

                  <div className="d-flex align-items-center">
                    <input type="checkbox" id="subscribe" required />
                    <label
                      htmlFor="subscribe"
                      className="text-600 fs-8 ms-2 mb-0"
                    >
                      By clicking the button, you agree with our{" "}
                      <a href="#" className="text-dark border-bottom">
                        Terms &amp; Conditions
                      </a>
                    </label>
                  </div>
                </form>
              </div>
            </div>

            {/* Brands & Social Column */}
            <div className="col-lg-5 col-12 d-flex flex-column gap-4 justify-content-between">
              {/* Brand Marquee Block */}
              <div className="block-brand position-relative flex-grow-1 p-4">
                <div className="position-absolute top-0 end-0 m-4 dark-mode-invert">
                  <Image
                    width={28}
                    height={27}
                    src="/assets/imgs/template/decorate-2.svg"
                    alt="decorate"
                  />
                </div>
                <div className="carouselTicker carouselTicker-left position-relative z-1 pe-5 mb-4 mt-2">
                  <Marquee
                    direction="left"
                    speed={30}
                    className="carouselTicker__list"
                  >
                    {[1, 2, 1, 1, 2, 1].map((num, i) => (
                      <div key={i} className="carouselTicker__item mx-4">
                        <div className="brand-item dark-mode-invert">
                          <Image
                            width={104}
                            height={31}
                            src={`/assets/imgs/template/icons/brand-${num}.svg`}
                            alt="brand"
                          />
                        </div>
                      </div>
                    ))}
                  </Marquee>
                </div>
                <div className="carouselTicker carouselTicker-right position-relative z-1">
                  <Marquee
                    direction="right"
                    speed={30}
                    className="carouselTicker__list"
                  >
                    {[3, 4, 5, 3, 4, 5].map((num, i) => (
                      <div key={i} className="carouselTicker__item mx-4">
                        <div className="brand-item dark-mode-invert">
                          <Image
                            width={99}
                            height={31}
                            src={`/assets/imgs/template/icons/brand-${num}.svg`}
                            alt="brand"
                          />
                        </div>
                      </div>
                    ))}
                  </Marquee>
                </div>
              </div>

              {/* Social & Featured Swiper Block */}
              <div className="block-social">
                <div className="row g-2">
                  <div className="col-lg-5 col-md-4 col-sm-5 col-12">
                    <div
                      className="slider-wrapper rounded-16 overflow-hidden"
                      style={{ height: "180px" }}
                    >
                      <SwiperDynamic
                        className="swiper slider-1 h-100"
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={socialBlogs.length > 1}
                      >
                        {socialBlogs.length > 0 ? (
                          socialBlogs.map((blog, idx) => (
                            <div
                              className="swiper-slide h-100"
                              key={blog._id || idx}
                            >
                              <Image
                                className="cover-image"
                                src={
                                  blog.img ||
                                  "/assets/imgs/other/img-other-13.png"
                                }
                                alt={blog.imgalt || "featured"}
                                fill
                                sizes="25vw"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="swiper-slide h-100">
                            <Image
                              className="cover-image"
                              src="/assets/imgs/other/img-other-13.png"
                              alt="default"
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        )}
                      </SwiperDynamic>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-8 col-sm-7 col-12">
                    <div className="social-list h-100 p-4 rounded-16 bg-white border">
                      <h6 className="mb-3 fs-6 fw-bold">Follow our journey</h6>
                      <ul className="list-unstyled ps-0 m-0 d-flex flex-column gap-3 w-100">
                        <li>
                          <a
                            href="https://www.facebook.com/MixPlateMagazine"
                            className="social-item fs-7 d-flex align-items-center text-decoration-none text-dark"
                          >
                            {/* <div
                              className="icon me-2 d-flex align-items-center justify-content-center bg-light rounded-circle"
                              style={{ width: 32, height: 32 }}
                            >
                              <i className="fab fa-facebook-f text-dark"></i>
                            </div> */}
                            <span>Facebook</span>
                            {/* <span className="text-muted ms-auto small">
                              65k
                            </span> */}
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/mixplatemagazine"
                            className="social-item fs-7 d-flex align-items-center text-decoration-none text-dark"
                          >
                            {/* <div
                              className="icon me-2 d-flex align-items-center justify-content-center bg-light rounded-circle"
                              style={{ width: 32, height: 32 }}
                            >
                              <i className="fab fa-twitter text-info"></i>
                            </div> */}
                            <span>Instagram</span>
                            {/* <span className="text-muted ms-auto small">
                              87k
                            </span> */}
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
