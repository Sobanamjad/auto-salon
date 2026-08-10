import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

export default function Life() {
    useForceLightMode();

    return (
        <>
            <Head>
                <title>專業新知-永康國際同濟會</title>
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
                <SalonHeader banner={
                    <div className="banner-single">
                        <img
                            src="/asd_files/202607101151366575.png"
                            alt="專業新知"
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
                                            <span className="heading-text">專業新知</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-專業新知">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    專業新知
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="container">
                                <div className="secbox_inner">

                                    {/* Page title */}
                                    <div className="heading heading_main">
                                        <h1 className="heading-text">專業新知</h1>
                                    </div>

                                    {/* Main Content Div - Start Here */}
                                    <div className="content-main" style={{ padding: '40px 0' }}>
                                        <div style={{
                                            backgroundColor: '#f8f9fa',
                                            padding: '40px',
                                            borderRadius: '12px',
                                            border: '2px dashed #dee2e6',
                                            textAlign: 'center',
                                            minHeight: '300px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <div>
                                                <p style={{
                                                    fontSize: '18px',
                                                    color: '#6c757d',
                                                    margin: '0 0 20px 0',
                                                    fontWeight: 'bold'
                                                }}>
                                                    👉 DIV START HERE - Content Section 👈
                                                </p>
                                                <p style={{
                                                    fontSize: '14px',
                                                    color: '#999',
                                                    margin: 0
                                                }}>
                                                    Is jaga se content div start ho raha hai.
                                                    <br />
                                                    Aap yahan apna content add kar sakte ho.
                                                </p>
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
