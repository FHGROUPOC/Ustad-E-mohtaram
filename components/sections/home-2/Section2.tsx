import CategoryCard2 from "@/components/cards/CategoryCard2";


import datacard from "@/public/data/cardHome-1.json";
export default function Section2() {
  const categoryCard2 = datacard.categoryCard2;
  return (
    <>
      {/*Home 2 Section 2*/}
      <section className="sec-2-home-2">
        <div className="container">
          <div className="row g-3">
            {categoryCard2.map((card, idx) => (
              <div className="col-lg-2 col-sm-4 col-6" key={idx}>
                <CategoryCard2 key={idx} card={card} idx={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
