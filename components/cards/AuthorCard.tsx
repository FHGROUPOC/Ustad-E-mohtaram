import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    img: string;
    link: string; // Changed from linkPost to match Section5
    name: string;
    job: string; // Changed from position to match Section5
    bgstickyCorner?: string; // Optional: will default to empty
  };
  idx: number;
};

export default function AuthorCard({ card, idx }: CardProps) {
  return (
    <>
      <div
        className={`author-grid-wrap ${card.bgstickyCorner || "bg-primary"} h-100`}
        key={idx}
      >
        <Link href={card.link}>
          <div className="position-relative w-100" style={{ height: "260px" }}>
            <Image
              src={card.img || "/assets/imgs/template/default-avatar.png"}
              alt={card.name || "author"}
              className="author-image-avator w-100 h-100"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 280px"
            />
          </div>
        </Link>
        <div className="author-sticky-block-left-bottom">
          <Link href={card.link}>
            <h6 className="fs-7 mb-0 text-dark">{card.name}</h6>
          </Link>
          <p className="fs-8 m-0 text-muted">{card.job}</p>
        </div>
        <div className="author-sticky-corner-left-top" />
        <div className="author-sticky-corner-right-bottom" />
      </div>
    </>
  );
}
