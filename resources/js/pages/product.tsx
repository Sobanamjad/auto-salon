import { Fragment } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import {
    DEFAULT_PRODUCT_CSN,
    getProductCategoryLabel,
    getProductPageItems,
    getProductTotal,
    getProductTotalPages,
    productCategories,
    productCategoryHref,
    productViewHref,
    type ProductCategory,
} from '@/data/product-items';

type Props = {
    csn?: string;
    upSn?: string;
    thisPage?: number;
    searchTitle?: string | null;
};

export default function Product({
    csn = DEFAULT_PRODUCT_CSN,
    upSn = '0',
    thisPage = 1,
    searchTitle = null,
}: Props) {
    useForceLightMode();

    const activeCsn = (csn as ProductCategory) || DEFAULT_PRODUCT_CSN;
    const categoryLabel = getProductCategoryLabel(activeCsn);
    const totalPages = getProductTotalPages(activeCsn, searchTitle);
    const totalItems = getProductTotal(activeCsn, searchTitle);
    const currentPage = Math.min(Math.max(thisPage, 1), totalPages);
    const items = getProductPageItems(activeCsn, currentPage, searchTitle);
    const nbsp = '\u00A0';

    const pageHref = (page: number) => {
        const params = new URLSearchParams();
        params.set('new_csn', activeCsn);
        params.set('up_sn', upSn);
        params.set('this_page', String(page));
        if (searchTitle?.trim()) {
            params.set('sel_title', searchTitle.trim());
        }

        return `/product?${params.toString()}`;
    };

    return (
        <>
            <Head>
                <title>{`${categoryLabel} - 永康國際同濟會`}</title>
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
                                src="/asd_files/202607101346579839.png"
                                alt="會員商品"
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
                                            <span className="heading-text">會員商品</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-會員商品">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/product" title="永康國際同濟會 - 會員商品">
                                                        會員商品
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {categoryLabel}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="secbox_inner">
                                    <div className="heading heading_main">
                                        <h1 className="heading-text">{categoryLabel}</h1>
                                    </div>

                                    <div className="main-columns-wrap">
                                        <div className="main-columns-left">
                                            <div className="searchbar">
                                                <div className="search">
                                                    <form
                                                        name="form1"
                                                        method="get"
                                                        action="/product"
                                                        role="search"
                                                    >
                                                        <input type="hidden" name="new_csn" value={activeCsn} />
                                                        <input type="hidden" name="up_sn" value={upSn} />
                                                        <input type="hidden" name="this_page" value="1" />
                                                        <input
                                                            type="text"
                                                            className="search-input"
                                                            name="sel_title"
                                                            defaultValue={searchTitle ?? ''}
                                                            placeholder="搜尋..."
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="search-btn"
                                                            title="搜尋"
                                                        >
                                                            <img
                                                                src="/asd_files/icon-search.png"
                                                                alt=""
                                                                width={25}
                                                            />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>

                                            <ul className="jsmtree pdmenu">
                                                {productCategories.map(category => (
                                                    <li
                                                        key={category.csn}
                                                        className={category.csn === activeCsn ? 'active' : ''}
                                                    >
                                                        <a
                                                            href={productCategoryHref(category.csn, upSn)}
                                                            className={
                                                                category.csn === activeCsn ? 'is-current' : ''
                                                            }
                                                        >
                                                            {category.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="main-columns-right">
                                            <ul className="row row-cols-2 row-cols-lg-3">
                                                {items.map(product => {
                                                    const href = productViewHref(product.sn, upSn);

                                                    return (
                                                        <li key={product.sn}>
                                                            <div className="card card_product effect_dec_vt fadeUp js-scroll">
                                                                <div className="row g-3">
                                                                    <div>
                                                                        <div className="card-photo">
                                                                            <a
                                                                                href={href}
                                                                                title={`${product.title} - 前往了解`}
                                                                            >
                                                                                <div className="item-fitimg">
                                                                                    <img
                                                                                        src={product.img}
                                                                                        alt={product.title}
                                                                                        width={product.imgW}
                                                                                        height={product.imgH}
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
                                                                                    href={href}
                                                                                    title={`${product.title} - 前往了解`}
                                                                                >
                                                                                    <span className="card-name-text">
                                                                                        {product.title}
                                                                                    </span>
                                                                                </a>
                                                                            </h3>
                                                                            <div
                                                                                className="card-text img-hidden text-limit limit-line-2"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: product.descriptionHtml,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="card-btnbar card-btnbar_more">
                                                                            <a
                                                                                href={href}
                                                                                className="card-btn card-btn_more"
                                                                                title={`${product.title} - 前往了解`}
                                                                            >
                                                                                <span className="card-btn-text">
                                                                                    更多
                                                                                </span>
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
