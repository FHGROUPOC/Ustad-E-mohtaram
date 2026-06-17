import SwiperDynamic from "@/components/shared/SwiperDynamic";
import Image from "next/image";

export default function Swiper1Sec4() {
  return (
    <>
      <SwiperDynamic
        className="swiper slider-1 rounded-16 z-1"
        slidesPerView={1}
        spaceBetween={30}
        slidesPerGroup={1}
        centeredSlides={false}
        loop={true}
        autoplay={{
          delay: 2000,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
      >
        <div className="swiper-slide">
          <Image className="w-100 rounded-16 overflow-hidden cover-image" src="/assets/imgs/page/img-89.png" alt="magzin" width={381} height={185} />
        </div>
        <div className="swiper-slide">
          <Image className="w-100 rounded-16 overflow-hidden cover-image" src="/assets/imgs/page/img-89.png" alt="magzin" width={381} height={185} />
        </div>
        <div className="swiper-slide">
          <Image className="w-100 rounded-16 overflow-hidden cover-image" src="/assets/imgs/page/img-89.png" alt="magzin" width={381} height={185} />
        </div>
      </SwiperDynamic>
    </>
  );
}
