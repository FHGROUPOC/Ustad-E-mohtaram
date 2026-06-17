import Link from "next/link";
import Image from "next/image";

interface Props {
  card: {
    _id?: string;
    slug: string;
    title: string;
    category: string;
    img: string;
    authorData?: {
      name: string;
      image: string;
    };
    authorImg?: string;
    postedby?: string;
  };
  idx: number;
}

export default function ArticleCard5({ card, idx }: Props) {
  const slug = card.slug || "";
  const title = card.title || "";
  const category = card.category || "General";
  const mainImg = card.img || "/assets/imgs/template/default-blog.png";

  // Logic to show the Author Image as found in your BlogDetails file
  const authorImage =
    card.authorData?.image ||
    card.authorImg ||
    "/assets/imgs/template/default-avatar.png";
  const authorName = card.authorData?.name || card.postedby || "Admin";

  return (
    <div className="article card-5 w-100" key={card._id || idx}>
      <div className="card-img-top thumbnail position-relative">
        <Link href={`/blog/${slug}`}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "280px",
              overflow: "hidden",
              borderRadius: "24px",
            }}
          >
            <Image
              src={mainImg}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              className="cover-image"
            />
          </div>
        </Link>

        <Link
          href={`/category/${category.toLowerCase()}`}
          className="badge fs-8 position-absolute bg-white text-capitalize"
          style={{ bottom: "20px", left: "20px", zIndex: 2 }}
        >
          {category.replace(/-/g, " ")}
        </Link>

        <div className="card-corner">
          <Link
            href={`/blog/${slug}`}
            className="arrow-box"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.75 6.75L19.25 12L13.75 17.25"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 12H4.75"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div className="curve-one" />
          <div className="curve-two" />
        </div>
      </div>

      <div className="card-body pt-3">
        {/* Author Info Display */}
        {authorImage === "" && (
          <div className="d-flex align-items-center gap-2 mb-2">
            <Image
              src={authorImage}
              alt={authorName}
              width={28}
              height={28}
              className="rounded-circle object-fit-cover"
            />
            {/* <span className="fs-8 text-muted fw-medium">{authorName}</span> */}
          </div>
        )}
        <Link href={`/category/${category.toLowerCase()}`}>
          <h6 className="card-title text-capitalize text-dark text-truncate-2">
            {title}
          </h6>
        </Link>
      </div>
    </div>
  );
}
