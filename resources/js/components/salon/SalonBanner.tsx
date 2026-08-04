import { useEffect, useRef } from 'react';

const slides = [
    { src: '/asd_files/b2026072114130420.png', alt: '永康國際同濟會', width: 1920, height: 699 },
    { src: '/asd_files/b2026072113511750.png', alt: '永康國際同濟會', width: 1920, height: 700 },
    { src: '/asd_files/b2026072117103560.png', alt: '永康國際同濟會', width: 1920, height: 700 },
];

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Swiper: any;
    }
}

export default function SalonBanner() {
    const swiperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!window.Swiper || !swiperRef.current) return;

        new window.Swiper(swiperRef.current, {
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: {
                nextEl: '.banner-next',
                prevEl: '.banner-prev',
            },
        });
    }, []);

    return (
        <div className="banner-container">
            <div className="swiper swiper-banner" ref={swiperRef}>
                <ul className="swiper-wrapper">
                    {slides.map((slide, index) => (
                        <li className="swiper-slide" key={index}>
                            <div className="idx-banner">
                                <img
                                    src={slide.src}
                                    title="永康國際同濟會"
                                    alt={slide.alt}
                                    width={slide.width}
                                    height={slide.height}
                                    fetchPriority={index === 0 ? 'high' : undefined}
                                    loading={index === 0 ? undefined : 'lazy'}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="banner-prev" aria-label="Previous slide"></div>
                <div className="banner-next" aria-label="Next slide"></div>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    );
}
