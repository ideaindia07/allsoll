"use client";
import { Skiper30 } from './Skiper30'
import React from 'react'

const GridCarousel = () => {
    // WebP versions (~0.5MB total vs ~19MB PNG) — same art, far cheaper to decode/paint
    const image = [
        "/images/grid-carousel/art.webp",
        "/images/grid-carousel/culture.webp",
        "/images/grid-carousel/gramo.webp",
        "/images/grid-carousel/rainbow.webp",
        "/images/grid-carousel/stamp.webp",
        "/images/grid-carousel/ticket.webp",
        "/images/grid-carousel/art.webp",
        "/images/grid-carousel/culture.webp",
        "/images/grid-carousel/gramo.webp",
        "/images/grid-carousel/rainbow.webp",
        "/images/grid-carousel/stamp.webp",
        "/images/grid-carousel/ticket.webp",
    ];
    return (
        <div className="-mb-6 md:mb-0">
            <Skiper30 img={image} />
        </div>
    )
}

export default GridCarousel
