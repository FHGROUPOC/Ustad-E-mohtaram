"use client";
import cardCollections from "@/public/data/cardHome-2.json";
import { useRef } from "react";
import ArticleCard7 from "@/components/cards/ArticleCard7";
import SwiperDynamic from "@/components/shared/SwiperDynamic";
import { useTabs } from "@/util/useTabs";

const tabList = [
  { id: "tab1", label: "Entertainment", dataKey: "sec3Card7tab1" },
  { id: "tab2", label: "Environment", dataKey: "sec3Card7tab2" },
  { id: "tab3", label: "World News", dataKey: "sec3Card7tab3" },
  { id: "tab4", label: "Education", dataKey: "sec3Card7tab4" },
  { id: "tab5", label: "Lifestyle", dataKey: "sec3Card7tab5" },
  { id: "tab6", label: "Beauty", dataKey: "sec3Card7tab6" },
  { id: "tab7", label: "Business", dataKey: "sec3Card7tab7" },
];
const cardCollectionsTyped = cardCollections as Record<string, any[]>;

export default function Section3Interactive() {
  const { activeTab, switchTab } = useTabs(
    "tab3",
    tabList.map((t) => t.id)
  );
  const boxSwiperPaddingRef = useRef<HTMLDivElement>(null);

  const swiperParams = {
    slidesPerView: 2,
    spaceBetween: 20,
    slidesPerGroup: 1,
    centeredSlides: false,
    loop: true,
    autoplay: {
      delay: 5000,
      reverseDirection: true,
    },
    breakpoints: {
      1200: { slidesPerView: 3 },
      992: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      576: { slidesPerView: 1 },
      0: { slidesPerView: 1 },
    },
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev",
    },
  };

  const currentTabData = cardCollectionsTyped[tabList.find(tab => tab.id === activeTab)?.dataKey || "sec3Card7tab3"] || [];

  return (
    <div className="row">
      <div className="col-lg-3">
        {/* Interactive Tab Navigation */}
        <ul className="nav nav-tabs d-flex flex-lg-column flex-row flex-wrap ps-0 ps-lg-5">
          {tabList.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <a
                href="#"
                className={`nav-link${activeTab === tab.id ? " active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  switchTab(tab.id);
                }}
                role="tab"
                aria-selected={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
                type="button"
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-lg-9">
        {/* Interactive Swiper */}
        <div className="box-swiper-padding" ref={boxSwiperPaddingRef}>
          <SwiperDynamic
            className="swiper slider-3"
            {...swiperParams}
          >
            {currentTabData.map((card, idx) => (
              <div key={idx}>
                <ArticleCard7 card={card} idx={idx} />
              </div>
            ))}
          </SwiperDynamic>
        </div>
      </div>




    </div>
  );
}
