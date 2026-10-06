import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

interface TimelineItem {
    id: number;
    title: string;
    category: string;
    event_date: string | null;
    brief: string | null;
    content: string | null;
    video: string | null;
    img: string | null;
    img_w: number | null;
    img_h: number | null;
    has_photo: boolean;
    views: number;
}

interface Category {
    csn: string | null;
    label: string;
}

type Props = {
    csn?: string;
    newSn?: string;
    timelines: TimelineItem[];
    categories: Category[];
};

export default function Timeline({ csn, newSn, timelines = [], categories = [] }: Props) {
    useForceLightMode();

    // Filter timelines by category (csn is now the category string directly e.g. "2026年")
    const filtered = csn
        ? timelines.filter(item => item.category === csn)
        : timelines;

    // Find selected item by id
    const selectedItem = newSn ? timelines.find(item => item.id === parseInt(newSn)) : null;

    return (
        <>
            <Head>
                <title>本會簡史-永康國際同濟會</title>
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
                            src="/asd_files/202607101304116189.png"
                            alt="本會簡史"
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
                                            <span className="heading-text">本會簡史</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-本會簡史">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item" aria-current="page">
                                                    {selectedItem ? (
                                                        <a href="/timeline" title="本會簡史">本會簡史</a>
                                                    ) : (
                                                        '本會簡史'
                                                    )}
                                                </li>
                                                {selectedItem && (
                                                    <li className="breadcrumb-item active" aria-current="page">
                                                        {selectedItem.title}
                                                    </li>
                                                )}
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="container">
                                <div className="secbox_inner">

                                    {/* Year filter dropdown */}
                                    <div className="cateselect">
                                        <div className="cateselect_row">
                                            <label htmlFor="cateselect" className="form-label">分類：</label>
                                            <select
                                                id="cateselect"
                                                className="form-select"
                                                value={csn ?? ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    window.location.href = val
                                                        ? `/timeline?new_csn=${encodeURIComponent(val)}`
                                                        : '/timeline';
                                                }}
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat.csn || 'all'} value={cat.csn || ''}>
                                                        {cat.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Page title */}
                                    <div className="heading heading_main">
                                        <h1 className="heading-text">本會簡史</h1>
                                    </div>

                                    {/* Timeline items or Detail view */}
                                    {selectedItem ? (
                                        <div className="view-column">
                                            <div className="heading heading_pageview">
                                                <h1 className="heading-text">{selectedItem.title}</h1>
                                                <div className="info info_view_date">
                                                    {selectedItem.event_date || ''}
                                                </div>
                                            </div>

                                            <div className="detailbox editor">
                                                {selectedItem.brief && (
                                                    <p style={{ textAlign: 'left' }}>{selectedItem.brief}</p>
                                                )}
                                                {selectedItem.content && (
                                                    <div dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
                                                )}
                                                {selectedItem.video && (
                                                    <p style={{ textAlign: 'center' }}>
                                                        <div dangerouslySetInnerHTML={{ __html: selectedItem.video }} />
                                                    </p>
                                                )}
                                            </div>

                                            {/* Photo gallery */}
                                            {selectedItem.img && (
                                                <div className="figurebox">
                                                    <div className="heading heading_figure">
                                                        <h2 className="heading-text">Photo</h2>
                                                    </div>

                                                    <div className="figurebox_inner">
                                                        <ul className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 justify-center">
                                                            <li>
                                                                <div className="card card_figure">
                                                                    <div className="card-photo">
                                                                        <a href={selectedItem.img} className="fancybox-zoom" data-fancybox="gallery-demo" data-caption="" data-thumb={selectedItem.img} title={` - 永康國際同濟會`}>
                                                                            <div className="item-fitimg">
                                                                                <img
                                                                                    src={selectedItem.img}
                                                                                    alt=""
                                                                                    loading="lazy"
                                                                                    width={selectedItem.img_w || 1024}
                                                                                    height={selectedItem.img_h || 576}
                                                                                    className="fitimg"
                                                                                />
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                    <div className="card-text"></div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mainbtm">
                                                <div className="btnbar btnbar_pageback">
                                                    <a href="/timeline" className="btn btn-pageback" title="返回列表-本會簡史">
                                                        <span className="iconsvg icon-pageback"></span>
                                                        <span className="btn-text">返回列表</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="timeline-event">
                                            <div className="timeline-area">
                                                {filtered.map((item) => {
                                                    const year  = item.event_date ? item.event_date.substring(0, 4) : '';
                                                    const month = item.event_date ? item.event_date.substring(5, 7) : '';
                                                    const day   = item.event_date ? item.event_date.substring(8, 10) : '';
                                                    const viewHref = `/timeline?new_sn=${item.id}`;

                                                    return (
                                                        <>
                                                            {/* Year label — exactly matching reference HTML structure */}
                                                            <div key={`year-${item.id}`} className="timeline-year fadeUp js-scroll">
                                                                <span className="timeline-year-text">{item.category || `${year}年`}</span>
                                                            </div>

                                                            {/* Timeline card */}
                                                            <div key={item.id} className="timeline-box js-scroll">
                                                                <div className="card card_timeline">
                                                                    <div className="card_row">

                                                                        {/* card-one: photo */}
                                                                        <div className="card-one">
                                                                            <div className="card-photo">
                                                                                <a href={viewHref} title={item.title}>
                                                                                    {item.img ? (
                                                                                        <img
                                                                                            src={item.img}
                                                                                            width={item.img_w || 1024}
                                                                                            height={item.img_h || 576}
                                                                                            alt={item.title}
                                                                                            loading="lazy"
                                                                                        />
                                                                                    ) : (
                                                                                        <div style={{ width: '100%', paddingBottom: '56%', background: '#f0f0f0' }} />
                                                                                    )}
                                                                                </a>
                                                                            </div>
                                                                        </div>

                                                                        {/* card-two: date + title + brief */}
                                                                        <div className="card-two">
                                                                            <div className="card-header">
                                                                                <div className="header_row">
                                                                                    <div className="header-one">
                                                                                        <div className="card-date-box">
                                                                                            <div className="card-date-item">
                                                                                                <span className="card-date day">{day}</span>
                                                                                                <span className="card-date year">{year}</span>
                                                                                                <span className="card-date month">{month}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="header-two">
                                                                                        <h3 className="card-name">
                                                                                            <a href={viewHref} title={item.title}>
                                                                                                <span className="card-name-text">{item.title}</span>
                                                                                            </a>
                                                                                        </h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <div className="card-text img-hidden text-limit limit-line-3">
                                                                                    {item.brief || ''}
                                                                                </div>
                                                                            </div>
                                                                            <div className="hidden">
                                                                                <div className="card-btnbar card-btnbar_readmore">
                                                                                    <a href={viewHref} title={item.title} className="card-btn card-btn_readmore">
                                                                                        <span className="card-btn-text">繼續閱讀</span>
                                                                                        <span className="iconsvg icon-read-more"></span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                })}
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
