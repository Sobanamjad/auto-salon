import { Fragment } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import {
    getQaCategoryLabel,
    getQaPageItems,
    getQaTotal,
    getQaTotalPages,
    qaCategories,
} from '@/data/qa-items';

type Props = {
    csn?: string | null;
    thisPage?: number;
};

function initFaqAccordion(): () => void {
    const container = document.querySelector('#accordion-faq');
    if (!container) {
        return () => {};
    }

    const handlers: Array<{ button: Element; handler: () => void }> = [];

    container.querySelectorAll<HTMLButtonElement>('.accordion-button').forEach(button => {
        const handler = () => {
            const content = button.nextElementSibling as HTMLElement | null;
            if (!content) {
                return;
            }

            button.classList.toggle('active');

            if (content.style.maxHeight) {
                content.style.maxHeight = '';
            } else {
                content.style.maxHeight = `${content.scrollHeight}px`;
            }
        };

        button.addEventListener('click', handler);
        handlers.push({ button, handler });
    });

    return () => {
        handlers.forEach(({ button, handler }) => {
            button.removeEventListener('click', handler);
        });
    };
}

export default function Qa({ csn = null, thisPage = 1 }: Props) {
    useForceLightMode();

    const activeCsn = csn ?? null;
    const activeLabel = getQaCategoryLabel(activeCsn);
    const totalPages = getQaTotalPages(activeCsn);
    const totalItems = getQaTotal(activeCsn);
    const currentPage = Math.min(Math.max(thisPage, 1), totalPages);
    const items = getQaPageItems(activeCsn, currentPage);
    const nbsp = '\u00A0';

    const pageHref = (page: number) => {
        const params = new URLSearchParams();
        params.set('this_page', String(page));
        if (activeCsn) {
            params.set('new_csn', activeCsn);
        }

        return `/qa?${params.toString()}`;
    };

    useEffect(() => {
        return initFaqAccordion();
    }, [items]);

    return (
        <>
            <Head>
                <title>常見問題-永康國際同濟會</title>
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
                                src="/asd_files/202607101341095614.png"
                                alt="常見問題"
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
                                            <span className="heading-text">常見問題</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-常見問題">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/qa" title="永康國際同濟會 - 常見問題">
                                                        常見問題
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
                                            {qaCategories.map(category => (
                                                <li
                                                    key={category.label}
                                                    className={
                                                        (category.csn ?? null) === activeCsn ? 'active' : ''
                                                    }
                                                >
                                                    <a
                                                        href={
                                                            category.csn
                                                                ? `/qa?new_csn=${category.csn}`
                                                                : '/qa'
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

                                    <div className="accordion_faq" id="accordion-faq">
                                        {items.map(item => (
                                            <div key={item.question} className="accordion-item card_qa">
                                                <button type="button" className="accordion-button card-header">
                                                    <span className="card-sign card-sign_q"></span>
                                                    <h3 className="card-name">
                                                        <span className="card-name-text">{item.question}</span>
                                                    </h3>
                                                    <div className="accordion-icon"></div>
                                                </button>
                                                <div className="accordion-content">
                                                    <div className="card-body">
                                                        <span className="card-sign card-sign_a"></span>
                                                        <div
                                                            className="card-text editor"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.answerHtml,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

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
