export default function SalonAbout() {
    return (
        <section id="secbox_idx_about_single" className="secbox secbox_idx js-scroll secbox_idx_about_one">
            <div className="secbox_bg">
                <div className="container">
                    <div className="secbox_inner">

                        <div className="itembox_sectop">
                            <div className="heading heading_sec js-scroll">
                                <div className="heading-main">
                                    <div className="secbox-order">01</div>
                                    <h1 className="heading-text">關於本會</h1>
                                    <div className="heading-dec"></div>
                                </div>
                            </div>
                        </div>

                        <div className="secbox_main">
                            <div className="card card_about_one">
                                <div className="row">
                                    <div className="col-lg-4 fadeUp js-scroll">
                                        <div className="card-photo">
                                            <a href="/about?new_sn=7887">
                                                <img
                                                    src="/asd_files/s2026072114355550.jpg"
                                                    alt="成立宗旨"
                                                    width={1024}
                                                    height={738}
                                                    loading="lazy"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 fadeUp js-scroll">
                                        <div className="card-body">
                                            <h3 className="card-name">
                                                <span className="card-name-text">成立宗旨</span>
                                            </h3>
                                            <div className="card-text editor">
                                                國際同濟會為全球性的志工社團，秉持一步一腳印的精神，致力服務兒童與社區，改善世界。
                                                <br /><br />
                                                <a href="https://maps.app.goo.gl/fJ3niE4JeGarxzhm6" target="_blank" rel="noopener">
                                                    • 本會地址：708004 臺南市安平區中華西路二段315號5樓
                                                </a>
                                                <p>• mail：bear50197@gmail.com</p>
                                            </div>
                                            <div className="card-btnbar card-btnbar_more">
                                                <a href="/about?new_sn=7887" className="card-btn card-btn_more">
                                                    <span className="card-btn-text">更多</span>
                                                    <span className="iconsvg icon-view-more"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
