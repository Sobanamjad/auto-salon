type LinkItem = {
    id: number;
    title: string;
    url: string;
    img: string | null;
    img_w: number | null;
    img_h: number | null;
};

type Props = {
    links: LinkItem[];
};

export default function SalonLinks({ links }: Props) {
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
                                {links.map(link => (
                                    <li key={link.id}>
                                        <div className="card card_link effect_topslash fadeUp js-scroll">
                                            <div className="row g-3">
                                                <div>
                                                    <div className="card-photo">
                                                        <a href={link.url} title={link.title} target="_blank" rel="noopener noreferrer">
                                                            <div className="item-fitimg">
                                                                <img
                                                                    src={link.img || '/asd_files/placeholder.png'}
                                                                    alt={link.title}
                                                                    width={link.img_w || 1024}
                                                                    height={link.img_h || 1024}
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
                                                            <a href={link.url} title={link.title} target="_blank" rel="noopener noreferrer">
                                                                <span className="card-name-text">{link.title}</span>
                                                            </a>
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="hidden">
                                                    <div className="card-btnbar card-btnbar_outlink">
                                                        <a href={link.url} className="card-btn card-btn_outlink" title={link.title} target="_blank" rel="noopener noreferrer">
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
