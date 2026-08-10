import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

interface LifePost {
    id: number;
    title: string;
    tag: string;
    location: string;
    image: string;
    excerpt?: string;
}

// Sample life/news posts data
const lifePostsData: LifePost[] = [
    {
        id: 15962,
        title: '勞工局做行善團帶領志工發揚大愛精神 將暖流送入寒門',
        tag: '愛心公益',
        location: '台南市 新營區',
        image: '/asd_files/s2026080414272190.jpg',
    },
    {
        id: 15961,
        title: '臺南農會人氣商品！「臺南平安好運大吉盒」在全臺愛買門市限量販售',
        tag: '愛心公益',
        location: '台南市 安平區',
        image: '/asd_files/s2026080412364090.jpg',
    },
    {
        id: 15956,
        title: '無人機也能踢足球 逾百名學生空中攻防玩科技',
        tag: 'AI 新知',
        location: '台南市 安平區',
        image: '/asd_files/s20260804160147100.png',
    },
    {
        id: 15917,
        title: '百業振興·幸福家園~創業扶助計劃',
        tag: '愛心公益',
        location: '台南市',
        image: '/asd_files/s2026072213350710.png',
        excerpt: '全台家庭經濟穩健倍增方案',
    },
    {
        id: 15889,
        title: '科林助聽器攜手新竹縣政府、聲暉聯合會捐贈AI數位助聽器 守護弱勢聽損者 共同打造聽力友善城市',
        tag: '愛心公益',
        location: '台南市',
        image: '/asd_files/s2026080311593250.jpg',
    },
    {
        id: 15860,
        title: '在製造業智慧轉型的浪潮中，您是否也正面臨人力成本激增、技術斷層、效率瓶頸的挑戰？',
        tag: 'AI 新知',
        location: '台南市',
        image: '/asd_files/s2026080310590750.jpg',
        excerpt: '28年匠心沉澱，引領塑膠射出走向「無人化」新時代',
    },
    {
        id: 15855,
        title: '臺南郵局邀請民眾一起熱血做公益 辦理「捐熱血 郵愛心」公益活動',
        tag: '愛心公益',
        location: '台南市 北區',
        image: '/asd_files/s2026072216383320.jpg',
    },
    {
        id: 15850,
        title: '新興科技應用高峰論壇 2026年度首場盛事',
        tag: 'AI 新知',
        location: '台南市',
        image: '/asd_files/s2026080217305980.jpg',
    },
    {
        id: 15845,
        title: '永康同濟會舉辦年度會員大會',
        tag: '會務訊息',
        location: '台南市 永康區',
        image: '/asd_files/s2026080123281220.jpg',
    },
    {
        id: 15840,
        title: '環保教育活動啟動 共同守護地球',
        tag: '愛心公益',
        location: '台南市',
        image: '/asd_files/s202607221407071.jpg',
    },
    {
        id: 15835,
        title: '青年創業扶持計劃說明會',
        tag: '會務活動',
        location: '台南市 中心區',
        image: '/asd_files/s202607221407447.jpg',
    },
    {
        id: 15830,
        title: '會員商品展示會圓滿結束',
        tag: '會務訊息',
        location: '台南市',
        image: '/asd_files/s202607221406322.jpg',
    },
];

export default function Life() {
    useForceLightMode();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    
    const totalPages = Math.ceil(lifePostsData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedPosts = lifePostsData.slice(startIdx, startIdx + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                            src="/asd_files/202607101423429795.png"
                            alt="專業新知"
                            width={2460}
                            height={639}
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
                                                    <a href="/life" title="專業新知">專業新知</a>
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

                                    {/* Card Grid - Life Posts */}
                                    <ul className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                                        {paginatedPosts.map((post) => (
                                            <li key={post.id}>
                                                <div className="card card_post fadeUp js-scroll">
                                                    <div className="row g-3 align-center">
                                                        <div className="col-4 col-lg-12">
                                                            <div className="card-photo">
                                                                <a href={`/life/${post.id}`}>
                                                                    <div className="item-fitimg">
                                                                        <img 
                                                                            src={post.image} 
                                                                            alt={post.title} 
                                                                            width={1024} 
                                                                            height={768}
                                                                            loading="lazy" 
                                                                            className="fitimg"
                                                                        />
                                                                    </div>
                                                                    <div className="card-mask"></div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-8 col-lg-12">
                                                            <div className="card-body">
                                                                <h3 className="card-name">
                                                                    <a href={`/life/${post.id}`}>
                                                                        <span className="card-name-text">{post.title}</span>
                                                                    </a>
                                                                </h3>
                                                                {post.excerpt && (
                                                                    <div className="card-text img-hidden hidden">
                                                                        {post.excerpt}
                                                                    </div>
                                                                )}
                                                                <ul className="card-infolist">
                                                                    <li>
                                                                        <div className="card-info card-info_tag">
                                                                            <span className="iconsvg icon-tag"></span>
                                                                            <span className="card-info-text">
                                                                                {post.tag}
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="card-info card-info_location">
                                                                            <span className="iconsvg icon-address"></span>
                                                                            <span className="card-info-text">
                                                                                {post.location}
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="hidden">
                                                            <div className="card-btnbar card-btnbar_more">
                                                                <a 
                                                                    href={`/life/${post.id}`} 
                                                                    className="card-btn card-btn_more" 
                                                                    title={post.title}
                                                                >
                                                                    <span className="card-btn-text">更多</span>
                                                                    <span className="iconsvg icon-view-more"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'center', 
                                            gap: '8px', 
                                            marginTop: '40px',
                                            padding: '20px 0'
                                        }}>
                                            {/* Previous Button */}
                                            {currentPage > 1 && (
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    style={{
                                                        padding: '8px 12px',
                                                        border: '1px solid #ccc',
                                                        backgroundColor: '#fff',
                                                        cursor: 'pointer',
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    ← 上一頁
                                                </button>
                                            )}

                                            {/* Page Numbers */}
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    style={{
                                                        padding: '8px 12px',
                                                        border: currentPage === page ? '2px solid #007bff' : '1px solid #ccc',
                                                        backgroundColor: currentPage === page ? '#007bff' : '#fff',
                                                        color: currentPage === page ? '#fff' : '#000',
                                                        cursor: 'pointer',
                                                        borderRadius: '4px',
                                                        fontWeight: currentPage === page ? 'bold' : 'normal'
                                                    }}
                                                >
                                                    {page}
                                                </button>
                                            ))}

                                            {/* Next Button */}
                                            {currentPage < totalPages && (
                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    style={{
                                                        padding: '8px 12px',
                                                        border: '1px solid #ccc',
                                                        backgroundColor: '#fff',
                                                        cursor: 'pointer',
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    下一頁 →
                                                </button>
                                            )}
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
