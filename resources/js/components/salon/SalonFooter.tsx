import { useEffect, useState } from 'react';

export default function SalonFooter() {
    const [fabOpen, setFabOpen] = useState(false);

    // Scroll to top helper
    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Show/hide scroll-top button based on scroll position
    const [showTop, setShowTop] = useState(false);
    useEffect(() => {
        const handler = () => setShowTop(window.scrollY > 300);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <>
            <footer className="footer">
                <div className="footer_main">
                    <div className="container">

                        <ul className="infolist infolist_footer_company">
                            <li>
                                <div className="info">
                                    <span className="info-title">電話</span>：
                                    <span className="info-text">
                                        <a href="tel:+886920776819">0920-776-819</a>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="info">
                                    <span className="info-title">信箱</span>：
                                    <span className="info-text">
                                        <a href="mailto:bear50197@gmail.com">bear50197@gmail.com</a>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="info">
                                    <span className="info-title">地址</span>：
                                    <span className="info-text">
                                        <a href="https://www.google.com/maps?q=708+臺南市安平區中華西路二段315號5樓" target="_blank" rel="noopener noreferrer">
                                            708 臺南市安平區中華西路二段315號5樓
                                        </a>
                                    </span>
                                </div>
                            </li>
                        </ul>

                        <ul className="flexbar gap-2 justify-center navbar_social">
                            <li className="navline navline_fb">
                                <div className="navlink_social navlink_fb">
                                    <a href="https://www.facebook.com/profile.php?id=61558088173434" target="_blank" rel="noopener noreferrer" title="永康國際同濟會 - facebook">
                                        <span className="navlink-icon iconsvg icon-fb"></span>
                                        <span className="navlink-text">Facebook</span>
                                    </a>
                                </div>
                            </li>
                            <li className="navline navline_mail">
                                <div className="navlink_social navlink_mail">
                                    <a href="mailto:bear50197@gmail.com" title="永康國際同濟會 - E-Mail">
                                        <span className="navlink-icon iconsvg icon-mail"></span>
                                        <span className="navlink-text">E-Mail</span>
                                    </a>
                                </div>
                            </li>
                            <li className="navline navline_home">
                                <div className="navlink_social navlink_home">
                                    <a href="/" title="永康國際同濟會 - 回首頁">
                                        <span className="navlink-icon iconsvg icon-home"></span>
                                        <span className="navlink-text">回首頁</span>
                                    </a>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>

                <div className="footer_btm">
                    <div className="container">
                        <ul className="row row-cols-xl-2 align-lg-end">
                            <li>
                                <ul className="row g-1 web-foot text-center text-lg-left">
                                    <li>
                                        © 永康國際同濟會<br />
                                        All rights reserved.{' '}
                                        <a href="/privacy">隱私權</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul className="row g-1 web-foot text-center text-lg-right">
                                    <li>
                                        Design by{' '}
                                        <a href="https://posu.tw/" target="_blank" rel="noopener noreferrer">POSU</a>
                                        {' & '}
                                        <a href="https://sys.posu.tw/" target="_blank" rel="noopener noreferrer">後台管理</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>

            {/* FAB container */}
            <div className={`fab-container${fabOpen ? ' is-open' : ''}`} id="fabContainer">
                <div className="fab-menu">
                    <a className="fablink fablink_fb" href="https://www.facebook.com/profile.php?id=61558088173434" target="_blank" rel="noopener noreferrer" title="FaceBook">
                        <span className="iconsvg icon-fb"></span>
                    </a>
                </div>
                <button
                    className="fablink fablink-main"
                    id="fabMainBtn"
                    aria-label="選單"
                    title="選單"
                    onClick={() => setFabOpen(prev => !prev)}
                >
                    <span className="iconsvg icon-share"></span>
                    <span className="iconsvg icon-close"></span>
                </button>
                {showTop && (
                    <a href="#" className="fablink fablink_top scrolltop" title="永康國際同濟會 - 回頂端" onClick={scrollToTop}>
                        <span className="iconsvg icon-scrolltop"></span>
                    </a>
                )}
            </div>

            {/* Sticky bottom bar (mobile) */}
            <div className="sticky-btmbar">
                <div className="sticky-btmbar-container">
                    <a href="#" className="sticky-actbtn actbtn_menu menu_switchon" title="選單">
                        <span className="sidelink-icon iconsvg icon-hamburger"></span>
                        <span className="actbtn-text">選單</span>
                    </a>
                    <a className="sticky-actbtn actbtn_fb" href="https://www.facebook.com/profile.php?id=61558088173434" target="_blank" rel="noopener noreferrer" title="FaceBook">
                        <span className="iconsvg icon-fb"></span>
                        <span className="actbtn-text">FB</span>
                    </a>
                    <div className="divider"></div>
                    {showTop && (
                        <a href="#" className="sticky-actbtn actbtn_top scrolltop" title="回頂端" onClick={scrollToTop}>
                            <span className="sidelink-icon iconsvg icon-scrolltop-mobile"></span>
                            <span className="actbtn-text">TOP</span>
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}
