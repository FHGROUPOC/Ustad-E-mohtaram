import Image from "next/image";
import React from "react";

interface ContentSingleProps {
  blog: any;
}

const ContentSingle: React.FC<ContentSingleProps> = ({ blog }) => {
  if (!blog || !blog.blog_detail) return null;

  // Helper for YouTube ID extraction
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="blog-content pb-5">
      {/* Dynamic Content Blocks */}
      <div className="article-body">
        {blog.blog_detail.map((current: any, i: number) => {
          switch (current.type) {
            case "description":
              return (
                <p
                  key={i}
                  className="text-600 mb-4 !mt-2"
                  style={{
                    whiteSpace: "pre-line",
                    lineHeight: "1.5",
                    // fontSize: "0.9rem",
                  }}
                >
                  {current.value}
                </p>
              );

            case "Sub":
              return (
                <h3
                  key={i}
                  className="fw-bold mt-3 mb-3 text-dark uppercase tracking-tight"
                  style={{ whiteSpace: "pre-line", fontSize: "2rem" }}
                >
                  {current.value}
                </h3>
              );

            case "single-image":
              return (
                <div key={i} className="my-5 text-center">
                  <Image
                    src={current.imageUrl}
                    alt={current.value || "Blog image"}
                    width={1200}
                    height={675}
                    className="rounded-16 img-fluid shadow-lg"
                    style={{ height: "100%" }}
                  />
                  {/* {current.value && (
                    <p className="fs-9 text-muted mt-3 italic text-center text-uppercase tracking-widest">
                      // {current.value}
                    </p>
                  )} */}
                </div>
              );

            case "image-text-side":
              return (
                <div key={i} className="my-3">
                  <div className="row g-4 align-items-center">
                    {/* Left Column: Image */}
                    <div className="col-lg-6 col-md-6">
                      <div className="position-relative overflow-hidden rounded-16 shadow-lg">
                        <Image
                          src={current.imageUrl}
                          alt={current.sideHeading || "side image"}
                          width={800}
                          height={600}
                          className="img-fluid w-100 object-fit-cover"
                          style={{
                            borderRadius: "16px",
                            height: "100%",
                            display: "block",
                          }}
                        />
                      </div>
                    </div>

                    {/* Right Column: Text */}
                    <div className="col-lg-6 col-md-6">
                      <div className="ps-lg-2">
                        {current.sideHeading && (
                          <h3
                            className="mb-0 mt-0"
                            style={{
                              whiteSpace: "pre-line",
                              // lineHeight: "1.5",
                              fontSize: "1.7rem",
                            }}
                          >
                            {current.sideHeading}
                          </h3>
                        )}
                        <p className="mt-2">{current.sideDescription}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
              return (
                <div key={i} className="my-5 clearfix">
                  <div
                    className="float-start me-4 mb-3"
                    style={{ width: "45%" }}
                  >
                    <div className="position-relative overflow-hidden rounded-16 shadow-sm">
                      <Image
                        src={current.imageUrl}
                        alt={current.sideHeading || "side image"}
                        width={600}
                        height={450}
                        className="img-fluid w-100 object-fit-cover"
                        style={{ borderRadius: "16px", display: "block" }}
                      />
                    </div>
                  </div>
                  <div className="side-content-text">
                    {current.sideHeading && <h3>{current.sideHeading}</h3>}
                    <p>{current.sideDescription}</p>
                  </div>
                </div>
              );
            case "bullet":
              return (
                <div key={i} className="d-flex align-items-start gap-3 my-3 ">
                  <div
                    className="mt-2"
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#0d6efd",
                      flexShrink: 0,
                    }}
                  ></div>
                  <p className="text-dark my-0" style={{ fontSize: "1.1rem" }}>
                    {current.value}
                  </p>
                </div>
              );

            case "youtube":
              const vidId = getYouTubeId(current.value);
              return vidId ? (
                <div
                  key={i}
                  className="my-5 shadow-lg rounded-16 overflow-hidden"
                >
                  <iframe
                    width="100%"
                    height="450"
                    src={`https://www.youtube.com/embed/${vidId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : null;

            case "double-image":
              return (
                <div key={i} className="row g-4 my-5">
                  {current.imageUrls?.map((url: string, idx: number) => (
                    <div key={idx} className="col-md-6">
                      <Image
                        src={url}
                        alt={current.alts?.[idx] || "Gallery image"}
                        width={600}
                        height={450}
                        className="rounded-16 img-fluid w-100 object-fit-cover shadow-sm"
                        style={{ height: "100%" }}
                      />
                    </div>
                  ))}
                </div>
              );
            case "hyperlink":
              return (
                <div key={i} className="my-6">
                  <a
                    href={current.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center font-bold text-gray-900 no-underline transition-all duration-300 ease-in-out hover:text-blue-600"
                    style={{ fontSize: "1.125rem" }}
                  >
                    <span className=" transition-all duration-300">
                      {current.linkTitle || "Read More"}
                    </span>

                    <svg
                      className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-gray-400 group-hover:text-blue-600"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </a>
                </div>
              );
              return (
                <div key={i} className="my-4">
                  <a
                    href={current.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-inline-flex align-items-center fw-bold text-primary text-decoration-none border-primary pb-1"
                    style={{ fontSize: "1.1rem transition: all 0.3s" }}
                  >
                    {current.linkTitle || "Read More"}
                    <svg
                      className="ms-2"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </a>
                </div>
              );
            case "quote":
              return (
                <blockquote key={i} className="blockquote">
                  <p className="text-dark m-0 fs-22 fw-medium">
                    {current.value}
                  </p>
                  <p className="fs-7 mb-0">
                    By <span className="text-dark">{current.author}</span>
                  </p>
                </blockquote>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default ContentSingle;
