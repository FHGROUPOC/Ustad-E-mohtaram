import ArticleCard7 from "@/components/cards/ArticleCard7";
import DataCard from "@/public/data/cardArchive-1.json";
import Link from "next/link";

interface Section1Props {
  searchParams?: Promise<{ page?: string }>;
}

export default async function Section1({ searchParams }: Section1Props) {
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;
  const itemsPerPage7_1 = 3;
  const itemsPerPage7_2 = 2;
  const itemsPerPage7_3 = 6;

  const totalCard7_1 = Math.ceil(DataCard.sec1Card7_1.length / itemsPerPage7_1);
  const totalCard7_2 = Math.ceil(DataCard.sec1Card7_2.length / itemsPerPage7_2);
  const totalCard7_3 = Math.ceil(DataCard.sec1Card7_3.length / itemsPerPage7_3);
  const totalPages = Math.max(totalCard7_1, totalCard7_2, totalCard7_3);

  const paginatedArticles7_1 = DataCard.sec1Card7_1.slice((currentPage - 1) * itemsPerPage7_1, currentPage * itemsPerPage7_1);
  const paginatedArticles7_2 = DataCard.sec1Card7_2.slice((currentPage - 1) * itemsPerPage7_2, currentPage * itemsPerPage7_2);
  const paginatedArticles7_3 = DataCard.sec1Card7_3.slice((currentPage - 1) * itemsPerPage7_3, currentPage * itemsPerPage7_3);

  // Server-side pagination component
  const ServerPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <Link href={`/archive-1?page=${i}`} className="page-link icon-lg pagination_item rounded-circle icon-shape fs-18 fw-semi-bold">
            {i}
          </Link>
        </li>
      );
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <Link href={`/archive-1?page=${currentPage - 1}`} className="page-link icon-lg pagination_item rounded-circle icon-shape">
                <svg className="" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M9.49993 6.5L4.78564 11L9.49993 15.5" stroke="#0E0E0F" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M17.2143 11H5" stroke="#0E0E0F" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </Link>
            </li>
          )}
          {pages}
          {currentPage < totalPages && (
            <li className="page-item">
              <Link href={`/archive-1?page=${currentPage + 1}`} className="page-link icon-lg pagination_item rounded-circle icon-shape">
                <svg className="" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M12.5 6.5L17.2143 11L12.5 15.5" stroke="#0E0E0F" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M16.9999 11H4.78564" stroke="#0E0E0F" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  };

  return (
    <>
      {/*Archive 1 Section 1*/}
      <section className="sec-1-archive-1">
        <div className="container">
          <div className="row mt-2 g-4">
            {paginatedArticles7_1.map((card, idx) => (
              <div className="col-lg-4" key={idx}>
                <ArticleCard7 key={idx} card={card} idx={idx} />
              </div>
            ))}
          </div>
          <div className="row mt-4 g-4">
            {paginatedArticles7_2.map((card, idx) => (
              <div className="col-lg-6" key={idx}>
                <ArticleCard7 key={idx} card={card} idx={idx} />
              </div>
            ))}
          </div>
          <div className="row mt-4 g-4">
            {paginatedArticles7_3.map((card, idx) => (
              <div className="col-lg-4" key={idx}>
                <ArticleCard7 key={idx} card={card} idx={idx} />
              </div>
            ))}
          </div>
          <div className="row mt-5">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <ServerPagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
