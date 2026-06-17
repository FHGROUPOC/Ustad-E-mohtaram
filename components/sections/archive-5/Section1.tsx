import ArticleCard12 from "@/components/cards/ArticleCard12";
import DataCard from "@/public/data/cardArchive-5.json";
import Ads_sm from "@/components/elements/ads_sm";
import Link from "next/link";

interface Section1Props {
  searchParams?: Promise<{ page?: string }>;
}

export default async function Section1({ searchParams }: Section1Props) {
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;
  const itemsPerCard12Top = 2;
  const itemsPerCard12Bottom = 4;

  const totalCard12Top = Math.ceil(DataCard.sec1Card12Top.length / itemsPerCard12Top);
  const totalCard12Bottom = Math.ceil(DataCard.sec1Card12Bottom.length / itemsPerCard12Bottom);
  const totalPages = Math.max(totalCard12Top, totalCard12Bottom);

  const paginatedArticles12Top = DataCard.sec1Card12Top.slice((currentPage - 1) * itemsPerCard12Top, currentPage * itemsPerCard12Top);
  const paginatedArticles12Bottom = DataCard.sec1Card12Bottom.slice((currentPage - 1) * itemsPerCard12Bottom, currentPage * itemsPerCard12Bottom);

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
      {/*Archive 5 Section 1*/}
      <section className="sec-1-archive-5">
        <div className="container">
          <div className="row mt-2 g-4">
            {paginatedArticles12Top.map((card, idx) => (
              <div className="col-12" key={idx}>
                <ArticleCard12 key={idx} card={card} idx={idx} />
              </div>
            ))}
          </div>
          <div className="row mt-4">
            <div className="col-lg-8 col-12 mx-lg-auto">
              <Ads_sm />
            </div>
          </div>
          <div className="row mt-2 g-4">
            {paginatedArticles12Bottom.map((card, idx) => (
              <div className="col-12" key={idx}>
                <ArticleCard12 key={idx} card={card} idx={idx} />
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
