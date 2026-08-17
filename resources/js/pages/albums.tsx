import React, { useState } from 'react';
import SalonHeader from '../components/salon/SalonHeader';
import SalonFooter from '../components/salon/SalonFooter';
import { albumCategories, albumsItems, getAlbumsByCategory, getAlbumsByYear } from '../data/albums-items';

interface AlbumsPageProps {
    initialYear?: string;
}

export default function AlbumsPage({ initialYear }: AlbumsPageProps) {
    const [selectedCategory, setSelectedCategory] = useState(initialYear || 'all');
    
    const filteredAlbums = initialYear 
        ? getAlbumsByYear(initialYear)
        : getAlbumsByCategory(selectedCategory);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div className="wrapper">
            <div className="salon-page">
                <SalonHeader
                    banner={
                        <div className="banner-single">
                            <img
                                src="/albums_files/202607101328127870.png"
                                alt="活動剪影"
                                width={2032}
                                height={528}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    }
                />

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
                                                    <a href="/" title="首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/albums" title="活動剪影">活動剪影</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {initialYear ? `${initialYear}年` : '全部'}
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
                                            {albumCategories.map(category => (
                                                <li key={category.id} className={selectedCategory === category.id ? 'active' : ''}>
                                                    <a 
                                                        href="#" 
                                                        title={category.name}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleCategoryClick(category.id);
                                                        }}
                                                    >
                                                        <span className="cate-text">{category.name}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="heading heading_main">
                                        <h1 className="heading-text">
                                            {initialYear ? `${initialYear}年` : 
                                             selectedCategory === 'all' ? '全部' :
                                             albumCategories.find(c => c.id === selectedCategory)?.name || '全部'}
                                        </h1>
                                    </div>

                                    <ul className="row row-cols-2 row-cols-lg-3 row-cols-xl-4">
                                        {filteredAlbums.map(album => (
                                            <li key={album.id}>
                                                <div className="card card_albums effect_dec_vt fadeUp js-scroll">
                                                    <div className="row g-3">
                                                        <div className="">
                                                            <div className="card-photo">
                                                                <a href={album.viewUrl} title={album.title}>
                                                                    <div className="item-fitimg">
                                                                        <img
                                                                            src={album.image}
                                                                            alt={album.title}
                                                                            width={1024}
                                                                            height={764}
                                                                            loading="lazy"
                                                                            className="fitimg"
                                                                        />
                                                                    </div>
                                                                    <div className="card-mask"></div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="">
                                                            <div className="card-body">
                                                                <h3 className="card-name">
                                                                    <a href={album.viewUrl} title={album.title}>
                                                                        <span className="card-name-text">{album.title}</span>
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="">
                                                            <div className="card-btnbar card-btnbar_more">
                                                                <a href={album.viewUrl} className="card-btn card-btn_more" title={album.title}>
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
                                    <div className="page">
                                        <a href="/albums" target="_self">首頁</a>&nbsp;
                                        <span>1</span>&nbsp;
                                        <a href="/albums">末頁</a>
                                        <br /><br />
                                        Total {filteredAlbums.length} - 1 / 1
                                        <br />
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                <SalonFooter />
            </div>
        </div>
    );
}