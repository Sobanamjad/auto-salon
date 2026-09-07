import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

const CATEGORY_LABELS: Record<string, string> = {
    '7519': '保養飾品',
    '7518': '居家用品',
    '7517': '吃吃喝喝',
};

interface ProductItem {
    id: number;
    product_no: string | null;
    name: string;
    brief: string | null;
    content: string | null;
    img: string | null;
    img_w: number | null;
    img_h: number | null;
    video: string | null;
    price: string | null;
    currency: string | null;
    stock: number;
    category: string;
    published_date: string | null;
    views: number;
}

type Props = {
    product: ProductItem;
    upSn: string;
    backCsn: string;
};

export default function ProductView({ product, upSn, backCsn }: Props) {
    useForceLightMode();

    // Load AddToAny share script once after mount
    useEffect(() => {
        if (!document.getElementById('a2a-script')) {
            const script = document.createElement('script');
            script.id = 'a2a-script';
            script.async = true;
            script.src = 'https://static.addtoany.com/menu/page.js';
            document.body.appendChild(script);
        }
    }, []);

    const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
    const backHref = `/product?new_csn=${backCsn}&up_sn=${upSn}`;

    return (
        <>
            <Head>
                <title>{`${product.name} - 永康國際同濟會`}</title>
                <meta name="description" content={product.brief ?? '永康國際同濟會'} />
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

                            {/* Breadcrumb */}
                            <div className="maintop">
                                <div className="container">
                                    <div className="maintop_inner">
                                        <div className="heading_module">
                                            <span className="heading-text">會員商品</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-會員商品">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/product" title="永康國際同濟會 - 會員商品">會員商品</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href={backHref} title={`永康國際同濟會 - ${categoryLabel}`}>{categoryLabel}</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {product.name}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Detail content */}
                            <div className="container">
                                <div className="secbox_inner">
                                    <div className="view-column">

                                        {/* Heading */}
                                        <div className="heading heading_pageview">
                                            <h1 className="heading-text">{product.name}</h1>
                                            {product.price && (
                                                <div className="info info_view_date">
                                                    {product.currency === 'NT' ? 'NT$' : product.currency}{' '}{product.price}
                                                </div>
                                            )}
                                        </div>

                                        {/* Product image */}
                                        {product.img && (
                                            <div className="detailbox" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                                <img
                                                    src={product.img}
                                                    alt={product.name}
                                                    width={product.img_w ?? undefined}
                                                    height={product.img_h ?? undefined}
                                                    style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                                                />
                                            </div>
                                        )}

                                        {/* Brief (plain text) */}
                                        {product.brief && (
                                            <div className="detailbox">
                                                <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.8' }}>{product.brief}</p>
                                            </div>
                                        )}

                                        {/* Full HTML content */}
                                        {product.content && (
                                            <div
                                                className="detailbox editor"
                                                dangerouslySetInnerHTML={{ __html: product.content }}
                                            />
                                        )}

                                        {/* Video embed */}
                                        {product.video && (
                                            <div
                                                className="videobox"
                                                dangerouslySetInnerHTML={{ __html: product.video }}
                                            />
                                        )}

                                        {/* Back to list */}
                                        <div className="consult consult_view">
                                            <div className="btnbar btnbar_consult">
                                                <a href={backHref} className="btn btn_consult">
                                                    <span className="iconsvg icon-arrow-left"></span>
                                                    <span className="btn-text">返回商品列表</span>
                                                </a>
                                            </div>
                                        </div>

                                        {/* Share bar */}
                                        <div className="sharelink_bar">
                                            <div className="sharelink">
                                                <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                                                    <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                                                    <a className="a2a_button_facebook"></a>
                                                    <a className="a2a_button_line"></a>
                                                    <a className="a2a_button_twitter"></a>
                                                    <a className="a2a_button_wechat"></a>
                                                </div>
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
