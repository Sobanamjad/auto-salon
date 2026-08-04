import { useEffect, useRef } from 'react';

const albumItems = [
    {
        href: '/albums_view?new_csn=7075',
        title: '2026-07-22 永康國際同濟會第一屆第五次理監事會議',
        img: '/asd_files/s202607221405366.png',
        imgW: 1024, imgH: 764,
    },
    {
        href: '/albums_view?new_csn=7079',
        title: '2025-08-20 臺灣同濟會50年年會',
        img: '/asd_files/s202607221407447.jpg',
        imgW: 1024, imgH: 682,
    },
    {
        href: '/albums_view?new_csn=7078',
        title: '2024-08-20 高雄展覽館50屆全國年會',
        img: '/asd_files/s202607221407071.jpg',
        imgW: 1024, imgH: 770,
    },
    {
        href: '/albums_view?new_csn=7077',
        title: '2024-08-20 永康會創會授證典禮',
        img: '/asd_files/s202607221406322.jpg',
        imgW: 1024, imgH: 575,
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
