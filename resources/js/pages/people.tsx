import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import { useEffect, useState } from 'react';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

interface Partner {
    id: number;
    name: string;
    city: string | null;
    district: string | null;
    village: string | null;
    brief: string | null;
    content: string | null;
    image: string | null;
    slogan: string | null;
    tag: string | null;
    external_link: string | null;
    company_name: string | null;
    booking_link: string | null;
    take_number_link: string | null;
    current_number_link: string | null;
    views: number;
}

export default function People() {
    useForceLightMode();
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await fetch('/api/partners');
                const data = await response.json();
                setPartners(data.partners || []);
            } catch (error) {
                console.error('Failed to fetch partners:', error);
                setPartners([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    const formatLocation = (city: string | null, district: string | null, village: string | null) => {
        const parts = [city, district, village].filter(Boolean);
        return parts.join(' ');
    };

    const getCallerLinks = (partner: Partner) => {
        if (!partner.booking_link && !partner.take_number_link && !partner.current_number_link) {
            return null;
        }
        return {
            book: partner.booking_link,
            netQueue: partner.take_number_link,
            currentNum: partner.current_number_link,
        };
    };

    const getImagePath = (image: string | null) => {
        if (!image) return '/asd_files/placeholder.jpg';
        if (image.startsWith('http')) return image;
        if (image.startsWith('/asd_files/')) return image;
        if (image.startsWith('/storage/')) return image;
        return `/storage/${image}`;
    };
    return (
        <>
            <Head>
                <title>夥伴介紹-永康國際同濟會</title>
                <meta name="description" content="永康國際同濟會" />
                <meta name="keywords" content="永康國際同濟會" />
                <link rel="stylesheet" href="/asd_files/base.css" />
                <link rel="stylesheet" href="/asd_files/blue.css" />
                <link rel="stylesheet" href="/asd_files/common.css" />
                <link rel="stylesheet" href="/asd_files/main.css" />
                <link rel="stylesheet" href="/asd_files/animate.css" />
                <script src="/asd_files/jquery-3.7.1.min.js" defer={true} />
                <script src="/asd_files/customize.js" defer={true} />
                <script src="/asd_files/marquee.js" defer={true} />
            </Head>

            <div className="wrapper">
                <SalonHeader banner={
                    <div className="banner-single">
                        <img
                            src="/asd_files/202607101347517307.png"
                            alt="夥伴介紹"
                            width={2032}
                            height={528}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                } />

                <SalonMarquee />

                <main className="main">
                    <div className="main_inner">
                        <section className="secbox_page">

                            {/* Page heading + breadcrumb */}
                            <div className="maintop">
                                <div className="container">
                                    <div className="maintop_inner">
                                        <div className="heading_module">
                                            <span className="heading-text">夥伴介紹</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-夥伴介紹">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    <a href="/people" title="夥伴介紹">夥伴介紹</a>
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="container">
                                <div className="secbox_inner">

                                    {/* Empty category box (matches source) */}
                                    <div className="category_box">
                                        <ul className="category_list"></ul>
                                    </div>

                                    {/* Page title */}
                                    <div className="heading heading_main">
                                        <h1 className="heading-text">夥伴介紹</h1>
                                    </div>

                                    {/* People cards grid */}
                                    {loading ? (
                                        <div className="text-center py-8">載入中...</div>
                                    ) : (
                                        <ul className="row row-cols-2 row-cols-lg-3 row-cols-xl-4">
                                            {partners.map((partner) => {
                                                const callerLinks = getCallerLinks(partner);
                                                const location = formatLocation(partner.city, partner.district, partner.village);
                                                return (
                                                    <li key={partner.id}>
                                                        <div className="card card_people effect_topslash fadeUp js-scroll">
                                                            <div className="row g-3">
                                                                <div>
                                                                    <div className="card-photo">
                                                                        <a href={partner.external_link || '#'} target="_blank" rel="noopener noreferrer">
                                                                            <div className="item-fitimg">
                                                                                <img
                                                                                    src={getImagePath(partner.image)}
                                                                                    width={1024}
                                                                                    height={1024}
                                                                                    alt={partner.name}
                                                                                    loading="lazy"
                                                                                    className="fitimg"
                                                                                />
                                                                            </div>
                                                                            <div className="card-mask"></div>
                                                                        </a>
                                                                    </div>
                                                                    {callerLinks && (
                                                                        <ul className="card-callerbar">
                                                                            <li><a href={callerLinks.book} target="_blank" rel="noopener noreferrer">預約</a></li>
                                                                            <li><a href={callerLinks.netQueue} target="_blank" rel="noopener noreferrer">網路取號</a></li>
                                                                            <li><a href={callerLinks.currentNum} target="_blank" rel="noopener noreferrer">目前號碼</a></li>
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <div className="card-body">
                                                                        <h3 className="card-name">
                                                                            <a href={partner.external_link || '#'} target="_blank" rel="noopener noreferrer">
                                                                                <span className="card-name-text">{partner.name}</span>
                                                                            </a>
                                                                        </h3>
                                                                        <div className="card-slogan">{partner.slogan}</div>
                                                                        <div className="card-text img-hidden text-limit limit-line-2">{partner.brief}</div>
                                                                        <div className="card-infobar">
                                                                            <div className="card-info card-info_tag">
                                                                                <span className="iconsvg icon-tag"></span>
                                                                                <span className="card-info-text">{partner.tag}</span>
                                                                            </div>
                                                                            {partner.company_name && (
                                                                                <div className="card-info card-info_company">
                                                                                    <span className="iconsvg icon-company"></span>
                                                                                    <span className="card-info-text">{partner.company_name}</span>
                                                                                </div>
                                                                            )}
                                                                            <div className="card-info card-info_location">
                                                                                <span className="iconsvg icon-address"></span>
                                                                                <span className="card-info-text">{location}</span>
                                                                            </div>
                                                                        </div>
                                                                        {callerLinks && (
                                                                            <ul className="card-callerbar">
                                                                                <li><a href={callerLinks.book} target="_blank" rel="noopener noreferrer">預約</a></li>
                                                                                <li><a href={callerLinks.netQueue} target="_blank" rel="noopener noreferrer">網路取號</a></li>
                                                                                <li><a href={callerLinks.currentNum} target="_blank" rel="noopener noreferrer">目前號碼</a></li>
                                                                            </ul>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="hidden">
                                                                    <div className="card-btnbar card-btnbar_outlink">
                                                                        <a href={partner.external_link || '#'} className="card-btn card-btn_outlink" target="_blank" rel="noopener noreferrer">
                                                                            <span className="card-btn-text">更多</span>
                                                                            <span className="iconsvg icon-outlink"></span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}

                                </div>
                            </div>

                        </section>
                    </div>
                </main>

                <SalonFooter />
            </div>
        </>
    );
}
