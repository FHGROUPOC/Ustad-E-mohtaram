import Link from "next/link";
import Image from "next/image";

interface Props {
  card: {
    _id?: string;
    slug: string;
    title: string;
    category: string;
    img: string;
    description: string;
    date: string;
    authorData?: {
      name: string;
      image: string;
    };
    authorImg?: string;
    postedby?: string;
    comments?: any[];
    readNum?: string;
  };
  idx: number;
}

export default function ArticleCard11({ card, idx }: Props) {
  // Mapping API/Database data to the card structure
  const slug = card.slug || "";
  const title = card.title || "";
  const description = card.description || "";
  const category = card.category || "General";
  const date = card.date || "Recent";
  const mainImg = card.img || "/assets/imgs/template/default-blog.png";

  // Author data logic consistent with your BlogDetails page

  const authorImage =
    card.authorData?.image ||
    card.authorImg ||
    `https://ui-avatars.com/api/?size=160&name=${card.postedby}&background=random&color=fff`;
  const authorName = card.authorData?.name || card.postedby || "Admin";

  return (
    <>
      <div className="article card-11 h-100" key={card._id || idx}>
        <div className="card-img-top thumbnail position-relative">
          <Link href={`/blog/${slug}`}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "350px",
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
          {/* <Link
            href={`/category/${category.toLowerCase()}`}
            className="badge bg-primary fs-8 position-absolute"
            style={{ top: "20px", left: "20px", zIndex: 2 }}
          >
            {category}
          </Link> */}
        </div>

        <div className="card-body">
          <div className="card-corner">
            <Link href={`/blog/${slug}`} className="arrow-box">
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

          <div className="left pe-5">
            <Link href={`/blog/${slug}`}>
              <h5 className="card-title mb-0 text-truncate-2 fw-bold">
                {title}
              </h5>
            </Link>
            <p className="card-text text-600 fs-7 mb-0 mt-4 text-truncate-2">
              {description}
            </p>

            <div className="bottom mt-auto d-flex flex-wrap align-items-center gap-2 pt-4">
              {/* Dynamic Author Display */}
              <div className="author d-flex align-items-center gap-2">
                <Image
                  className="avatar avatar-md rounded-circle object-fit-cover"
                  src={authorImage}
                  alt={authorName}
                  width={41}
                  height={41}
                />
                <span className="fs-7 text-dark fw-medium">{authorName}</span>
              </div>

              <ul className="d-flex align-items-center gap-4 text-600 m-0 ps-3">
                <li>
                  <p className="fs-8 m-0">{date}</p>
                </li>
              </ul>

              <div className="ms-md-auto ms-5 d-flex align-items-center gap-3 me-5">
                <div className="comment fs-8 d-flex align-items-center gap-1">
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
                      d="M2.50018 5.43423C2.50018 4.26961 3.44494 3.3255 4.61035 3.3255H15.39C16.5554 3.3255 17.5002 4.26961 17.5002 5.43422V13.1078C17.5002 14.2724 16.5554 15.2165 15.39 15.2165H6.3295L3.41902 17.3786C3.24443 17.5083 3.01159 17.5285 2.81722 17.4309C2.62285 17.3333 2.50018 17.1345 2.50018 16.9171V5.43423ZM4.61035 4.47571C4.08062 4.47571 3.65118 4.90485 3.65118 5.43423V15.7729L5.79569 14.1799C5.89495 14.1062 6.01534 14.0663 6.13902 14.0663H15.39C15.9197 14.0663 16.3492 13.6372 16.3492 13.1078V5.43422C16.3492 4.90485 15.9197 4.47571 15.39 4.47571H4.61035Z"
                      fill="#626568"
                    />
                  </svg>
                  <span>{card.comments?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <button className="book-mark border-0 bg-transparent p-0">
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
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
