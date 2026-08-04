import { useEffect, useRef } from 'react';

const marqueeItems = [
    {
        href: '/news_view?new_sn=136461',
        text: '國際同濟會臺灣總會澎嘉南區第50、51屆主席交接典禮',
    },
    {
        href: '/news_view?new_sn=136460',
        text: '永康同濟會會員一同參加嘉義阿里山同濟會的交接活動！',
    },
    {
        href: '/news_view?new_sn=136457',
        text: '國際同濟會24/07/30 於北台南家扶中心舉行愛心捐鞋聯合社服活動！',
    },
    {
        href: '/news_view?new_sn=136452',
        text: '永康會與澎嘉南區同濟會共同辦理反毒反暴力的籃球賽',
    },
];

export default function SalonMarquee() {
    const listRef = useRef<HTMLUListElement>(null);
    const currentIndex = useRef(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const items = list.querySelectorAll<HTMLElement>('.marquee-item');
        const itemHeight = 48;

        intervalRef.current = setInterval(() => {
            currentIndex.current = (currentIndex.current + 1) % items.length;
            list.style.transition = 'transform 0.5s ease-in-out';
            list.style.transform = `translateY(-${currentIndex.current * itemHeight}px)`;
        }, 2500);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="marquee-wrap">
            <div className="container">
                <div className="marquee">
                    <div className="marquee-title">快訊</div>
                    <div className="marquee-icon">
                        <span className="iconsvg icon_marquee"></span>
                    </div>
                    <div className="marquee_main">
                        <div className="marquee-container">
                            <ul className="marquee-content" ref={listRef}>
                                {marqueeItems.map((item, index) => (
                                    <li className="marquee-item" key={index}>
                                        <a href={item.href} title={item.text}>
                                            {item.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
