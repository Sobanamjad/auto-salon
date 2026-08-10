import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

const peopleItems = [
    {
        href: 'https://0915536967.posu.tw/',
        img: '/asd_files/202209160957401422.png',
        imgW: 1024, imgH: 1024,
        name: '陳金漢',
        slogan: '用心只為您',
        text: '專注在開店、系統、網頁、媒體行銷',
        tag: '資訊供應服務',
        location: '台南市 中西區',
        callerLinks: null,
    },
    {
        href: 'https://0911958582.posu.tw/',
        img: '/asd_files/202210171049500347.png',
        imgW: 1024, imgH: 1024,
        name: '許芳榮',
        slogan: '西藥 / 醫療器材 / 優質保健食品',
        text: '西藥 / 醫療器材 / 優質保健食品',
        tag: '保健、營養',
        location: '台南市 永康區 永康里',
        callerLinks: null,
    },
    {
        href: 'https://0987600677.posu.tw/',
        img: '/asd_files/202303071049481286.jpg',
        imgW: 776, imgH: 1024,
        name: '王子銘',
        slogan: '泰勒斯數學教室',
        text: '泰勒斯數學教室-提升學生計算能力增進答題正確率',
        tag: '老師教練類',
        location: '台南市 中西區 赤嵌里',
        callerLinks: null,
    },
    {
        href: 'https://0982780377.posu.tw/',
        img: '/asd_files/202410221731556848.png',
        imgW: 1024, imgH: 768,
        name: '高莉甄',
        slogan: '五星好評:網路規劃師/高莉甄',
        text: '博識高科技為您出謀劃策專業規劃 公司官網/網路開店/雲端名片 程式設計/媒體平台/行銷廣告 20年的服務經驗',
        tag: '資訊供應服務',
        company: 'Google五星好評~架網站找高莉甄',
        location: '台南市 東區 富裕里',
        callerLinks: {
            book: 'https://book.52salon.com/20/545',
            netQueue: 'https://caller.posu.tw/20/267',
            currentNum: 'https://caller.posu.tw/10/267',
        },
    },
];

export default function People() {
    useForceLightMode();
    return (
        <>
            <Head>
                <title>夥伴介紹-永康國際同濟會</title>
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
                            src="/asd_files/202607101347517307.png"
                            alt="夥伴介紹"
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
                                            <span className="heading-text">夥伴介紹</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-夥伴介紹">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    <a href="/people" title="夥伴介紹">夥伴介紹</a>
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="container">
                                <div className="secbox_inner">

                                    {/* Empty category box (matches source) */}
                                    <div className="category_box">
                                        <ul className="category_list"></ul>
                                    </div>

                                    {/* Page title */}
                                    <div className="heading heading_main">
                                        <h1 className="heading-text">夥伴介紹</h1>
                                    </div>

                                    {/* People cards grid */}
                                    <ul className="row row-cols-2 row-cols-lg-3 row-cols-xl-4">
                                        {peopleItems.map((person, index) => (
                                            <li key={index}>
                                                <div className="card card_people effect_topslash fadeUp js-scroll">
                                                    <div className="row g-3">
                                                        <div>
                                                            <div className="card-photo">
                                                                <a href={person.href} target="_blank" rel="noopener noreferrer">
                                                                    <div className="item-fitimg">
                                                                        <img
                                                                            src={person.img}
                                                                            width={person.imgW}
                                                                            height={person.imgH}
                                                                            alt={person.name}
                                                                            loading="lazy"
                                                                            className="fitimg"
                                                                        />
                                                                    </div>
                                                                    <div className="card-mask"></div>
                                                                </a>
                                                            </div>
                                                            {person.callerLinks && (
                                                                <ul className="card-callerbar">
                                                                    <li><a href={person.callerLinks.book} target="_blank" rel="noopener noreferrer">預約</a></li>
                                                                    <li><a href={person.callerLinks.netQueue} target="_blank" rel="noopener noreferrer">網路取號</a></li>
                                                                    <li><a href={person.callerLinks.currentNum} target="_blank" rel="noopener noreferrer">目前號碼</a></li>
                                                                </ul>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="card-body">
                                                                <h3 className="card-name">
                                                                    <a href={person.href} target="_blank" rel="noopener noreferrer">
                                                                        <span className="card-name-text">{person.name}</span>
                                                                    </a>
                                                                </h3>
                                                                <div className="card-slogan">{person.slogan}</div>
                                                                <div className="card-text img-hidden text-limit limit-line-2">{person.text}</div>
                                                                <div className="card-infobar">
                                                                    <div className="card-info card-info_tag">
                                                                        <span className="iconsvg icon-tag"></span>
                                                                        <span className="card-info-text">{person.tag}</span>
                                                                    </div>
                                                                    {'company' in person && person.company && (
                                                                        <div className="card-info card-info_company">
                                                                            <span className="iconsvg icon-company"></span>
                                                                            <span className="card-info-text">{person.company}</span>
                                                                        </div>
                                                                    )}
                                                                    <div className="card-info card-info_location">
                                                                        <span className="iconsvg icon-address"></span>
                                                                        <span className="card-info-text">{person.location}</span>
                                                                    </div>
                                                                </div>
                                                                {person.callerLinks && (
                                                                    <ul className="card-callerbar">
                                                                        <li><a href={person.callerLinks.book} target="_blank" rel="noopener noreferrer">預約</a></li>
                                                                        <li><a href={person.callerLinks.netQueue} target="_blank" rel="noopener noreferrer">網路取號</a></li>
                                                                        <li><a href={person.callerLinks.currentNum} target="_blank" rel="noopener noreferrer">目前號碼</a></li>
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="hidden">
                                                            <div className="card-btnbar card-btnbar_outlink">
                                                                <a href={person.href} className="card-btn card-btn_outlink" target="_blank" rel="noopener noreferrer">
                                                                    <span className="card-btn-text">更多</span>
                                                                    <span className="iconsvg icon-outlink"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

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
