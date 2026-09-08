import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

interface MemberCategory {
    csn: string | null;
    label: string;
}

interface MemberItem {
    id: number;
    name: string;
    gender: string | null;
    position: string | null;
    company: string | null;
    phone: string | null;
    mobile: string | null;
    phone2: string | null;
    phone3: string | null;
    email: string | null;
    website: string | null;
    fax: string | null;
    line_id: string | null;
    address: string | null;
    photo: string | null;
    photo_w: number | null;
    photo_h: number | null;
    intro: string | null;
    category: string | null;
}

type Props = {
    csn?: string | null;
    searchTitle?: string | null;
    members: MemberItem[];
    categories: MemberCategory[];
};

export default function Member({
    csn = null,
    searchTitle = null,
    members = [],
    categories = [],
}: Props) {
    useForceLightMode();

    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const activeLabel = categories.find(c => c.csn === csn)?.label ?? '全部';

    // Collect all non-empty phone numbers for a member
    const getPhones = (m: MemberItem): string[] =>
        [m.phone, m.mobile, m.phone2, m.phone3].filter(Boolean) as string[];

    return (
        <>
            <Head>
                <title>會員資訊-永康國際同濟會</title>
                <meta name="description" content="永康國際同濟會" />
                <meta name="keywords" content="永康國際同濟會" />
                <link rel="stylesheet" href="/asd_files/base.css" />
                <link rel="stylesheet" href="/asd_files/blue.css" />
                <link rel="stylesheet" href="/asd_files/common.css" />
                <link rel="stylesheet" href="/asd_files/main.css" />
                <link rel="stylesheet" href="/asd_files/animate.css" />
                <script src="/asd_files/jquery-3.7.1.min.js" defer={true} />
                <script src="/asd_files/customize.js" defer={true} />
                <script src="/asd_files/marquee.js" defer={true} />
            </Head>

            <div className="wrapper">
                <SalonHeader
                    banner={
                        <div className="banner-single">
                            <img
                                src="/memmer_files/202607101311260619.png"
                                alt="會員資訊"
                                width={2032}
                                height={528}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    }
                />

                <SalonMarquee />

                <main className="main">
                    <div className="main_inner">
                        <section className="secbox_page">
                            <div className="maintop">
                                <div className="container">
                                    <div className="maintop_inner">
                                        <div className="heading_module">
                                            <span className="heading-text">會員資訊</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-會員資訊">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">首頁</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/member" title="永康國際同濟會 - 會員資訊">會員資訊</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {activeLabel}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="secbox_inner">
                                    <div className="heading heading_main">
                                        <h1 className="heading-text">{activeLabel}</h1>
                                    </div>

                                    <div className="main-columns-wrap">
                                        {/* ── Sidebar ── */}
                                        <div className="main-columns-left">
                                            <div className="searchbar">
                                                <div className="search">
                                                    <form
                                                        name="form1"
                                                        method="get"
                                                        action="/member"
                                                        role="search"
                                                    >
                                                        <input type="hidden" name="this_page" value="1" />
                                                        {csn && (
                                                            <input type="hidden" name="new_csn" value={csn} />
                                                        )}
                                                        <input
                                                            type="text"
                                                            className="search-input"
                                                            name="sel_title"
                                                            defaultValue={searchTitle ?? ''}
                                                            placeholder="姓名、公司搜尋..."
                                                        />
                                                        <button type="submit" className="search-btn" title="搜尋">
                                                            <img src="/asd_files/icon-search.png" width={20} alt="搜尋" />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>

                                            <ul className="jsmtree pdmenu">
                                                {categories.map(category => (
                                                    <li
                                                        key={category.csn ?? 'all'}
                                                        className={`cate-item ${(category.csn ?? null) === csn ? 'active' : ''}`}
                                                    >
                                                        <a
                                                            href={category.csn ? `/member?new_csn=${category.csn}` : '/member'}
                                                            title={category.label}
                                                            className={(category.csn ?? null) === csn ? 'is-current' : ''}
                                                        >
                                                            <span className="cate-text">{category.label}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* ── Member accordion ── */}
                                        <div className="main-columns-right">
                                            {/* Headline row */}
                                            <div className="card_member card_member_headline">
                                                <div className="card-tr">
                                                    <div className="card-td name">姓名</div>
                                                    <div className="card-td company">單位</div>
                                                    <div className="card-td jobtitle"></div>
                                                </div>
                                            </div>

                                            <div className="accordion_member" id="accordion-member">
                                                {members.length === 0 ? (
                                                    <p style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
                                                        暫無會員資料
                                                    </p>
                                                ) : (
                                                    members.map(member => {
                                                        const isOpen = openAccordion === member.id;
                                                        const phones = getPhones(member);

                                                        // Split name and bracketed suffix e.g. "曾小化 [資料示意]"
                                                        const nameParts = member.name.split('[');
                                                        const mainName = nameParts[0].trim();
                                                        const nameSuffix = nameParts[1] ? `[${nameParts[1]}` : null;

                                                        return (
                                                            <div key={member.id} className="accordion-item card_member">
                                                                <button
                                                                    className={`accordion-button card-header ${isOpen ? 'active' : ''}`}
                                                                    onClick={() => toggleAccordion(member.id)}
                                                                    type="button"
                                                                >
                                                                    <div className="card-tr">
                                                                        <div className="card-td name">
                                                                            <h3 className="card-name">
                                                                                <span>{mainName}</span>
                                                                                {nameSuffix && <span> {nameSuffix}</span>}
                                                                            </h3>
                                                                        </div>
                                                                        <div className="card-td company">{member.company ?? ''}</div>
                                                                        <div className="card-td jobtitle">{member.position ?? ''}</div>
                                                                    </div>
                                                                    <div className="accordion-icon"></div>
                                                                </button>

                                                                {/* max-height drives the CSS transition */}
                                                                <div
                                                                    className="accordion-content"
                                                                    style={{ maxHeight: isOpen ? '9999px' : '0' }}
                                                                >
                                                                    <div className="card-body">
                                                                        <div className="card-body-row">
                                                                            {/* Photo */}
                                                                            <div className="card-body-left">
                                                                                <div className="card-photo">
                                                                                    {member.photo ? (
                                                                                        <img
                                                                                            src={member.photo}
                                                                                            alt={member.name}
                                                                                            width={member.photo_w ?? undefined}
                                                                                            height={member.photo_h ?? undefined}
                                                                                        />
                                                                                    ) : (
                                                                                        <div style={{ width: 120, height: 120, background: '#eee' }} />
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                            {/* Info list */}
                                                                            <div className="card-body-right">
                                                                                <ul className="card-infolist">
                                                                                    {/* 單位名稱 */}
                                                                                    {member.company && (
                                                                                        <li>
                                                                                            <div className="card-info">
                                                                                                <span className="card-info-title">單位名稱</span>
                                                                                                <span className="card-info-text">
                                                                                                    {member.website ? (
                                                                                                        <a href={member.website} target="_blank" rel="noopener noreferrer">
                                                                                                            {member.company}
                                                                                                        </a>
                                                                                                    ) : (
                                                                                                        member.company
                                                                                                    )}
                                                                                                </span>
                                                                                            </div>
                                                                                        </li>
                                                                                    )}
                                                                                    {/* 公司網址 */}
                                                                                    {member.website && (
                                                                                        <li>
                                                                                            <div className="card-info">
                                                                                                <span className="card-info-title">公司網址</span>
                                                                                                <span className="card-info-text">
                                                                                                    <a href={member.website} target="_blank" rel="noopener noreferrer">
                                                                                                        前往官網
                                                                                                    </a>
                                                                                                </span>
                                                                                            </div>
                                                                                        </li>
                                                                                    )}
                                                                                    {/* 姓名 */}
                                                                                    <li>
                                                                                        <div className="card-info">
                                                                                            <span className="card-info-title">姓名</span>
                                                                                            <span className="card-info-text">{member.name}</span>
                                                                                        </div>
                                                                                    </li>
                                                                                    {/* 聯絡電話 (all) */}
                                                                                    {phones.map((phone, idx) => (
                                                                                        <li key={idx}>
                                                                                            <div className="card-info">
                                                                                                <span className="card-info-title">聯絡電話</span>
                                                                                                <span className="card-info-text">{phone}</span>
                                                                                            </div>
                                                                                        </li>
                                                                                    ))}
                                                                                    {/* 傳真 */}
                                                                                    {member.fax && (
                                                                                        <li>
                                                                                            <div className="card-info">
                                                                                                <span className="card-info-title">傳真</span>
                                                                                                <span className="card-info-text">{member.fax}</span>
                                                                                            </div>
                                                                                        </li>
                                                                                    )}
                                                                                    {/* LINE */}
                                                                                    {member.line_id && (
                                                                                        <li>
                                                                                            <div className="card-info">
                                                                                                <span className="card-info-title">LINE</span>
                                                                                                <span className="card-info-text">{member.line_id}</span>
                                                                                            </div>
                                                                                        </li>
                                                                                    )}
                                                                                    {/* E-MAIL */}
                                                                                    {member.email && (
                                                                                        <li>
                                                                                            <div className="card-info">
                                                                                                <span className="card-info-title">E-MAIL</span>
                                                                                                <span className="card-info-text">{member.email}</span>
                                                                                            </div>
                                                                                        </li>
                                                                                    )}
                                                                                    {/* 通訊地址 */}
                                                                                    {member.address && (
                                                                                        <li>
                                                                                            <div className="card-info">
                                                                                                <span className="card-info-title">通訊地址</span>
                                                                                                <span className="card-info-text">{member.address}</span>
                                                                                            </div>
                                                                                        </li>
                                                                                    )}
                                                                                </ul>
                                                                            </div>
                                                                        </div>

                                                                        {/* 個人介紹 */}
                                                                        {member.intro && (
                                                                            <div className="card-intro">
                                                                                <div className="card-intro-heading">個人介紹</div>
                                                                                <div
                                                                                    className="card-intro-text editor"
                                                                                    dangerouslySetInnerHTML={{ __html: member.intro }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>

                                            <div className="page">
                                                <br />
                                                Total {members.length}
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                <SalonFooter />
            </div>
        </>
    );
}
