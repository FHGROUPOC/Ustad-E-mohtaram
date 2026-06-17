import Link from "next/link";
import Image from "next/image";

type CardProps = {
    card: {
        img: string;
        linkPost: string;
        title: string;
        classList: string;
    };
    idx: number;
};

export default function RecommendCard({ card, idx }: CardProps) {
    return (
        <>
            <div className={`card-recommend ${card.classList}`} key={idx}>
                <Link href={card.linkPost}>
                    <Image className="rounded-16 overflow-hidden cover-image" src={card.img} alt="magzin" width={276} height={276} />
                </Link>
                <Link href={card.linkPost} className="card-title">
                    <h6 className="mb-0 mt-3">{card.title}</h6>
                </Link>
            </div>
        </>
    );
}
