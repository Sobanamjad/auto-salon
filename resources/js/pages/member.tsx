import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import {
    filterMemberItems,
    getMemberCategoryLabel,
    memberCategories,
} from '@/data/member-items';

type Props = {
    csn?: string | null;
    searchTitle?: string | null;
};

export default function Member({ csn = null, searchTitle = null }: Props) {
    useForceLightMode();

    const activeCsn = csn ?? null;
    const activeLabel = getMemberCategoryLabel(activeCsn);
    const items = filterMemberItems(activeCsn, searchTitle);

    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const toggleAccordion = (sn: string) => {
        setOpenAccordion(openAccordion === sn ? null : sn);
    };

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
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="/member" title="永康國際同濟會 - 會員資訊">
                                                        會員資訊
                                                    </a>
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
                                        {/* Sidebar: search + category filter */}
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
                                                        {activeCsn && (
                                                            <input type="hidden" name="new_csn" value={activeCsn} />
                                                        )}
                                                        <input
                                                            type="text"
                                                            className="search-input"
                                                            name="sel_title"
                                                            defaultValue={searchTitle ?? ''}
                                                            placeholder="搜尋..."
                                                        />
                                                        <button type="submit" className="search-btn" title="搜尋">
                                                            <img src="/asd_files/icon-search.png" width={20} alt="搜尋" />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>

                                            <ul className="jsmtree pdmenu">
                                                {memberCategories.map(category => (
                                                    <li
                                                        key={category.label}
                                                        className={
                                                            `cate-item ${(category.csn ?? null) === activeCsn ? 'active' : ''}`
                                                        }
                                                    >
                                                        <a
                                                            href={
                                                                category.csn
                                                                    ? `/member?new_csn=${category.csn}`
                                                                    : '/member'
                                                            }
                                                            title={category.label}
                                                            className={
                                                                (category.csn ?? null) === activeCsn ? 'is-current' : ''
                                                            }
                                                        >
                                                            <span className="cate-text">{category.label}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Main content: member accordion */}
                                        <div className="main-columns-right">

                                            {/* Headline */}
                                            <div className="card_member card_member_headline">
                                                <div className="card-tr">
                                                    <div className="card-td name">姓名</div>
                                                    <div className="card-td company">單位</div>
                                                    <div className="card-td jobtitle"></div>
                                                </div>
                                            </div>

                                            {/* Accordion Members */}
                                            <div className="accordion_member" id="accordion-member">
                                                {items.map(member => {
                                                    const isOpen = openAccordion === member.sn;
                                                    return (
                                                        <div key={member.sn} className="accordion-item card_member">
                                                            <button
                                                                className={`accordion-button card-header ${isOpen ? 'active' : ''}`}
                                                                onClick={() => toggleAccordion(member.sn)}
                                                                type="button"
                                                            >
                                                                <div className="card-tr">
                                                                    <div className="card-td name">
                                                                        <h3 className="card-name">
                                                                            <span>{member.name.split('[')[0].trim()}</span>
                                                                            {member.name.includes('[') && (
                                                                                <span> [{member.name.split('[')[1]}</span>
                                                                            )}
                                                                        </h3>
                                                                    </div>
                                                                    <div className="card-td company">{member.company}</div>
                                                                    <div className="card-td jobtitle">{member.jobTitle || ''}</div>
                                                                </div>

                                                                <div className="accordion-icon"></div>
                                                            </button>

                                                            <div
                                                                className="accordion-content"
                                                                style={{ display: isOpen ? 'block' : 'none' }}
                                                            >
                                                                <div className="card-body">
                                                                    <div className="card-body-row">
                                                                        <div className="card-body-left">
                                                                            <div className="card-photo">
                                                                                <img
                                                                                    src={member.photo}
                                                                                    alt={member.name}
                                                                                    width={member.photoW}
                                                                                    height={member.photoH}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-body-right">
                                                                            <ul className="card-infolist">
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
                                                                                <li>
                                                                                    <div className="card-info">
                                                                                        <span className="card-info-title">姓名</span>
                                                                                        <span className="card-info-text">{member.name}</span>
                                                                                    </div>
                                                                                </li>
                                                                                {member.phones.map((phone, idx) => (
                                                                                    <li key={idx}>
                                                                                        <div className="card-info">
                                                                                            <span className="card-info-title">聯絡電話</span>
                                                                                            <span className="card-info-text">{phone}</span>
                                                                                        </div>
                                                                                    </li>
                                                                                ))}
                                                                                {member.line && (
                                                                                    <li>
                                                                                        <div className="card-info">
                                                                                            <span className="card-info-title">LINE</span>
                                                                                            <span className="card-info-text">{member.line}</span>
                                                                                        </div>
                                                                                    </li>
                                                                                )}
                                                                                {member.email && (
                                                                                    <li>
                                                                                        <div className="card-info">
                                                                                            <span className="card-info-title">E-MAIL</span>
                                                                                            <span className="card-info-text">{member.email}</span>
                                                                                        </div>
                                                                                    </li>
                                                                                )}
                                                                                {member.address && (
                                                                                    <li>
                                                                                        <div className="card-info">
                                                                                            <span className="card-info-title">地址</span>
                                                                                            <span className="card-info-text">{member.address}</span>
                                                                                        </div>
                                                                                    </li>
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="page">
                                                <span>1</span>
                                                <br />
                                                <br />
                                                Total {items.length} - 1 / 1
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
