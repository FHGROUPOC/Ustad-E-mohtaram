import Link from "next/link";
import Image from "next/image";

interface Props {
  card: any;
  idx: number;
}

export default function ArticleCard6({ card, idx }: Props) {
  const slug = card.slug || "";
  const title = card.title || "";
  const category = card.category || "General";
  const mainImg = card.img || "/assets/imgs/template/default-blog.png";
  const date = card.date || "Recent";

  // Dynamic Author mapping
  const authorImage =
    card.authorData?.image ||
    card.authorImg ||
    "/assets/imgs/template/author/default.png";
  const authorName = card.authorData?.name || card.postedby || "Admin";

  return (
    <div
      className="article card-6 d-flex align-items-center gap-3 w-100"
      key={card._id || idx}
    >
      <div className="card-img-left thumbnail flex-shrink-0">
        <Link href={`/blog/${slug}`}>
          <div
            style={{
              position: "relative",
              width: "120px",
              height: "100px",
              overflow: "hidden",
              borderRadius: "12px",
            }}
          >
            <Image
              src={mainImg}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>
      </div>
      <div className="card-body py-0">
        {/* <Link
          href={`/category/${category.toLowerCase()}`}
          className="text-primary fs-9 fw-bold text-uppercase mb-1 d-block"
        >
          {category}
        </Link> */}
        <Link href={`/blog/${slug}`}>
          <h6 className="card-title mb-2 text-truncate-2 fw-medium">{title}</h6>
        </Link>
        <div className="d-flex align-items-center gap-2">
          <Image
            src={authorImage}
            alt={authorName}
            width={20}
            height={20}
            className="rounded-circle"
          />
          <span className="text-sm text-muted">
            {authorName} • {date}
          </span>
        </div>
      </div>
    </div>
  );
}
