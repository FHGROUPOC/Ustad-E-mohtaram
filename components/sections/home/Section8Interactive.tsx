"use client";
import { useState } from "react";
import PodcastCard from "@/components/cards/PodcastCardServer";
import cardCollections from "@/public/data/cardHome-1.json";

export default function Section8Interactive() {
    const cardCollectionsDataPodcast = cardCollections.sec8CardPodcast;
    const [currentPlayingIdx, setCurrentPlayingIdx] = useState<number | null>(null);

    return (
        <>
            {/* Interactive podcast cards with state management */}
            <div className="block-podcast">
                {cardCollectionsDataPodcast.map((card, idx) => (
                    <PodcastCard
                        key={idx}
                        card={card}
                        idx={idx}
                        isPlaying={currentPlayingIdx === idx}
                        onPlay={() => setCurrentPlayingIdx(idx)}
                        onPause={() => setCurrentPlayingIdx(null)}
                    />
                ))}
            </div>
        </>
    );
}
