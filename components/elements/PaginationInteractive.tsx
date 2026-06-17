"use client";
import Link from "next/link";

interface PaginationInteractiveProps {
    classList: string;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationInteractive: React.FC<PaginationInteractiveProps> = ({ classList, currentPage, totalPages, onPageChange }) => {
    const getPageItems = () => {
        const items: (number | string)[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) items.push(i);
        } else {
            if (currentPage <= 3) {
                items.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                items.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                items.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return items;
    };

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className={classList}>
            <nav>
                <ul className="pagination gap-2">
                    <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
                        <Link href="#toppagination" className="icon-lg pagination_item rounded-circle icon-shape" onClick={handlePrev} aria-label="Previous">
                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                <path d="M9.49993 6.5L4.78564 11L9.49993 15.5" stroke="#0E0E0F" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.2143 11H5" stroke="#0E0E0F" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </li>
                    {getPageItems().map((item, idx) =>
                        typeof item === "number" ? (
                            <li key={item} className={`page-item${item === currentPage ? " active" : ""}`}>
                                <Link href="#toppagination" className="icon-lg pagination_item rounded-circle icon-shape fs-18 fw-semi-bold" onClick={() => onPageChange(item)}>
                                    {item}
                                </Link>
                            </li>
                        ) : (
                            <li key={`ellipsis-${idx}`} className="page-item disabled">
                                <span className="icon-lg pagination_item rounded-circle icon-shape fs-18 fw-semi-bold" style={{ pointerEvents: "none" }}>
                                    ...
                                </span>
                            </li>
                        )
                    )}
                    <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
                        <Link href="#toppagination" className="icon-lg pagination_item rounded-circle icon-shape" onClick={handleNext} aria-label="Next">
                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                <path d="M12.5 6.5L17.2143 11L12.5 15.5" stroke="#0E0E0F" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.9999 11H4.78564" stroke="#0E0E0F" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default PaginationInteractive;
