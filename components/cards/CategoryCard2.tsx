import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    img: string;
    linkPost: string;
    title: string;
    bg?: string; // We can still keep this for the overlay color
  };
  idx: number;
};

export default function CategoryCard2({ card, idx }: CardProps) {
  return (
    <>
      <div
        className="category-card style-2 w-100 position-relative overflow-hidden rounded-16"
        // style={{ height: "u0px" }}
        key={idx}
      >
        {/* The Background Image */}
        <Image
          src={card.img || "/assets/imgs/template/default-cat.png"}
          alt={card.title}
          fill
          style={{ objectFit: "cover" }}
          className="z-0"
        />

        {/* The Dark Overlay (This makes the white text readable) */}
        <div
          className="position-absolute inset-0 bg-light opacity-50 z-1"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>

        {/* The Centered Text */}
        <div className="post-content text-center position-relative z-2 h-100 d-flex align-items-center justify-content-center">
          <Link href={card.linkPost}>
            <span className="mb-0 text-[#ffffff] font-medium fs-5 text-capitalize">
              {card.title}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
