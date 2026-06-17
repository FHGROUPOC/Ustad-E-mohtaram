import Marquee from "@/util/MarqueeServer";
import Link from "next/link";

type Blog = {
  category: string;
};

export default function Section2({ blogs = [] }: { blogs: Blog[] }) {
  // 1. Logic to count occurrences of each category
  const categoryCounts = blogs.reduce((acc: Record<string, number>, blog) => {
    const cat = blog.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // 2. Convert the object to an array of keys for mapping
  const categories = Object.keys(categoryCounts);

  // 3. Fallback in case no blogs exist yet
  if (categories.length === 0) {
    return null; // Or show a default "Stay Tuned" message
  }

  return (
    <>
      {/*Home 1 Section 2*/}
      <section className="sec-2-home-1 bg-100 mask-image py-5">
        <div className="carouselTicker carouselTicker-left position-relative z-1 wow img-custom-anim-top">
          <Marquee
            direction="left"
            speed={50}
            pauseOnHover={true}
            className="carouselTicker__list"
          >
            {categories.map((cat, index) => (
              <div className="carouselTicker__item mx-3" key={index}>
                <Link
                  href={`/category/${cat.toLowerCase()}`}
                  className="tag-item"
                >
                  <span className="text-capitalize">{cat?.replace(/-/g, " ")}</span>
                  <span className="number">{categoryCounts[cat]}</span>
                </Link>
              </div>
            ))}

            {/* Note: If you have very few categories, we duplicate the map 
                           to ensure the marquee loop is smooth and doesn't have a gap.
                        */}
            {categories.length < 10 &&
              categories.map((cat, index) => (
                <div className="carouselTicker__item mx-3" key={`dup-${index}`}>
                  <Link
                    href={`/category/${cat.toLowerCase()}`}
                    className="tag-item"
                  >
                    <span className="text-capitalize">{cat?.replace(/-/g, " ")}</span>
                    <span className="number">{categoryCounts[cat]}</span>
                  </Link>
                </div>
              ))}
          </Marquee>
        </div>
      </section>
    </>
  );
}
