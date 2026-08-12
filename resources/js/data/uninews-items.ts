export type UniNewsItem = {
    sn: string;
    title: string;
    img: string;
    imgW: number;
    imgH: number;
    date: string;
    location: string;
    excerpt?: string;
};

export const UNINEWS_TOTAL = 204;
export const UNINEWS_PER_PAGE = 24;
export const UNINEWS_TOTAL_PAGES = 9;

export const uniNewsItems: UniNewsItem[] = [
    { sn: "138800", title: "串聯藝文、親子及市集體驗　桃園市2026 High 龜山搖滾音樂節《未來光城：光城登入站》重磅登場", img: "/asd_files/s2026081122072930.jpg", imgW: 1024, imgH: 682, date: "2026-08-11", location: "宜蘭縣" },
    { sn: "138795", title: "史努比空降六福村同慶生日！8月限定優惠接力登場　造型咖哩飯、限量針織袋與限定餐點套票限量開搶", img: "/asd_files/s2026081121454120.jpg", imgW: 1024, imgH: 682, date: "2026-08-11", location: "" },
    { sn: "138784", title: "郭添貴接任一卡通票證公司董事長  領航一卡通開創新局", img: "/asd_files/s2026081120521870.jpg", imgW: 1024, imgH: 1024, date: "2026-08-11", location: "高雄市" },
    { sn: "138727", title: "桃竹苗分署竹北就業中心8/14日現場徵才　邀集25家知名企業提供1610個優質職缺薪資上看10萬元！", img: "/asd_files/s2026081113422070.jpg", imgW: 1024, imgH: 683, date: "2026-08-11", location: "" },
    { sn: "138659", title: "強化全球供應產能、響應全球客戶需求　億光泰國新廠動土預計2027年下半年完工並投入量產貢獻營收", img: "/asd_files/s2026081019410220.jpg", imgW: 1024, imgH: 682, date: "2026-08-10", location: "" },
    { sn: "138615", title: "海洋文化x在地美食x音樂展演x親子互動x啤酒文化　 115年竹南觀光文化季「逐南風．調啤趣2.0」8/22-23登場", img: "/asd_files/s2026081013412620.jpg", imgW: 1024, imgH: 682, date: "2026-08-10", location: "" },
    { sn: "138511", title: "高雄市第51屆模範父親表揚大會 高雄市福建同鄉會理事長陳國鑫 獲選模範父親 各界祝福", img: "/asd_files/s2026080900173880.jpg", imgW: 1024, imgH: 871, date: "2026-08-09", location: "高雄市" },
    { sn: "138484", title: "中山大學護理系走進霧台　跨文化照護教育從部落開始", img: "/asd_files/s20260808161119100.jpg", imgW: 1024, imgH: 577, date: "2026-08-08", location: "高雄市" },
    { sn: "138432", title: "國際物流因戰火停擺！約旦母女面臨居留證過期困境　　移民署竹市站5個月一路陪伴暖心守護順利延期留臺", img: "/asd_files/s2026080721222090.jpg", imgW: 1024, imgH: 683, date: "2026-08-07", location: "" },
    { sn: "138429", title: "從公文自動化到作業初審　敏實科大打造多模型協作數位校務團隊引領智慧校園革命邁向AI Agent 大學", img: "/asd_files/s2026080720215110.jpg", imgW: 1024, imgH: 682, date: "2026-08-07", location: "" },
    { sn: "138399", title: "桃竹苗分署「2026暑期遊程」　串聯8家民間團體、11條深度旅遊路線感受桃竹苗豐富的人文與自然魅力", img: "/asd_files/s2026080715304860.jpg", imgW: 1024, imgH: 682, date: "2026-08-07", location: "" },
    { sn: "138332", title: "台積電等科技大廠帶頭號召！響應喜憨兒中秋「送禮傳愛」　籲請用公共採購與消費促進社會共融", img: "/asd_files/s2026080622013230.jpg", imgW: 1024, imgH: 713, date: "2026-08-06", location: "" },
    { sn: "138329", title: "硬實力成創業最強底氣！　紡織廠基層員工43歲中年失業融合職訓打版思維成功開創功能性機能織品藍海", img: "/asd_files/s2026080620453840.jpg", imgW: 1024, imgH: 683, date: "2026-08-06", location: "" },
    { sn: "138327", title: "仁愛社福x躉泰食品x新東陽x查理布朗x一之鄉　2026中秋LOVE義賣多款美味優質禮盒懇請各界愛心支持", img: "/asd_files/s2026080620120880.jpg", imgW: 1024, imgH: 375, date: "2026-08-06", location: "" },
    { sn: "138316", title: "《婚禮上的小抄》高雄登場 故事工廠公益觀演 邀單親家庭免費看戲 程予希失眠4天後台崩潰！李天柱藏父愛、郭子乾憶病母 編劇劉中薇將演員真實故事放進劇本 更令人動容", img: "/asd_files/s2026080617591050.jpg", imgW: 1024, imgH: 682, date: "2026-08-06", location: "高雄市" },
    { sn: "138305", title: "陪伴企業邁向低碳轉型打造低碳永續產業示範群聚　花蓮縣府8/18舉辦低碳化暨節能診斷實施方案說明會", img: "/asd_files/s2026080617161810.jpg", imgW: 1024, imgH: 768, date: "2026-08-06", location: "" },
    { sn: "138237", title: "百年飄香！日本銀座天國重磅客座大倉久和，極致天婦羅美味再度登台", img: "/asd_files/s2026080713383720.jpg", imgW: 1024, imgH: 631, date: "2026-08-06", location: "", excerpt: "創立於明治18年（1885年）、擁有141年歷史的東京銀座百年天婦羅名店「銀座天國」，2025年首度來台客座廣受好評，今年8月15日至8月19日再度受邀來台，於大倉久和大飯店山里日本料理限時客座，將百年傳承酥香美味的天婦羅匠藝再次帶到台北，邀請賓客重溫一口入魂的極致風味。" },
    { sn: "138208", title: "一年一度的竹塹中元城隍祭正式展開！　邀請全國民眾走進竹市感受兼具歷史底蘊與城市活力的民俗盛典", img: "/asd_files/s2026080521263340.jpg", imgW: 1024, imgH: 576, date: "2026-08-05", location: "" },
    { sn: "138203", title: "最誠摯佳節祝福！GO多藝團隊公益傳愛八德榮家長輩　多元舞風陪伴歡慶父親節體現敬老尊老精神", img: "/asd_files/s2026080519371320.jpg", imgW: 1024, imgH: 683, date: "2026-08-05", location: "" },
    { sn: "138186", title: "心路基金會早療寶貝畢典結合運動會　孩子展現學習成果勇敢跨出成長每一步迎向人生下一段精彩旅程", img: "/asd_files/s2026080518230830.jpg", imgW: 1024, imgH: 683, date: "2026-08-05", location: "" },
    { sn: "138180", title: "2026全國第二次羽球排名賽自8/11-8/19火熱開打　甲組及乙組好手齊聚摩拳擦掌爭取最佳成績與榮譽", img: "/asd_files/s2026080516575440.jpg", imgW: 1024, imgH: 869, date: "2026-08-05", location: "" },
    { sn: "138132", title: "桃竹苗分署與台南應用科大共同培訓選手呂羽昕　五年磨一劍勇奪第56屆全國技能競賽中式服裝職類金牌", img: "/asd_files/s2026080514370320.jpg", imgW: 1024, imgH: 683, date: "2026-08-05", location: "" },
    { sn: "138075", title: "結合啤酒、美食、音樂及海港景致　竹市夏日乾杯活動圓滿成功打造北臺灣具代表性夏日啤酒音樂活動", img: "/asd_files/s20260804211259100.jpg", imgW: 1024, imgH: 768, date: "2026-08-04", location: "" },
    { sn: "138071", title: "國科會通過中科2件新投資案　中科園區今年累計引進10家新投資案共計投資總額新臺幣52.98億元", img: "/asd_files/s2026080419365790.jpg", imgW: 1024, imgH: 683, date: "2026-08-04", location: "" },
];
