const peopleItems = [
    {
        href: 'https://0915536967.posu.tw/',
        img: '/asd_files/202209160957401422.png',
        name: '陳金漢',
        slogan: '用心只為您',
        text: '專注在開店、系統、網頁、媒體行銷',
        tag: '資訊供應服務',
        location: '台南市 中西區',
    },
    {
        href: 'https://0911958582.posu.tw/',
        img: '/asd_files/202210171049500347.png',
        name: '許芳榮',
        slogan: '西藥 / 醫療器材 / 優質保健食品',
        text: '西藥 / 醫療器材 / 優質保健食品',
        tag: '保健、營養',
        location: '台南市 永康區 永康里',
    },
];

export default function SalonPeople() {
    return (
        <section id="secbox_idx_people" className="secbox secbox_idx js-scroll">
            <div className="secbox_bg">
                <div className="container">
                    <div className="secbox_inner">

                        <div className="itembox_sectop">
                            <div className="heading heading_sec js-scroll">
                                <div className="heading-main">
                                    <div className="secbox-order">06</div>
                                    <h2 className="heading-text">夥伴介紹</h2>
                                    <div className="heading-dec"></div>
                                </div>
                            </div>
                        </div>

                        <div className="secbox_main">
                            <ul className="row row-cols-2 row-cols-lg-3 row-cols-xl-4">
                                {peopleItems.map((person, index) => (
                                    <li key={index}>
                                        <div className="card card_people effect_topslash fadeUp js-scroll">
                                            <div className="row g-3">
                                                <div>
                                                    <div className="card-photo">
                                                        <a href={person.href} target="_blank" rel="noopener noreferrer">
                                                            <div className="item-fitimg">
                                                                <img
                                                                    src={person.img}
                                                                    width={1024}
                                                                    height={1024}
                                                                    alt={person.name}
                                                                    loading="lazy"
                                                                    className="fitimg"
                                                                />
                                                            </div>
                                                            <div className="card-mask"></div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="card-body">
                                                        <h3 className="card-name">
                                                            <a href={person.href} target="_blank" rel="noopener noreferrer">
                                                                <span className="card-name-text">{person.name}</span>
                                                            </a>
                                                        </h3>
                                                        <div className="card-slogan">{person.slogan}</div>
                                                        <p className="card-text img-hidden text-limit limit-line-2">{person.text}</p>
                                                        <div className="card-infobar">
                                                            <div className="card-info card-info_tag">
                                                                <span className="iconsvg icon-tag"></span>
                                                                <span className="card-info-text">{person.tag}</span>
                                                            </div>
                                                            <div className="card-info card-info_location">
                                                                <span className="iconsvg icon-address"></span>
                                                                <span className="card-info-text">{person.location}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden">
                                                    <div className="card-btnbar card-btnbar_outlink">
                                                        <a href={person.href} className="card-btn card-btn_outlink" target="_blank" rel="noopener noreferrer">
                                                            <span className="card-btn-text">更多</span>
                                                            <span className="iconsvg icon-outlink"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="btnbar btnbar_idxmore">
                                <a href="/people" className="btn btn_idxmore">
                                    <span className="btn-text">更多夥伴介紹</span>
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
