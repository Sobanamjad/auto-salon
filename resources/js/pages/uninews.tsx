import { Fragment } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import {
    UNINEWS_PER_PAGE,
    UNINEWS_TOTAL,
    UNINEWS_TOTAL_PAGES,
    uniNewsItems,
} from '@/data/uninews-items';

type Props = {
    thisPage?: number;
};

function getPageItems(page: number) {
    const start = (page - 1) * UNINEWS_PER_PAGE;
    return uniNewsItems.slice(start, start + UNINEWS_PER_PAGE);
}

export default function UniNews({ thisPage = 1 }: Props) {
    useForceLightMode([thisPage]);

    const currentPage = Math.min(Math.max(thisPage, 1), UNINEWS_TOTAL_PAGES);
    const pageItems = getPageItems(currentPage);
    const nbsp = '\u00A0';

    const pageHref = (page: number) => `/uninews?this_page=${page}`;

    return (
        <>
            <Head>
                <title>社團新聞-永康國際同濟會</title>
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
                <SalonHeader
                    banner={
                        <div className="banner-single">
                            <img
                                src="/asd_files/202607101321132536.png"
                                alt="社團新聞"
                                width={2032}
                                height={528}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    }
                />

                <SalonMarquee />

                <main className="main">
                    <div className="main_inner">
                        <section className="secbox_page">
                            <div className="maintop">
                                <div className="container">
                                    <div className="maintop_inner">
                                        <div className="heading_module">
                                            <span className="heading-text">社團新聞</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-社團新聞">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    <a href="/uninews" title="永康國際同濟會 - 社團新聞">
                                                        社團新聞
                                                    </a>
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="secbox_inner">
                                    <div className="category_box">
                                        <ul className="category_list"></ul>
                                    </div>

                                    <div className="heading heading_main">
                                        <h1 className="heading-text">社團新聞</h1>
                                    </div>

                                    <ul className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                                        {pageItems.map(item => {
                                            const href = `/uninews_view?new_sn=${item.sn}&lang=TS`;
                                            return (
                                                <li key={item.sn}>
                                                    <div className="card card_post fadeUp js-scroll">
                                                        <div className="row g-3 align-center">
                                                            <div className="col-4 col-lg-12">
                                                                <div className="card-photo">
                                                                    <a href={href} title={item.title}>
                                                                        <div className="item-fitimg">
                                                                            <img
                                                                                src={item.img}
                                                                                alt={item.title}
                                                                                width={item.imgW}
                                                                                height={item.imgH}
                                                                                loading="lazy"
                                                                                className="fitimg"
                                                                            />
                                                                        </div>
                                                                        <div className="card-mask"></div>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <div className="col-8 col-lg-12">
                                                                <div className="card-body">
                                                                    <h3 className="card-name">
                                                                        <a href={href} title={item.title}>
                                                                            <span className="card-name-text">
                                                                                {item.title}
                                                                            </span>
                                                                        </a>
                                                                    </h3>

                                                                    {item.excerpt && (
                                                                        <div className="card-text img-hidden hidden">
                                                                            {item.excerpt}
                                                                        </div>
                                                                    )}

                                                                    <ul className="card-infolist">
                                                                        <li>
                                                                            <div className="card-info">
                                                                                <span className="iconsvg icon-date"></span>
                                                                                <span className="card-info-text">
                                                                                    {item.date}
                                                                                </span>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="card-info card-info_location">
                                                                                <span className="iconsvg icon-address"></span>
                                                                                <span className="card-info-text">
                                                                                    {item.location}
                                                                                </span>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <div className="hidden">
                                                                <div className="card-btnbar card-btnbar_more">
                                                                    <a
                                                                        href={href}
                                                                        className="card-btn card-btn_more"
                                                                        title={item.title}
                                                                    >
                                                                        <span className="card-btn-text">更多</span>
                                                                        <span className="iconsvg icon-view-more"></span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <div className="page">
                                        <Link href={pageHref(1)} preserveScroll={false}>
                                            首頁
                                        </Link>
                                        {nbsp}
                                        {Array.from({ length: UNINEWS_TOTAL_PAGES }, (_, i) => i + 1).map(page => (
                                            <Fragment key={page}>
                                                {page === currentPage ? (
                                                    <span>{page}</span>
                                                ) : (
                                                    <Link href={pageHref(page)} preserveScroll={false}>
                                                        {page}
                                                    </Link>
                                                )}
                                                {nbsp}
                                            </Fragment>
                                        ))}
                                        <Link href={pageHref(UNINEWS_TOTAL_PAGES)} preserveScroll={false}>
                                            末頁
                                        </Link>
                                        <br />
                                        <br />
                                        Total {UNINEWS_TOTAL} - {currentPage} / {UNINEWS_TOTAL_PAGES}{' '}
                                        <br />
                                    </div>
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
