import { Fragment } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import {
    downloadCategories,
    downloadCategoryHref,
    getDownloadCategoryLabel,
    getDownloadPageItems,
    getDownloadTotal,
    getDownloadTotalPages,
    normalizeDownloadCsn,
} from '@/data/download-items';

type Props = {
    csn?: string | null;
    thisPage?: number;
};

export default function Download({ csn = null, thisPage = 1 }: Props) {
    useForceLightMode();

    const activeCsn = normalizeDownloadCsn(csn);
    const activeLabel = getDownloadCategoryLabel(activeCsn);
    const pageTitle =
        activeLabel === '全部' ? '永康國際同濟會' : `${activeLabel} - 永康國際同濟會`;
    const totalPages = getDownloadTotalPages(activeCsn);
    const totalItems = getDownloadTotal(activeCsn);
    const currentPage = totalPages > 0 ? Math.min(Math.max(thisPage, 1), totalPages) : 1;
    const items = getDownloadPageItems(activeCsn, currentPage);
    const nbsp = '\u00A0';

    const pageHref = (page: number) => {
        const params = new URLSearchParams();
        params.set('this_page', String(page));
        if (activeCsn) {
            params.set('new_csn', activeCsn);
        }

        return `/download?${params.toString()}`;
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
                                src="/asd_files/202607101329589894.png"
                                alt="公文與表單"
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
                                            <span className="heading-text">公文與表單</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-公文與表單">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/download" title="永康國際同濟會 - 公文與表單">
                                                        公文與表單
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
                                            {downloadCategories.map(category => (
                                                <li
                                                    key={category.label}
                                                    className={
                                                        (category.csn ?? null) === activeCsn ? 'active' : ''
                                                    }
                                                >
                                                    <a
                                                        href={downloadCategoryHref(category.csn)}
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

                                    {items.length === 0 ? (
                                        <div className="no-databox">
                                            <div className="no-data-text">== 無資料 ==</div>
                                        </div>
                                    ) : (
                                        <ul className="row cardlist_jsscroll">
                                            {items.map(item => (
                                                <li key={item.id}>
                                                    <div className="card card_download js-scroll">
                                                        <div className="row g-3 g-lg-4 align-center">
                                                            <div className="col-lg-10">
                                                                <div className="card-body">
                                                                    <h3 className="card-name">
                                                                        <span className="card-name-text">
                                                                            {item.title}
                                                                        </span>
                                                                    </h3>
                                                                    {item.descriptionHtml ? (
                                                                        <div
                                                                            className="card-text editor"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: item.descriptionHtml,
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div className="card-text editor"></div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2">
                                                                <div className="card-btnbar card-btnbar_download">
                                                                    <a
                                                                        href={item.fileHref}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="card-btn card-btn_download"
                                                                        title="永康國際同濟會 - 附檔下載"
                                                                    >
                                                                        <span className="iconsvg icon-download"></span>
                                                                        <span className="card-btn-text">
                                                                            附檔下載
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {totalItems > 0 && (
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
