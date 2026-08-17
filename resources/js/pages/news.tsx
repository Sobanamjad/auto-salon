import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import {
    filterNewsItems,
    getNewsCategoryLabel,
    newsCategories,
    newsViewHref,
} from '@/data/news-items';

type Props = {
    csn?: string | null;
    searchTitle?: string | null;
};

export default function News({ csn = null, searchTitle = null }: Props) {
    useForceLightMode();

    const activeCsn = csn ?? null;
    const activeLabel = getNewsCategoryLabel(activeCsn);
    const items = filterNewsItems(activeCsn, searchTitle);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            year: date.getFullYear(),
            month: String(date.getMonth() + 1).padStart(2, '0'),
            day: String(date.getDate()).padStart(2, '0'),
        };
    };

    return (
        <>
            <Head>
                <title>訊息公佈欄-永康國際同濟會</title>
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
                                src="/news_files/202607101153253851.png"
                                alt="訊息公佈欄"
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
                                            <span className="heading-text">訊息公佈欄</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-訊息公佈欄">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/news" title="永康國際同濟會 - 訊息公佈欄">
                                                        訊息公佈欄
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {activeLabel}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="secbox_inner">

                                    {/* Category buttons (horizontal) */}
                                    <div className="category_box">
                                        <ul className="category_list">
                                            {newsCategories.map(category => (
                                                <li
                                                    key={category.label}
                                                    className={(category.csn ?? null) === activeCsn ? 'active' : ''}
                                                >
                                                    <a
                                                        href={
                                                            category.csn
                                                                ? `/news?new_csn=${category.csn}`
                                                                : '/news'
                                                        }
                                                        title={category.label}
                                                    >
                                                        <span className="cate-text">{category.label}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="heading heading_main">
                                        <h1 className="heading-text">{activeLabel}</h1>
                                    </div>

                                    {/* News cards */}
                                    <ul className="row row-cols-sm-2 row-cols-lg-1 row-cols-xl-2">
                                        {items.map(news => {
                                            const date = formatDate(news.date);
                                            return (
                                                <li key={news.sn}>
                                                    <div className="card card_news js-scroll">
                                                        <div className="row g-3 g-lg-4 align-center">
                                                            <div className="col-lg-3">
                                                                <div className="card-header">
                                                                    <div className="card-date-box">
                                                                        <div className="card-date-item">
                                                                            <span className="card-date year">{date.year}</span>
                                                                            <span className="card-date month">{date.month}</span>
                                                                            <span className="card-date day">{date.day}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3">
                                                                <div className="card-photo">
                                                                    <a href={newsViewHref(news.sn)} title={`${news.title}-永康國際同濟會`}>
                                                                        <div className="item-fitimg">
                                                                            <img
                                                                                src={news.photo}
                                                                                alt={news.title}
                                                                                width={news.photoW}
                                                                                height={news.photoH}
                                                                                loading="lazy"
                                                                                className="fitimg"
                                                                            />
                                                                        </div>
                                                                        <div className="card-mask"></div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="card-body">
                                                                    <h3 className="card-name">
                                                                        <a href={newsViewHref(news.sn)} title={`${news.title}-永康國際同濟會`}>
                                                                            <span className="card-name-text">
                                                                                {news.title}
                                                                            </span>
                                                                        </a>
                                                                    </h3>
                                                                    {news.excerpt && (
                                                                        <div className="card-text img-hidden text-limit limit-line-2">
                                                                            {news.excerpt}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="hidden">
                                                                <div className="card-btnbar card-btnbar_more">
                                                                    <a
                                                                        href={newsViewHref(news.sn)}
                                                                        className="card-btn card-btn_more"
                                                                        title={`${news.title}-永康國際同濟會`}
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
                                        <span>首頁</span> <span>1</span> <span>末頁</span>
                                        <br />
                                        Total {items.length} - 1 / 1
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
