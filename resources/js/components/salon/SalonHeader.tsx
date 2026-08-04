import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const menuItems = [
    { text: '首頁', subtext: 'Index', href: '/' },
    {
        text: '關於本會', subtext: '關於本會', href: '/about',
        children: [
            { text: '成立宗旨', href: '/about?new_sn=7887' },
            { text: '組織章程', href: '/about?new_sn=7886' },
        ],
    },
    { text: '本會簡史', subtext: '本會簡史', href: '/timeline' },
    {
        text: '理監事(組織)', subtext: '理監事(組織)', href: '/works',
        children: [
            { text: '全部', href: '/works' },
            { text: '現任會長', href: '/works?new_csn=1694' },
            { text: '理監事', href: '/works?new_csn=1700' },
            { text: '會務幹部', href: '/works?new_csn=1701' },
            { text: '會務顧問', href: '/works?new_csn=1695' },
            { text: '歷屆會長', href: '/works?new_csn=1692' },
        ],
    },
    {
        text: '會員資訊', subtext: '會員資訊', href: '/member',
        children: [
            { text: '全部', href: '/member' },
            { text: '水電工程', href: '/member?new_csn=307&lang=TS' },
            { text: '資訊科技', href: '/member?new_csn=303&lang=TS' },
            { text: '製造業', href: '/member?new_csn=302&lang=TS' },
        ],
    },
    {
        text: '訊息公佈欄', subtext: '訊息公佈欄', href: '/news',
        children: [
            { text: '全部', href: '/news' },
            { text: '會務訊息', href: '/news?new_csn=3604' },
            { text: '會務活動', href: '/news?new_csn=3603' },
        ],
    },
    {
        text: '活動資訊', subtext: '活動資訊', href: '/announcement',
        children: [
            { text: '全部', href: '/announcement' },
            { text: '行事曆', href: '/announcement?sel_nncsn=3' },
            { text: '總會活動', href: '/announcement?sel_nncsn=1' },
            { text: '本會活動', href: '/announcement?new_csn=733' },
            { text: '好友的活動', href: '/announcement?sel_nncsn=2' },
        ],
    },
    {
        text: '活動剪影', subtext: '活動剪影', href: '/albums',
        children: [
            { text: '全部', href: '/albums' },
            { text: '2026年', href: '/albums?new_mcsn=2383' },
            { text: '2025年', href: '/albums?new_mcsn=2382' },
            { text: '2024年', href: '/albums?new_mcsn=2381' },
        ],
    },
    {
        text: '公文與表單', subtext: '公文與表單', href: '/download',
        children: [
            { text: '全部', href: '/download' },
            { text: '會議記錄', href: '/download?new_csn=364&lang=TS' },
            { text: '歷史公文', href: '/download?new_csn=363&lang=TS' },
            { text: '公文下載', href: '/download?new_csn=362&lang=TS' },
        ],
    },
    {
        text: '專欄園地', subtext: '專欄園地', href: '/article',
        children: [
            { text: '全部', href: '/article' },
            { text: '會友專欄', href: '/article?new_csn=3119&lang=TS' },
            { text: '會友動態', href: '/article?new_csn=3120&lang=TS' },
        ],
    },
    {
        text: '會員商品', subtext: '會員商品', href: '/product',
        children: [
            { text: '保養飾品', href: '/product?new_csn=7519&up_sn=0' },
            { text: '居家用品', href: '/product?new_csn=7518&up_sn=0' },
            { text: '吃吃喝喝', href: '/product?new_csn=7517&up_sn=0' },
        ],
    },
    {
        text: '常見問題', subtext: '常見問題', href: '/qa',
        children: [
            { text: '全部', href: '/qa' },
            { text: '加入問題', href: '/qa?new_csn=382&lang=TS' },
        ],
    },
    { text: '夥伴介紹', subtext: '夥伴介紹', href: '/people' },
    {
        text: '相關連結', subtext: '相關連結', href: '/link',
        children: [
            { text: '全部', href: '/link' },
            { text: '政府單位', href: '/link?new_csn=900&lang=TS' },
            { text: '本會相關', href: '/link?new_csn=899&lang=TS' },
        ],
    },
    { text: '專業新知', subtext: '專業新知', href: '/life' },
    {
        text: '人才招募', subtext: '人才招募', href: '/job',
        children: [
            { text: '行政專員[內容示意]', href: '/job?new_sn=1100&lang=TS' },
        ],
    },
    { text: '社團新聞', subtext: '社團新聞', href: '/uninews' },
    { text: '聯絡協會', subtext: '聯絡協會', href: '/contact' },
];

export default function SalonHeader({ banner }: { banner?: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState<Record<number, boolean>>({});
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [sidebarOpen]);

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    const toggleSubmenu = (index: number) => {
        setOpenSubmenus(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <>
            {/* Fixed function list (mobile top right) */}
            <div className="header_fixed">
                <ul className="funclist">
                    <li className="hidden lg-block">
                        <a href="/contact" className="funcbox fadedown js-scroll is-active" title="聯絡協會">
                            <div className="funcbox-inner">
                                <span className="iconsvg icon-phone"></span>
                                <span className="funcbox-text">+886920776819</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="funcbox funcbox_menu menu_switchon fadedown js-scroll is-active"
                            title="選單"
                            onClick={(e) => { e.preventDefault(); setSidebarOpen(true); }}
                        >
                            <div className="funcbox-inner">
                                <span className="iconsvg icon-hamburger"></span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Sidebar overlay */}
            <div
                id="sidebar-overlay"
                className={`sidebar-overlay${sidebarOpen ? ' is-active' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div
                id="sidebar"
                className={`sidebar${sidebarOpen ? ' is-open' : ''}`}
                ref={sidebarRef}
            >
                <div className="sidebar-header">
                    <button
                        id="sidebar-close"
                        className="sidebar-close"
                        aria-label="關閉"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <span className="iconsvg icon-close"></span>
                    </button>
                </div>

                <div className="sidebar-body custom-scrollbar">
                    <div className="sidebar-section">
                        <h3 className="sidebar-section-heading">選單</h3>
                        <ul className="sidebar_menu">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        title={item.text}
                                        className={item.href === '/' ? 'is-current' : ''}
                                        onClick={item.children ? (e) => { e.preventDefault(); toggleSubmenu(index); } : undefined}
                                    >
                                        <span className="menu-text">{item.text}</span>
                                        <span className="menu-subtext">{item.subtext}</span>
                                        {item.children && (
                                            <div className={`menu-subbtn${openSubmenus[index] ? ' is-open' : ''}`}></div>
                                        )}
                                    </a>
                                    {item.children && (
                                        <ul className={openSubmenus[index] ? 'is-visible' : ''}>
                                            {item.children.map((child, ci) => (
                                                <li key={ci}>
                                                    <a href={child.href}>{child.text}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="sidebar-footer">
                    © 永康國際同濟會
                </div>
            </div>

            {/* Header wrap */}
            <div className="header-wrap">
                <header className="header">
                    <div className="header_main">
                        <div className="header_row">

                            {/* Logo */}
                            <div className="header-one">
                                <div className="logo">
                                    <a href="/" title="永康國際同濟會 - 回首頁">
                                        <div className="logo-photo">
                                            <img
                                                src="/asd_files/202607211337474254.png"
                                                alt="永康國際同濟會"
                                                width={240}
                                                height={66}
                                                fetchPriority="high"
                                            />
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Desktop nav */}
                            <div className="header-two">
                                <ul className="menu">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <div className="menulink">
                                                <a href={item.href} title={item.text}>
                                                    <span className="menu-text">{item.text}</span>
                                                    <span className="menu-subtext">{item.subtext}</span>
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Header right buttons */}
                            <div className="header-three">
                                <ul className="funclist">
                                    <li className="hidden lg-block">
                                        <a href="/contact" className="funcbox fadedown js-scroll is-active" title="聯絡協會">
                                            <div className="funcbox-inner">
                                                <span className="iconsvg icon-phone"></span>
                                                <span className="funcbox-text">+886920776819</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="funcbox funcbox_menu menu_switchon fadedown js-scroll is-active"
                                            title="選單"
                                            onClick={(e) => { e.preventDefault(); setSidebarOpen(true); }}
                                        >
                                            <div className="funcbox-inner">
                                                <span className="iconsvg icon-hamburger"></span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </header>
                {banner}
            </div>
        </>
    );
}
