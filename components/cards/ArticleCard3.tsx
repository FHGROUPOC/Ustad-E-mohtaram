import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    img: string;
    linkBadge: string;
    linkPost: string;
    badge: string;
    bgBadge: string;
    readTime: string;
    title: string;
    linkComment: string;
    comment: string | number;
    readNum: string | number;
  };
  idx: number;
};

export default function ArticleCard3({ card, idx }: CardProps) {
  return (
    <div
      className="grow article card-3 d-flex flex-column flex-sm-row rounded-16 overflow-hidden"
      key={idx}
    >
      <Link href={card.linkPost} className="card-img-top">
        <Image
          src={card.img}
          className="w-100 h-100 object-fit-cover"
          alt={card.title}
          width={225}
          height={250}
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </Link>
      <div className="card-body">
        <div className="card-corner">
          <Link href={card.linkPost} className="arrow-box">
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
        <div className="d-flex flex-column h-100">
          <div className="card-info d-flex align-items-center mb-2">
            <Link
              href={card.linkBadge}
              className={`badge text-capitalize ${card.bgBadge} text-xs`}
            >
              {card.badge?.replace(/-/g, " ")}
            </Link>
            <span className="text-xs text-600 ps-3">{card.readTime}</span>
          </div>
          <Link href={card.linkPost}>
            <h6 className="card-title mb-0 line-clamp-2">{card.title}</h6>
          </Link>
          <div className="bottom mt-auto d-flex align-items-center gap-3">
            <Link
              href={card.linkComment}
              className="comment fs-9 d-flex align-items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
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
              <span>{card.comment}</span>
            </Link>
            <div className="readers fs-9 d-flex align-items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  d="M17.186 10.3224C15.734 13.039 12.9803 14.7266 10.001 14.7266C7.01977 14.7266 4.26612 13.039 2.81407 10.3224C2.70224 10.1114 2.70224 9.88843 2.81407 9.67767C4.26612 6.96107 7.01977 5.27366 10.001 5.27366C12.9803 5.27366 15.7339 6.96107 17.186 9.67767C17.2998 9.88843 17.2998 10.1114 17.186 10.3224ZM10.001 12.2707C11.2024 12.2707 12.18 11.2522 12.18 9.99993C12.18 8.7477 11.2024 7.72912 10.001 7.72912C8.79769 7.72912 7.82002 8.7477 7.82002 9.99993C7.82002 11.2522 8.79773 12.2707 10.001 12.2707Z"
                  fill="#626568"
                />
              </svg>
              <span>{card.readNum}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
