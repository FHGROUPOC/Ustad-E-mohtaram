"use client";
import CategoryCard1 from "@/components/cards/CategoryCard1";
import CategoryCard2 from "@/components/cards/CategoryCard2";

// Define the interface to tell TS what a blog looks like
interface Blog {
  _id?: string;
  category: string;
  img: string;
  [key: string]: any; // Allows for other properties
}

interface Section6Props {
  blogs: Blog[];
}

export default function Section6({ blogs = [] }: Section6Props) {
  // 1. Logic to get unique categories
  const categoryMap = blogs.reduce((acc: any, blog: Blog) => {
    const cat = blog.category || "General";
    if (!acc[cat]) {
      acc[cat] = {
        title: cat,
        count: 0,
        img: blog.img || "/assets/imgs/template/default-cat.png",
        linkPost: `/category/${cat.toLowerCase().replace(/\s+/g, "-")}`,
      };
    }
    acc[cat].count += 1;
    return acc;
  }, {});

  const allCategories = Object.values(categoryMap) as any[];

  // 2. Split data for design
  const categoryCard1 = allCategories.slice(0, 6);
  const categoryCard2 = allCategories.slice(0, 12);

  const bgColors = ["bg-1", "bg-2", "bg-3", "bg-4", "bg-5", "bg-6"];

  return (
    <section className="sec-6-home-1 sec-padding">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="block-discover bg-13">
              <div className="position-relative z-2">
                <h6 className="ds-6 text-white mb-0">Hot Topics</h6>
                <p className="text-white mt-2 mb-5">
                  Based on{" "}
                  <span className="text-decoration-underline">
                    your interests
                  </span>
                </p>
                <a href="#" className="view-more white z-3 w-12rem">
                  <span className="circle" aria-hidden="true">
                    <span className="icon arrow" />
                  </span>
                  <span className="button-text fw-semi-bold">
                    Discover more
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-8 d-flex justify-content-between align-items-stretch d-none d-sm-block">
            <div className="row g-lg-4 g-2">
              {categoryCard1.map((cat, idx) => (
                <div className="col-lg-4 col-sm-6" key={idx}>
                  <CategoryCard1
                    card={{
                      title: cat.title,
                      img: cat.img,
                      linkPost: cat.linkPost,
                      count: `${cat.count} articles`,
                    }}
                    idx={idx}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row mt-3 g-3">
          {categoryCard2.map((cat, idx) => (
            <div className="col-lg-2 col-sm-4 col-6" key={idx}>
              <CategoryCard2
                card={{
                  title: cat.title,
                  img: cat.img,
                  linkPost: cat.linkPost,
                  bg: bgColors[idx % bgColors.length],
                }}
                idx={idx}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
