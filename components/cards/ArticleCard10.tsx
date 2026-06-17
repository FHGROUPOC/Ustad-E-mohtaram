import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    // Support both old JSON (img/link) and new DB (image/slug)
    img?: string;
    image?: string;
    title: string;
    link?: string;
    slug?: string;
    date?: string;
    createdAt?: string; // Common DB field name
    time?: string;
    style?: string;
    fontSize?: string;
  };
  idx: number;
};

export default function ArticleCard10({ card, idx }: CardProps) {
  // 1. Resolve the dynamic Link
  const href = card.slug ? `/blog/${card.slug}` : card.link || "#";

  // 2. Resolve the dynamic Image
  const imageSrc = card.image || card.img || "/assets/imgs/placeholder.png";

  // 3. Resolve the dynamic Date
  const displayDate = card.createdAt
    ? new Date(card.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : card.date || "";

  return (
    <>
      <div className={`article card-10 ${card.style || ""}`} key={idx}>
        <Link href={href} className="card-img">
          <Image
            className="w-100 object-fit-cover"
            src={imageSrc}
            alt={card.title || "blog image"}
            width={500}
            height={500}
          />
        </Link>
        <div className="card-body">
          <Link href={href} className="text-decoration-none">
            <h6
              className={`${card.fontSize || "fs-7"} mb-2 text-truncate-2 text-slate-900`}
            >
              {card.title}
            </h6>
          </Link>
          <div className="d-flex align-items-center text-600">
            <span className="fs-8">{displayDate}</span>
            {/* Only show time/dot if time exists */}
            {(card.time || card.createdAt) && (
              <ul className="ps-4 m-0">
                <li>
                  <span className="fs-8">{card.time || "3 min read"}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
