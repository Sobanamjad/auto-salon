const timelineItems = [
    {
        year: '2025年',
        date: { year: '2025', month: '06', day: '23' },
        href: '/timeline_view?new_sn=2431',
        title: '永康國際同濟會授證典禮',
        img: '/asd_files/s2026072216383320.jpg',
        imgW: 1024, imgH: 575,
        text: '同濟會（Kiwanis）作為國際四大服務性社團之一，始終以「照顧兒童，第一優先」為使命',
    },
    {
        year: '2024年',
        date: { year: '2024', month: '04', day: '14' },
        href: '/timeline_view?new_sn=2418',
        title: '國際同濟會永康分會正式成立',
        img: '/asd_files/s2026072211321470.jpg',
        imgW: 1024, imgH: 406,
        text: '黃偉哲：與市府攜手關懷弱勢',
    },
];

export default function SalonTimeline() {
    return (
        <section id="secbox_idx_timeline" className="secbox secbox_idx js-scroll">
            <div className="secbox_bg">
                <div className="container">
                    <div className="secbox_inner">

                        <div className="itembox_sectop">
                            <div className="heading heading_sec js-scroll">
                                <div className="heading-main">
                                    <div className="secbox-order">02</div>
                                    <h2 className="heading-text">本會簡史</h2>
                                    <div className="heading-dec"></div>
                                </div>
                            </div>
                        </div>

                        <div className="secbox_main">
                            <div className="timeline-event">
                                <div className="timeline-area">
                                    {timelineItems.map((item, index) => (
                                        <>
                                            <div className="timeline-year fadeUp js-scroll" key={`year-${index}`}>
                                                <span className="timeline-year-text">{item.year}</span>
                                            </div>
                                            <div className="timeline-box js-scroll" key={`box-${index}`}>
                                                <div className="card card_timeline">
                                                    <div className="card_row">
                                                        <div className="card-one">
                                                            <div className="card-photo">
                                                                <a href={item.href} title={item.title}>
                                                                    <img
                                                                        src={item.img}
                                                                        width={item.imgW}
                                                                        height={item.imgH}
                                                                        alt={item.title}
                                                                        loading="lazy"
                                                                    />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="card-two">
                                                            <div className="card-header">
                                                                <div className="header_row">
                                                                    <div className="header-one">
                                                                        <div className="card-date-box">
                                                                            <div className="card-date-item">
                                                                                <span className="card-date year">{item.date.year}</span>
                                                                                <span className="card-date month">{item.date.month}</span>
                                                                                <span className="card-date day">{item.date.day}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="header-two">
                                                                        <h3 className="card-name">
                                                                            <a href={item.href} title={item.title}>
                                                                                <span className="card-name-text">{item.title}</span>
                                                                            </a>
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="card-text img-hidden text-limit limit-line-3">
                                                                    {item.text}
                                                                </div>
                                                            </div>
                                                            <div className="hidden">
                                                                <div className="card-btnbar card-btnbar_readmore">
                                                                    <a href={item.href} title={item.title} className="card-btn card-btn_readmore">
                                                                        <span className="card-btn-text">繼續閱讀</span>
                                                                        <span className="iconsvg icon-read-more"></span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="btnbar btnbar_idxmore">
                            <a href="/timeline" className="btn btn_idxmore">
                                <span className="btn-text">更多本會簡史</span>
                                <span className="iconsvg icon-go"></span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            <div className="secbox_dec01"></div>
            <div className="secbox_dec02"></div>
        </section>
    );
}
