import PaginationInteractive from "./PaginationInteractive";

interface PaginationServerProps {
    classList: string;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationServer(props: PaginationServerProps) {
    return <PaginationInteractive {...props} />;
}

