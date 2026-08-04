const newsItems = [
    {
        date: { year: '2025', month: '04', day: '21' },
        href: '/news_view?new_sn=136461',
        title: '國際同濟會臺灣總會澎嘉南區第50、51屆主席交接典禮',
        img: '/asd_files/s2026072210451960.jpg',
        imgW: 1024, imgH: 768,
    },
    {
        date: { year: '2025', month: '04', day: '21' },
        href: '/news_view?new_sn=136460',
        title: '永康同濟會會員一同參加嘉義阿里山同濟會的交接活動！',
        img: '/asd_files/s2026072210425840.jpg',
        imgW: 1024, imgH: 768,
    },
];

export default function SalonNews() {
    return (
        <section id="secbox_idx_news" className="secbox secbox_idx js-scroll secbox_idx_leftphotos">
            <div className="secbox_bg">
                <div className="container">
                    <div className="secbox_inner">

                        <div className="itembox_sectop">
                            <div className="heading heading_sec js-scroll">
                                <div className="heading-main">
                                    <div className="secbox-order">04</div>
                                    <h2 className="heading-text">訊息公佈欄</h2>
                                    <div className="heading-dec"></div>
                                </div>
                            </div>
                            <div
                                className="secbox_decphoto js-scroll"
                                style={{ backgroundImage: 'url(https://uploads.posu.tw/22/2236/thum/202607221609326060.png)' }}
                            ></div>
                        </div>

                        <div className="secbox_main">
                            <ul className="row cardlist_jsscroll">
                                {newsItems.map((item, index) => (
                                    <li key={index}>
                                        <div className="card card_news js-scroll">
                                            <div className="row g-3 g-lg-4 align-center">
                                                <div className="col-lg-3">
                                                    <div className="card-header">
                                                        <div className="card-date-box">
                                                            <div className="card-date-item">
                                                                <span className="card-date year">{item.date.year}</span>
                                                                <span className="card-date month">{item.date.month}</span>
                                                                <span className="card-date day">{item.date.day}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
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
                                                <div className="col-lg-6">
                                                    <div className="card-body">
                                                        <h3 className="card-name">
                                                            <a href={item.href} title={item.title}>
                                                                <span className="card-name-text">{item.title}</span>
                                                            </a>
                                                        </h3>
                                                        <div className="card-text img-hidden text-limit limit-line-2"></div>
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
                                <a href="/news" className="btn btn_idxmore">
                                    <span className="btn-text">更多訊息公佈欄</span>
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
