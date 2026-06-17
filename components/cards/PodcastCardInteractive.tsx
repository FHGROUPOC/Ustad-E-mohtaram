"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Howl, Howler } from "howler";

type CardProps = {
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
};

export default function PodcastCardInteractive({ card, idx, isPlaying, onPlay, onPause }: CardProps) {
    const soundRef = useRef<Howl | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(1);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const audioSrc = card.src || "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3";

    const updateProgress = useCallback(() => {
        if (soundRef.current && soundRef.current.playing()) {
            const seek = soundRef.current.seek() as number;
            setCurrentTime(seek);
            setDuration(soundRef.current.duration() || 1);
            setProgress((seek / (soundRef.current.duration() || 1)) * 100);
            requestAnimationFrame(updateProgress);
        }
    }, []);

    useEffect(() => {
        soundRef.current = new Howl({
            src: [audioSrc],
            html5: true,
            preload: true,
            onplay: () => {
                setDuration(soundRef.current?.duration() || 1);
                requestAnimationFrame(updateProgress);
            },
            onpause: () => { },
            onend: () => {
                setCurrentTime(0);
                setProgress(0);
                onPause();
            },
            onload: () => {
                setIsLoaded(true);
                setDuration(soundRef.current?.duration() || 1);
            },
        });

        return () => {
            soundRef.current?.unload();
        };
    }, [audioSrc, onPause, updateProgress]);

    useEffect(() => {
        if (!soundRef.current) return;
        if (isPlaying) {
            if (Howler.ctx && Howler.ctx.state === "suspended") {
                Howler.ctx.resume().then(() => {
                    soundRef.current?.play();
                });
            } else {
                soundRef.current.play();
            }
        } else {
            soundRef.current.pause();
        }
    }, [isPlaying]);

    const handlePlay = () => {
        if (!isPlaying) onPlay();
    };

    const handlePause = () => {
        if (isPlaying) onPause();
    };

    const handleReplay = () => {
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.play();
            if (!isPlaying) onPlay();
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!soundRef.current || !isLoaded) return;
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const seekTime = (soundRef.current.duration() || 1) * percent;
        soundRef.current.seek(seekTime);
        setCurrentTime(seekTime);
        setProgress(percent * 100);
    };

    const formatTime = (sec: number) => {
        const min = String(Math.floor(sec / 60)).padStart(2, "0");
        const s = String(Math.floor(sec % 60)).padStart(2, "0");
        return `${min}:${s}`;
    };

    return (
        <div className="block-podcast__item__action box-music" data-src={card.src}>
            <div className="control">
                <div className="prev-btn" onClick={handleReplay} style={{ cursor: "pointer" }}>
                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path d="M7.00018 6V18H9.00018V6H7.00018ZM11.0002 12L17.0002 18V6L11.0002 12Z" fill="#0E0E0F" />
                    </svg>
                </div>
                {!isPlaying ? (
                    <div className="btn-toggle-play control-btn play-btn" onClick={handlePlay} style={{ cursor: "pointer" }}>
                        <svg className="icon-play" xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none">
                            <path d="M6.69078 4.3477L15.8757 8.92961C17.1635 9.57413 17.1631 11.409 15.8751 12.053L6.69017 16.6593C5.52651 17.2411 4.15643 16.3965 4.15643 15.0974L4.15643 5.90924C4.15643 4.60984 5.52712 3.76531 6.69078 4.3477Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                ) : (
                    <div className="pause-btn" onClick={handlePause} style={{ cursor: "pointer" }}>
                        <div className="btn-toggle-play">
                            <svg className="dark-mode-invert" width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width={2} height={12} fill="white" />
                                <rect x={10} width={2} height={12} fill="white" />
                            </svg>
                        </div>
                    </div>
                )}
                <div className="next-btn" onClick={handleReplay} style={{ cursor: "pointer" }}>
                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path d="M17.0002 6V18H15.0002V6H17.0002ZM13.0002 12L7.00018 18V6L13.0002 12Z" fill="#0E0E0F" />
                    </svg>
                </div>
            </div>
            <div className="progress-container">
                <div className="progress-bar" onClick={handleSeek} style={{ cursor: "pointer" }}>
                    <div className="progress fs-7" style={{ width: `${progress}%` }} />
                </div>
                <div className="time-info">
                    <div className="time-display">{formatTime(currentTime)}</div>
                </div>
            </div>
        </div>
    );
}
