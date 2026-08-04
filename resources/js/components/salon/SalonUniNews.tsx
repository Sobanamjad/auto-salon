const uniNewsItems = [
    {
        href: '/uninews_view?new_sn=138019',
        title: '保護創新研發成果x捍衛尊重智慧財產權　億光電子再興訴訟在美國針對日亞化提起LED專利侵權訴訟',
        img: '/asd_files/s2026080412364090.jpg',
        imgW: 1024, imgH: 681,
        location: '',
        date: '2026-08-04',
    },
    {
        href: '/uninews_view?new_sn=137874',
        title: '臺南郵局攜手南家扶助學特賣會 辦理廉政反貪反詐騙反賄選宣導活動',
        img: '/asd_files/s2026080311593250.jpg',
        imgW: 1024, imgH: 768,
        location: '台南市',
        date: '2026-08-03',
    },
    {
        href: '/uninews_view?new_sn=137794',
        title: '汗水凝聚的榮耀！第56屆全國技能競賽圓滿謝幕　勞動桃竹苗分署再創佳績共計勇奪14金17銀14銅',
        img: '/asd_files/s2026080217305980.jpg',
        imgW: 1024, imgH: 576,
        location: '',
        date: '2026-08-02',
    },
    {
        href: '/uninews_view?new_sn=137711',
        title: '音樂演出x特色啤酒x美食市集x互動闖關x打卡體驗　「2026新竹．港港好」首波活動夏日乾杯計畫登場！',
        img: '/asd_files/s2026080123281220.jpg',
        imgW: 1024, imgH: 576,
        location: '',
        date: '2026-08-01',
    },
];

export default function SalonUniNews() {
    return (
        <section id="secbox_idx_uninews" className="secbox secbox_idx js-scroll">
            <div className="secbox_bg">
                <div className="container">
                    <div className="secbox_inner">

                        <div className="itembox_sectop">
                            <div className="heading heading_sec js-scroll">
                                <div className="heading-main">
                                    <div className="secbox-order">05</div>
                                    <h2 className="heading-text">社團新聞</h2>
                                    <div className="heading-dec"></div>
                                </div>
                            </div>
                        </div>

                        <div className="secbox_main">
                            <ul className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                                {uniNewsItems.map((item, index) => (
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
                                                        <ul className="card-infolist">
                                                            <li>
                                                                <div className="card-info card-info_location">
                                                                    <span className="iconsvg icon-address"></span>
                                                                    <span className="card-info-text">{item.location}</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="card-info card-info_date">
                                                                    <span className="iconsvg icon-date"></span>
                                                                    <span className="card-info-text">{item.date}</span>
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
                                <a href="/uninews" className="btn btn_idxmore">
                                    <span className="btn-text">更多社團新聞</span>
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
