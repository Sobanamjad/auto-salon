export default function SalonAnnouncement() {
    return (
        <section id="secbox_idx_announecment" className="secbox secbox_idx js-scroll">
            <div className="secbox_bg">
                <div className="container">
                    <div className="secbox_inner">

                        <div className="itembox_sectop">
                            <div className="heading heading_sec js-scroll">
                                <div className="heading-main">
                                    <div className="secbox-order">03</div>
                                    <h2 className="heading-text">活動資訊</h2>
                                    <div className="heading-dec"></div>
                                </div>
                            </div>
                        </div>

                        <div className="secbox_main">
                            <ul className="row cardlist_jsscroll">
                                <li>
                                    <div className="card card_activity effect_dec_hz js-scroll">
                                        <div className="row g-3 g-lg-4 align-lg-center">
                                            <div className="col-sm-2">
                                                <div className="card-status">
                                                    <span className="card-status-icon">
                                                        <img src="/asd_files/time.png" style={{ verticalAlign: 'middle' }} alt="status" />
                                                    </span>
                                                    <span className="card-status-text">報名期間</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 col-lg-2">
                                                <div className="card-photo">
                                                    <a href="https://gudate.com/2236/3905" title="我要申請入會" target="_blank" rel="noopener noreferrer">
                                                        <div className="item-fitimg">
                                                            <img
                                                                src="/asd_files/s2026072213350710.png"
                                                                alt="我要申請入會"
                                                                width={1024}
                                                                height={824}
                                                                loading="lazy"
                                                                className="fitimg"
                                                            />
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-sm-7 col-lg-6">
                                                <div className="card-body">
                                                    <h3 className="card-name">
                                                        <a href="https://gudate.com/2236/3905" title="我要申請入會" target="_blank" rel="noopener noreferrer">
                                                            <span className="card-name-text">我要申請入會</span>
                                                        </a>
                                                    </h3>
                                                    <ul className="card-infolist"></ul>
                                                </div>
                                            </div>
                                            <div className="hidden lg-block col-lg-2">
                                                <div className="card-btnbar card-btnbar_outlink">
                                                    <a href="https://gudate.com/2236/3905" className="card-btn card-btn_outlink" title="我要申請入會" target="_blank" rel="noopener noreferrer">
                                                        <span className="card-btn-text">詳細</span>
                                                        <span className="iconsvg icon-outlink"></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            <div className="btnbar btnbar_idxmore">
                                <a href="/announcement" className="btn btn_idxmore">
                                    <span className="btn-text">更多活動資訊</span>
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
