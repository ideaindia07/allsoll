"use client";
import { Skiper30 } from './Skiper30'
import React from 'react'

const basePath = process.env.NODE_ENV === 'production' ? '/allsoll' : '';

const GridCarousel = () => {
    const image = [
        "/images/grid-carousel/art.png",
        "/images/grid-carousel/culture.png",
        "/images/grid-carousel/gramo.png",
        "/images/grid-carousel/rainbow.png",
        "/images/grid-carousel/stamp.png",
        "/images/grid-carousel/ticket.png",
        "/images/grid-carousel/art.png",
        "/images/grid-carousel/culture.png",
        "/images/grid-carousel/gramo.png",
        "/images/grid-carousel/rainbow.png",
        "/images/grid-carousel/stamp.png",
        "/images/grid-carousel/ticket.png",
    ].map(path => `${basePath}${path}`);
    return (
        <div>
            <Skiper30 img={image} />
        </div>
    )
}

export default GridCarousel
