import ArticleCard5 from "@/components/cards/ArticleCard5";
import ArticleCard11 from "@/components/cards/ArticleCard11";
import { getAuthorById } from "@/lib/functions";
import Link from "next/link";

interface Section1Props {
  searchParams?: Promise<{ page?: string }>;
  blogs: any[];
  categorySlug: string;
}

export default async function Section1({
  searchParams,
  blogs,
  categorySlug,
}: Section1Props) {
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  // Layout distribution
  const itemsPerPage = 17; // 1 (Card11) + 4 (Card5 side) + 12 (Card5 bottom)
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // Paginate the main list
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

  // Fetch Authors for the paginated set
  const enrichedBlogs = await Promise.all(
    paginatedBlogs.map(async (blog) => {
      const author = await getAuthorById(blog.authorId);
      return { ...blog, authorData: author };
    }),
  );

  // Split enriched blogs into your specific layout sections
  const sec1Card11 = enrichedBlogs.slice(0, 1);
  const sec1Card5Col1 = enrichedBlogs.slice(1, 3);
  const sec1Card5Col2 = enrichedBlogs.slice(3, 5);
  const sec1Card5Bottom = enrichedBlogs.slice(5, 17);

  const ServerPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <Link
            href={`/category/${categorySlug}?page=${i}`}
            className="page-link icon-lg pagination_item rounded-circle icon-shape fs-18 fw-semi-bold"
          >
            {i}
          </Link>
        </li>,
      );
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <Link
                href={`/category/${categorySlug}?page=${currentPage - 1}`}
                className="page-link icon-lg pagination_item rounded-circle icon-shape"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M9.5 6.5L4.8 11L9.5 15.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.2 11H5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          )}
          {pages}
          {currentPage < totalPages && (
            <li className="page-item">
              <Link
                href={`/category/${categorySlug}?page=${currentPage + 1}`}
                className="page-link icon-lg pagination_item rounded-circle icon-shape"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M12.5 6.5L17.2 11L12.5 15.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 11H4.8"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  };

  return (
    <section className="sec-1-archive-3 py-5">
      <div className="container">
        <div className="row g-4">
          {/* Highlight Card */}
          <div className="col-lg-6">
            {sec1Card11.map((card, idx) => (
              <ArticleCard11 key={card._id} card={card} idx={idx} />
            ))}
          </div>

          {/* Side Column 1 */}
          <div className="col-lg-3">
            <div className="row g-4">
              {sec1Card5Col1.map((card, idx) => (
                <div className="col-12" key={card._id}>
                  <ArticleCard5 card={card} idx={idx} />
                </div>
              ))}
            </div>
          </div>

          {/* Side Column 2 */}
          <div className="col-lg-3">
            <div className="row g-4">
              {sec1Card5Col2.map((card, idx) => (
                <div className="col-12" key={card._id}>
                  <ArticleCard5 card={card} idx={idx} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="row g-4 mt-4">
          {sec1Card5Bottom.map((card, idx) => (
            <div className="col-lg-3 col-md-6 col-12" key={card._id}>
              <ArticleCard5 card={card} idx={idx} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="row mt-5">
            <div className="col-12 d-flex justify-content-center">
              <ServerPagination />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
