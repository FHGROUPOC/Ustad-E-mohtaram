import DataCard from "@/public/data/cardHome-2.json";
import Image from "next/image";
import RecommendCard from "@/components/cards/RecommendCard";
import Link from "next/link";

export default function Section7() {
  const cardRecommendData = DataCard.sec7CardRecommend;
  return (
    <>
      {/*Home 2 Section 7*/}
      <section className="sec-7-home-2 sec-padding" data-background="/assets/imgs/page/bg-home2-sec7.png">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <h4 className="mb-0 ds-4">Recommended</h4>
                <div className="justify-content-between align-items-center gap-3 d-none d-md-flex">
                  <Link href="/archive-3" className="view-more">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow" />
                    </span>
                    <span className="button-text">View More</span>
                  </Link>
                  <div className="block-author d-none d-lg-flex align-items-center">
                    <div className="avatar avatar-64 rounded-circle overflow-hidden border-3 border-white z-5">
                      <Image src="/assets/imgs/template/author/author-11.png" alt="magzin" width={500} height={500} />
                    </div>
                    <div className="avatar avatar-64 rounded-circle overflow-hidden border-3 border-white z-4">
                      <Image src="/assets/imgs/template/author/author-12.png" alt="magzin" width={500} height={500} />
                    </div>
                    <div className="avatar avatar-64 rounded-circle overflow-hidden border-3 border-white z-3">
                      <Image src="/assets/imgs/template/author/author-13.png" alt="magzin" width={500} height={500} />
                    </div>
                    <div className="avatar avatar-64 rounded-circle overflow-hidden border-3 border-white z-1">
                      <Image src="/assets/imgs/template/author/author-14.png" alt="magzin" width={500} height={500} />
                    </div>
                    <div className="avatar avatar-64 rounded-circle overflow-hidden border-3 border-white z-0">
                      <Image src="/assets/imgs/template/author/author-15.png" alt="magzin" width={500} height={500} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4 g-4">
            {/* prettier-ignore */}
            {cardRecommendData.map((card, idx) => (
              <RecommendCard key={idx} card={card} idx={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
