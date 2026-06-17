import SectionTitle from "@/components/elements/TitleWhite";


import ArticleCard12 from "@/components/cards/ArticleCard12";
import cardHome2 from "@/public/data/cardHome-2.json";
export default function Section5() {
  const articleCard12 = cardHome2.sec5Card12;
  return (
    <>
      {/*Home 2 Section 5*/}
      <section className="sec-5-home-2 sec-padding overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SectionTitle title="Latest news" description="Fresh Stories. Fast Updates." />
            </div>
          </div>
          <div className="row mt-2 g-4">
            {articleCard12.map((card, idx) => (
              <div className="col-12" key={idx}>
                <ArticleCard12 card={card} idx={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
