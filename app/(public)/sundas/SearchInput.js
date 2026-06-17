// app/dashboard/posts/SearchInput.js
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchInput() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset to page 1 on new search
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div style={{ marginBottom: "20px", position: "relative" }}>
      <input
        type="text"
        placeholder="Search 1,187 posts..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      {isPending && (
        <span
          style={{
            position: "absolute",
            right: "10px",
            top: "12px",
            color: "#888",
          }}
        >
          Searching...
        </span>
      )}
    </div>
  );
}
