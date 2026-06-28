import Image from "next/image";
import Link from "next/link";
import ContentSingle from "@/components/elements/ContentSingle";
import SocialShare from "@/components/common/SocialShare";

export default function Section1({ blog, author }: { blog: any; author: any }) {
  // Safe formatting for metrics
  const views =
    blog.views > 999 ? `${(blog.views / 1000).toFixed(1)}k` : blog.views || 0;
  const commentsCount = blog.comments?.length || 0;
  const publishDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <section className="sec-1-single-2 pb-70 overflow-hidden">
        <div className="position-relative block-banner pt-4">
          <div className="container">
            {/* Row 1: Header Text Content, Metadata, and Title */}
            <div className="row justify-content-center">
              <div className="col-lg-10 col-12">
                <nav aria-label="breadcrumb">
                  <ul className="breadcrumb list-unstyled d-flex flex-row gap-2 align-items-center m-0 ps-0 pb-3">
                    <li className="breadcrumb-item">
                      <Link href="/" className="text-600 fs-7 hover-dark">
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <span className="icon-shape icon-xxs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={15}
                          height={15}
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <path
                            d="M6.125 4.5625L9.5625 7.84375L6.125 11.125"
                            stroke="#626568"
                            strokeWidth="0.9375"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </li>
                    <li
                      className="breadcrumb-item active text-dark fs-7 text-capitalize"
                      aria-current="page"
                    >
                      {blog.category
                        ? blog.category.replace(/-/g, " ")
                        : "News"}
                    </li>
                  </ul>
                </nav>

                <div className="card-title py-2">
                  <div className="article card-info d-flex flex-wrap align-items-center gap-2 mt-2">
                    <Link
                      href={`/category/${blog.category}`}
                      className="badge bg-1 fs-8 text-capitalize px-3 py-2 rounded"
                    >
                      {blog.category
                        ? blog.category.replace(/-/g, " ")
                        : "General"}
                    </Link>
                    <ul className="d-flex align-items-center text-600 m-0 ps-3">
                      <li>
                        <p className="fs-8 m-0">5 mins read</p>
                      </li>
                    </ul>
                  </div>

                  {/* High Impact Full-Width Dynamic Responsive Heading */}
                  <h1
                    className="mt-3 mb-4 fw-bold text-dark"
                    style={{
                      fontSize: "calc(1.8rem + 1.5vw)",
                      lineHeight: "1.25",
                    }}
                  >
                    {blog.title}
                  </h1>

                  <div className="bottom d-flex flex-wrap align-items-center justify-content-between gap-3 pt-2 pb-4">
                    <div className="d-flex align-items-center gap-3">
                      <Link
                        href={`/author/${author?.slug || ""}`}
                        className="author d-flex align-items-center gap-2"
                      >
                        <Image
                          className="avatar avatar-md rounded-circle"
                          src={
                            author?.image ||
                            "/assets/imgs/template/author/author-9.png"
                          }
                          alt={author?.name || "Author"}
                          width={41}
                          height={41}
                        />
                        <span className="fs-7 text-dark fw-medium">
                          {author?.name || blog.postedby || "Staff"}K
                        </span>
                      </Link>

                      <span className="text-muted fs-8">|</span>
                      <p className="fs-8 m-0 text-600">{publishDate}</p>
                    </div>

                    <div className="d-flex align-items-center gap-4 text-600">
                      <div className="comment d-flex align-items-center fs-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.50018 5.43423C2.50018 4.26961 3.44494 3.3255 4.61035 3.3255H15.39C16.5554 3.3255 17.5002 4.26961 17.5002 5.43422V13.1078C17.5002 14.2724 16.5554 15.2165 15.39 15.2165H6.3295L3.41902 17.3786C3.24443 17.5083 3.01159 17.5285 2.81722 17.4309C2.62285 17.3333 2.50018 17.1345 2.50018 16.9171V5.43423ZM4.61035 4.47571C4.08062 4.47571 3.65118 4.90485 3.65118 5.43423V15.7729L5.79569 14.1799C5.89495 14.1062 6.01534 14.0663 6.13902 14.0663H15.39C15.9197 14.0663 16.3492 13.6372 16.3492 13.1078V5.43422C16.3492 4.90485 15.9197 4.47571 15.39 4.47571H4.61035Z"
                            fill="#626568"
                          />
                        </svg>
                        <span className="ms-1">{commentsCount} Comments</span>
                      </div>
                      <div className="readers d-flex align-items-center fs-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.186 10.3224C15.734 13.039 12.9803 14.7266 10.001 14.7266C7.01977 14.7266 4.26612 13.039 2.81407 10.3224C2.70224 10.1114 2.70224 9.88843 2.81407 9.67767C4.26612 6.96107 7.01977 5.27366 10.001 5.27366C12.9803 5.27366 15.7339 6.96107 17.186 9.67767C17.2998 9.88843 17.2998 10.1114 17.186 10.3224ZM18.1135 9.13905C16.4744 6.07185 13.366 4.16669 10.001 4.16669C6.63409 4.16669 3.52561 6.07185 1.88652 9.13905C1.59341 9.68631 1.59341 10.3137 1.88652 10.8606C3.52561 13.9278 6.63409 15.8334 10.001 15.8334C13.366 15.8334 16.4744 13.9278 18.1135 10.8606C18.4066 10.3138 18.4066 9.68631 18.1135 9.13905ZM10.001 12.2707C11.2025 12.2707 12.18 11.2522 12.18 9.99993C12.18 8.7477 11.2025 7.72912 10.001 7.72912C8.79769 7.72912 7.82002 8.7477 7.82002 9.99993C7.82002 11.2522 8.79773 12.2707 10.001 12.2707ZM10.001 6.62215C8.21147 6.62215 6.75752 8.13757 6.75752 9.99997C6.75752 11.8628 8.21151 13.3776 10.001 13.3776C11.7886 13.3776 13.2425 11.8627 13.2425 9.99997C13.2425 8.13757 11.7886 6.62215 10.001 6.62215Z"
                            fill="#626568"
                          />
                        </svg>
                        <span className="ms-1">{views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Clean, Full-Width Stacked Hero Image Placement */}
            <div className="row justify-content-center mt-3">
              <div className="col-12">
                <div className="position-relative overflow-hidden rounded-16 shadow-sm">
                  <Image
                    className="w-100 h-auto"
                    src={blog.img || "/assets/imgs/page/img-108.png"}
                    alt={blog.title}
                    width={1400}
                    height={750}
                    style={{
                      objectFit: "cover",
                      maxHeight: "650px",
                      borderRadius: "16px",
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body Area */}
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-9 col-md-10 offset-lg-1 offset-md-1">
              <ContentSingle blog={blog} />
            </div>
          </div>
          <SocialShare title={blog.title} slug={blog.slug} />
        </div>
      </section>
    </>
  );
}
