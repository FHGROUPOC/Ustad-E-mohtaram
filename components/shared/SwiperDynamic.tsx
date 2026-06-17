"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";

interface SwiperDynamicProps {
    children: React.ReactNode;
    className?: string;
    slidesPerView?: number | "auto";
    spaceBetween?: number;
    loop?: boolean;
    autoplay?: boolean | { delay: number; disableOnInteraction?: boolean };
    centeredSlides?: boolean;
    slidesPerGroup?: number;
    navigation?: boolean | object;
    pagination?: boolean | object;
    thumbs?: any;
    freeMode?: boolean;
    direction?: "horizontal" | "vertical";
    breakpoints?: {
        [key: number]: {
            slidesPerView?: number;
            spaceBetween?: number;
        };
    };
    onSlideChange?: (swiper: any) => void;
    onSwiper?: (swiper: any) => void;
    modules?: any[];
    speed?: number;
    grabCursor?: boolean;
    watchSlidesProgress?: boolean;
}

export default function SwiperDynamic(props: SwiperDynamicProps) {
    const { children, className = "swiper", slidesPerView, spaceBetween = 30, loop = true, autoplay = false, centeredSlides = false, slidesPerGroup = 1, navigation = false, pagination = false, thumbs, freeMode = false, direction = "horizontal", breakpoints, onSlideChange, onSwiper, modules: customModules, speed = 600, grabCursor = true, watchSlidesProgress = false } = props;

    // Automatically determine required modules
    const getModules = () => {
        const modules = [];

        if (autoplay) modules.push(Autoplay);
        if (navigation) modules.push(Navigation);
        if (pagination) modules.push(Pagination);
        if (thumbs) modules.push(Thumbs);
        if (freeMode) modules.push(FreeMode);

        // Add custom modules if provided
        if (customModules) {
            modules.push(...customModules);
        }

        return modules;
    };

    // Build props for Swiper
    const swiperProps: any = {
        className,
        modules: getModules(),
        spaceBetween,
        loop,
        centeredSlides,
        slidesPerGroup,
        direction,
        speed,
        grabCursor,
        watchSlidesProgress,
    };

    // Autoplay configuration
    if (autoplay) {
        if (typeof autoplay === "boolean") {
            swiperProps.autoplay = { delay: 3000, disableOnInteraction: false };
        } else {
            swiperProps.autoplay = autoplay;
        }
    }

    // Navigation configuration
    if (navigation) {
        swiperProps.navigation = navigation;
    }

    // Pagination configuration
    if (pagination) {
        swiperProps.pagination = pagination;
    }

    // Thumbs configuration
    if (thumbs) {
        swiperProps.thumbs = thumbs;
    }

    // FreeMode configuration
    if (freeMode) {
        swiperProps.freeMode = freeMode;
    }

    // Breakpoints configuration
    if (breakpoints) {
        swiperProps.breakpoints = breakpoints;
    }

    // SlidesPerView - set default when breakpoints are provided
    if (slidesPerView !== undefined) {
        swiperProps.slidesPerView = slidesPerView;
    } else if (breakpoints) {
        // Find the smallest breakpoint (mobile) as default
        const minBreakpoint = Math.min(...Object.keys(breakpoints).map(Number));
        swiperProps.slidesPerView = breakpoints[minBreakpoint]?.slidesPerView || 1;
    } else {
        swiperProps.slidesPerView = 1;
    }

    // Event handlers
    if (onSlideChange) {
        swiperProps.onSlideChange = onSlideChange;
    }
    if (onSwiper) {
        swiperProps.onSwiper = onSwiper;
    }

    return (
        <Swiper {...swiperProps}>
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
        </Swiper>
    );
}
