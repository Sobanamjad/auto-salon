import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import {
    filterLinkItems,
    getLinkCategoryLabel,
    linkCategories,
} from '@/data/link-items';

type Props = {
    csn?: string | null;
};

export default function Link({ csn = null }: Props) {
    useForceLightMode();

    const activeCsn = csn ?? null;
    const activeLabel = getLinkCategoryLabel(activeCsn);
    const items = filterLinkItems(activeCsn);

    return (
        <>
            <Head>
                <title>相關連結-永康國際同濟會</title>
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
                                src="/asd_files/202607101321278010.png"
                                alt="相關連結"
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
                                            <span className="heading-text">相關連結</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-相關連結">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">相關連結</li>
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
                                    <div className="category_box">
                                        <ul className="category_list">
                                            {linkCategories.map(category => (
                                                <li
                                                    key={category.label}
                                                    className={
                                                        (category.csn ?? null) === activeCsn ? 'active' : ''
                                                    }
                                                >
                                                    <a
                                                        href={
                                                            category.csn
                                                                ? `/link?new_csn=${category.csn}`
                                                                : '/link'
                                                        }
                                                        title={category.label}
                                                    >
                                                        <span className="cate-text">{category.label}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="heading heading_main">
                                        <h1 className="heading-text">{activeLabel}</h1>
                                    </div>

                                    <ul className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                                        {items.map(link => (
                                            <li key={link.title}>
                                                <div className="card card_link effect_topslash fadeUp js-scroll">
                                                    <div className="row g-3">
                                                        <div>
                                                            <div className="card-photo">
                                                                <a
                                                                    href={link.href}
                                                                    title={link.title}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <div className="item-fitimg">
                                                                        <img
                                                                            src={link.img}
                                                                            alt={link.title}
                                                                            width={link.imgW}
                                                                            height={link.imgH}
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
                                                                    <a
                                                                        href={link.href}
                                                                        title={link.title}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <span className="card-name-text">
                                                                            {link.title}
                                                                        </span>
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div className="hidden">
                                                            <div className="card-btnbar card-btnbar_outlink">
                                                                <a
                                                                    href={link.href}
                                                                    className="card-btn card-btn_outlink"
                                                                    title={link.title}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
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

                                    <div className="page">
                                        <span>1</span>
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
