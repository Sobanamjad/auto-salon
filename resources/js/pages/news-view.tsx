import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import { findNewsItem } from '@/data/news-items';

type Props = {
    sn: string;
};

export default function NewsView({ sn }: Props) {
    useForceLightMode();

    const news = findNewsItem(sn);

    // Format date helper
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    return (
        <>
            <Head>
                <title>{news ? `${news.title}-永康國際同濟會` : '訊息公佈欄-永康國際同濟會'}</title>
                <meta name="description" content={news?.excerpt ?? '永康國際同濟會'} />
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
                {/* ── Exact same banner/header as news listing ── */}
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

                            {/* ── Exact same maintop/breadcrumb as news listing ── */}
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
                                                {news && (
                                                    <li className="breadcrumb-item active" aria-current="page">
                                                        {news.title}
                                                    </li>
                                                )}
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* ── Middle content only changes here ── */}
                            <div className="container">
                                <div className="secbox_inner">

                                    {news ? (
                                        <div className="view-column">

                                            {/* Article heading */}
                                            <div className="heading heading_pageview">
                                                <h1 className="heading-text">{news.title}</h1>
                                                <div className="info info_view_date">
                                                    {formatDate(news.date)}
                                                </div>
                                            </div>

                                            {/* Main HTML content */}
                                            <div
                                                className="detailbox editor"
                                                dangerouslySetInnerHTML={{ __html: news.content }}
                                            />

                                            {/* Consult button */}
                                            <div className="consult consult_view">
                                                <div className="btnbar btnbar_consult">
                                                    <a
                                                        href={`/contact?new_sn=${news.sn}&tmp_table=web_news`}
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
                                                    <script async src="https://static.addtoany.com/menu/page.js"></script>
                                                </div>
                                            </div>

                                        </div>
                                    ) : (
                                        /* News item not found */
                                        <div style={{ padding: '60px 0', textAlign: 'center', color: '#999' }}>
                                            <p>找不到此篇文章</p>
                                            <a href="/news" style={{ color: '#007bff' }}>← 返回訊息公佈欄</a>
                                        </div>
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
