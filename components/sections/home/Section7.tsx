import SectionTitle from "@/components/elements/TitleDark";
import ArticleCard5 from "@/components/cards/ArticleCard5";
import ArticleCard11 from "@/components/cards/ArticleCard11";
import { getAuthorById } from "@/lib/functions";

interface Blog {
  _id: string;
  authorId: string;
  slug: string;
  title: string;
  category: string;
  img: string;
  description: string;
  date: string;
  authorData?: any; // Added this to satisfy TypeScript
  [key: string]: any;
}

export default async function Section7({ blogs = [] }: { blogs: Blog[] }) {
  // Safety check: if no blogs, don't render the section
  if (blogs.length === 0) return null;

  // Fetch full author objects using the authorId from each blog
  const blogsWithAuthors = await Promise.all(
    blogs.map(async (blog) => {
      const author = await getAuthorById(blog.authorId);
      return { ...blog, authorData: author };
    }),
  );

  // Layout distribution
  const col1 = blogsWithAuthors.slice(0, 2);
  const centerCard = blogsWithAuthors[2]; // Get the single object directly
  const col3 = blogsWithAuthors.slice(3, 5);

  return (
    <section className="sec-7-home-1 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SectionTitle
              title="Staff Picks"
              description="Handpicked by Our Editorial Team"
            />
          </div>
        </div>
        <div className="row mt-2 g-4">
          {/* Left Column */}
          <div className="col-lg-3">
            <div className="row g-4">
              {col1.map((card, idx) => (
                <div className="col-lg-12 col-md-6" key={card._id || `col1-${idx}`}>
                  <ArticleCard5 card={card} idx={idx} />
                </div>
              ))}
            </div>
          </div>

          {/* Center Column - Large Featured Card */}
          <div className="col-lg-6">
            {centerCard ? (
              <ArticleCard11 card={centerCard} idx={2} />
            ) : (
              <div className="h-100 border rounded-16 d-flex align-items-center justify-content-center bg-light">
                <p className="text-muted">More featured content coming soon</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-lg-3">
            <div className="row g-4">
              {col3.map((card, idx) => (
                <div className="col-lg-12 col-md-6" key={card._id || `col3-${idx}`}>
                  <ArticleCard5 card={card} idx={idx} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}