import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

const timelineItems = [
    {
        id: '2431',
        year: '2025年',
        date: { year: '2025', month: '06', day: '23' },
        href: '/timeline?new_sn=2431',
        title: '永康國際同濟會授證典禮',
        img: '/asd_files/s2026072216383320.jpg',
        imgW: 1024, imgH: 575,
        text: '同濟會（Kiwanis）作為國際四大服務性社團之一，始終以「照顧兒童，第一優先」為使命。永康國際同濟會 隆重舉行授證典禮，代表著這支充滿熱忱與奉獻精神的團隊，正式邁向全新的里程碑。從深耕在地社區急難救助，到關懷偏鄉兒童與弱勢族群，永康同濟會凝結團結的力量，用行動實踐同濟精神。今晚，我們懷抱感恩的心，誠摯邀請各界領導與貴賓齊聚一堂，見證這份榮耀與責任的交接，攜手為社會注入更多正向循環的善能！',
    },
    {
        id: '2418',
        year: '2024年',
        date: { year: '2024', month: '04', day: '14' },
        href: '/timeline?new_sn=2418',
        title: '國際同濟會永康分會正式成立',
        img: '/asd_files/s2026072211321470.jpg',
        imgW: 1024, imgH: 406,
        text: '【創新聞 記者陳聖璋／台南報導】國際同濟會台灣總會澎嘉南區永康國際會創會授證典禮日前於台糖長榮酒店舉行，台南市長黃偉哲親自出席祝賀該會創會長張志豪，並與美國世界總會長Katrina J. Baranko女士及各國同濟會總會長交流。黃偉哲期許該會善盡社會責任，與市府攜手共同關懷弱勢、照顧兒童，讓台南市成為充滿溫馨、祥和及善行的幸福宜居城市。',
    },
];

const categoryYears = [
    { label: '2025年', csn: '538' },
    { label: '2024年', csn: '539' },
];

type Props = {
    csn?: string;
    newSn?: string;
};

export default function Timeline({ csn, newSn }: Props) {
    useForceLightMode();

    const filtered = csn
        ? timelineItems.filter(item => {
            if (csn === '538') return item.date.year === '2025';

            if (csn === '539') return item.date.year === '2024';

            return true;
        })
        : timelineItems;

    const selectedItem = newSn ? timelineItems.find(item => item.id === newSn) : null;

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
                                                        ? `/timeline?new_csn=${val}`
                                                        : '/timeline';
                                                }}
                                            >
                                                <option value="">請選擇</option>
                                                {categoryYears.map(y => (
                                                    <option key={y.csn} value={y.csn}>{y.label}</option>
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
                                                    {selectedItem.date.year}-{selectedItem.date.month}-{selectedItem.date.day}
                                                </div> 
                                            </div>
                                            
                                            <div className="detailbox editor">
                                                {selectedItem.id === '2431' && (
                                                    <>
                                                        <p style={{ textAlign: 'left' }}>同濟會（Kiwanis）作為國際四大服務性社團之一，始終以「照顧兒童，第一優先」為使命。永康國際同濟會 隆重舉行授證典禮，代表著這支充滿熱忱與奉獻精神的團隊，正式邁向全新的里程碑。從深耕在地社區急難救助，到關懷偏鄉兒童與弱勢族群，永康同濟會凝結團結的力量，用行動實踐同濟精神。今晚，我們懷抱感恩的心，誠摯邀請各界領導與貴賓齊聚一堂，見證這份榮耀與責任的交接，攜手為社會注入更多正向循環的善能！</p>
                                                        <p style={{ textAlign: 'left' }}>&nbsp;</p>
                                                        <p style={{ textAlign: 'center' }}>
                                                            <img src="/asd_files/1784709489_0.jpg" alt="" width="600" />
                                                        </p>
                                                        <p style={{ textAlign: 'center' }}>
                                                            <img src="/asd_files/1784709502_0.jpg" alt="" width="600" />
                                                        </p>
                                                        <p style={{ textAlign: 'center' }}>
                                                            <iframe 
                                                                title="YouTube video player" 
                                                                src="https://www.youtube.com/embed/yzWB6_7I6jg?si=YvNXvAasXl_qPe9I" 
                                                                width="560" 
                                                                height="315" 
                                                                frameBorder="0" 
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                                allowFullScreen={true}
                                                                referrerPolicy="strict-origin-when-cross-origin"
                                                            />
                                                        </p>
                                                    </>
                                                )}
                                                {selectedItem.id === '2418' && (
                                                    <>
                                                        <p style={{ textAlign: 'left' }}>【創新聞 記者陳聖璋／台南報導】國際同濟會台灣總會澎嘉南區永康國際會創會授證典禮日前於台糖長榮酒店舉行，台南市長黃偉哲親自出席祝賀該會創會長張志豪，並與美國世界總會長Katrina J. Baranko女士及各國同濟會總會長交流。黃偉哲期許該會善盡社會責任，與市府攜手共同關懷弱勢、照顧兒童，讓台南市成為充滿溫馨、祥和及善行的幸福宜居城市。</p>
                                                        <p style={{ textAlign: 'center' }}>
                                                            <img src="/asd_files/1784691122_0.jpg" alt="" width="1000" />
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            
                                            {/* Photo gallery */}
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
                                                                                width={selectedItem.imgW} 
                                                                                height={selectedItem.imgH}
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
                                                {filtered.map((item, index) => (
                                                    <div key={index}>
                                                        <div className="timeline-year fadeUp js-scroll">
                                                            <span className="timeline-year-text">{item.year}</span>
                                                        </div>
                                                        <div className="timeline-box js-scroll">
                                                            <a href={item.href} title={item.title} className="card card_timeline">
                                                                <div className="card_row">
                                                                    <div className="card-one">
                                                                        <div className="card-photo">
                                                                            <img
                                                                                src={item.img}
                                                                                width={item.imgW}
                                                                                height={item.imgH}
                                                                                alt={item.title}
                                                                                loading="lazy"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-two">
                                                                        <div className="card-header">
                                                                            <div className="header_row">
                                                                                <div className="header-one">
                                                                                    <div className="card-date-box">
                                                                                        <div className="card-date-item">
                                                                                            <span className="card-date year">{item.date.year}</span>
                                                                                            <span className="card-date month">{item.date.month}</span>
                                                                                            <span className="card-date day">{item.date.day}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="header-two">
                                                                                    <h3 className="card-name" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                                                                                        {item.title}
                                                                                    </h3>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <div className="card-text img-hidden text-limit limit-line-3">
                                                                                {item.text}
                                                                            </div>
                                                                        </div>
                                                                        <div className="hidden">
                                                                            <div className="card-btnbar card-btnbar_readmore">
                                                                                <span className="card-btn card-btn_readmore">
                                                                                    <span className="card-btn-text">繼續閱讀</span>
                                                                                    <span className="iconsvg icon-read-more"></span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))}
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
