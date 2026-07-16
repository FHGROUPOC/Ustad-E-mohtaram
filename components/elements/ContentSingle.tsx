"use client"
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

  // Helper to detect if a string contains Urdu/Arabic script characters
  const isUrduText = (text: string): boolean => {
    if (!text) return false;
    const urduRegex = /[\u0600-\u06FF]/;
    return urduRegex.test(text);
  };

  // Utility matching UrduPoint typography scaling with compacted line layouts
  const getTypographyStyle = (
    text: string,
    baseFontSize: string,
    mobileFontSize: string,
    customLineHeight?: string,
  ) => {
    const isUrdu = isUrduText(text);
    return {
      style: {
        whiteSpace: "pre-line" as const,
        lineHeight: isUrdu ? customLineHeight || "1.6" : "2",
        "--base-fs": baseFontSize,
        "--mobile-fs": mobileFontSize,
        fontSize: "var(--dynamic-fs, var(--base-fs))",
        fontFamily: isUrdu
          ? "var(--font-noto-urdu), serif"
          : "inherit",
        wordSpacing: isUrdu ? "2px" : "normal",
      } as React.CSSProperties & { [key: string]: string },
      className: isUrdu ? "text-end" : "text-start",
      dir: isUrdu ? ("rtl" as const) : ("ltr" as const),
    };
  };

  return (
    <div className="blog-content pb-5">
      {/* Scope a clean CSS variable override for viewports less than 768px */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .responsive-typography {
            --dynamic-fs: var(--mobile-fs) !important;
          }
        }
      `}</style>

      <div className="article-body">
        {blog.blog_detail.map((current: any, i: number) => {
          switch (current.type) {
            case "description": {
              // Base: 1.6rem -> Mobile: 1.25rem (Fixed your typo here as well)
              const config = getTypographyStyle(
                current.value,
                "18px",
                "1.25rem",
                "1.8",
              );
              return (
                <p
                  key={i}
                  className={`text-600 fw-medium mb-4 !mt-2 responsive-typography ${config.className}`}
                  style={config.style}
                  dir={config.dir}
                >
                  {current.value}
                </p>
              );
            }

            case "Sub": {
              // Base: 2.25rem -> Mobile: 1.65rem
              const config = getTypographyStyle(
                current.value,
                "2.25rem",
                "1.65rem",
                "1.6",
              );
              return (
                <h3
                  key={i}
                  className={`fw-medium mt-4 mb-3 text-dark uppercase tracking-tight responsive-typography ${config.className}`}
                  style={config.style}
                  dir={config.dir}
                >
                  {current.value}
                </h3>
              );
            }

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
                </div>
              );

            case "image-text-side": {
              // Side Heading Base: 1.95rem -> Mobile: 1.5rem
              const headingConfig = getTypographyStyle(
                current.sideHeading,
                "1.95rem",
                "1.5rem",
                "1.6",
              );
              // Side Desc Base: 1.45rem -> Mobile: 1.2rem
              const descConfig = getTypographyStyle(
                current.sideDescription,
                "1.45rem",
                "1.2rem",
                "1.8",
              );
              const isUrduLayout = isUrduText(current.sideDescription);

              return (
                <div key={i} className="my-4">
                  <div
                    className={`row g-4 align-items-center ${isUrduLayout ? "flex-row-reverse" : ""}`}
                  >
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

                    <div className="col-lg-6 col-md-6">
                      <div className="ps-lg-2">
                        {current.sideHeading && (
                          <h3
                            className={`mb-2 mt-0 responsive-typography ${headingConfig.className}`}
                            style={headingConfig.style}
                            dir={headingConfig.dir}
                          >
                            {current.sideHeading}
                          </h3>
                        )}
                        <p
                          className={`mt-2 responsive-typography ${descConfig.className}`}
                          style={descConfig.style}
                          dir={descConfig.dir}
                        >
                          {current.sideDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            case "bullet": {
              const config = getTypographyStyle(
                current.value,
                "1.55rem",
                "1rem",
                "1.8",
              );
              const isRtl = config.dir === "rtl";
              return (
                <div
                  key={i}
                  className={`d-flex align-items-start gap-3 my-3 ${isRtl ? "flex-row-reverse" : ""}`}
                  dir={config.dir}
                >
                  <div
                    className="mt-3"
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#0d6efd",
                      flexShrink: 0,
                    }}
                  ></div>
                  <p
                    className={`text-dark my-0 flex-grow-1 responsive-typography ${config.className}`}
                    style={config.style}
                  >
                    {current.value}
                  </p>
                </div>
              );
            }

            case "youtube": {
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
            }

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

            case "hyperlink": {
              const config = getTypographyStyle(
                current.linkTitle,
                "1.55rem",
                "1rem",
                "1.8",
              );
              return (
                <div
                  key={i}
                  className={`my-4 responsive-typography ${config.className}`}
                  dir={config.dir}
                >
                  <a
                    href={current.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-inline-flex align-items-center fw-bold text-primary text-decoration-none border-primary pb-1"
                    style={{ ...config.style, transition: "all 0.3s" }}
                  >
                    {config.dir === "ltr" && (
                      <span className="me-2">
                        {current.linkTitle || "Read More"}
                      </span>
                    )}
                    <svg
                      className={
                        config.dir === "rtl"
                          ? "me-2 transform rotate-180"
                          : "ms-2"
                      }
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
                    {config.dir === "rtl" && (
                      <span className="ms-2">
                        {current.linkTitle || "مزید پڑھیں"}
                      </span>
                    )}
                  </a>
                </div>
              );
            }

            case "quote": {
              const quoteConfig = getTypographyStyle(
                current.value,
                "1.8rem",
                "1.4rem",
                "1.8",
              );
              return (
                <blockquote
                  key={i}
                  className={` p-4 border-start border-4 border-primary bg-light rounded responsive-typography ${quoteConfig.className}`}
                  dir={quoteConfig.dir}
                >
                  <p
                    className="text-dark m-0 fw-medium"
                    style={quoteConfig.style}
                  >
                    {current.value}
                  </p>
                  <p className="fs-7 mb-0 mt-2 text-muted">
                    By{" "}
                    <span className="text-dark fw-bold">{current.author}</span>
                  </p>
                </blockquote>
              );
            }

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default ContentSingle;