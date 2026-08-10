import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import SalonAboutFoundingPurpose from '@/components/salon/SalonAboutFoundingPurpose';

type Props = {
    tab?: string; // 'founding' | 'charter'
};

// Category tabs for the 關於本會 section
const tabs = [
    { key: 'founding', label: '成立宗旨', sn: '7887' },
    { key: 'charter',  label: '組織章程', sn: '7886' },
];

export default function About({ tab = 'founding' }: Props) {
    useForceLightMode([tab]);
    const activeTab = tabs.find(t => t.key === tab) ?? tabs[0];

    return (
        <>
            <Head>
                <title>{activeTab.label}-永康國際同濟會</title>
                <meta name="description" content="永康國際同濟會" />
                <meta name="keywords" content="永康國際同濟會" />
                {/* Legacy stylesheet bundle */}
                <link rel="stylesheet" href="/asd_files/base.css" />
                <link rel="stylesheet" href="/asd_files/blue.css" />
                <link rel="stylesheet" href="/asd_files/common.css" />
                <link rel="stylesheet" href="/asd_files/main.css" />
                <link rel="stylesheet" href="/asd_files/animate.css" />
                <link rel="stylesheet" href="/asd_files/fancybox.css" />
                <script src="/asd_files/jquery-3.7.1.min.js" defer={true} />
                <script src="/asd_files/customize.js" defer={true} />
                <script src="/asd_files/marquee.js" defer={true} />
                <script src="/asd_files/fancybox.umd.js" defer={true} />
            </Head>

            <div className="wrapper">
                <SalonHeader banner={
                    <div className="banner-single">
                        <img
                            src="/asd_files/202607101151366575.png"
                            alt="關於本會"
                            width={2032}
                            height={528}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                } />

                <SalonMarquee />

                <main className="main">
                    <div className="main_inner">
                        <section className="secbox_page">

                            {/* Page heading + breadcrumb */}
                            <div className="maintop">
                                <div className="container">
                                    <div className="maintop_inner">
                                        <div className="heading_module">
                                            <span className="heading-text">關於本會</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-關於本會">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/about" title="永康國際同濟會 - 關於本會">關於本會</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {activeTab.label}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Content area */}
                            <div className="container">
                                <div className="secbox_inner">
                                    <div className="view-column">

                                        {/* Category tabs */}
                                        <div className="category_box">
                                            <ul className="category_list">
                                                {tabs.map(t => (
                                                    <li key={t.key} className={t.key === activeTab.key ? 'active' : ''}>
                                                        <a
                                                            href={`/about?new_sn=${t.sn}&lang=TS`}
                                                            title={t.label}
                                                        >
                                                            <span className="cate-text">{t.label}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Page title */}
                                        <div className="heading heading_main">
                                            <h1 className="heading-text">{activeTab.label}</h1>
                                        </div>

                                        {/* Tab content */}
                                        {activeTab.key === 'founding' && <SalonAboutFoundingPurpose />}
                                        {activeTab.key === 'charter' && (
                                            <div className="detailbox editor" style={{ padding: '40px 0' }}>
                                                <p style={{ color: '#4a4a68', fontSize: 16 }}>組織章程內容即將上線，敬請期待。</p>
                                            </div>
                                        )}

                                        {/* Empty photo gallery placeholder (matches source) */}
                                        <div className="figurebox_about">
                                            <div className="heading heading_figure">
                                                <h2 className="heading-text">Photo</h2>
                                            </div>
                                            <div className="figurebox_inner">
                                                <ul className="row row-cols-sm-2"></ul>
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
