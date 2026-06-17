import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    _id?: string;
    img: string;
    imgalt?: string;
    category: string;
    slug: string;
    createdAt: string | Date;
    title: string;
    description: string;
    blog_detail?: any; // Changed to any for safety check
    commentCount?: string | number;
    viewCount?: string | number;
  };
  idx: number;
};

export default function ArticleCard1({ card, idx }: CardProps) {
  // 1. Shorten Text Helper
  const truncate = (text: string, length: number) => {
    if (typeof text !== "string") return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // 2. Format Date
  const formattedDate = new Date(card.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // 3. Fixed Calculate Read Time with Type Safety
  const calculateReadTime = (text: any) => {
    // If text is null, undefined, or not a string, return 1 min
    if (!text || typeof text !== "string") return "1 min read";

    // Safety: Ensure it's a string and strip HTML tags
    const cleanText = text.replace(/<[^>]*>?/gm, "");
    const words = cleanText
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const time = Math.ceil(words / 200);

    return `${time || 1} min read`;
  };

  const postLink = `/blog/${card.slug}`;

  return (
    <div className="article card-1 h-100" key={card._id || idx}>
      <Link href={postLink} className="card-img-top">
        <div className="position-relative w-100" style={{ height: "400px" }}>
          <Image
            src={card.img || "/assets/imgs/page/default-blog.png"}
            className="w-100 h-100"
            fill
            alt={card.imgalt || card.title || "blog image"}
            priority={idx < 3}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>

      <div className="card-body">
        <div className="card-corner">
          <Link href={postLink} className="arrow-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.75 6.75L19.25 12L13.75 17.25"
                stroke="#0E0E0F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 12H4.75"
                stroke="#0E0E0F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div className="curve-one"></div>
          <div className="curve-two"></div>
        </div>

        <div className="left">
          <div className="card-info gap-2 d-flex flex-wrap align-items-center mb-3">
            <Link
              href={`/category/${card.category?.toLowerCase() || "news"}`}
              className="badge bg-primary fs-8 text-capitalize"
            >
              {card.category?.replace(/-/g, " ") || "News"}
            </Link>
            <ul className="d-flex align-items-center gap-4 text-600 m-0 ps-4">
              <li>
                <p className="fs-8 fw-medium m-0">{formattedDate}</p>
              </li>
              <li>
                <p className="fs-8 fw-medium m-0">
                  {calculateReadTime(card.blog_detail)}
                </p>
              </li>
            </ul>
          </div>

          <Link href={postLink}>
            <h4 className="card-title mb-2 text-truncate-2">
              {truncate(card.title, 55)}
            </h4>
          </Link>

          <p className="card-text text-600 fs-7 mb-0 text-truncate-2">
            {truncate(card.description, 90)}
          </p>
        </div>

        <div className="right mt-3">
          <Link href="#" className="book-mark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5.625 5.62498C5.625 4.7045 6.37119 3.95831 7.29167 3.95831H12.7083C13.6288 3.95831 14.375 4.7045 14.375 5.62498V16.0416L10 12.2916L5.625 16.0416V5.62498Z"
                stroke="#626568"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div className="comment fs-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.50018 5.43423C2.50018 4.26961 3.44494 3.3255 4.61035 3.3255H15.39C16.5554 3.3255 17.5002 4.26961 17.5002 5.43422V13.1078C17.5002 14.2724 16.5554 15.2165 15.39 15.2165H6.3295L3.41902 17.3786C3.24443 17.5083 3.01159 17.5285 2.81722 17.4309C2.62285 17.3333 2.50018 17.1345 2.50018 16.9171V5.43423Z"
                fill="#626568"
              />
            </svg>
            <span>{card.commentCount || 0}</span>
          </div>
          <div className="readers fs-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.186 10.3224C15.734 13.039 12.9803 14.7266 10.001 14.7266C7.01977 14.7266 4.26612 13.039 2.81407 10.3224C2.70224 10.1114 2.70224 9.88843 2.81407 9.67767C4.26612 6.96107 7.01977 5.27366 10.001 5.27366C12.9803 5.27366 15.7339 6.96107 17.186 9.67767C17.2998 9.88843 17.2998 10.1114 17.186 10.3224ZM18.1135 9.13905C16.4744 6.07185 13.366 4.16669 10.001 4.16669C6.63409 4.16669 3.52561 6.07185 1.88652 9.13905C1.59341 9.68631 1.59341 10.3137 1.88652 10.8606C3.52561 13.9278 6.63409 15.8334 10.001 15.8334C13.366 15.8334 16.4744 13.9278 18.1135 10.8606C18.4066 10.3138 18.4066 9.68631 18.1135 9.13905ZM10.001 12.2707C11.2024 12.2707 12.18 11.2522 12.18 9.99993C12.18 8.7477 11.2024 7.72912 10.001 7.72912C8.79769 7.72912 7.82002 8.7477 7.82002 9.99993C7.82002 11.2522 8.79773 12.2707 10.001 12.2707Z"
                fill="#626568"
              />
            </svg>
            <span>{card.viewCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
