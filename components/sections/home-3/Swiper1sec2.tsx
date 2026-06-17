import SwiperDynamic from "@/components/shared/SwiperDynamic";
import Image from "next/image";

export default function Swiper1sec2() {
  return (
    <>
      <SwiperDynamic className="swiper slider-1 mt-5 rounded-16 overflow-hidden" pagination={{ clickable: true }} autoplay={{ delay: 3000 }} slidesPerView={1} spaceBetween={15} loop={true}>
        <div className="swiper-slide">
          <Image className="rounded-16 overflow-hidden cover-image" src="/assets/imgs/page/img-84.png" alt="magzin" width={500} height={500} />
        </div>
        <div className="swiper-slide">
          <Image className="rounded-16 overflow-hidden cover-image" src="/assets/imgs/page/img-85.png" alt="magzin" width={500} height={500} />
        </div>
        <div className="swiper-slide">
          <Image className="rounded-16 overflow-hidden cover-image" src="/assets/imgs/page/img-84.png" alt="magzin" width={500} height={500} />
        </div>
        <div className="swiper-slide">
          <Image className="rounded-16 overflow-hidden cover-image" src="/assets/imgs/page/img-90.png" alt="magzin" width={500} height={500} />
        </div>
      </SwiperDynamic>
    </>
  );
}
