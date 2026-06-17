// app/sundas/page.js
import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import SearchInput from "./SearchInput";

export const dynamic = "force-dynamic";

export default async function PostsDashboard({ searchParams }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page) || 1;
  const query = params.query || "";
  const postsPerPage = 20;
  const skip = (currentPage - 1) * postsPerPage;

  try {
    const client = await clientPromise;
    const db = client.db("sundas_mustaqeem");
    const collection = db.collection("posts");

    const filter = query ? { title: { $regex: query, $options: "i" } } : {};

    const [totalPosts, posts] = await Promise.all([
      collection.countDocuments(filter),
      collection
        .find(filter)
        .sort({ date: -1 })
        .skip(skip)
        .limit(postsPerPage)
        .toArray(),
    ]);

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    return (
      <div
        style={{
          padding: "40px",
          maxWidth: "1000px",
          margin: "0 auto",
          fontFamily: "system-ui",
        }}
      >
        <header style={{ marginBottom: "20px" }}>
          <h1>Content Dashboard</h1>
          <p>
            Found <strong>{totalPosts}</strong> results
          </p>
        </header>

        <SearchInput />

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "30px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>Post</th>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post._id.toString()}
                style={{ borderBottom: "1px solid #eee" }}
              >
                <td style={{ padding: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    {/* Featured Image Thumbnail */}
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#eee",
                        borderRadius: "8px",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            fontSize: "10px",
                            color: "#aaa",
                          }}
                        >
                          No Img
                        </div>
                      )}
                    </div>

                    {/* Title and Slug */}
                    <div>
                      <div style={{ fontWeight: "500", fontSize: "16px" }}>
                        {post.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        /{post.slug}
                      </div>
                    </div>
                  </div>
                </td>

                <td
                  style={{
                    padding: "12px",
                    color: "#888",
                    verticalAlign: "middle",
                  }}
                >
                  {new Date(post.date).toLocaleDateString()}
                </td>

                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    verticalAlign: "middle",
                  }}
                >
                  <Link href={`/sundas/${post.slug}`} style={viewBtnStyle}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Logic Remains the Same */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentPage > 1 && (
              <Link
                href={`/sundas?page=${currentPage - 1}&query=${query}`}
                style={btnStyle}
              >
                Prev
              </Link>
            )}
            <span>
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link
                href={`/sundas?page=${currentPage + 1}&query=${query}`}
                style={btnStyle}
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    );
  } catch (e) {
    console.error(e);
    return <div>Database Error</div>;
  }
}

const viewBtnStyle = {
  padding: "6px 16px",
  border: "1px solid #0070f3",
  borderRadius: "6px",
  color: "#0070f3",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: "500",
};

const btnStyle = {
  padding: "8px 16px",
  background: "#0070f3",
  color: "white",
  borderRadius: "5px",
  textDecoration: "none",
};
