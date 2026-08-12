import { Head, useForm } from '@inertiajs/react';
import { useForceLightMode } from '@/hooks/use-force-light-mode';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonFooter from '@/components/salon/SalonFooter';
import { useCallback, useState } from 'react';

const MAP_EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.865656820449!2d120.18385617484994!3d22.991967117470566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e7672361574f7%3A0x2f6a8a6f784ac0db!2zNzA46Ie65Y2X5biC5a6J5bmz5Y2A5Y2U6YCy6YeM5Lit6I-v6KW_6Lev5LqM5q61MzE16Jmf!5e0!3m2!1szh-TW!2stw!4v1784613868430!5m2!1szh-TW!2stw';

export default function Contact() {
    useForceLightMode();

    const [captchaKey, setCaptchaKey] = useState(() => Date.now());
    const refreshCaptcha = useCallback(() => setCaptchaKey(Date.now()), []);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        mobile: '',
        message: '',
        code: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                reset('name', 'mobile', 'message', 'code');
                refreshCaptcha();
            },
            onError: () => refreshCaptcha(),
        });
    };

    return (
        <>
            <Head>
                <title>聯絡協會-永康國際同濟會</title>
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
                <SalonHeader />
                <SalonMarquee />

                <main className="main">
                    <div className="main_inner">
                        <div className="secwrap secwrap_contact">
                            <section id="secbox_idx_info" className="secbox secbox_idx">
                                <div className="secbox_bg">
                                    <div className="container">
                                        <div className="secbox_inner">
                                            <div className="heading heading_main">
                                                <h1 className="heading-text">聯絡資訊</h1>
                                            </div>

                                            <div className="secbox_main">
                                                <div className="contact-info-box">
                                                    <div className="contact-info_row">
                                                        <div className="contact-info-left">
                                                            <div className="mapbox_contact">
                                                                <iframe
                                                                    src={MAP_EMBED_URL}
                                                                    width="100%"
                                                                    height="100%"
                                                                    style={{ border: 0 }}
                                                                    allowFullScreen
                                                                    loading="lazy"
                                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                                    title="永康國際同濟會地圖"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="contact-info-right">
                                                            <ul className="infolist infolist_contact_company">
                                                                <li className="infoline infoline_phone">
                                                                    <div className="info info_phone">
                                                                        <span className="info-icon iconsvg icon-phone"></span>
                                                                        <span className="info-title">電話</span>
                                                                        <span className="info-text">
                                                                            <a href="tel:+886920776819">0920-776-819</a>
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li className="infoline infoline_mail">
                                                                    <div className="info info_mail">
                                                                        <span className="info-icon iconsvg icon-mail"></span>
                                                                        <span className="info-title">信箱</span>
                                                                        <span className="info-text">
                                                                            <a href="mailto:bear50197@gmail.com">bear50197@gmail.com</a>
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li className="infoline infoline_fb">
                                                                    <div className="info info_fb">
                                                                        <span className="info-icon iconsvg icon-fb"></span>
                                                                        <span className="info-title">FB</span>
                                                                        <span className="info-text">
                                                                            <a
                                                                                href="https://www.facebook.com/profile.php?id=61558088173434"
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                FACEBOOK
                                                                            </a>
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li className="infoline infoline_address">
                                                                    <div className="info info_address">
                                                                        <span className="info-icon iconsvg icon-address"></span>
                                                                        <span className="info-title">地址</span>
                                                                        <span className="info-text">
                                                                            <a
                                                                                href="https://www.google.com/maps?q=708%20%E8%87%BA%E5%8D%97%E5%B8%82%E5%AE%89%E5%B9%B3%E5%8D%80%E4%B8%AD%E8%8F%AF%E8%A5%BF%E8%B7%AF%E4%BA%8C%E6%AE%B5315%E8%99%9F5%E6%A8%93"
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                708 臺南市安平區中華西路二段315號5樓
                                                                            </a>
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            </ul>
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

                            <section id="secbox_idx_inquire" className="secbox secbox_idx secbox_inquire">
                                <div className="secbox_bg">
                                    <div className="container">
                                        <div className="secbox_inner">
                                            <div className="heading heading_main">
                                                <h2 className="heading-text">填表諮詢</h2>
                                            </div>

                                            <div className="secbox_main">
                                                <div className="formbox formbox_inquire formbox_dec">
                                                    <div className="form-describe">
                                                        請詳細填寫以下表單並清楚告訴我們訴求，當本公司收到這封信時，我們會盡快回覆您。
                                                        <span className="data_required">(*)必填</span>
                                                    </div>

                                                    <form className="formset" role="form" onSubmit={handleSubmit}>
                                                        <ul className="formlist formlist_inquire">
                                                            <li className="formline name">
                                                                <div className="inputbar">
                                                                    <label htmlFor="inq-name" className="form-label">
                                                                        <span className="form-require data_required">*</span>
                                                                        <span className="form-title">姓名</span>
                                                                    </label>
                                                                    <div className="inputbar-main width-icon">
                                                                        <span className="iconsvg icon-person"></span>
                                                                        <input
                                                                            id="inq-name"
                                                                            type="text"
                                                                            name="name"
                                                                            className="form-control"
                                                                            placeholder="姓名..."
                                                                            value={data.name}
                                                                            onChange={e => setData('name', e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    {errors.name && (
                                                                        <div className="text-danger" style={{ marginTop: 4 }}>
                                                                            {errors.name}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </li>

                                                            <li className="formline mobile">
                                                                <div className="inputbar">
                                                                    <label htmlFor="inq-mobile" className="form-label">
                                                                        <span className="form-require data_required">*</span>
                                                                        <span className="form-title">連絡電話</span>
                                                                    </label>
                                                                    <div className="inputbar-main width-icon">
                                                                        <span className="iconsvg icon-mobile"></span>
                                                                        <input
                                                                            id="inq-mobile"
                                                                            type="text"
                                                                            name="mobile"
                                                                            className="form-control"
                                                                            placeholder="連絡電話..."
                                                                            value={data.mobile}
                                                                            onChange={e => setData('mobile', e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    {errors.mobile && (
                                                                        <div className="text-danger" style={{ marginTop: 4 }}>
                                                                            {errors.mobile}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </li>

                                                            <li className="formline message">
                                                                <div className="inputbar">
                                                                    <label htmlFor="inq-msg" className="form-label">
                                                                        <span className="form-require data_required">*</span>
                                                                        <span className="form-title">內容</span>
                                                                    </label>
                                                                    <div className="inputbar-main">
                                                                        <textarea
                                                                            id="inq-msg"
                                                                            name="message"
                                                                            className="form-control"
                                                                            rows={6}
                                                                            placeholder="留言內容..."
                                                                            value={data.message}
                                                                            onChange={e => setData('message', e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    {errors.message && (
                                                                        <div className="text-danger" style={{ marginTop: 4 }}>
                                                                            {errors.message}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </li>

                                                            <li className="formline verifycode">
                                                                <div className="inputbar">
                                                                    <div className="form-label">
                                                                        <span className="form-require data_required">*</span>
                                                                        <span className="form-title">驗證碼</span>
                                                                    </div>
                                                                    <div className="inputbar-main">
                                                                        <div className="form-verifybox">
                                                                            <div
                                                                                id="code_check"
                                                                                style={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    marginBottom: 8,
                                                                                }}
                                                                            >
                                                                                <span style={{ marginRight: 8 }}>
                                                                                    <input
                                                                                        name="code"
                                                                                        size={10}
                                                                                        maxLength={5}
                                                                                        type="text"
                                                                                        placeholder=""
                                                                                        value={data.code}
                                                                                        onChange={e =>
                                                                                            setData('code', e.target.value)
                                                                                        }
                                                                                        required
                                                                                    />
                                                                                </span>
                                                                                <img
                                                                                    style={{ border: '1px solid #555' }}
                                                                                    id="contact-captcha"
                                                                                    src={`/contact/captcha?${captchaKey}`}
                                                                                    alt="驗證碼"
                                                                                    width={100}
                                                                                    height={30}
                                                                                />
                                                                                <span style={{ marginLeft: 8, fontSize: '0.95rem' }}>
                                                                                    (
                                                                                    <a
                                                                                        style={{ color: 'blue' }}
                                                                                        href="#"
                                                                                        onClick={e => {
                                                                                            e.preventDefault();
                                                                                            refreshCaptcha();
                                                                                        }}
                                                                                    >
                                                                                        更換
                                                                                    </a>
                                                                                    )
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        {errors.code && (
                                                                            <div className="text-danger" style={{ marginTop: 4 }}>
                                                                                {errors.code}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li className="formline submit">
                                                                <div className="form-btnbar">
                                                                    <button
                                                                        type="submit"
                                                                        className="formbtn formbtn_submit"
                                                                        disabled={processing}
                                                                    >
                                                                        {processing ? '送出中...' : '確認送出'}
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="secbox_dec01"></div>
                                <div className="secbox_dec02"></div>
                            </section>
                        </div>
                    </div>
                </main>

                <SalonFooter />
            </div>
        </>
    );
}
