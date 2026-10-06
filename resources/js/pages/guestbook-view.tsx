import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

type GuestbookDetail = {
    id: number;
    category: string | null;
    question: string;
    brief: string | null;
    answer: string | null;
    question_date: string | null;
    answer_date: string | null;
    asker_name: string | null;
    asker_company: string | null;
    asker_country: string | null;
    views: number;
};

type Props = {
    item?: GuestbookDetail | null;
};

export default function GuestbookView({ item }: Props) {
    useForceLightMode();

    const pageTitle = item
        ? `${item.question} - 留言板-永康國際同濟會`
        : '留言不存在 - 留言板-永康國際同濟會';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={item ? (item.brief ?? item.question) : '永康國際同濟會留言板'} />
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
                                                    {item ? item.question : '留言不存在'}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="secbox_inner">
                                    {!item ? (
                                        <div style={{ padding: '60px 0', textAlign: 'center' }}>
                                            <h1 style={{ marginBottom: '16px' }}>留言不存在</h1>
                                            <a href="/guestbook" className="btn btn_idxmore">
                                                <span className="btn-text">返回留言板</span>
                                                <span className="iconsvg icon-go"></span>
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="view-column">

                                            {/* Question block */}
                                            <div className="card card_qa fadeUp js-scroll" style={{ marginBottom: '24px' }}>
                                                <div className="card-body">
                                                    <div className="card-row">
                                                        <span className="card-sign card-sign_q"></span>
                                                        <div className="card-content">
                                                            <h1 className="heading-text" style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                                                                {item.question}
                                                            </h1>
                                                            {/* Meta info */}
                                                            <div className="info info_view_date" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.875rem', color: '#666' }}>
                                                                {item.asker_name && (
                                                                    <span>
                                                                        發問者：{item.asker_name}
                                                                        {item.asker_company && ` (${item.asker_company})`}
                                                                        {item.asker_country && ` · ${item.asker_country}`}
                                                                    </span>
                                                                )}
                                                                {item.question_date && <span>發問日期：{item.question_date}</span>}
                                                                {item.category && <span>分類：{item.category}</span>}
                                                            </div>
                                                            {/* Brief */}
                                                            {item.brief && (
                                                                <p className="card-text" style={{ marginTop: '12px', color: '#555' }}>
                                                                    {item.brief}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Answer block */}
                                            {item.answer ? (
                                                <div className="card card_qa fadeUp js-scroll">
                                                    <div className="card-body">
                                                        <div className="card-row card-row_answer">
                                                            <span className="card-sign card-sign_a"></span>
                                                            <div className="card-content">
                                                                <div
                                                                    className="detailbox editor"
                                                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                                                />
                                                                {item.answer_date && (
                                                                    <div style={{ marginTop: '12px', fontSize: '0.875rem', color: '#666' }}>
                                                                        回覆日期：{item.answer_date}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="card card_qa" style={{ opacity: 0.6 }}>
                                                    <div className="card-body">
                                                        <div className="card-row">
                                                            <span className="card-sign card-sign_a"></span>
                                                            <div className="card-content">
                                                                <p className="card-text" style={{ color: '#999' }}>尚未回覆</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Back button */}
                                            <div style={{ marginTop: '40px' }}>
                                                <a href="/guestbook" className="btn btn_idxmore">
                                                    <span className="btn-text">返回留言板</span>
                                                    <span className="iconsvg icon-go"></span>
                                                </a>
                                            </div>

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
