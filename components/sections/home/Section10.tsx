import SectionTitle from "@/components/elements/TitleDark";
import ArticleCard11 from "@/components/cards/ArticleCard11";
import ArticleCard6 from "@/components/cards/ArticleCard6";
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
  [key: string]: any;
}

export default async function Section10({ blogs = [] }: { blogs: Blog[] }) {
  // We slice the blogs: 1 for the big highlight, 3 for the small side cards
  const highlightBlog = blogs.slice(0, 1);
  const sideBlogs = blogs.slice(1, 4);

  // Fetch author data for the highlight card
  const highlightWithAuthor = await Promise.all(
    highlightBlog.map(async (blog) => {
      const author = await getAuthorById(blog.authorId);
      return { ...blog, authorData: author };
    }),
  );

  // Fetch author data for the side cards
  const sideWithAuthors = await Promise.all(
    sideBlogs.map(async (blog) => {
      const author = await getAuthorById(blog.authorId);
      return { ...blog, authorData: author };
    }),
  );

  return (
    <section className="sec-10-home-1 sec-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SectionTitle
              title="Suggestions"
              description="Ideas and Picks to Explore"
              classList=""
            />
          </div>
        </div>
        <div className="row mt-2 g-4">
          {/* Large Highlight Card (Left Side) */}
          <div className="col-lg-6">
            {highlightWithAuthor.map((card, idx) => (
              <ArticleCard11 key={card._id} card={card} idx={idx} />
            ))}
          </div>

          {/* Small Suggestion Cards (Right Side) */}
          <div className="col-lg-6">
            <div className="row g-3">
              {sideWithAuthors.map((card, idx) => (
                <div className="col-12" key={card._id}>
                  <ArticleCard6 card={card} idx={idx} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
