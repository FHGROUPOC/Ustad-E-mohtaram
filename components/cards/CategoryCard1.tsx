import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    img: string;
    linkPost: string;
    title: string;
    count: string;
  };
  idx: number;
};

export default function CategoryCard1({ card, idx }: CardProps) {
  return (
    <>
      <div className="category-card style-1" key={idx}>
        <div className="thumbnail">
          <Link href={card.linkPost}>
            <Image
              src={card.img}
              alt="card.title"
              width={200}
              height={200}
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>
        <div className="post-content">
          <div className="post-title">
            <Link href={card.linkPost}>
              <h6 className="mb-0 !text-sm text-capitalize">
                {card.title?.replace(/-/g, " ")}
              </h6>
            </Link>
            <p className="fs-8 m-0 text-capitalize fw-medium">{card.count}</p>
          </div>
        </div>
      </div>
    </>
  );
}
