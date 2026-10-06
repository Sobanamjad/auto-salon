import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import ScrollAnimate from '@/components/scroll-animate';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

interface AnnouncementCategory {
    csn: string | null;
    label: string;
    param: string | null;
}

interface AnnouncementItem {
    id: number;
    subject: string;
    category: string | null;
    photo: string | null;
    photo_w: number | null;
    photo_h: number | null;
    external_link: string | null;
    event_status: string | null;
    published_date: string | null;
    end_date: string | null;
}

type Props = {
    new_csn?: string | null;
    sel_nncsn?: string | null;
    announcements: AnnouncementItem[];
    categories: AnnouncementCategory[];
};

const STATUS_ICON = '/announcement_files/time.png';

export default function Announcement({
    new_csn = null,
    sel_nncsn = null,
    announcements = [],
    categories = [],
}: Props) {
    useForceLightMode();

    const activeCsn   = new_csn || sel_nncsn || null;
    const activeParam = new_csn ? 'new_csn' : sel_nncsn ? 'sel_nncsn' : null;

    // Active label from categories prop
    const activeLabel = (() => {
        if (!activeCsn) {
return '全部';
}

        const cat = categories.find(c => c.csn === activeCsn && c.param === activeParam);

        return cat?.label ?? '全部';
    })();

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
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/announcement" title="永康國際同濟會 - 活動資訊">活動資訊</a>
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

                                    {/* Category buttons */}
                                    <div className="category_box">
                                        <ul className="category_list">
                                            {categories.map(category => {
                                                let href = '/announcement';

                                                if (category.csn && category.param) {
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

                                    {/* Announcement cards — DB se */}
                                    <ul className="row cardlist_jsscroll">
                                        {announcements.length === 0 ? (
                                            <li style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
                                                暫無活動資訊
                                            </li>
                                        ) : (
                                            announcements.map(item => {
                                                const link = item.external_link ?? '#';
                                                const isExternal = !!item.external_link;
                                                const status = item.event_status ?? '報名期間';

                                                return (
                                                    <li key={item.id}>
                                                        <ScrollAnimate animation="fadeUp">
                                                            <div className="card card_activity effect_dec_hz">
                                                                <div className="row g-3 g-lg-4 align-lg-center">

                                                                    {/* Status badge */}
                                                                    <div className="col-sm-2">
                                                                        <div className="card-status">
                                                                            <span className="card-status-icon">
                                                                                <img
                                                                                    src={STATUS_ICON}
                                                                                    alt={status}
                                                                                    width={19}
                                                                                    height={19}
                                                                                    style={{ verticalAlign: 'middle' }}
                                                                                />
                                                                            </span>
                                                                            <span className="card-status-text"> {status}</span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Photo */}
                                                                    <div className="col-sm-3 col-lg-2">
                                                                        <div className="card-photo">
                                                                            <a
                                                                                href={link}
                                                                                title={item.subject}
                                                                                target={isExternal ? '_blank' : undefined}
                                                                                rel={isExternal ? 'noopener noreferrer' : undefined}
                                                                            >
                                                                                <div className="item-fitimg">
                                                                                    {item.photo ? (
                                                                                        <img
                                                                                            src={item.photo}
                                                                                            alt={item.subject}
                                                                                            width={item.photo_w ?? undefined}
                                                                                            height={item.photo_h ?? undefined}
                                                                                            loading="lazy"
                                                                                            className="fitimg"
                                                                                        />
                                                                                    ) : (
                                                                                        <div style={{ width: '100%', paddingBottom: '80%', background: '#f0f0f0' }} />
                                                                                    )}
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                    {/* Title */}
                                                                    <div className="col-sm-7 col-lg-6">
                                                                        <div className="card-body">
                                                                            <h3 className="card-name">
                                                                                <a
                                                                                    href={link}
                                                                                    title={item.subject}
                                                                                    target={isExternal ? '_blank' : undefined}
                                                                                    rel={isExternal ? 'noopener noreferrer' : undefined}
                                                                                >
                                                                                    <span className="card-name-text">
                                                                                        {item.subject}
                                                                                    </span>
                                                                                </a>
                                                                            </h3>
                                                                            <ul className="card-infolist"></ul>
                                                                        </div>
                                                                    </div>

                                                                    {/* More button */}
                                                                    <div className="col-lg-2">
                                                                        <div className="card-btnbar card-btnbar_more">
                                                                            <a
                                                                                href={link}
                                                                                className="card-btn card-btn_more"
                                                                                title={item.subject}
                                                                                target={isExternal ? '_blank' : undefined}
                                                                                rel={isExternal ? 'noopener noreferrer' : undefined}
                                                                            >
                                                                                <span className="card-btn-text">更多</span>
                                                                                <span className="iconsvg icon-view-more"></span>
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </ScrollAnimate>
                                                    </li>
                                                );
                                            })
                                        )}
                                    </ul>

                                    <div className="page">
                                        <a href="/announcement">首頁</a>
                                        {'\u00A0'}
                                        <span>1</span>
                                        {'\u00A0'}
                                        <a href="/announcement">末頁</a>
                                        <br /><br />
                                        Total {announcements.length} - 1 / 1<br />
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
