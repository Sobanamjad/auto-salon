import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

type JobListing = {
    sn: string;
    title: string;
    salary: string;
    hours: string;
    quota: string;
    requirementsHtml: string;
    dutiesHtml: string;
    department: string;
    contactPerson: string;
    contactPhone: string;
    contactMobile: string;
    workLocation: string;
    region: string;
    nearbySchools: string[];
    email: string;
    websiteUrl: string;
    websiteLabel: string;
};

const jobListings: JobListing[] = [
    {
        sn: '1100',
        title: '行政專員[內容示意]',
        salary: '29500',
        hours: 'am8:30-pm5:30',
        quota: '',
        requirementsHtml:
            '<p>1.熟電腦文書軟體</p><p>2.打字60字以上</p><p>3.台語流利</p><p>&nbsp;</p>',
        dutiesHtml:
            '<p>[內容示意]</p><p>1.文件收發</p><p>2.會議記錄</p><p>3.行政庶務</p><p>4.電話接聽協助諮詢回覆與轉接對應部門</p><p>5.主管交辦事項</p>',
        department: '行政部',
        contactPerson: '陳 先生',
        contactPhone: '06-2667100',
        contactMobile: '',
        workLocation: '本會',
        region: '台南市安平區',
        nearbySchools: ['嘉南藥理大學', ''],
        email: 'service@posu.com.tw',
        websiteUrl: 'http://posu.tw/',
        websiteLabel: 'posu.tw',
    },
];

type Props = {
    newSn?: string;
};

export default function Job({ newSn = '1100' }: Props) {
    useForceLightMode();

    const job = jobListings.find(item => item.sn === newSn) ?? jobListings[0];

    return (
        <>
            <Head>
                <title>{`${job.title} - 永康國際同濟會`}</title>
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
                                src="/asd_files/202607101344065677.png"
                                alt="人才招募"
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
                                            <span className="heading-text">人才招募</span>
                                        </div>
                                        <nav className="breadcrumb-nav" aria-label="導覽路徑-人才招募">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="/" title="永康國際同濟會 - 首頁">
                                                        首頁
                                                    </a>
                                                </li>
                                                <li className="breadcrumb-item">人才招募</li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    {job.title}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="secbox_inner">
                                    <div className="category_box">
                                        <ul className="category_list">
                                            {jobListings.map(item => (
                                                <li
                                                    key={item.sn}
                                                    className={item.sn === job.sn ? 'active' : ''}
                                                >
                                                    <a
                                                        href={`/job?new_sn=${item.sn}`}
                                                        title={item.title}
                                                    >
                                                        <span className="cate-text">{item.title}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="heading heading_main">
                                        <h1 className="heading-text">{job.title}</h1>
                                    </div>

                                    <div className="card card_job jobperson fadeUp js-scroll">
                                        <div className="card-body">
                                            <div className="card-name">
                                                <h2 className="card-name-text">徵才內容</h2>
                                            </div>

                                            <ul className="card-infolist">
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">職務名稱</span>
                                                        <span className="card-info-text">{job.title}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">薪資待遇</span>
                                                        <span className="card-info-text">{job.salary}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">上班時段</span>
                                                        <span className="card-info-text">{job.hours}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">名額</span>
                                                        <span className="card-info-text">{job.quota}</span>
                                                    </div>
                                                </li>
                                                <li className="w-100">
                                                    <div className="card-info">
                                                        <span className="card-info-title">具備條件</span>
                                                        <div
                                                            className="card-info-text editor"
                                                            dangerouslySetInnerHTML={{
                                                                __html: job.requirementsHtml,
                                                            }}
                                                        />
                                                    </div>
                                                </li>
                                                <li className="w-100">
                                                    <div className="card-info">
                                                        <span className="card-info-title">工作內容</span>
                                                        <div
                                                            className="card-info-text editor"
                                                            dangerouslySetInnerHTML={{
                                                                __html: job.dutiesHtml,
                                                            }}
                                                        />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="card card_job jobunit fadeUp js-scroll">
                                        <div className="card-body">
                                            <div className="card-name">
                                                <h2 className="card-name-text">徵才單位</h2>
                                            </div>

                                            <ul className="card-infolist">
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">徵才單位</span>
                                                        <span className="card-info-text">{job.department}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">聯絡人</span>
                                                        <span className="card-info-text">{job.contactPerson}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">聯絡電話</span>
                                                        <span className="card-info-text">{job.contactPhone}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">聯絡手機</span>
                                                        <span className="card-info-text">{job.contactMobile}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">工作地點</span>
                                                        <span className="card-info-text">{job.workLocation}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">所在地區</span>
                                                        <span className="card-info-text">{job.region}</span>
                                                    </div>
                                                </li>
                                                {job.nearbySchools.map((school, index) => (
                                                    <li key={index}>
                                                        <div className="card-info">
                                                            <span className="card-info-title">鄰近學校</span>
                                                            <span className="card-info-text">{school}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">E-Mail</span>
                                                        <span className="card-info-text">{job.email}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">網址</span>
                                                        <span className="card-info-text">
                                                            <a
                                                                href={job.websiteUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                title="網址"
                                                            >
                                                                {job.websiteLabel}
                                                            </a>
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="consult consult_view">
                                        <div className="btnbar btnbar_consult">
                                            <a
                                                href={`/contact?new_sn=${job.sn}&tmp_table=web_job`}
                                                className="btn btn_consult"
                                            >
                                                <span className="iconsvg icon-question"></span>
                                                <span className="btn-text">問題諮詢</span>
                                            </a>
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
