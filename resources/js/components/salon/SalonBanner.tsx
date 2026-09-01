import { useEffect, useRef, useState } from 'react';

interface Slide {
    src: string;
    alt: string;
    width: number;
    height: number;
}

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Swiper: any;
    }
}

export default function SalonBanner() {
    const swiperRef = useRef<HTMLDivElement>(null);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch slider data from API
        fetch('/api/sliders?lang=TS')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    const mappedSlides = data.data.map((slider: any) => ({
                        src: slider.image_url || '',
                        alt: slider.image_alt || slider.title || 'Slider',
                        width: slider.width || 1920,
                        height: slider.height || 700,
                    }));
                    setSlides(mappedSlides);
                } else {
                    // Fallback to hardcoded slides if no data
                    setSlides([
                        { src: '/asd_files/b2026072114130420.png', alt: '永康國際同濟會', width: 1920, height: 699 },
                        { src: '/asd_files/b2026072113511750.png', alt: '永康國際同濟會', width: 1920, height: 700 },
                        { src: '/asd_files/b2026072117103560.png', alt: '永康國際同濟會', width: 1920, height: 700 },
                    ]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching sliders:', error);
                // Fallback to hardcoded slides on error
                setSlides([
                    { src: '/asd_files/b2026072114130420.png', alt: '永康國際同濟會', width: 1920, height: 699 },
                    { src: '/asd_files/b2026072113511750.png', alt: '永康國際同濟會', width: 1920, height: 700 },
                    { src: '/asd_files/b2026072117103560.png', alt: '永康國際同濟會', width: 1920, height: 700 },
                ]);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!window.Swiper || !swiperRef.current || loading) return;

        new window.Swiper(swiperRef.current, {
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: {
                nextEl: '.banner-next',
                prevEl: '.banner-prev',
            },
        });
    }, [slides, loading]);

    return (
        <div className="banner-container">
            {loading ? (
                <div className="swiper swiper-banner">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="idx-banner">
                                <div className="flex items-center justify-center" style={{ width: '100%', height: '700px', background: '#f0f0f0' }}>
                                    <span>Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : slides.length > 0 ? (
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
            ) : (
                <div className="swiper swiper-banner">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="idx-banner">
                                <div className="flex items-center justify-center" style={{ width: '100%', height: '700px', background: '#f0f0f0' }}>
                                    <span>No sliders available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
