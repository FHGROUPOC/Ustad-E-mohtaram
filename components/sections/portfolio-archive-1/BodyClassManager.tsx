"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function BodyClassManager() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const view = searchParams.get("view") || "grid";

        // Remove existing view classes
        // eslint-disable-next-line no-restricted-globals
        document.body.classList.remove("view-grid", "view-list");

        // Add new view class
        // eslint-disable-next-line no-restricted-globals
        document.body.classList.add(`view-${view}`);

        // Cleanup function to remove classes when component unmounts
        return () => {
            // eslint-disable-next-line no-restricted-globals
            document.body.classList.remove("view-grid", "view-list");
        };
    }, [searchParams]);

    // This component doesn't render anything visible
    return null;
}
