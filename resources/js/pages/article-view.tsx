import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

type ArticleDetail = {
    id: number;
    subject: string;
    brief: string | null;
    content: string | null;
    category: string | null;
    keyword: string | null;
    video: string | null;
    map: string | null;
    has_photo: boolean;
    date: string | null;
    views: number;
};

type Props = {
    article?: ArticleDetail | null;
};

export default function ArticleView({ article }: Props) {
    useForceLightMode();

    const pageTitle = article
        ? `${article.subject} - 專欄園地-永康國際同濟會`
        : '文章不存在 - 專欄園地-永康國際同濟會';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={article ? (article.brief ?? article.subject) : '永康國際同濟會'} />
                <meta name="keywords" content={article?.keyword ?? '永康國際同濟會'} />
                <link rel="stylesheet" href="/asd_files/base.css" />
                <link rel="stylesheet" href="/asd_files/blue.css" />
                <link rel="stylesheet" href="/asd_files/common.css" />
                <link rel="stylesheet" href="/asd_files/main.css" />
                <link rel="stylesheet" href="/asd_files/animate.css" />
            </Head>

            <div className="wrapper">
                <SalonHeader
                    banner={
                        <div className="banner-single">
                            <img
                                src="/asd_files/202607101333433810.png"
                                alt="專欄園地"
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
                                            <span className="heading-text">專欄園地</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-專欄園地">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/article" title="永康國際同濟會 - 專欄園地">專欄園地</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {article ? article.subject : '文章不存在'}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="secbox_inner">
                                    {!article ? (
                                        <div style={{ padding: '60px 0', textAlign: 'center' }}>
                                            <h1 style={{ marginBottom: '16px' }}>文章不存在</h1>
                                            <a href="/article" className="btn btn_idxmore">
                                                <span className="btn-text">返回專欄園地</span>
                                                <span className="iconsvg icon-go"></span>
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="view-column">
                                            {/* Title */}
                                            <div className="heading heading_pageview">
                                                <h1 className="heading-text">{article.subject}</h1>
                                                <div className="info info_view_date" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                                    {article.date && <span>{article.date}</span>}
                                                    {article.category && <span>{article.category}</span>}
                                                </div>
                                            </div>

                                            {/* Brief / summary */}
                                            {article.brief && (
                                                <div className="detailbox" style={{
                                                    fontSize: '16px',
                                                    color: '#555',
                                                    borderLeft: '4px solid #3b82f6',
                                                    paddingLeft: '16px',
                                                    marginBottom: '24px',
                                                    lineHeight: '1.7',
                                                }}>
                                                    {article.brief}
                                                </div>
                                            )}

                                            {/* Main content */}
                                            {article.content && (
                                                <div
                                                    className="detailbox editor"
                                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                                />
                                            )}

                                            {/* Video embed */}
                                            {article.video && (
                                                <div
                                                    className="videobox"
                                                    style={{ marginTop: '24px' }}
                                                    dangerouslySetInnerHTML={{ __html: article.video }}
                                                />
                                            )}

                                            {/* Google Map embed */}
                                            {article.map && (
                                                <div
                                                    className="mapbox"
                                                    style={{ marginTop: '24px' }}
                                                    dangerouslySetInnerHTML={{ __html: article.map }}
                                                />
                                            )}

                                            {/* Back button */}
                                            <div style={{ marginTop: '40px' }}>
                                                <a href="/article" className="btn btn_idxmore">
                                                    <span className="btn-text">返回專欄園地</span>
                                                    <span className="iconsvg icon-go"></span>
                                                </a>
                                            </div>
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
