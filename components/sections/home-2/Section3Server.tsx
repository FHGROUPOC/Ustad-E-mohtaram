import SectionTitle from "@/components/elements/TitleWhite";
import Section3Interactive from "./Section3Interactive";

export default function Section3Server() {
  return (
    <>
      {/*Home 2 Section 2*/}
      <section className="sec-3-home-2 sec-padding overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SectionTitle title="News in Category" description="Real-Time Updates That Matter" />
            </div>
          </div>
        </div>
        <div className="position-relative mt-4">
          <div className="container">


            {/* Client component will handle interactive Swiper */}
            <Section3Interactive />
          </div>
        </div>
      </section>
    </>
  );
}
