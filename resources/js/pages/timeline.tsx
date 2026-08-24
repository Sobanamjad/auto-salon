import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

const timelineItems = [
    {
        year: '2025年',
        date: { year: '2025', month: '06', day: '23' },
        href: '/timeline_view?new_sn=2431',
        title: '永康國際同濟會授證典禮',
        img: '/asd_files/s2026072216383320.jpg',
        imgW: 1024, imgH: 575,
        text: '同濟會（Kiwanis）作為國際四大服務性社團之一，始終以「照顧兒童，第一優先」為使命',
    },
    {
        year: '2024年',
        date: { year: '2024', month: '04', day: '14' },
        href: '/timeline_view?new_sn=2418',
        title: '國際同濟會永康分會正式成立',
        img: '/asd_files/s2026072211321470.jpg',
        imgW: 1024, imgH: 406,
        text: '黃偉哲：與市府攜手關懷弱勢',
    },
];

const categoryYears = [
    { label: '2025年', csn: '538' },
    { label: '2024年', csn: '539' },
];

type Props = {
    csn?: string;
};

export default function Timeline({ csn }: Props) {
    useForceLightMode();

    const filtered = csn
        ? timelineItems.filter(item => {
            if (csn === '538') return item.date.year === '2025';
            if (csn === '539') return item.date.year === '2024';
            return true;
        })
        : timelineItems;

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
                                                    本會簡史
                                                </li>
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

                                    {/* Timeline items */}
                                    <div className="timeline-event">
                                        <div className="timeline-area">
                                            {filtered.map((item, index) => (
                                                <div key={index}>
                                                    <div className="timeline-year fadeUp js-scroll">
                                                        <span className="timeline-year-text">{item.year}</span>
                                                    </div>
                                                    <div className="timeline-box js-scroll">
                                                        <div className="card card_timeline">
                                                            <div className="card_row">
                                                                <div className="card-one">
                                                                    <div className="card-photo">
                                                                        <a href={item.href} title={item.title}>
                                                                            <img
                                                                                src={item.img}
                                                                                width={item.imgW}
                                                                                height={item.imgH}
                                                                                alt={item.title}
                                                                                loading="lazy"
                                                                            />
                                                                        </a>
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
                                                                                <h3 className="card-name">
                                                                                    
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
                                                                            <a href={item.href} title={item.title} className="card-btn card-btn_readmore">
                                                                                <span className="card-btn-text">繼續閱讀</span>
                                                                                <span className="iconsvg icon-read-more"></span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
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
