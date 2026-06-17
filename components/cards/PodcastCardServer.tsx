import Image from "next/image";
import PodcastCardInteractive from "./PodcastCardInteractive";

interface PodcastCardServerProps {
    card: {
        img: string;
        title: string;
        description: string;
        src?: string;
    };
    idx: number;
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
}

export default function PodcastCardServer(props: PodcastCardServerProps) {
    return (
        <div className="block-podcast__item flex-md-row flex-column" key={props.idx}>
            {/* Server-rendered static content */}
            <div className="d-flex align-items-center gap-3">
                <div className="block-podcast__item__img">
                    <Image src={props.card.img} alt="magzin" width={200} height={85} />
                </div>
                <div className="block-podcast__item__content">
                    <h6 className="block-podcast__item__content__title mb-1">
                        {props.card.title}
                    </h6>
                    <p className="block-podcast__item__content__description fs-7 fw-regular m-0">
                        {props.card.description}
                    </p>
                </div>
            </div>

            {/* Client component for interactive features */}
            <PodcastCardInteractive
                card={props.card}
                idx={props.idx}
                isPlaying={props.isPlaying}
                onPlay={props.onPlay}
                onPause={props.onPause}
            />
        </div>
    );
}

