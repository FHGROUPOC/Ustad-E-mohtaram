import ContentSingle from "@/components/elements/ContentSingle";
import Image from "next/image";
import Link from "next/link";

interface Section1Props {
  blog: any;
  author: any;
}

export default function Section1({ blog, author }: Section1Props) {
  // Logic: Map the fields exactly as they appear in your JSON
  const categoryName = blog?.category || "Style";
  const publishDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString()
    : "Recently";
  const viewsCount = blog?.views || 0;
  const mainImage = blog?.img || "/assets/imgs/page/img-112.png";

  return (
    <>
      <section className="sec-1-single-1 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-10 offset-lg-1 offset-md-1">
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb list-unstyled d-flex flex-row gap-2 align-items-center m-0 ps-0 py-4">
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
                  <li className="breadcrumb-item active text-dark fs-7">
                    {categoryName}
                  </li>
                </ul>
              </nav>
              <div className="article card-info d-flex flex-wrap align-items-center gap-2 mt-4">
                <Link href="#" className="badge bg-1 fs-8 text-uppercase">
                  {categoryName}
                </Link>
                <ul className="d-flex align-items-center text-600 m-0 ps-3">
                  <li>
                    <p className="fs-8 m-0">6 mins read</p>
                  </li>
                </ul>
                <h2 className="mt-3">{blog?.title || "Untitled Post"}</h2>
              </div>
            </div>
          </div>

          <div className="border-top mt-4" />

          <div className="row">
            <div className="col-lg-9 col-md-10 offset-lg-1 offset-md-1">
              <div className="bottom mt-auto d-flex flex-wrap align-items-center gap-2 pt-4">
                <Link
                  href={`/author/${blog?.authorId}`}
                  className="author d-flex align-items-center gap-2"
                >
                  <Image
                    className="avatar avatar-md rounded-circle"
                    src={
                      author?.image ||
                      "/assets/imgs/template/author/author-9.png"
                    }
                    alt="author"
                    width={41}
                    height={41}
                  />
                  <span className="fs-7 text-dark fw-regular">
                    {author?.name || blog?.postedby || "Admin"}
                  </span>
                </Link>
                <ul className="d-flex align-items-center gap-4 text-600 m-0 ps-3">
                  <li>
                    <p className="fs-8 m-0">{publishDate}</p>
                  </li>
                </ul>
                <div className="ms-md-auto ms-5 d-flex align-items-center gap-3 me-5">
                  <span className="readers d-flex align-items-center fs-8 gap-1">
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
                    <span>{viewsCount} views</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-container-2 py-5">
          <Image
            className="rounded-16 cover-image"
            src={mainImage}
            alt={blog?.imgalt || "featured image"}
            width={1490}
            height={731}
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-10 offset-lg-1 offset-md-1">
              {/* Top Intro Description (from main blog object) */}
              {blog?.description && (
                <p className=" mb-4 fs-5" style={{ whiteSpace: "pre-line" }}>
                  {blog.description}
                </p>
              )}

              {/* Dynamic Content Blocks (from blog_detail array) */}
              <ContentSingle blog={blog} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
