// Main Pagination component - now imports server component
import PaginationServer from "./PaginationServer";

interface PaginationProps {
  classList: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
  return <PaginationServer {...props} />;
}
