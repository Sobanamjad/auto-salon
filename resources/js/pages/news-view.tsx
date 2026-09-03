import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

interface NewsItem {
    id: number;
    published_date: string;
    category: string;
    subject: string;
    brief: string | null;
    content: string;
    keyword: string | null;
    video: string | null;
    map: string | null;
    views: number;
}

type Props = {
    news: NewsItem;
};

export default function NewsView({ news }: Props) {
    useForceLightMode();

    // Load AddToAny share script once after mount
    useEffect(() => {
        if (!document.getElementById('a2a-script')) {
            const script = document.createElement('script');
            script.id = 'a2a-script';
            script.async = true;
            script.src = 'https://static.addtoany.com/menu/page.js';
            document.body.appendChild(script);
        }
    }, []);

    if (!news) return null;

    const d = new Date(news.published_date);
    const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    return (
        <>
            <Head>
                <title>{news.subject}-永康國際同濟會</title>
                <meta name="description" content={news.brief ?? '永康國際同濟會'} />
                <meta name="keywords" content={news.keyword ?? '永康國際同濟會'} />
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
                {/* Same banner/header as news listing */}
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

                            {/* Same maintop/breadcrumb as listing */}
                            <div className="maintop">
                                <div className="container">
                                    <div className="maintop_inner">
                                        <div className="heading_module">
                                            <span className="heading-text">訊息公佈欄</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-訊息公佈欄">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/news" title="永康國際同濟會 - 訊息公佈欄">訊息公佈欄</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {news.subject}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Middle content — detail only */}
                            <div className="container">
                                <div className="secbox_inner">
                                    <div className="view-column">

                                        {/* Article heading */}
                                        <div className="heading heading_pageview">
                                            <h1 className="heading-text">{news.subject}</h1>
                                            <div className="info info_view_date">{formattedDate}</div>
                                        </div>

                                        {/* Full HTML content from DB */}
                                        <div
                                            className="detailbox editor"
                                            dangerouslySetInnerHTML={{ __html: news.content }}
                                        />

                                        {/* Video embed */}
                                        {news.video && (
                                            <div
                                                className="videobox"
                                                dangerouslySetInnerHTML={{ __html: news.video }}
                                            />
                                        )}

                                        {/* Map embed */}
                                        {news.map && (
                                            <div
                                                className="mapbox"
                                                dangerouslySetInnerHTML={{ __html: news.map }}
                                            />
                                        )}

                                        {/* Consult button */}
                                        <div className="consult consult_view">
                                            <div className="btnbar btnbar_consult">
                                                <a
                                                    href={`/contact?new_sn=${news.id}&tmp_table=web_news`}
                                                    className="btn btn_consult"
                                                >
                                                    <span className="iconsvg icon-question"></span>
                                                    <span className="btn-text">問題諮詢</span>
                                                </a>
                                            </div>
                                        </div>

                                        {/* Share bar */}
                                        <div className="sharelink_bar">
                                            <div className="sharelink">
                                                <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                                                    <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                                                    <a className="a2a_button_facebook"></a>
                                                    <a className="a2a_button_line"></a>
                                                    <a className="a2a_button_twitter"></a>
                                                    <a className="a2a_button_wechat"></a>
                                                </div>
                                            </div>
                                        </div>

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
