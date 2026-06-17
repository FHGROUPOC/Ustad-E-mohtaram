import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/home/Section1";
import Section2 from "@/components/sections/home/Section2";
import Section3 from "@/components/sections/home/Section3";
import Section4 from "@/components/sections/home/Section4";
import Section5 from "@/components/sections/home/Section5";
import Section6 from "@/components/sections/home/Section6";
import Section7 from "@/components/sections/home/Section7";
import Section9 from "@/components/sections/home/Section9";
import Section10 from "@/components/sections/home/Section10";
import Section11 from "@/components/sections/home/Section11";
import { getBlogs, getAuthorById } from "@/lib/functions";

export default async function Home() {
  const activeBlogs = await getBlogs();

  // ENRICH DATA HERE: Fetch all authors for the blogs we need in Section 9
  const blogsWithAuthors = await Promise.all(
    activeBlogs.slice(0, 10).map(async (blog) => {
      const author = await getAuthorById(blog.authorId);
      const authorName = author?.name || blog.postedby || "Staff";
      
      return {
        ...blog,
        authorName,
        authorImg: author?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random&color=fff`,
        formattedDate: new Date(blog.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    })
  );

  // Filter authors for Section 5 as you were doing
  const authorIds = [...new Set(activeBlogs.map((blog) => blog.authorId))];
  const authors = await Promise.all(authorIds.map((id) => getAuthorById(id)));
  const validAuthors = authors.filter((a) => a !== null);

  return (
    <>
      <Layout>
        <Section1 blogs={activeBlogs} />
        <Section2 blogs={activeBlogs} />
        <Section3 blogs={activeBlogs} />
        <Section4 blogs={activeBlogs} />
        <Section5 authors={validAuthors} />
        <Section6 blogs={activeBlogs} />
        <Section7 blogs={activeBlogs.slice(0, 5)} />
        
        {/* Pass the enriched blogs specifically to Section 9 */}
        <Section9   
          blogs={blogsWithAuthors.slice(0, 4)} 
          displayBtn="d-flex" 
        />
        
        <Section10 blogs={activeBlogs} />
        <Section11 />
      </Layout>
    </>
  );
}