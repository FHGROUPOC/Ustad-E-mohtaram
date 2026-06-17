import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    img: string;
    linkBadge: string;
    linkPost: string;
    linkAuthor: string;
    badge: string;
    bgBadge: string;
    date: string;
    readTime: string;
    title: string;
    author: string;
    imgAuthor?: string;  // Database image 1
    authorImg?: string;  // Database image 2 (from our new mapping)
  };
  idx: number;
};

export default function ArticleCard2({ card, idx }: CardProps) {
  // CORRECTED LOGIC: Check for existence of DB images first
  const finalAuthorImg = 
    card.imgAuthor || 
    card.authorImg || 
    `https://ui-avatars.com/api/?size=160&name=${card.author}&background=random&color=fff`;

  return (
    <div className="article card-2 position-relative h-100" key={idx}>
      <div className="post-link h-100">
        <Link href={card.linkPost} className="card-img-top thumbnail">
          <Image
            src={card.img}
            alt={card.title}
            className="cover-image rounded-16"
            width={684}
            height={524}
            priority={idx === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
            quality={90}
          />
        </Link>
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
        <div className="card-body">
          <Link
            href={card.linkBadge}
            className={`badge ${card.bgBadge || "bg-primary"} fs-8 mb-2`}
          >
            {card.badge?.replace(/-/g, " ")}
          </Link>
          <Link href={card.linkPost}>
            <h4 className="card-title mb-0 line-clamp-2">{card.title}</h4>
          </Link>
          <div className="card-info d-flex flex-wrap gap-2 align-items-center mt-3">
            <Link
              href={card.linkAuthor}
              className="author d-flex align-items-center gap-2"
            >
              <Image
                className="avatar avatar-sm rounded-circle object-fit-cover"
                src={finalAuthorImg} // Applied the fixed image variable here
                alt={card.author}
                width={32}
                height={32}
              />
              <span className="fs-7 text-500 fw-semibold">{card.author}</span>
            </Link>
            <ul className="d-flex align-items-center gap-4 text-600 m-0 ps-3">
              <li>
                <p className="fs-8 m-0 text-white-50">{card.date}</p>
              </li>
              <li>
                <p className="fs-8 m-0 text-white-50">{card.readTime}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}