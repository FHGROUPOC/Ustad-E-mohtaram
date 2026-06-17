"use client";
import { useOdometerCounter } from "@/util/useOdometerCounter";

interface OdometerCounterInteractiveProps {
    count: number;
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    children?: React.ReactNode;
}

export default function OdometerCounterInteractive({
    count,
    duration = 2000,
    className = "odometer",
    prefix = "",
    suffix = "",
    children
}: OdometerCounterInteractiveProps) {
    const { ref, currentValue, isCounted } = useOdometerCounter({
        dataCount: count,
        duration
    });

    return (
        <span
            ref={ref}
            className={className}
            data-count={count}
        >
            {children || `${prefix}${currentValue}${suffix}`}
        </span>
    );
}
