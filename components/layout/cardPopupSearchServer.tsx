import { useState } from "react";
import ArticleCard10 from "@/components/cards/ArticleCard10";
import SwiperDynamic from "../shared/SwiperDynamic";
import Link from "next/link";

interface cardPopupSearchServerProps {
  open: boolean;
  onClose: () => void;
  blogs?: any[];
}

export default function CardPopupSearchServer(
  props: cardPopupSearchServerProps,
) {
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Get all blogs
  const allBlogs = props.blogs || [];

  // 2. Filter blogs based on search input
  const filteredBlogs =
    searchTerm.length > 0
      ? allBlogs.filter((blog) =>
          blog.title?.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : allBlogs.slice(0, 6); // Show first 6 as "Recommended" if no search

  const categories = Array.from(
    new Set(allBlogs.map((blog: any) => blog.category).filter(Boolean)),
  );
  return (
    <>
      <div
        className={`popup-search d-none d-md-block ${props.open ? "show" : ""}`}
      >
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="popup-search-content position-relative">
                <a
                  href="#"
                  className="close-popup position-absolute top-0 end-0 m-3"
                  onClick={(e) => {
                    e.preventDefault();
                    props.onClose();
                  }}
                >
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

                <h5 className="mb-4">Search</h5>
                <form
                  action="#"
                  className="d-flex flex-wrap flex-lg-nowrap gap-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What Are You Looking For?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-dark" type="submit">
                    Search
                  </button>
                </form>

                {/* Tags logic - You can click these to auto-fill the search */}
                <div className="block-tag mt-5">
                  {categories.map((tag: any) => {
                    // Calculate count for each category
                    const count = allBlogs.filter(
                      (b: any) => b.category === tag,
                    ).length;

                    // Create a URL-friendly slug (e.g., "Digital Marketing" -> "digital-marketing")
                    const categorySlug = tag.toLowerCase().replace(/\s+/g, "-");

                    return (
                      <Link
                        key={tag}
                        href={`/category/${categorySlug}`}
                        className="tag-item"
                        // Optional: If you still want the search results below to update
                        // when hovering or clicking before the page navigates:
                        // onMouseEnter={() => setSearchTerm(tag)}
                      >
                        <span className="text-capitalize">
                          {tag?.replace(/-/g, " ")}
                        </span>
                        <span className="number">{count}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-5">
                  <div className="block-recomment">
                    <h5 className="mb-3">
                      {searchTerm
                        ? `Results for "${searchTerm}"`
                        : "Recommended for you"}
                    </h5>

                    {filteredBlogs.length > 0 ? (
                      <SwiperDynamic
                        className="swiper-popup-search"
                        slidesPerView={3}
                        spaceBetween={15}
                        slidesPerGroup={1}
                        centeredSlides={false}
                        loop={filteredBlogs.length > 3}
                        breakpoints={{
                          1200: { slidesPerView: 3 },
                          992: { slidesPerView: 2 },
                          0: { slidesPerView: 1 },
                        }}
                      >
                        {filteredBlogs.map((card: any, idx: number) => (
                          <ArticleCard10
                            key={card._id || idx}
                            card={card}
                            idx={idx}
                          />
                        ))}
                      </SwiperDynamic>
                    ) : (
                      <div className="text-center py-5">
                        <p className="text-muted">
                          No articles found matching your search.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`popup-search-overlay ${props.open ? "active" : ""}`}
        onClick={props.onClose}
      />
    </>
  );
}
