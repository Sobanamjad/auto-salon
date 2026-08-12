import { linkItems } from '@/data/link-items';

export default function SalonLinks() {
    return (
        <section id="secbox_idx_link" className="secbox secbox_idx js-scroll">
            <div className="secbox_bg">
                <div className="container">
                    <div className="secbox_inner">

                        <div className="itembox_sectop">
                            <div className="heading heading_sec js-scroll">
                                <div className="heading-main">
                                    <div className="secbox-order">09</div>
                                    <h2 className="heading-text">相關連結</h2>
                                    <div className="heading-dec"></div>
                                </div>
                            </div>
                        </div>

                        <div className="secbox_main">
                            <ul className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                                {linkItems.map(link => (
                                    <li key={link.title}>
                                        <div className="card card_link effect_topslash fadeUp js-scroll">
                                            <div className="row g-3">
                                                <div>
                                                    <div className="card-photo">
                                                        <a href={link.href} title={link.title} target="_blank" rel="noopener noreferrer">
                                                            <div className="item-fitimg">
                                                                <img
                                                                    src={link.img}
                                                                    alt={link.title}
                                                                    width={link.imgW}
                                                                    height={link.imgH}
                                                                    loading="lazy"
                                                                    className="fitimg"
                                                                />
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="card-body">
                                                        <h3 className="card-name">
                                                            <a href={link.href} title={link.title} target="_blank" rel="noopener noreferrer">
                                                                <span className="card-name-text">{link.title}</span>
                                                            </a>
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="hidden">
                                                    <div className="card-btnbar card-btnbar_outlink">
                                                        <a href={link.href} className="card-btn card-btn_outlink" title={link.title} target="_blank" rel="noopener noreferrer">
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
                                <a href="/link" className="btn btn_idxmore">
                                    <span className="btn-text">更多相關連結</span>
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
