"use client";

import { useBackToTop } from "@/util/useBackToTop";

export default function BackToTopInteractive() {
  const { isVisible, progress, scrollToTop } = useBackToTop();

  return (
    <div className={`btn-scroll-top ${isVisible ? "active-progress" : ""}`} onClick={scrollToTop} style={{ display: isVisible ? "flex" : "none" }}>
      <svg className="progress-square svg-content" width="100%" height="100%" viewBox="0 0 40 40">
        <path d="M20 1a19 19 0 1 1 0 38 19 19 0 0 1 0-38" style={{ transition: "stroke-dashoffset 10ms linear", strokeDasharray: "139.988px", strokeDashoffset: `${139.988 - progress}px` }} />
      </svg>
    </div>
  );
}
