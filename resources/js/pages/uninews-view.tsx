import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

type NewsItem = {
    id: number;
    sn: string;
    title: string;
    img: string | null;
    imgW: number | null;
    imgH: number | null;
    date: string | null;
    location: string | null;
    excerpt: string | null;
    content: string | null;
};

type Props = {
    news?: NewsItem | null;
};

export default function UniNewsView({ news }: Props) {
    useForceLightMode();

    const title = news ? `${news.title} - 社團新聞-永康國際同濟會` : '新聞不存在 - 永康國際同濟會';
    const description = news ? news.title : '永康國際同濟會';

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content="永康國際同濟會,社團新聞" />
                <link rel="stylesheet" href="/asd_files/base.css" />
                <link rel="stylesheet" href="/asd_files/blue.css" />
                <link rel="stylesheet" href="/asd_files/common.css" />
                <link rel="stylesheet" href="/asd_files/main.css" />
                <link rel="stylesheet" href="/asd_files/animate.css" />
            </Head>

            <div className="wrapper">
                {news ? (
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
                ) : (
                    <SalonHeader />
                )}

                <SalonMarquee />

                <main className="main">
                    <div className="main_inner">
                        {news ? (
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
                                                        <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                    </li>
                                                    <li className="breadcrumb-item">
                                                        <a href="/uninews" title="永康國際同濟會 - 社團新聞">社團新聞</a>
                                                    </li>
                                                    <li className="breadcrumb-item active" aria-current="page">
                                                        新聞詳情
                                                    </li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>

                                <div className="container">
                                    <div className="secbox_inner">
                                        <div className="heading heading_main">
                                            <h1 className="heading-text">{news.title}</h1>
                                        </div>

                                        <div className="card-infolist" style={{ marginBottom: '20px' }}>
                                            <div className="card-info">
                                                <span className="iconsvg icon-date"></span>
                                                <span className="card-info-text">{news.date}</span>
                                            </div>
                                            {news.location && (
                                                <div className="card-info card-info_location">
                                                    <span className="iconsvg icon-address"></span>
                                                    <span className="card-info-text">{news.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        {news.img && (
                                            <div style={{ marginBottom: '30px' }}>
                                                <img
                                                    src={news.img}
                                                    alt={news.title}
                                                    width={news.imgW ?? undefined}
                                                    height={news.imgH ?? undefined}
                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                />
                                            </div>
                                        )}

                                        {news.excerpt && (
                                            <div style={{
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                marginBottom: '20px',
                                                color: '#333',
                                            }}>
                                                {news.excerpt}
                                            </div>
                                        )}

                                        {news.content && (
                                            <div
                                                style={{ marginBottom: '30px' }}
                                                dangerouslySetInnerHTML={{ __html: news.content }}
                                            />
                                        )}

                                        <div style={{ marginTop: '30px' }}>
                                            <a href="/uninews" className="btn btn_idxmore">
                                                <span className="btn-text">返回社團新聞列表</span>
                                                <span className="iconsvg icon-go"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <section className="secbox_page">
                                <div className="container" style={{ padding: '60px 0' }}>
                                    <h1>新聞不存在</h1>
                                    <a href="/uninews">返回社團新聞列表</a>
                                </div>
                            </section>
                        )}
                    </div>
                </main>

                <SalonFooter />
            </div>
        </>
    );
}
