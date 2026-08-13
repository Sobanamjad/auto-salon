import { Fragment } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import {
    articleCategories,
    articleCategoryHref,
    articleViewHref,
    getArticleCategoryLabel,
    getArticlePageItems,
    getArticleTotal,
    getArticleTotalPages,
    normalizeArticleCsn,
} from '@/data/article-items';

type Props = {
    csn?: string | null;
    thisPage?: number;
};

export default function Article({ csn = null, thisPage = 1 }: Props) {
    useForceLightMode();

    const activeCsn = normalizeArticleCsn(csn);
    const activeLabel = getArticleCategoryLabel(activeCsn);
    const pageTitle =
        activeLabel === '全部' ? '永康國際同濟會' : `${activeLabel} - 永康國際同濟會`;
    const totalPages = getArticleTotalPages(activeCsn);
    const totalItems = getArticleTotal(activeCsn);
    const currentPage = Math.min(Math.max(thisPage, 1), totalPages);
    const items = getArticlePageItems(activeCsn, currentPage);
    const nbsp = '\u00A0';

    const pageHref = (page: number) => {
        const params = new URLSearchParams();
        params.set('this_page', String(page));
        if (activeCsn) {
            params.set('new_csn', activeCsn);
        }

        return `/article?${params.toString()}`;
    };

    return (
        <>
            <Head>
                <title>{`${pageTitle}`}</title>
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
                                src="/asd_files/202607101333433810.png"
                                alt="專欄園地"
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
                                            <span className="heading-text">專欄園地</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-專欄園地">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/article" title="永康國際同濟會 - 專欄園地">
                                                        專欄園地
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
                                    <div className="category_box">
                                        <ul className="category_list">
                                            {articleCategories.map(category => (
                                                <li
                                                    key={category.label}
                                                    className={
                                                        (category.csn ?? null) === activeCsn ? 'active' : ''
                                                    }
                                                >
                                                    <a
                                                        href={articleCategoryHref(category.csn)}
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

                                    <ul className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                                        {items.map(article => {
                                            const href = articleViewHref(article.sn);

                                            return (
                                                <li key={article.sn}>
                                                    <div className="card card_article fadeUp js-scroll">
                                                        <div className="row g-3">
                                                            <div>
                                                                <div className="card-photo">
                                                                    <a
                                                                        href={href}
                                                                        title={`${article.title}-永康國際同濟會`}
                                                                    >
                                                                        <div className="item-fitimg">
                                                                            <img
                                                                                src={article.img}
                                                                                alt={article.title}
                                                                                width={article.imgW}
                                                                                height={article.imgH}
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
                                                                        <a href={href} title={article.title}>
                                                                            <span className="card-name-text">
                                                                                {article.title}
                                                                            </span>
                                                                        </a>
                                                                    </h3>
                                                                    <div className="card-text img-hidden hidden xl-text-limit limit-line-2">
                                                                        {article.summary}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="hidden">
                                                                <div className="card-btnbar card-btnbar_more">
                                                                    <a
                                                                        href={href}
                                                                        className="card-btn card-btn_more"
                                                                        title={article.title}
                                                                    >
                                                                        <span className="card-btn-text">更多</span>
                                                                        <span className="iconsvg icon-view-more"></span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <div className="page">
                                        <Link href={pageHref(1)} preserveScroll={false}>
                                            首頁
                                        </Link>
                                        {nbsp}
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <Fragment key={page}>
                                                {page === currentPage ? (
                                                    <span>{page}</span>
                                                ) : (
                                                    <Link href={pageHref(page)} preserveScroll={false}>
                                                        {page}
                                                    </Link>
                                                )}
                                                {nbsp}
                                            </Fragment>
                                        ))}
                                        <Link href={pageHref(totalPages)} preserveScroll={false}>
                                            末頁
                                        </Link>
                                        <br />
                                        <br />
                                        Total {totalItems} - {currentPage} / {totalPages}
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
