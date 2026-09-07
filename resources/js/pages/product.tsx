import { Fragment } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

type ProductCategory = {
    csn: string;
    label: string;
};

type ProductItem = {
    id: number;
    product_no: string | null;
    name: string;
    brief: string | null;
    content: string | null;
    img: string | null;
    img_w: number | null;
    img_h: number | null;
    category: string;
    price: string | null;
};

type Props = {
    csn: string;
    upSn: string;
    thisPage: number;
    searchTitle?: string | null;
    products: ProductItem[];
    totalItems: number;
    totalPages: number;
    categories: ProductCategory[];
};

export default function Product({
    csn,
    upSn,
    thisPage,
    searchTitle = null,
    products,
    totalItems,
    totalPages,
    categories,
}: Props) {
    useForceLightMode();

    const currentPage = thisPage;
    const categoryLabel = categories.find(c => c.csn === csn)?.label ?? categories[0]?.label ?? '';
    const nbsp = '\u00A0';

    const pageHref = (page: number) => {
        const params = new URLSearchParams();
        params.set('new_csn', csn);
        params.set('up_sn', upSn);
        params.set('this_page', String(page));
        if (searchTitle?.trim()) {
            params.set('sel_title', searchTitle.trim());
        }
        return `/product?${params.toString()}`;
    };

    const categoryHref = (categoryCsn: string) => {
        const params = new URLSearchParams();
        params.set('new_csn', categoryCsn);
        params.set('up_sn', upSn);
        return `/product?${params.toString()}`;
    };

    // Link to product detail — uses product_no as the legacy sn identifier
    const productViewHref = (item: ProductItem) => {
        const sn = item.product_no ?? String(item.id);
        return `/product_view?new_sn=${sn}&up_sn=${upSn}&lang=TS`;
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
                                        {/* ── Sidebar ── */}
                                        <div className="main-columns-left">
                                            <div className="searchbar">
                                                <div className="search">
                                                    <form
                                                        name="form1"
                                                        method="get"
                                                        action="/product"
                                                        role="search"
                                                    >
                                                        <input type="hidden" name="new_csn" value={csn} />
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
                                                {categories.map(category => (
                                                    <li
                                                        key={category.csn}
                                                        className={category.csn === csn ? 'active' : ''}
                                                    >
                                                        <a
                                                            href={categoryHref(category.csn)}
                                                            className={category.csn === csn ? 'is-current' : ''}
                                                        >
                                                            {category.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* ── Product grid ── */}
                                        <div className="main-columns-right">
                                            <ul className="row row-cols-2 row-cols-lg-3">
                                                {products.map(product => {
                                                    const href = productViewHref(product);

                                                    return (
                                                        <li key={product.id}>
                                                            <div className="card card_product effect_dec_vt fadeUp js-scroll">
                                                                <div className="row g-3">
                                                                    <div>
                                                                        <div className="card-photo">
                                                                            <a
                                                                                href={href}
                                                                                title={`${product.name} - 前往了解`}
                                                                            >
                                                                                <div className="item-fitimg">
                                                                                    {product.img ? (
                                                                                        <img
                                                                                            src={product.img}
                                                                                            alt={product.name}
                                                                                            width={product.img_w ?? undefined}
                                                                                            height={product.img_h ?? undefined}
                                                                                            loading="lazy"
                                                                                            className="fitimg"
                                                                                        />
                                                                                    ) : (
                                                                                        <div className="fitimg" aria-hidden="true" />
                                                                                    )}
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
                                                                                    title={`${product.name} - 前往了解`}
                                                                                >
                                                                                    <span className="card-name-text">
                                                                                        {product.name}
                                                                                    </span>
                                                                                </a>
                                                                            </h3>
                                                                            {product.brief && (
                                                                                <p className="card-text img-hidden text-limit limit-line-2">
                                                                                    {product.brief}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="card-btnbar card-btnbar_more">
                                                                            <a
                                                                                href={href}
                                                                                className="card-btn card-btn_more"
                                                                                title={`${product.name} - 前往了解`}
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

                                            {/* ── Pagination ── */}
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
