export default function SalonAboutFoundingPurpose() {
    return (
        <div className="detailbox editor">

            {/* Hero banner */}
            <header style={{
                background: 'linear-gradient(135deg, #AFDFE4 40%, #d7d7fa 60%)',
                padding: '80px 20px',
                textAlign: 'center',
                color: '#ffffff',
            }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <span style={{
                        backgroundColor: '#ff0000',
                        padding: '6px 16px',
                        borderRadius: 20,
                        fontSize: 14,
                        letterSpacing: 2,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}>
                        關懷兒童 無遠弗屆
                    </span>
                    <h1 style={{
                        fontSize: 36,
                        margin: '20px 0 10px 0',
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        color: '#4a4a68',
                    }}>
                        Serving the Children of the World
                    </h1>
                    <p style={{
                        fontSize: 18,
                        opacity: 0.9,
                        margin: 0,
                        fontWeight: 300,
                        color: '#77778f',
                    }}>
                        秉持一步一腳印的精神．致力服務兒童與社區
                    </p>
                </div>
            </header>

            {/* Main content */}
            <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px' }}>

                {/* Intro paragraph */}
                <section style={{
                    backgroundColor: '#ffffff',
                    padding: 40,
                    borderRadius: 16,
                    boxShadow: '0 10px 30px rgba(123, 136, 255, 0.05)',
                    marginBottom: 40,
                    borderLeft: '6px solid #2A52BE',
                }}>
                    <p style={{ fontSize: 17, margin: 0, textAlign: 'justify', color: '#2a52be' }}>
                        國際同濟會臺灣總會澎嘉南區永康國際會創會授證典禮日前於臺糖長榮酒店舉行，臺南市長黃偉哲親自出席祝賀該會創會長張志豪，並與美國世界總會長Katrina J. Baranko女士及各國同濟會總會長交流。黃偉哲期許該會善盡社會責任，與市府攜手共同關懷弱勢、照顧兒童，讓臺南市成為充滿溫馨、祥和及善行的幸福宜居城市。
                    </p>
                    <p style={{ fontSize: 17, margin: '20px 0 0 0', textAlign: 'justify', color: '#4a4a68', fontWeight: 'bold' }}>
                        我們深信，真正的影響力來自於高度的凝聚與專業的賦能。為此，本會聚焦於四大核心輔導與推動面向：
                    </p>
                </section>

                {/* Four core pillars grid */}
                <section style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -15px 40px -15px' }}>

                    {/* Card 1 */}
                    <div style={{ flex: '1 1 45%', minWidth: 280, padding: 15, boxSizing: 'border-box' }}>
                        <div style={{
                            backgroundColor: '#ffffff',
                            padding: 30,
                            borderRadius: 12,
                            height: '100%',
                            boxSizing: 'border-box',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                            borderTop: '4px solid #7b88ff',
                        }}>
                            <div style={{
                                display: 'inline-block',
                                backgroundColor: '#f0f2ff',
                                color: '#5a66ff',
                                padding: '8px 16px',
                                borderRadius: 6,
                                fontWeight: 'bold',
                                marginBottom: 15,
                                fontSize: 15,
                            }}>
                                關懷兒童與弱勢群體
                            </div>
                            <p style={{ margin: 0, fontSize: 15, color: '#555577', textAlign: 'justify' }}>
                                以「服務兒童」為第一優先，深入臺南永康及周邊偏鄉學校與社區。透過獎助學金、兒童才藝競賽、反毒宣導以及弱勢家庭物資捐助，用愛心為下一代築起堅實的後盾，讓每一個孩子都能平等成長、追尋夢想。
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div style={{ flex: '1 1 45%', minWidth: 280, padding: 15, boxSizing: 'border-box' }}>
                        <div style={{
                            backgroundColor: '#ffffff',
                            padding: 30,
                            borderRadius: 12,
                            height: '100%',
                            boxSizing: 'border-box',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                            borderTop: '4px solid #8c96ff',
                        }}>
                            <div style={{
                                display: 'inline-block',
                                backgroundColor: '#f3f0ff',
                                color: '#7c5aff',
                                padding: '8px 16px',
                                borderRadius: 6,
                                fontWeight: 'bold',
                                marginBottom: 15,
                                fontSize: 15,
                            }}>
                                永康在地公益行動
                            </div>
                            <p style={{ margin: 0, fontSize: 15, color: '#555577', textAlign: 'justify' }}>
                                凝聚在地企業家與熱血志工的力量，推動定期捐血活動、社區環境整頓及急難救助機制。當在地有需要，永康同濟會第一時間站在最前線，傳遞正能量，實踐社團對地方的社會責任。
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div style={{ flex: '1 1 45%', minWidth: 280, padding: 15, boxSizing: 'border-box' }}>
                        <div style={{
                            backgroundColor: '#ffffff',
                            padding: 30,
                            borderRadius: 12,
                            height: '100%',
                            boxSizing: 'border-box',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                            borderTop: '4px solid #9d83ff',
                        }}>
                            <div style={{
                                display: 'inline-block',
                                backgroundColor: '#f7f0ff',
                                color: '#943aff',
                                padding: '8px 16px',
                                borderRadius: 6,
                                fontWeight: 'bold',
                                marginBottom: 15,
                                fontSize: 15,
                            }}>
                                領袖培育與會員成長
                            </div>
                            <p style={{ margin: 0, fontSize: 15, color: '#555577', textAlign: 'justify' }}>
                                同濟會不僅是做公益，更是培育領導力的搖籃。透過會務運作、活動籌備、專題講座與公眾表達訓練，讓會員在服務中提升組織、溝通與領導能力，實現個人與事業的雙重突破。
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div style={{ flex: '1 1 45%', minWidth: 280, padding: 15, boxSizing: 'border-box' }}>
                        <div style={{
                            backgroundColor: '#ffffff',
                            padding: 30,
                            borderRadius: 12,
                            height: '100%',
                            boxSizing: 'border-box',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                            borderTop: '4px solid #b37bff',
                        }}>
                            <div style={{
                                display: 'inline-block',
                                backgroundColor: '#fff0f9',
                                color: '#b33aff',
                                padding: '8px 16px',
                                borderRadius: 6,
                                fontWeight: 'bold',
                                marginBottom: 15,
                                fontSize: 15,
                            }}>
                                國際視野與商務人脈
                            </div>
                            <p style={{ margin: 0, fontSize: 15, color: '#555577', textAlign: 'justify' }}>
                                結合國際同濟會總會的全球網絡，促進跨會、跨區乃至國際間的友好交流。同時，會內匯聚永康各行各業的在地菁英，提供一個真誠相待、資源共享與互助共榮的優質交流平台。
                            </p>
                        </div>
                    </div>

                </section>

                {/* Leaders & founders section */}
                <section style={{
                    backgroundColor: '#ffffff',
                    padding: 40,
                    borderRadius: 16,
                    boxShadow: '0 10px 30px rgba(123, 136, 255, 0.05)',
                    marginBottom: 40,
                }}>
                    <img
                        src="/asd_files/1784624972_0.png"
                        alt="領袖齊聚，共築頂層人脈"
                        width={1920}
                        height={700}
                        style={{ width: '100%', height: 'auto', display: 'block', marginBottom: 25 }}
                    />
                    <h2 style={{
                        fontSize: 24,
                        color: '#4e56a6',
                        marginTop: 0,
                        marginBottom: 25,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        letterSpacing: 1,
                    }}>
                        領袖齊聚，共築頂層人脈
                    </h2>

                    {/* Founder tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 30 }}>
                        <span style={{
                            backgroundColor: '#afdfe4',
                            color: '#7e8c8d',
                            padding: '8px 18px',
                            borderRadius: 30,
                            fontSize: 18,
                            fontWeight: 500,
                        }}>
                            創會發起人
                        </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 30 }}>
                        <span style={{
                            backgroundColor: '#afdfe4',
                            color: '#7e8c8d',
                            padding: '8px 18px',
                            borderRadius: 30,
                            fontSize: 18,
                            fontWeight: 500,
                        }}>
                            郭培權、張志豪
                        </span>
                    </div>

                    {/* E-book link */}
                    <div style={{
                        backgroundColor: '#f8f9fe',
                        padding: '20px 25px',
                        borderRadius: 8,
                        textAlign: 'center',
                        border: '1px dashed #ced4da',
                    }}>
                        <a
                            href="https://issuu.com/twgamagroup/docs/2024_1-24_-a4-_2mm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ➡️《 國際臺南永康同濟會電子書 》⬅️
                        </a>
                    </div>
                </section>

                {/* Photo 1 */}
                <img
                    style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}
                    src="/asd_files/1784685264_0.jpg"
                    alt=""
                    width={800}
                />

            </main>

            {/* Second main section with photos and CTA */}
            <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px' }}>

                {/* Photo 2 */}
                <img
                    style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}
                    src="/asd_files/1784685289_0.jpg"
                    alt=""
                    width={800}
                />
                <br />

                {/* Call to action */}
                <section style={{
                    background: 'linear-gradient(135deg, #EBFEFF 0%, #EBFEFF 100%)',
                    padding: '50px 40px',
                    borderRadius: 16,
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(123, 136, 255, 0.05)',
                    border: '1px solid #dfd8ff',
                }}>
                    <p style={{
                        fontSize: 18,
                        color: '#4e56a6',
                        fontWeight: 'bold',
                        marginTop: 0,
                        marginBottom: 20,
                        lineHeight: 1.6,
                    }}>
                        國際同濟會是一個可以拓展人脈，建立永恆友誼，輔以各種教育訓練與社服活動，享受終身學習快樂成長的國際社團。
                    </p>
                    <p style={{
                        fontSize: 16,
                        color: '#555577',
                        maxWidth: 800,
                        margin: '0 auto 30px auto',
                        textAlign: 'justify',
                        textAlignLast: 'center',
                    }}>
                        只要您有愛心、有善良意志，邀請您的加入！
                    </p>
                </section>

            </main>

        </div>
    );
}
