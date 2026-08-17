import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import {
    filterWorksItems,
    getWorksCategoryLabel,
    worksCategories,
    worksItemHref,
} from '@/data/works-items';

type Props = {
    csn?: string | null;
    searchTitle?: string | null;
};

export default function Works({ csn = null, searchTitle = null }: Props) {
    useForceLightMode();

    const activeCsn = csn ?? null;
    const activeLabel = getWorksCategoryLabel(activeCsn);
    const items = filterWorksItems(activeCsn, searchTitle);

    return (
        <>
            <Head>
                <title>理監事(組織)-永康國際同濟會</title>
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
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-理監事(組織)">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/works" title="永康國際同濟會 - 理監事(組織)">
                                                        理監事(組織)
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

                                    <div className="heading heading_main">
                                        <h1 className="heading-text">{activeLabel}</h1>
                                    </div>

                                    <div className="main-columns-wrap">

                                        {/* Sidebar: search + category filter */}
                                        <div className="main-columns-left">
                                            <div className="searchbar">
                                                <div className="search">
                                                    <form
                                                        name="form1"
                                                        method="get"
                                                        action="/works"
                                                        role="search"
                                                    >
                                                        <input type="hidden" name="this_page" value="1" />
                                                        <input
                                                            type="text"
                                                            className="search-input"
                                                            name="sel_title"
                                                            defaultValue={searchTitle ?? ''}
                                                            placeholder="搜尋..."
                                                        />
                                                        <button type="submit" className="search-btn" title="搜尋">
                                                            <img src="/asd_files/icon-search.png" width={20} alt="搜尋" />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>

                                            <ul className="jsmtree pdmenu">
                                                {worksCategories.map(category => (
                                                    <li
                                                        key={category.label}
                                                        className={
                                                            `cate-item ${(category.csn ?? null) === activeCsn ? 'active' : ''}`
                                                        }
                                                    >
                                                        <a
                                                            href={
                                                                category.csn
                                                                    ? `/works?new_csn=${category.csn}`
                                                                    : '/works'
                                                            }
                                                            title={category.label}
                                                            className={
                                                                (category.csn ?? null) === activeCsn ? 'is-current' : ''
                                                            }
                                                        >
                                                            <span className="cate-text">{category.label}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Main content: cards */}
                                        <div className="main-columns-right">
                                            <ul className="row row-cols-sm-2 row-cols-lg-3">
                                                {items.map(member => (
                                                    <li key={member.sn}>
                                                        <div className="card card_works effect_dec_vt fadeUp js-scroll">
                                                            <div className="row g-3">
                                                                <div>
                                                                    <div className="card-photo">
                                                                        <a href={worksItemHref(member.sn)} title={member.title}>
                                                                            <div className="item-fitimg" style={{ paddingBottom: '132%' }}>
                                                                                <img
                                                                                    src={member.img}
                                                                                    alt={member.title}
                                                                                    width={member.imgW}
                                                                                    height={member.imgH}
                                                                                    loading="lazy"
                                                                                    className="fitimg"
                                                                                />
                                                                            </div>
                                                                            <div className="card-mask"></div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="card-body">
                                                                        <h3 className="card-name">
                                                                            <a href={worksItemHref(member.sn)} title={member.title}>
                                                                                <span className="card-name-text">
                                                                                    {member.title}
                                                                                </span>
                                                                            </a>
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="card-btnbar card-btnbar_more">
                                                                        <a
                                                                            href={worksItemHref(member.sn)}
                                                                            className="card-btn card-btn_more"
                                                                            title={member.title}
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
                                                <span>1</span>
                                                <br />
                                                <br />
                                                Total {items.length} - 1 / 1
                                                <br />
                                            </div>
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
