import Image from "next/image";
import Link from "next/link";
import ArticleCard10 from "@/components/cards/ArticleCard10";
import SideBarInteractive from "./SideBarInteractive";
import SwiperDynamic from "@/components/shared/SwiperDynamic";

// Accept blogs as a prop from the parent layout or Header1Server
export default function SideBarServer({ blogs = [] }) {
  // Use the fetched blogs for the "Popular posts" section
  // If no blogs are fetched, you can fallback to static data if needed
  const popularBlogs = blogs.slice(0, 5); 

  return (
    <>
      <div className="sidebar-left">
        {/* <div className="header-sidebar d-flex align-items-center justify-content-between py-3">
          <Link href="/" className="sidebar-brand fw-bold fs-3">
            <Image
              style={{ maxWidth: "200px" }}
              src="https://res.cloudinary.com/dmzhgg4m1/image/upload/v1776253531/logo-removebg-preview_guzxar.png"
              width={143}
              height={18}
              alt="logo"
            />
          </Link>
          <a href="#" className="close-sidebar">
            <svg
              className="dark-mode-invert"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17.25 6.75L6.75 17.25"
                stroke="#0E0E0F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.75 6.75L17.25 17.25"
                stroke="#0E0E0F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div> */}

        {/* Client component for interactive navigation */}
        {/* <SideBarInteractive /> */}

        <div className="block-popular">
          <h5 className="my-3">Popular posts</h5>
          <div className="d-flex flex-column gap-2">
            {popularBlogs.length > 0 ? (
              popularBlogs.map((blog, idx) => (
                // Passing the dynamic blog object to your existing card component
                <ArticleCard10 key={blog._id || idx} card={blog} idx={idx} />
              ))
            ) : (
              <p className="fs-7 text-muted">No popular posts found.</p>
            )}
          </div>
          
          <div className="mt-5">
            <SwiperDynamic
              className="swiper rounded-16"
              slidesPerView={1}
              spaceBetween={15}
              loop={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true, el: ".swiper-pagination" }}
            >
              <Image
                className="w-100 rounded-16 overflow-hidden"
                src="/assets/imgs/other/img-other-8.png"
                alt="magzin"
                width={363}
                height={217}
              />
              <Image
                className="w-100 rounded-16 overflow-hidden"
                src="/assets/imgs/other/img-other-8-1.png"
                alt="magzin"
                width={363}
                height={217}
              />
              <Image
                className="w-100 rounded-16 overflow-hidden"
                src="/assets/imgs/other/img-other-8-2.png"
                alt="magzin"
                width={363}
                height={217}
              />
            </SwiperDynamic>
            <div className="swiper-pagination mb-3" />
          </div>
        </div>

        <div className="sidebar-footer">
          <div>
            <div className="d-flex align-items-center">
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
              <span className="fs-7 fw-semibold ms-2">Newsletter</span>
            </div>
            <h5 className="my-2">Subscribe our newsletter</h5>
            <p className="fs-7">
              You'll only receive updates on new content, no spam.
            </p>
          </div>
          <form action="#" className="w-auto">
            <input
              type="email"
              className="form-control fs-7 mb-2 w-100"
              placeholder="Your email address"
            />
            <button type="submit" className="btn btn-dark w-100">
              Subscribe
            </button>
          </form>
        </div>

        <div className="text-center mt-4">
          <p className="fs-7">
            2026 Copyright @ <span className="text-dark">Dar ul Iqaan.</span>{" "}
            <br className="d-none d-lg-block" />
            <span> All Rights Reserved </span>
          </p>
        </div>
      </div>
      <div className="sidebar-overlay" />
    </>
  );
}