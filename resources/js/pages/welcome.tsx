import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import SalonHeader from '@/components/salon/SalonHeader';
import SalonBanner from '@/components/salon/SalonBanner';
import SalonMarquee from '@/components/salon/SalonMarquee';
import SalonAbout from '@/components/salon/SalonAbout';
import SalonTimeline from '@/components/salon/SalonTimeline';
import SalonAnnouncement from '@/components/salon/SalonAnnouncement';
import SalonNews from '@/components/salon/SalonNews';
import SalonUniNews from '@/components/salon/SalonUniNews';
import SalonPeople from '@/components/salon/SalonPeople';
import SalonLife from '@/components/salon/SalonLife';
import SalonAlbums from '@/components/salon/SalonAlbums';
import SalonLinks from '@/components/salon/SalonLinks';
import SalonFooter from '@/components/salon/SalonFooter';

export default function Welcome() {
    // Force light mode on welcome page — the original asd_files CSS
    // does not support dark mode and Tailwind's dark class turns sections black.
    useEffect(() => {
        const html = document.documentElement;
        const hadDark = html.classList.contains('dark');
        const prevBg = html.style.backgroundColor;
        html.classList.remove('dark');
        html.style.colorScheme = 'light';
        html.style.backgroundColor = 'transparent';
        return () => {
            if (hadDark) {
                html.classList.add('dark');
                html.style.colorScheme = 'dark';
            }
            html.style.backgroundColor = prevBg;
        };
    }, []);
    return (
        <>
            <Head>
                <title>永康國際同濟會</title>
                <meta name="description" content="永康國際同濟會" />
                <meta name="keywords" content="永康國際同濟會" />
                <meta property="og:title" content="永康國際同濟會" />
                <meta property="og:description" content="永康國際同濟會" />
                <meta property="og:type" content="website" />
                <link rel="stylesheet" href="/asd_files/base.css" />
                <link rel="stylesheet" href="/asd_files/blue.css" />
                <link rel="stylesheet" href="/asd_files/swiper-bundle.min.css" />
                <link rel="stylesheet" href="/asd_files/swiper-cust.css" />
                <link rel="stylesheet" href="/asd_files/common.css" />
                <link rel="stylesheet" href="/asd_files/main.css" />
                <link rel="stylesheet" href="/asd_files/animate.css" />
                <script src="/asd_files/jquery-3.7.1.min.js" defer={true} />
                <script src="/asd_files/swiper-bundle.min.js" defer={true} />
                <script src="/asd_files/customize.js" defer={true} />
                <script src="/asd_files/marquee.js" defer={true} />
                <script src="/asd_files/idxsec_order.js" defer={true} />
                <script src="/asd_files/swiper_cust_banner.js" defer={true} />
                <script src="/asd_files/swiper_cust_itemslide.js" defer={true} />
            </Head>

            <div className="wrapper">
                <SalonHeader />

                <SalonBanner />
                <SalonMarquee />

                <main className="main">
                    <div className="main_inner">
                        <div className="secwrap_idx">
                            <SalonAbout />
                            <SalonTimeline />
                            <SalonAnnouncement />
                            <SalonNews />
                            <SalonUniNews />
                            <SalonPeople />
                            <SalonLife />
                            <SalonAlbums />
                            <SalonLinks />
                        </div>
                    </div>
                </main>

                <SalonFooter />
            </div>
        </>
    );
}
