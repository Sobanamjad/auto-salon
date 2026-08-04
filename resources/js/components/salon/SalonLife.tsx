const lifeItems = [
    {
        href: '/life_view?new_sn=15860',
        title: '在製造業智慧轉型的浪潮中，您是否也正面臨人力成本激增、技術斷層、效率瓶頸的挑戰？',
        img: '/asd_files/s20260804160147100.png',
        imgW: 1024, imgH: 757,
        text: '28年匠心沉澱，引領塑膠射出走向「無人化」新時代',
        location: '台南市',
    },
    {
        href: '/life_view?new_sn=15855',
        title: '臺南郵局邀請民眾一起熱血做公益 辦理「捐熱血 郵愛心」公益活動',
        img: '/asd_files/s2026080414272190.jpg',
        imgW: 1024, imgH: 768,
        text: '',
        location: '台南市 北區',
    },
    {
        href: '/life_view?new_sn=15848',
        title: '青年高中餐飲科攜手希望家園推動融合教育　陪伴慢飛天使完成料理挑戰展現自信',
        img: '/asd_files/s2026080310590750.jpg',
        imgW: 1024, imgH: 768,
        text: '青年高中餐飲科攜手臺中市希望家園舉辦融合教育料理體驗，透過耐心陪伴慢飛天使完成料理挑戰，讓學生實踐服務學習，也讓共融教育在校園持續扎根。',
        location: '台中市',
    },
    {
        href: '/life_view?new_sn=15840',
        title: '5,000 份愛心，溫暖了寒意新春；心底慈善的溫度，也是文明的厚度….',
        img: '/asd_files/s2026021817005680.jpg',
        imgW: 1024, imgH: 768,
        text: '當全台灣沉浸在除夕、初一的爆竹聲與豪華年夜飯的歡愉時，在屏東的街角與深山，有一群人正為了「5,000個熱便當」而奔波。',
        location: '屏東縣 屏東市',
    },
];

export default function SalonLife() {
    return (
        <section id="secbox_idx_life" className="secbox secbox_idx js-scroll">
            <div className="secbox_bg">
                <div className="container">
                    <div className="secbox_inner">

                        <div className="itembox_sectop">
                            <div className="heading heading_sec js-scroll">
                                <div className="heading-main">
                                    <div className="secbox-order">07</div>
                                    <h2 className="heading-text">專業新知</h2>
                                    <div className="heading-dec"></div>
                                </div>
                            </div>
                        </div>

                        <div className="secbox_main">
                            <ul className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                                {lifeItems.map((item, index) => (
                                    <li key={index}>
                                        <div className="card card_post fadeUp js-scroll">
                                            <div className="row g-3 align-center">
                                                <div className="col-4 col-lg-12">
                                                    <div className="card-photo">
                                                        <a href={item.href} title={item.title}>
                                                            <div className="item-fitimg">
                                                                <img
                                                                    src={item.img}
                                                                    alt={item.title}
                                                                    width={item.imgW}
                                                                    height={item.imgH}
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
                                                            <a href={item.href} title={item.title}>
                                                                <span className="card-name-text">{item.title}</span>
                                                            </a>
                                                        </h3>
                                                        {item.text && (
                                                            <div className="card-text img-hidden hidden">{item.text}</div>
                                                        )}
                                                        <ul className="card-infolist">
                                                            <li>
                                                                <div className="card-info card-info_location">
                                                                    <span className="iconsvg icon-address"></span>
                                                                    <span className="card-info-text">{item.location}</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="hidden">
                                                    <div className="card-btnbar card-btnbar_more">
                                                        <a href={item.href} className="card-btn card-btn_more" title={item.title}>
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

                            <div className="btnbar btnbar_idxmore">
                                <a href="/life" className="btn btn_idxmore">
                                    <span className="btn-text">更多專業新知</span>
                                    <span className="iconsvg icon-go"></span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="secbox_dec01"></div>
            <div className="secbox_dec02"></div>
        </section>
    );
}
