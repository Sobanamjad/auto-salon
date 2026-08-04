const linkItems = [
    {
        href: 'https://www.kiwanis.org.tw/',
        title: '國際同濟會台灣總會',
        img: '/asd_files/s20260722143043100.png',
        imgW: 1024, imgH: 1024,
    },
    {
        href: 'https://www.youtube.com/@同濟新聞台',
        title: '同濟新聞台',
        img: '/asd_files/s2026072214362130.png',
        imgW: 1024, imgH: 1024,
    },
    {
        href: 'https://drive.google.com/drive/folders/0B1BHPOKkSSugZUFEckM3RTZjYkE?resourcekey=0-UgELiJx818yBj1p6SyfvnQ',
        title: '網路硬碟',
        img: '/asd_files/s2026072214383290.png',
        imgW: 1024, imgH: 1024,
    },
    {
        href: 'https://www.tainan.gov.tw/Default.aspx',
        title: '台南市政府',
        img: '/asd_files/s202507251351370.png',
        imgW: 1024, imgH: 600,
    },
    {
        href: 'https://b-partner.org/',
        title: '商務夥伴協會',
        img: '/asd_files/s2026071314025490.png',
        imgW: 1024, imgH: 1024,
    },
];

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
                                {linkItems.map((link, index) => (
                                    <li key={index}>
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
