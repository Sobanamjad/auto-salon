import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import {
    filterAnnouncementItems,
    getAnnouncementCategoryLabel,
    announcementCategories,
} from '@/data/announcement-items';

type Props = {
    new_csn?: string | null;
    sel_nncsn?: string | null;
    searchTitle?: string | null;
};

export default function Announcement({ new_csn = null, sel_nncsn = null, searchTitle = null }: Props) {
    useForceLightMode();

    // Determine active category and parameter type
    const activeCsn = new_csn || sel_nncsn || null;
    const activeParam = new_csn ? 'new_csn' : sel_nncsn ? 'sel_nncsn' : null;
    const activeLabel = getAnnouncementCategoryLabel(activeCsn, activeParam);
    const items = filterAnnouncementItems(activeCsn, activeParam, searchTitle);

    return (
        <>
            <Head>
                <title>活動資訊-永康國際同濟會</title>
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
                                src="/announcement_files/202607101320167061.png"
                                alt="活動資訊"
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
                                            <span className="heading-text">活動資訊</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-活動資訊">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/announcement" title="永康國際同濟會 - 活動資訊">
                                                        活動資訊
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
                                            {announcementCategories.map(category => {
                                                let href = '/announcement';
                                                if (category.csn) {
                                                    href += `?${category.param}=${category.csn}`;
                                                }
                                                const isActive = (category.csn ?? null) === activeCsn;
                                                
                                                return (
                                                    <li key={category.label} className={isActive ? 'active' : ''}>
                                                        <a href={href} title={category.label}>
                                                            <span className="cate-text">{category.label}</span>
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                    <div className="heading heading_main">
                                        <h1 className="heading-text">{activeLabel}</h1>
                                    </div>

                                    {/* Announcement cards */}
                                    <ul className="row cardlist_jsscroll">
                                        {items.map(item => (
                                            <li key={item.sn}>
                                                <div className="card card_activity effect_dec_hz js-scroll">
                                                    <div className="row g-3 g-lg-4 align-lg-center">
                                                        <div className="col-sm-2">
                                                            <div className="card-status">
                                                                <span className="card-status-icon">
                                                                    <img
                                                                        src={item.statusIcon}
                                                                        alt={item.status}
                                                                        width={19}
                                                                        height={19}
                                                                        style={{ verticalAlign: 'middle' }}
                                                                    />
                                                                </span>
                                                                <span className="card-status-text"> {item.status}</span>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-3 col-lg-2">
                                                            <div className="card-photo">
                                                                <a
                                                                    href={item.link}
                                                                    title={item.title}
                                                                    target={item.isExternal ? '_blank' : undefined}
                                                                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                                                                >
                                                                    <div className="item-fitimg">
                                                                        <img
                                                                            src={item.photo}
                                                                            alt={item.title}
                                                                            width={item.photoW}
                                                                            height={item.photoH}
                                                                            loading="lazy"
                                                                            className="fitimg"
                                                                        />
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-7 col-lg-6">
                                                            <div className="card-body">
                                                                <h3 className="card-name">
                                                                    <a
                                                                        href={item.link}
                                                                        title={item.title}
                                                                        target={item.isExternal ? '_blank' : undefined}
                                                                        rel={item.isExternal ? 'noopener noreferrer' : undefined}
                                                                    >
                                                                        <span className="card-name-text">
                                                                            {item.title}
                                                                        </span>
                                                                    </a>
                                                                </h3>
                                                                <ul className="card-infolist"></ul>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-2">
                                                            <div className="card-btnbar card-btnbar_more">
                                                                <a
                                                                    href={item.link}
                                                                    className="card-btn card-btn_more"
                                                                    title={item.title}
                                                                    target={item.isExternal ? '_blank' : undefined}
                                                                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                                                                >
                                                                    <span className="card-btn-text">更多</span>
                                                                    <span className="iconsvg icon-view-more"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="page">
                                        <a href="/announcement" target="_self">首頁</a>
                                        {'\u00A0'}
                                        <span>1</span>
                                        {'\u00A0'}
                                        <a href="/announcement">末頁</a>
                                        <br />
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
