import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

type Director = {
    id: number;
    sn: string | null;
    title: string;
    name: string | null;
    category: string | null;
    brief: string | null;
    content: string | null;
    video: string | null;
    has_photo: boolean;
    img: string | null;
    imgW: number | null;
    imgH: number | null;
    views: number;
};

type Props = {
    director?: Director | null;
};

export default function WorksView({ director }: Props) {
    useForceLightMode();

    const pageTitle = director
        ? `${director.title}${director.name ? ' ' + director.name : ''} - 理監事(組織)-永康國際同濟會`
        : '找不到資料 - 理監事(組織)-永康國際同濟會';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={director ? director.title : '永康國際同濟會'} />
                <meta name="keywords" content="永康國際同濟會,理監事" />
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
                                src="/works_files/202607101306135249.png"
                                alt="理監事(組織)"
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
                                            <span className="heading-text">理監事(組織)</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-理監事">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/works" title="永康國際同濟會 - 理監事(組織)">理監事(組織)</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {director ? director.title : '找不到資料'}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="secbox_inner">
                                    {!director ? (
                                        <div style={{ padding: '60px 0', textAlign: 'center' }}>
                                            <h1 style={{ marginBottom: '16px' }}>找不到資料</h1>
                                            <a href="/works" className="btn btn_idxmore">
                                                <span className="btn-text">返回理監事列表</span>
                                                <span className="iconsvg icon-go"></span>
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="view-column">
                                            {/* Heading */}
                                            <div className="heading heading_pageview">
                                                <h1 className="heading-text">
                                                    {director.title}
                                                    {director.name && (
                                                        <span style={{ fontWeight: 'normal', marginLeft: '8px', fontSize: '0.85em' }}>
                                                            {director.name}
                                                        </span>
                                                    )}
                                                </h1>
                                                {director.category && (
                                                    <div className="info info_view_date">{director.category}</div>
                                                )}
                                            </div>

                                            {/* Photo */}
                                            {director.has_photo && director.img && (
                                                <div className="detailbox" style={{ marginBottom: '30px', maxWidth: '300px' }}>
                                                    <img
                                                        src={director.img}
                                                        alt={director.title}
                                                        width={director.imgW ?? 775}
                                                        height={director.imgH ?? 1024}
                                                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                                    />
                                                </div>
                                            )}

                                            {/* Brief */}
                                            {director.brief && (
                                                <div className="detailbox" style={{
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                    marginBottom: '20px',
                                                    color: '#333',
                                                }}>
                                                    {director.brief}
                                                </div>
                                            )}

                                            {/* Content */}
                                            {director.content && (
                                                <div
                                                    className="detailbox editor"
                                                    dangerouslySetInnerHTML={{ __html: director.content }}
                                                />
                                            )}

                                            {/* Video */}
                                            {director.video && (
                                                <div
                                                    className="videobox"
                                                    style={{ marginTop: '20px' }}
                                                    dangerouslySetInnerHTML={{ __html: director.video }}
                                                />
                                            )}

                                            {/* Back button */}
                                            <div style={{ marginTop: '40px' }}>
                                                <a href="/works" className="btn btn_idxmore">
                                                    <span className="btn-text">返回理監事列表</span>
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
