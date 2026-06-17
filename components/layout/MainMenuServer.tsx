import Link from "next/link";
// import { getBlogs } from "@/lib/functions";
import ArticleCard5 from "@/components/cards/ArticleCard5";
import MainMenuInteractive from "./MainMenuInteractive";

export default async function MainMenuServer({ blogsArray }) {
  // const blogsArray = await getBlogs();
  const categoriesMap = new Map();

  blogsArray.forEach((blog: any) => {
    // Only process active blogs and unique categories
    if (blog.category && !categoriesMap.has(blog.category)) {
      categoriesMap.set(blog.category, {
        ...blog,
        // We set title to the category name so the card displays the category
        title: blog.category,
        // We ensure the date is a string to avoid serialization/invalid date issues
        createdAt: blog.createdAt
          ? new Date(blog.createdAt).toISOString()
          : new Date().toISOString(),
      });
    }
  });

  const categoryCards = Array.from(categoriesMap.values());

  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link link-effect-1 data-link-alt" href="/">
          <span>Home</span>
        </Link>
      </li>

      <li className="nav-item mega-menu-item">
        <a
          className="nav-link dropdown-toggle dropdown-mega-menu link-effect-1 data-link-alt"
          href="#"
        >
          <span>Collections</span>
        </a>
        <div className="sub-mega-menu">
          <div className="container">
            <div className="row g-4">
              {categoryCards.length > 0 ? (
                categoryCards.slice(0, 8).map((card, idx) => (
                  <div className="col-6 col-md-4 col-lg-3" key={idx}>
                    {/* Inline style used instead of styled-jsx to fix Build Error */}
                    <div style={{ paddingBottom: "10px" }}>
                      <ArticleCard5 card={card} idx={idx} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-4">
                  <p className="text-muted">No collections available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link link-effect-1 data-link-alt"
          href="/page-contact"
        >
          <span>Contact</span>
        </Link>
      </li>

      {/* This component handles client-side menu interactions */}
      <MainMenuInteractive />
    </ul>
  );
}
