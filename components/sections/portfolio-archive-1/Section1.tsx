import DataCard from "@/public/data/cardPortfolio.json";
import Link from "next/link";
import Image from "next/image";
import BodyClassManager from "./BodyClassManager";

interface Section1Props {
    searchParams: {
        page?: string;
        view?: string;
    };
}

export default function Section1({ searchParams }: Section1Props) {
    const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
    const currentView = searchParams.view || "grid";

    // Data sources for different views
    const gridData = DataCard.cardPortfolio_grid;
    const listData = DataCard.cardPortfolio_list;

    // Items per page for different views
    const itemsPerPageGrid = 8;
    const itemsPerPageList = 4;

    // Get data and pagination based on current view
    let dataSource, itemsPerPage, totalItems, totalPages, paginatedData;

    if (currentView === "list") {
        dataSource = listData;
        itemsPerPage = itemsPerPageList;
    } else {
        dataSource = gridData;
        itemsPerPage = itemsPerPageGrid;
    }

    // Calculate pagination
    totalItems = dataSource.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get paginated data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    paginatedData = dataSource.slice(startIndex, endIndex);

    // Helper function to build URL with current page and view
    const buildUrl = (page: number, view: string) => {
        return `/portfolio-archive-1?page=${page}&view=${view}`;
    };

    // Helper function to build view mode URL (reset to page 1 when changing view)
    const buildViewModeUrl = (view: string) => {
        return buildUrl(1, view);
    };

    // Server-side pagination component
    const ServerPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
                    <Link href={buildUrl(i, currentView)} className={`page-link icon-lg pagination_item rounded-circle icon-shape fs-18 fw-semi-bold ${i === currentPage ? "active" : ""}`}>
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
                            <Link href={buildUrl(currentPage - 1, currentView)} className="page-link icon-lg pagination_item rounded-circle icon-shape">
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
                            <Link href={buildUrl(currentPage + 1, currentView)} className="page-link icon-lg pagination_item rounded-circle icon-shape">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height={22} viewBox="0 0 22 22" fill="none">
                                    <path d="M12.5 6.5L17.2143 11L12.5 15.5" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M16.9999 11H4.78564" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
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
            <BodyClassManager />
            <section className="sec-1-portfolio-archive" data-background="/assets/imgs/page/bg-home1-sec1.png">
                {/* Breadcumb */}
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb list-unstyled d-flex flex-row gap-2 align-items-center m-0 ps-0 py-4">
                                    <li className="breadcrumb-item">
                                        <Link href="/" className="text-600 fs-7 hover-dark">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <span className="icon-shape icon-xxs">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 15 15" fill="none">
                                                <path d="M6.125 4.5625L9.5625 7.84375L6.125 11.125" stroke="#626568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </li>
                                    <li className="breadcrumb-item active text-dark fs-7" aria-current="page">
                                        Portfolio
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="row align-items-end">
                        <div className="col-lg-6 col-md-8 col-12">
                            <div className="title">
                                <h4 className="mb-0 ds-4">
                                    <span className="text-anime-style-2 text-uppercase">Portfolio</span>
                                    <span className="text-600 fw-regular fs-6 bg-white rounded-8 p-2 ms-2">{totalItems} articles</span>
                                </h4>
                                <p className="fs-7 mb-0 text-anime-style-1">Personal projects and creative discoveries built through the years.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-2 ms-auto d-none d-md-block">
                            <div className="d-flex justify-content-end">
                                <div className="block-view-mode d-flex align-items-center position-relative gap-2">
                                    <div>
                                        <Link href={buildViewModeUrl("grid")} className={`view-mode-item btn-grid-view ${currentView === "grid" ? "active" : ""}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <path d="M8 1H4C2.34315 1 1 2.34315 1 4V8C1 9.65685 2.34315 11 4 11H8C9.65685 11 11 9.65685 11 8V4C11 2.34315 9.65685 1 8 1Z" fill="#0E0E0F" />
                                                <path d="M20 1H16C14.3431 1 13 2.34315 13 4V8C13 9.65685 14.3431 11 16 11H20C21.6569 11 23 9.65685 23 8V4C23 2.34315 21.6569 1 20 1Z" fill="#0E0E0F" />
                                                <path d="M8 13H4C2.34315 13 1 14.3431 1 16V20C1 21.6569 2.34315 23 4 23H8C9.65685 23 11 21.6569 11 20V16C11 14.3431 9.65685 13 8 13Z" fill="#0E0E0F" />
                                                <path d="M20 13H16C14.3431 13 13 14.3431 13 16V20C13 21.6569 14.3431 23 16 23H20C21.6569 23 23 21.6569 23 20V16C23 14.3431 21.6569 13 20 13Z" fill="#0E0E0F" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link href={buildViewModeUrl("list")} className={`view-mode-item btn-list-view ${currentView === "list" ? "active" : ""}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                <rect width={22} height={10} rx={3} fill="#A7AAAF" />
                                                <rect y={12} width={22} height={10} rx={3} fill="#A7AAAF" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="block-tag mt-4">
                            <ul className="list-unstyled d-flex flex-wrap gap-1 ps-0">
                                <li>
                                    <a href="#" className="tag-item fs-7 hover-dark">
                                        Fashion <span className="number">(68)</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="tag-item fs-7 hover-dark">
                                        Technology <span className="number">(85)</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="tag-item fs-7 hover-dark">
                                        Science <span className="number">(120)</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="tag-item fs-7 hover-dark">
                                        Design <span className="number">(89)</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="tag-item fs-7 hover-dark">
                                        Politics <span className="number">(52)</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Conditional Rendering based on currentView */}
                    {currentView === "grid" && (
                        <div className="row g-lg-5 g-4 pt-md-5 grid-view pt-4 d-flex">
                            {paginatedData.map((card, idx) => (
                                <div className={card.classList} key={idx}>
                                    <div className="article card-2 position-relative">
                                        <div className="post-link hover-effect-1">
                                            <Link href={card.linkPost} className="card-img-top thumbnail">
                                                <Image src={card.img} alt="magzin" className="cover-image" width={500} height={500} />
                                            </Link>
                                            <div className="card-corner">
                                                <Link href={card.linkPost} className="arrow-box">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M19 12H4.75" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                                <div className="curve-one"></div>
                                                <div className="curve-two"></div>
                                            </div>
                                            <div className="card-body hover-up">
                                                <Link href={card.linkBadge} className="badge bg-3 fs-8 mb-2">
                                                    {card.badge}
                                                </Link>
                                                <Link href={card.linkPost} className="hover-underline">
                                                    <h4 className="card-title mb-0">{card.title}</h4>
                                                </Link>
                                                <p className={`card-text ${card.displayDescription}`}>{card.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {currentView === "list" && (
                        <div className="row g-lg-5 g-4 pt-md-5 pt-4 list-view d-flex">
                            {paginatedData.map((card, idx) => (
                                <div className={card.classList} key={idx}>
                                    <div className="article card-2 position-relative">
                                        <div className="post-link hover-effect-1">
                                            <Link href={card.linkPost} className="card-img-top thumbnail">
                                                <Image src={card.img} alt="magzin" className="cover-image" width={1200} height={600} />
                                            </Link>
                                            <div className="card-corner">
                                                <Link href={card.linkPost} className="arrow-box">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M19 12H4.75" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                                <div className="curve-one"></div>
                                                <div className="curve-two"></div>
                                            </div>
                                            <div className="card-body hover-up">
                                                <Link href={card.linkBadge} className="badge bg-3 fs-8 mb-2">
                                                    {card.badge}
                                                </Link>
                                                <Link href={card.linkPost} className="hover-underline">
                                                    <h4 className="card-title mb-0">{card.title}</h4>
                                                </Link>
                                                <p className={`card-text ${card.displayDescription}`}>{card.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="row mt-5">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <ServerPagination />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
