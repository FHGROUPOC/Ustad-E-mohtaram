"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaYoutube 
} from "react-icons/fa";
import { MdAudiotrack } from "react-icons/md";

// --- STRICT TYPES FOR THE DYNAMIC CONTENT BLOCKS ---
export type BlogBlockType = 
  | "Sub" 
  | "h3"
  | "description" 
  | "quote" 
  | "hyperlink" 
  | "bullet" 
  | "single-image" 
  | "double-image" 
  | "image-text-side" 
  | "youtube";

export interface BlogBlock {
  type: BlogBlockType;
  value?: string;
  subType?: "video" | "audio";
  author?: string;
  linkUrl?: string;
  linkTitle?: string;
  imageUrl?: string;
  imageUrls?: string[];
  alts?: string[];
  sideHeading?: string;
  sideDescription?: string;
}

export interface BlogData {
  _id?: string;
  title?: string;
  img?: string;
  postedby?: string;
  authorId?: string;
  adminId?: string;
  slug?: string;
  category?: string;
  imgalt?: string;
  description?: string;
  metaDescription?: string;
  blog_detail?: BlogBlock[];
  tags?: string[];
  status?: string;
  scheduledAt?: string;
  views?: number;
  comments?: any[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface ContentSingleProps {
  blog: BlogData;
}

const ContentSingle: React.FC<ContentSingleProps> = ({ blog }) => {
  if (!blog || !blog.blog_detail) return null;

  // Helper for YouTube ID extraction
  const getYouTubeId = (url?: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Helper to detect if a string contains Urdu/Arabic script characters
  const isUrduText = (text?: string): boolean => {
    if (!text) return false;
    const urduRegex = /[\u0600-\u06FF]/;
    return urduRegex.test(text);
  };

  // Utility matching UrduPoint typography scaling with compacted line layouts
  const getTypographyStyle = (
    text: string | undefined,
    baseFontSize: string,
    mobileFontSize: string,
    customLineHeight?: string,
  ) => {
    const safeText = text || "";
    const isUrdu = isUrduText(safeText);
    return {
      style: {
        whiteSpace: "pre-line" as const,
        lineHeight: isUrdu ? customLineHeight || "1.8" : "1.6",
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
      <style jsx global>{`
        @media (max-width: 768px) {
          .responsive-typography {
            --dynamic-fs: var(--mobile-fs) !important;
          }
        }
      `}</style>

      <div className="article-body">
        {blog.blog_detail.map((current: BlogBlock, i: number) => {
          switch (current.type) {
            case "description": {
              // Base: 1.6rem -> Mobile: 1.25rem
              const config = getTypographyStyle(
                current.value,
                "18px",
                "1.25rem",
                "1.8",
              );
              return (
                <p
                  key={i}
                  className={`text-600 fw-medium mb-4 mt-2! responsive-typography ${config.className}`}
                  style={config.style}
                  dir={config.dir}
                >
                  {current.value}
                </p>
              );
            }

            case "Sub": 
            case "h3": {
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
              return current.imageUrl ? (
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
              ) : null;

            case "image-text-side": {
              const headingConfig = getTypographyStyle(
                current.sideHeading,
                "1.95rem",
                "1.5rem",
                "1.6",
              );
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
                    {current.imageUrl && (
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
                    )}

                    <div className={current.imageUrl ? "col-lg-6 col-md-6" : "col-12"}>
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
                        {current.sideDescription && (
                          <p
                            className={`mt-2 responsive-typography ${descConfig.className}`}
                            style={descConfig.style}
                            dir={descConfig.dir}
                          >
                            {current.sideDescription}
                          </p>
                        )}
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
                <u
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
                </u>
              );
            }

            case "youtube": {
              const vidId = getYouTubeId(current.value);
              if (!vidId) return null;

              const isAudioMode = current.subType === "audio";

              if (isAudioMode) {
                return <BeautifulAudioPlayer key={i} videoId={vidId} />;
              }

              return (
                <div key={i} className="my-5 shadow-lg rounded-16 overflow-hidden">
                  <iframe
                    width="100%"
                    height="450"
                    src={`https://www.youtube.com/embed/${vidId}?rel=0&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              );
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
                      className={config.dir === "rtl" ? "me-2 transform rotate-180" : "ms-2"}
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
                  className={`p-4 border-start border-4 border-primary bg-light rounded responsive-typography ${quoteConfig.className}`}
                  dir={quoteConfig.dir}
                >
                  <p className="text-dark m-0 fw-medium" style={quoteConfig.style}>
                    {current.value}
                  </p>
                  {current.author && (
                    <p className="fs-7 mb-0 mt-2 text-muted">
                      By <span className="text-dark fw-bold">{current.author}</span>
                    </p>
                  )}
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

// --- WHITE GLASSMORPHISM BEAUTIFUL AUDIO PLAYER ---
interface BeautifulAudioPlayerProps {
  videoId: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

const BeautifulAudioPlayer: React.FC<BeautifulAudioPlayerProps> = ({ videoId }) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    // Load YouTube API script globally if not already available
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    let player: any;
    const initPlayer = () => {
      player = new window.YT.Player(`yt-audio-player-${videoId}`, {
        height: "1",
        width: "1",
        videoId: videoId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          autoplay: 0,
        },
        events: {
          onReady: (event: any) => {
            playerRef.current = event.target;
            setDuration(event.target.getDuration() || 0);
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === 1) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 350);

    return () => {
      clearInterval(interval);
      if (player && typeof player.destroy === "function") player.destroy();
    };
  }, [videoId]);

  const togglePlay = (): void => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = (): void => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!playerRef.current) return;
    const seekToTime = parseFloat(e.target.value);
    playerRef.current.seekTo(seekToTime, true);
    setCurrentTime(seekToTime);
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    const pad = (num: number) => String(num).padStart(2, "0");
    return hrs > 0 
      ? `${hrs}:${pad(mins)}:${pad(secs)}` 
      : `${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div 
      className="w-100 my-4 d-flex flex-column flex-md-row align-items-center gap-3 p-3 position-relative"
      style={{
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.06)",
      }}
    >
      {/* CRITICAL FIX: YouTube needs the element to be technically visible to stream cleanly. 
        We use pointer-events-none and absolute positioning to safely move it off screen bounds.
      */}
      <div 
        id={`yt-audio-player-${videoId}`} 
        className="position-absolute" 
        style={{ width: "1px", height: "1px", top: "-10px", left: "-10px", pointerEvents: "none" }} 
      />

      {/* Left Details Section */}
      <div className="d-flex align-items-center gap-3 w-100 md:w-auto flex-grow-1 min-w-0">
        <div 
          className="rounded-12 d-flex align-items-center justify-content-center border"
          style={{ 
            width: "44px", 
            height: "44px",
            background: "rgba(13, 110, 253, 0.08)",
            borderColor: "rgba(13, 110, 253, 0.15)"
          }}
        >
          <MdAudiotrack 
            size={20} 
            className="text-primary" 
            style={{
              animation: isPlaying ? "bounce 1.2s infinite" : "none"
            }} 
          />
        </div>
        <div className="flex-grow-1 min-w-0">
          {/* <h5 className="m-0 text-dark truncate text-sm fw-bold tracking-wide">Audio Version</h5> */}
          <p className="m-0 text-muted d-flex align-items-center gap-1 mt-0.5" style={{ fontSize: "15px", fontWeight: 500 }}>
            <FaYoutube className="text-danger" /> YouTube Stream Audio Source
          </p>
        </div>
      </div>

      {/* Controls & Scrubber Section */}
      <div className="d-flex align-items-center gap-3 w-100 flex-grow-1">
        <button
          onClick={togglePlay}
          className="rounded-circle border-0 text-white d-flex align-items-center justify-content-center transition shadow-sm"
          style={{ 
            width: "38px", 
            height: "38px", 
            cursor: "pointer",
            backgroundColor: "#0d6efd",
            transition: "transform 0.2s, background-color 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          {isPlaying ? <FaPause size={12} /> : <FaPlay className="ms-0.5" size={12} />}
        </button>

        <div className="flex-grow-1 d-flex align-items-center gap-2">
          <span className="font-monospace text-muted fw-medium" style={{ fontSize: "11px", minWidth: "34px" }}>
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="flex-grow-1 cursor-pointer outline-none"
            style={{ 
              height: "5px",
              accentColor: "#0d6efd",
              background: "rgba(0,0,0,0.1)",
              borderRadius: "4px"
            }}
          />
          <span className="font-monospace text-muted fw-medium" style={{ fontSize: "11px", minWidth: "34px" }}>
            {formatTime(duration)}
          </span>
        </div>

        <button
          onClick={toggleMute}
          className="bg-transparent border-0 text-muted p-1 transition shrink-0"
          style={{ cursor: "pointer" }}
        >
          {isMuted ? <FaVolumeMute size={18} className="text-danger" /> : <FaVolumeUp size={18} />}
        </button>
      </div>

      {/* Standard bounce framing utility style snippet injected directly inside layout */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

export default ContentSingle;