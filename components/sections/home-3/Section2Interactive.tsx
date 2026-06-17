"use client";
import { useState } from "react";
import ArticleCard7 from "@/components/cards/ArticleCard7";
import ArticleCard9 from "@/components/cards/ArticleCard9";
import cardHome3 from "@/public/data/cardHome-3.json";
import Paginationpage from "@/components/elements/PaginationServer";

export default function Section2Interactive() {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage7 = 2;
    const itemsPerPage9 = 5;

    const totalPages7 = Math.ceil(cardHome3.sec2Card7.length / itemsPerPage7);
    const totalPages9 = Math.ceil(cardHome3.sec2Card9.length / itemsPerPage9);

    const totalPages = Math.max(totalPages7, totalPages9);

    const paginatedArticles7 = cardHome3.sec2Card7.slice((currentPage - 1) * itemsPerPage7, currentPage * itemsPerPage7);
    const paginatedArticles9 = cardHome3.sec2Card9.slice((currentPage - 1) * itemsPerPage9, currentPage * itemsPerPage9);

    return (
        <>
            {/* Paginated Articles */}
            {paginatedArticles7.map((card, idx) => (
                <div key={idx} className="col-md-6 col-12">
                    <ArticleCard7 card={card} idx={idx} />
                </div>
            ))}
            {paginatedArticles9.map((card, idx) => (
                <div key={idx} className="col-12">
                    <ArticleCard9 card={card} idx={idx} />
                </div>
            ))}

            {/* Pagination Controls */}
            <div className="col-12 d-flex justify-content-start align-items-center">
                <Paginationpage
                    classList="d-flex justify-content-start align-items-center"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
}
