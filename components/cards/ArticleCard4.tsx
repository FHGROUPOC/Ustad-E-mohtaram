import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    img: string;
    linkPost: string;
    linkBadge: string;
    badge: string;
    bgBadge: string;
    readTime: string;
    title: string;
    date: string;
    description: string;
    author: string;
    imgAuthor?: string; // Optional because we have a fallback
    authorImg?: string; // Added to match the mapping we did in Section3
    linkAuthor: string;
    comment: string | number;
    readNum: string | number;
    linkComment: string;
  };
};

export default function ArticleCard4({ card }: CardProps) {
  const truncate = (text: string, length: number) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // CORRECTED LOGIC: Use the DB image if it exists, otherwise use UI-Avatars
  const finalAuthorImg = 
    card.imgAuthor || 
    card.authorImg || 
    `https://ui-avatars.com/api/?size=160&name=${card.author}&background=random&color=fff`;

  return (
    <div className="article card-4 rounded-16 bg-white overflow-hidden shadow-sm h-100">
      <div className="card-body p-4 d-flex flex-column h-100">
        {/* ... (SVG and Badge logic same as before) */}
        
        <div className="card-corner">
          <Link href={card.linkPost} className="arrow-box">
             <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 12H4.75" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div className="curve-one" />
          <div className="curve-two" />
        </div>

        <div className="d-flex align-items-center gap-2 mb-2">
          <Link href={card.linkBadge} className={`badge text-capitalize ${card.bgBadge} fs-8`}>
            {card.badge?.replace(/-/g, " ")}
          </Link>
          <span className="fs-8 text-600">{card.readTime}</span>
        </div>

        <Link href={card.linkPost}>
          <h5 className="card-title line-clamp-2 mb-3">
            {truncate(card.title, 25)}
          </h5>
        </Link>

        <div className="position-relative card-img mb-3">
          <Link href={card.linkPost}>
            <Image
              className="rounded-16 object-fit-cover w-100"
              src={card.img}
              alt={card.title}
              width={475}
              height={317}
            />
          </Link>
        </div>

        <p className="card-text text-600 line-clamp-2 mb-0">
          {truncate(card.description, 85)}
        </p>

        <div className="bottom mt-auto d-flex flex-wrap align-items-center justify-content-between pt-3 border-top mt-4">
          <Link
            href={card.linkAuthor}
            className="author d-flex align-items-center gap-2"
          >
            <Image
              className="avatar avatar-md rounded-circle object-fit-cover"
              src={finalAuthorImg} // Using the fixed variable here
              alt={card.author}
              width={32}
              height={32}
            />
            <span className="fs-8 text-dark fw-bold">{card.author}</span>
          </Link>
          
          <div className="d-flex gap-3 align-items-center">
            <Link href={card.linkComment} className="comment fs-9 d-flex align-items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 20 20" fill="none">
                <path d="M2.5 5.43C2.5 4.27 3.44 3.32 4.61 3.32H15.39C16.55 3.32 17.5 4.27 17.5 5.43V13.1C17.5 14.27 16.55 15.21 15.39 15.21H6.32L3.41 17.37C3.24 17.5 3.01 17.52 2.81 17.43C2.62 17.33 2.5 17.13 2.5 16.91V5.43Z" fill="#626568" />
              </svg>
              {card.comment}
            </Link>
            <span className="fs-9 d-flex align-items-center gap-1 text-600">
               <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 20 20" fill="none">
                <path d="M10.001 12.2707C11.2024 12.2707 12.18 11.2522 12.18 9.99993C12.18 8.7477 11.2024 7.72912 10.001 7.72912C8.79769 7.72912 7.82002 8.7477 7.82002 9.99993C7.82002 11.2522 8.79773 12.2707 10.001 12.2707Z" fill="#626568" />
              </svg>
              {card.readNum}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}