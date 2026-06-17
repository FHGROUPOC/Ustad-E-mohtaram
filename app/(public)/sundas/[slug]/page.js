export const dynamic = "force-dynamic";

import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ViewPost({ params }) {
  // In Next.js 15, params is a Promise, so we await it
  const { slug } = await params;

  try {
    // 2. Safety check for the URI before attempting connection
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is missing in Environment Variables");
      return (
        <div style={{ padding: "40px" }}>
          Configuration Error: DB URI missing.
        </div>
      );
    }

    const client = await clientPromise;
    const db = client.db("sundas_mustaqeem");

    // Find the specific post by slug
    const post = await db.collection("posts").findOne({ slug: slug });

    if (!post) {
      return notFound();
    }

    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px",
          fontFamily: "serif",
        }}
      >
        <Link
          href="/dashboard/posts"
          style={{ color: "#0070f3", textDecoration: "none", fontSize: "14px" }}
        >
          ← Back to Dashboard
        </Link>

        <article style={{ marginTop: "20px" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "10px",
              fontFamily: "sans-serif",
            }}
          >
            {post.title}
          </h1>

          <div
            style={{ color: "#666", marginBottom: "30px", fontSize: "14px" }}
          >
            Published on{" "}
            {post.date ? new Date(post.date).toLocaleDateString() : "N/A"}
          </div>

          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "30px",
              }}
            />
          )}

          {/* Renders the WordPress HTML safely */}
          <div
            className="wp-content"
            style={{ lineHeight: "1.8", fontSize: "18px" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    );
  } catch (e) {
    console.error("Database connection error:", e);
    return (
      <div style={{ padding: "40px" }}>
        <h2>Unable to load post</h2>
        <p>There was an issue connecting to the database.</p>
        <Link href="/dashboard">Return to Dashboard</Link>
      </div>
    );
  }
}
