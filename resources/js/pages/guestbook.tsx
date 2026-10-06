import { Fragment } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

type GuestbookItem = {
    id: number;
    category: string | null;
    question: string;
    brief: string | null;
    answer: string | null;
    question_date: string | null;
    answer_date: string | null;
    asker_name: string | null;
    views: number;
};

type Props = {
    csn?: string | null;
    thisPage?: number;
    totalPages?: number;
    totalItems?: number;
    items?: GuestbookItem[];
    categories?: string[];
};

export default function Guestbook({
    csn = null,
    thisPage = 1,
    totalPages = 1,
    totalItems = 0,
    items = [],
    categories = [],
}: Props) {
    useForceLightMode();

    const activeCsn = csn ?? null;
    const currentPage = Math.min(Math.max(thisPage, 1), totalPages);
    const nbsp = '\u00A0';

    const pageHref = (page: number) => {
        const params = new URLSearchParams();
        params.set('this_page', String(page));
        if (activeCsn) params.set('new_csn', activeCsn);
        return `/guestbook?${params.toString()}`;
    };

    return (
        <>
            <Head>
                <title>留言板-永康國際同濟會</title>
                <meta name="description" content="永康國際同濟會留言板" />
                <meta name="keywords" content="永康國際同濟會,留言板" />
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
                                src="/asd_files/202607101341095614.png"
                                alt="留言板"
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
                                            <span className="heading-text">留言板</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-留言板">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/guestbook" title="留言板">留言板</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {activeCsn ?? '全部'}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="secbox_inner">

                                    {/* Category filter — only show if categories exist */}
                                    {categories.length > 0 && (
                                        <div className="category_box">
                                            <ul className="category_list">
                                                <li className={activeCsn === null ? 'active' : ''}>
                                                    <a href="/guestbook" title="全部">
                                                        <span className="cate-text">全部</span>
                                                    </a>
                                                </li>
                                                {categories.map(cat => (
                                                    <li key={cat} className={activeCsn === cat ? 'active' : ''}>
                                                        <a href={`/guestbook?new_csn=${encodeURIComponent(cat)}`} title={cat}>
                                                            <span className="cate-text">{cat}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="heading heading_main">
                                        <h1 className="heading-text">{activeCsn ?? '留言板'}</h1>
                                    </div>

                                    {items.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
                                            暫無留言資料
                                        </div>
                                    ) : (
                                        <div className="listbox">
                                            {items.map(item => (
                                                <div key={item.id} className="card card_qa fadeUp js-scroll">
                                                    <div className="card-body">
                                                        {/* Question */}
                                                        <div className="card-row">
                                                            <span className="card-sign card-sign_q"></span>
                                                            <div className="card-content">
                                                                <h3 className="card-name">
                                                                    <Link
                                                                        href={`/guestbook/${item.id}`}
                                                                        title={item.question}
                                                                        className="card-name-text"
                                                                    >
                                                                        {item.question}
                                                                    </Link>
                                                                </h3>
                                                                <div className="card-meta">
                                                                    {item.asker_name && (
                                                                        <span className="card-meta-item">{item.asker_name}</span>
                                                                    )}
                                                                    {item.question_date && (
                                                                        <span className="card-meta-item">{item.question_date}</span>
                                                                    )}
                                                                    {item.category && (
                                                                        <span className="card-meta-item">{item.category}</span>
                                                                    )}
                                                                </div>
                                                                {item.brief && (
                                                                    <p className="card-text">{item.brief}</p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Answer preview */}
                                                        {item.answer && (
                                                            <div className="card-row card-row_answer">
                                                                <span className="card-sign card-sign_a"></span>
                                                                <div className="card-content">
                                                                    <p className="card-text"
                                                                        style={{
                                                                            overflow: 'hidden',
                                                                            display: '-webkit-box',
                                                                            WebkitLineClamp: 2,
                                                                            WebkitBoxOrient: 'vertical',
                                                                        }}
                                                                    >
                                                                        {item.answer.replace(/<[^>]*>/g, '')}
                                                                    </p>
                                                                    {item.answer_date && (
                                                                        <span className="card-meta-item">{item.answer_date}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Read more link */}
                                                        <div className="card-footer">
                                                            <Link
                                                                href={`/guestbook/${item.id}`}
                                                                className="btn btn_more"
                                                                title="查看詳細"
                                                            >
                                                                <span className="btn-text">查看詳細</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="page">
                                            <Link href={pageHref(1)} preserveScroll={false}>首頁</Link>
                                            {nbsp}
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <Fragment key={page}>
                                                    {page === currentPage ? (
                                                        <span>{page}</span>
                                                    ) : (
                                                        <Link href={pageHref(page)} preserveScroll={false}>{page}</Link>
                                                    )}
                                                    {nbsp}
                                                </Fragment>
                                            ))}
                                            <Link href={pageHref(totalPages)} preserveScroll={false}>末頁</Link>
                                            <br />
                                            <br />
                                            Total {totalItems} - {currentPage} / {totalPages}
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
