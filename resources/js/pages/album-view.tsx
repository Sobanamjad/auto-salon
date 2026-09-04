import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

interface AlbumItem {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    cover_image: string | null;
    album_date: string | null;
    category: string;
    status: string;
    is_featured: boolean;
    views: number;
    photo_count: number;
    comment_count: number;
}

type Props = {
    album?: AlbumItem | null;
};

export default function AlbumView({ album }: Props) {
    useForceLightMode();

    const d = album && album.album_date ? new Date(album.album_date) : new Date();
    const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    return (
        <>
            <Head>
                <title>{album ? `${album.title}-永康國際同濟會` : '活動剪影-永康國際同濟會'}</title>
                <meta name="description" content={album ? (album.description || '永康國際同濟會活動剪影') : '永康國際同濟會活動剪影'} />
                <meta name="keywords" content="永康國際同濟會,活動剪影" />
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
                                src="/asd_files/202607101328127870.png"
                                alt="活動剪影"
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
                                            <span className="heading-text">活動剪影</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-活動剪影">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/albums" title="永康國際同濟會 - 活動剪影">活動剪影</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {album ? album.title : '活動剪影'}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="secbox_inner">
                                    <div className="view-column">

                                        <div className="heading heading_pageview">
                                            <h1 className="heading-text">{album ? album.title : '活動剪影'}</h1>
                                            <div className="info info_view_date">{formattedDate}</div>
                                        </div>

                                        {album && album.cover_image && (
                                            <div className="detailbox">
                                                <img
                                                    src={album.cover_image}
                                                    alt={album.title}
                                                    style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain' }}
                                                />
                                            </div>
                                        )}

                                        {album && album.description && (
                                            <div
                                                className="detailbox editor"
                                                dangerouslySetInnerHTML={{ __html: album.description }}
                                            />
                                        )}

                                        <div className="detailbox">
                                            <div className="info info_view_info">
                                                <span>分類: {album ? album.category : '-'}</span>
                                                <span>瀏覽次數: {album ? album.views : 0}</span>
                                                <span>照片數量: {album ? album.photo_count : 0}</span>
                                                <span>留言數量: {album ? album.comment_count : 0}</span>
                                            </div>
                                        </div>

                                        <div className="consult consult_view">
                                            <div className="btnbar btnbar_consult">
                                                <a
                                                    href={`/contact?new_sn=${album ? album.id : ''}&tmp_table=web_albums`}
                                                    className="btn btn_consult"
                                                >
                                                    <span className="iconsvg icon-question"></span>
                                                    <span className="btn-text">問題諮詢</span>
                                                </a>
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
