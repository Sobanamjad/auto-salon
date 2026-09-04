import { useEffect, useRef } from 'react';

const albumItems = [
    {
        href: '/albums_view?id=1',
        title: '2026年度春季會員大會',
        img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
        imgW: 800, imgH: 600,
    },
    {
        href: '/albums_view?id=2',
        title: '登山健行活動',
        img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        imgW: 800, imgH: 600,
    },
    {
        href: '/albums_view?id=3',
        title: '夏季露營活動',
        img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
        imgW: 800, imgH: 600,
    },
    {
        href: '/albums_view?id=4',
        title: '志工服務活動',
        img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
        imgW: 800, imgH: 600,
    },
    {
        href: '/albums_view?id=5',
        title: '秋季旅遊活動',
        img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
        imgW: 800, imgH: 600,
    },
    {
        href: '/albums_view?id=6',
        title: '聖誕節聯歡晚會',
        img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800',
        imgW: 800, imgH: 600,
    },
    {
        href: '/albums_view?id=7',
        title: '新年茶會',
        img: 'https://images.unsplash.com/photo-1503376763036-066120622c74?w=800',
        imgW: 800, imgH: 600,
    },
    {
        href: '/albums_view?id=8',
        title: '春季野餐活動',
        img: 'https://images.unsplash.com/photo-1568607688298-68499558d95b?w=800',
        imgW: 800, imgH: 600,
    },
];

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Swiper: any;
    }
}

export default function SalonAlbums() {
    const swiperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!window.Swiper || !swiperRef.current) return;

        new window.Swiper(swiperRef.current, {
            slidesPerView: 'auto',
            spaceBetween: 32,
            navigation: {
                nextEl: '.itemslide-next',
                prevEl: '.itemslide-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
            },
        });
    }, []);

    return (
        <section id="secbox_idx_albums" className="secbox secbox_idx js-scroll">
            <div className="secbox_bg">
                <div className="container">
                    <div className="secbox_inner">

                        <div className="itembox_sectop">
                            <div className="heading heading_sec js-scroll">
                                <div className="heading-main">
                                    <div className="secbox-order">08</div>
                                    <h2 className="heading-text">活動剪影</h2>
                                    <div className="heading-dec"></div>
                                </div>
                            </div>
                        </div>

                        <div className="secbox_main">
                            <div className="itemslide-container">
                                <div className="swiper swiper-itemslide" ref={swiperRef}>
                                    <div className="swiper-wrapper">
                                        {albumItems.map((album, index) => (
                                            <div className="swiper-slide" key={index}>
                                                <div className="card card_albums effect_dec_vt fadeUp js-scroll">
                                                    <div className="row g-3">
                                                        <div>
                                                            <div className="card-photo">
                                                                <a href={album.href} title={album.title}>
                                                                    <div className="item-fitimg">
                                                                        <img
                                                                            src={album.img}
                                                                            alt={album.title}
                                                                            width={album.imgW}
                                                                            height={album.imgH}
                                                                            loading="lazy"
                                                                            className="fitimg"
                                                                        />
                                                                    </div>
                                                                    <div className="card-mask"></div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="card-body">
                                                                <h3 className="card-name">
                                                                    <a href={album.href} title={album.title}>
                                                                        <span className="card-name-text">{album.title}</span>
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="card-btnbar card-btnbar_more">
                                                                <a href={album.href} className="card-btn card-btn_more" title={album.title}>
                                                                    <span className="card-btn-text">更多</span>
                                                                    <span className="iconsvg icon-view-more"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="itemslide-prev" aria-label="Previous slide"></div>
                                    <div className="itemslide-next" aria-label="Next slide"></div>
                                </div>
                            </div>

                            <div className="btnbar btnbar_idxmore">
                                <a href="/albums" className="btn btn_idxmore">
                                    <span className="btn-text">更多活動剪影</span>
                                    <span className="iconsvg icon-go"></span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="secbox_dec01"></div>
            <div className="secbox_dec02"></div>
        </section>
    );
}
