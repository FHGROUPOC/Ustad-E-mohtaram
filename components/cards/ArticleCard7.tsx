import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    _id?: string;
    slug: string;
    img: string;
    title: string;
    category: string;
    description: string;
    date?: string;
    videoUrl?: string; // Optional: if you have videos of haircuts
    [key: string]: any;
  };
  idx: number;
};

export default function ArticleCard7({ card, idx }: CardProps) {
  // Dynamic URL mapping
  const postLink = `/blog/${card.slug}`;
  const categoryLink = `/category/${card.category?.toLowerCase()}`;
  const mainImg = card.img || "/assets/imgs/template/default-blog.png";

  return (
    <div className="article card-7" key={card._id || idx}>
      <div className="card-body">
        {/* Top Right Arrow Link */}
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
          <div className="curve-one" />
          <div className="curve-two" />
        </div>

        <div className="d-flex flex-column">
          <div className="card-info d-flex flex-wrap align-items-center gap-2 mb-3">
            {/* Dynamic Category Badge */}
            <Link
              href={categoryLink}
              className="badge bg-primary-soft text-primary fs-8"
            >
              {card.category || "Style"}
            </Link>

            {/* Secondary Badge (could be shop name or 'Featured') */}
            <span className="badge bg-grey-soft text-600 fs-8">
              {card.date || "New"}
            </span>

            <ul className="d-flex align-items-center text-600 m-0 ps-3">
              <li>
                <p className="fs-8 m-0">5 min read</p>
              </li>
            </ul>

            <Link href="#" className="book-mark ms-auto">
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
          </div>

          <Link href={postLink}>
            <h6 className="card-title mb-4 text-truncate-2">{card.title}</h6>
          </Link>

          <div className="position-relative card-img">
            <Link href={postLink}>
              <Image
                className="rounded-16 overflow-hidden cover-image"
                src={mainImg}
                alt={card.title}
                width={310}
                height={206}
                style={{ objectFit: "cover" }}
              />
            </Link>

            {/* Video Play Button (Shows only if videoUrl exists) */}
            {card.videoUrl && (
              <Link
                href={card.videoUrl}
                className="play-btn popup-video z-2 rounded-circle icon-shape icon-xl position-absolute top-50 start-50 translate-middle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7.6464 4.96873L18.1434 10.2052C19.6152 10.9418 19.6148 13.0388 18.1428 13.7748L7.6457 19.0391C6.3158 19.704 4.75 18.7388 4.75 17.2541L4.75 6.75335C4.75 5.26832 6.3165 4.30314 7.6464 4.96873Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
          </div>

          <p className="card-text text-600 fs-7 mb-0 mt-4 pe-5 text-truncate-3">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}
