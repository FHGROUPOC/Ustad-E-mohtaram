import cardCollections from "@/public/data/cardHome-1.json";


import ArticleCard5 from "@/components/cards/ArticleCard5";
import ArticleCard11 from "@/components/cards/ArticleCard11";

export default function Section1({ classList }: any) {
  const cardCollectionsDataCol1 = cardCollections.sec7Card5Col1;
  const cardCollectionsData11 = cardCollections.sec7Card11;
  const cardCollectionsDataCol2 = cardCollections.sec7Card5Col2;
  return (
    <>
      {/*Home 2 Section 1*/}
      <section className={`sec-1-home-2 sec-padding ${classList}`} data-background="/assets/imgs/page/bg-home1-sec1.png">
        <div className="container">
          <div className="row mt-2 g-4">
            {cardCollectionsData11.map((card, idx) => (
              <div className="col-lg-6" key={idx}>
                <ArticleCard11 key={idx} card={card} idx={idx} />
              </div>
            ))}
            <div className="col-lg-3">
              <div className="row g-4">
                {cardCollectionsDataCol1.map((card, idx) => (
                  <div className="col-lg-12 col-md-6" key={idx}>
                    <ArticleCard5 key={idx} card={card} idx={idx} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-3">
              <div className="row g-4">
                {cardCollectionsDataCol2.map((card, idx) => (
                  <div className="col-lg-12 col-md-6" key={idx}>
                    <ArticleCard5 key={idx} card={card} idx={idx} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
