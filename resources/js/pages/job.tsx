import { Head } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';

type JobListing = {
    id: number;
    job_no: string;
    job_title: string;
    salary: string;
    work_hours: string;
    vacancies: string;
    job_requirements: string;
    job_content: string;
    company: string;
    contact_person: string;
    contact_gender: string;
    contact_phone: string;
    contact_mobile: string;
    work_location: string;
    work_area: string;
    nearby_school_1: string;
    nearby_school_2: string;
    contact_email: string;
    contact_web: string;
};

type Props = {
    jobs: JobListing[];
};

export default function Job({ jobs }: Props) {
    useForceLightMode();

    // Default to first job if viewing list
    const job = jobs.length > 0 ? jobs[0] : null;

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
                                                    {job?.job_title || '職缺列表'}
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
                                            {jobs.map(item => (
                                                <li
                                                    key={item.id}
                                                    className={item.id === job?.id ? 'active' : ''}
                                                >
                                                    <a
                                                        href={`/job/${item.id}`}
                                                        title={item.job_title}
                                                    >
                                                        <span className="cate-text">{item.job_title}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="heading heading_main">
                                        <h1 className="heading-text">{job?.job_title || '職缺列表'}</h1>
                                    </div>

                                    {job ? (
                                        <>
                                            <div className="card card_job jobperson fadeUp js-scroll">
                                        <div className="card-body">
                                            <div className="card-name">
                                                <h2 className="card-name-text">徵才內容</h2>
                                            </div>

                                            <ul className="card-infolist">
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">職務名稱</span>
                                                        <span className="card-info-text">{job.job_title}</span>
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
                                                        <span className="card-info-text">{job.work_hours}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">名額</span>
                                                        <span className="card-info-text">{job.vacancies}</span>
                                                    </div>
                                                </li>
                                                <li className="w-100">
                                                    <div className="card-info">
                                                        <span className="card-info-title">具備條件</span>
                                                        <div
                                                            className="card-info-text editor"
                                                            dangerouslySetInnerHTML={{
                                                                __html: job.job_requirements,
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
                                                                __html: job.job_content,
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
                                                        <span className="card-info-text">{job.company}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">聯絡人</span>
                                                        <span className="card-info-text">{job.contact_person} {job.contact_gender}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">聯絡電話</span>
                                                        <span className="card-info-text">{job.contact_phone}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">聯絡手機</span>
                                                        <span className="card-info-text">{job.contact_mobile}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">工作地點</span>
                                                        <span className="card-info-text">{job.work_location}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">所在地區</span>
                                                        <span className="card-info-text">{job.work_area}</span>
                                                    </div>
                                                </li>
                                                {job.nearby_school_1 && (
                                                    <li>
                                                        <div className="card-info">
                                                            <span className="card-info-title">鄰近學校</span>
                                                            <span className="card-info-text">{job.nearby_school_1}</span>
                                                        </div>
                                                    </li>
                                                )}
                                                {job.nearby_school_2 && (
                                                    <li>
                                                        <div className="card-info">
                                                            <span className="card-info-title">鄰近學校</span>
                                                            <span className="card-info-text">{job.nearby_school_2}</span>
                                                        </div>
                                                    </li>
                                                )}
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">E-Mail</span>
                                                        <span className="card-info-text">{job.contact_email}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-info">
                                                        <span className="card-info-title">網址</span>
                                                        <span className="card-info-text">
                                                            {job.contact_web && (
                                                                <a
                                                                    href={job.contact_web}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    title="網址"
                                                                >
                                                                    {job.contact_web}
                                                                </a>
                                                            )}
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                        <div className="consult consult_view">
                                            <div className="btnbar btnbar_consult">
                                                <a
                                                    href={`/contact?new_sn=${job.job_no}&tmp_table=web_job`}
                                                    className="btn btn_consult"
                                                >
                                                    <span className="iconsvg icon-question"></span>
                                                    <span className="btn-text">問題諮詢</span>
                                                </a>
                                            </div>
                                        </div>
                                        </>
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
                                            暫無職缺資料
                                        </div>
                                    )}
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
