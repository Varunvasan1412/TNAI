import React from 'react';
import TextAnimation from '../../components/elements/TextAnimation';



const KeyDiff: React.FC = () => (
    <section className="kd-section" style={{ background: '#FAFAFA' }}>
        <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
            
            <div className="section-title text-center sec-title-animation animation-style1" style={{ marginBottom: '48px' }}>
                <h6 className="section-title__tagline"><span className="section-title__tagline-border"></span>Key Differentiators</h6>
                <h3 className="section-title__title title-animation">
                    <TextAnimation>Setting New Standards</TextAnimation>
                </h3>
            </div>

            <div className="key-differentiators-grid">
                
                {/* Row 1 */}
                
                {/* 1. 20+ Years */}
                <div className="bento-card dark" style={{ gridColumn: 'span 6', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ fontSize: '48px', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1 }}>20+</h3>
                        <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '12px 0 16px 0' }}>Years of Expertise</h4>
                        <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>Over two decades of deep understanding of market dynamics and technological advancements.</p>
                    </div>
                    {/* Wreath Icon Background */}
                    <svg style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', width: '160px', height: '160px', opacity: 0.12, zIndex: 0 }} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/>
                    </svg>
                </div>

                {/* 2. In-house Manufacturing */}
                <div className="bento-card light" style={{ gridColumn: 'span 6', padding: '16px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop" alt="Manufacturing" style={{ width: '55%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                    <div style={{ flex: 1, paddingRight: '8px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>In-house<br/>Manufacturing</h4>
                        <p style={{ color: '#475569', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>Complete control from design to delivery.</p>
                    </div>
                </div>

                {/* 3. Global Export Capabilities */}
                <div className="bento-card" style={{ 
                    gridColumn: 'span 7', 
                    padding: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    position: 'relative', 
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #061B4A 0%, #08245E 100%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                    <div style={{ width: '45%', position: 'relative', zIndex: 2 }}>
                        <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: '0 0 16px 0' }}>Global Export<br/>Capabilities</h4>
                        <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>Serving researchers and industries in more than 25+ countries worldwide.</p>
                    </div>
                    
                    {/* World Map Background */}
                    <img 
                        src="/world-map-bg.png" 
                        alt="" 
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.55,
                            pointerEvents: 'none',
                            zIndex: 0
                        }} 
                    />

                    {/* Glowing Location Pins */}
                    <div style={{ position: 'absolute', right: 0, top: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
                        {[
                            { top: '35%', left: '12%' }, // USA
                            { top: '25%', left: '52%' }, // UK
                            { top: '28%', left: '55%' }, // Germany
                            { top: '48%', left: '65%' }, // UAE
                            { top: '52%', left: '72%' }, // India
                            { top: '60%', left: '80%' }, // Singapore
                            { top: '75%', left: '88%' }, // Australia
                        ].map((pos, i) => (
                            <div key={i} style={{
                                position: 'absolute',
                                top: pos.top,
                                left: pos.left,
                                width: '5px',
                                height: '5px',
                                background: 'rgba(239,68,68,0.8)',
                                borderRadius: '50%',
                                boxShadow: '0 0 6px rgba(239,68,68,0.6), 0 0 12px rgba(239,68,68,0.3)',
                            }} />
                        ))}
                    </div>
                </div>

                {/* Container for Column 4 (Support & Solutions) */}
                <div style={{ gridColumn: 'span 5', gridRow: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* 4. Reliable Support */}
                    <div className="bento-card accent" style={{ flex: 1.2, padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '24px', color: '#fff' }}>
                            {/* Shield + checkmark — reliability / trust */}
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                        </div>
                        <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: '0 0 16px 0' }}>Reliable<br/>Support</h4>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>Dedicated team committed to delivering timely support and lasting solutions.</p>
                    </div>

                    {/* 8. Comprehensive Solutions */}
                    <div className="bento-card light" style={{ flex: 0.8, padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>Comprehensive<br/>Solutions</h4>
                            <p style={{ color: '#475569', fontSize: '13px', margin: 0, lineHeight: 1.5, maxWidth: '80%' }}>Wide range of products and services under one roof for all your electrochemical needs.</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', opacity: 0.8 }} alt="Products" />
                    </div>

                </div>

                {/* Row 2 */}
                
                {/* 5. Custom Design Services */}
                <div className="bento-card light" style={{ gridColumn: 'span 7', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ width: '50%', position: 'relative', zIndex: 1 }}>
                        <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>Custom Design<br/>Services</h4>
                        <p style={{ color: '#475569', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>Tailored solutions built to meet unique research and industrial requirements.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=400&fit=crop" alt="Blueprint" style={{ position: 'absolute', right: 0, top: 0, width: '65%', height: '100%', objectFit: 'cover', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%)', maskImage: 'linear-gradient(to right, transparent, black 10%)' }} />
                </div>

                {/* 6. Advanced Testing */}
                <div className="bento-card dark" style={{ gridColumn: 'span 5', padding: 0, display: 'flex', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ padding: '32px 24px', flex: 1, position: 'relative', zIndex: 1, background: 'linear-gradient(to right, #0F172A 20%, rgba(15,23,42,0.8) 45%, transparent)' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: '0 0 16px 0' }}>Advanced<br/>Testing</h4>
                        <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0, lineHeight: 1.5, maxWidth: '90%' }}>State-of-the-art testing equipment ensuring accuracy, reliability and performance.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=400&fit=crop" alt="Lab Testing" style={{ position: 'absolute', right: 0, top: 0, width: '80%', height: '100%', objectFit: 'cover', zIndex: 0, WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%)', maskImage: 'linear-gradient(to right, transparent, black 25%)' }} />
                </div>

                {/* 7. Integrated Resource Centre */}
                <div className="bento-card light" style={{ gridColumn: 'span 7', padding: 0, display: 'flex', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ padding: '32px', width: '60%', position: 'relative', zIndex: 1, background: 'linear-gradient(to right, #ffffff 20%, rgba(255,255,255,0.8) 45%, transparent)' }}>
                        <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>Integrated<br/>Resource Centre</h4>
                        <p style={{ color: '#475569', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>Technical documentation, samples, and research support through our dedicated resource hub.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&h=400&fit=crop" alt="Documents" style={{ position: 'absolute', right: 0, top: 0, width: '70%', height: '100%', objectFit: 'cover', zIndex: 0, WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%)', maskImage: 'linear-gradient(to right, transparent, black 15%)' }} />
                </div>

            </div>

            <style>{`
                .key-differentiators-grid {
                    display: grid;
                    grid-template-columns: repeat(24, 1fr);
                    gap: 16px;
                }
                .bento-card {
                    border-radius: 16px;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    box-sizing: border-box;
                }
                .bento-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px -8px rgba(0,0,0,0.1);
                }
                .bento-card.dark {
                    background: #0F172A;
                    color: #fff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .bento-card.light {
                    background: #ffffff;
                    color: #0F172A;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                    border: 1px solid rgba(0,0,0,0.02);
                }
                .bento-card.accent {
                    background: linear-gradient(135deg, #020D3F 0%, #061A63 50%, #092B82 100%);
                    border: 1px solid #D4A72C;
                    color: #fff;
                    box-shadow: 0 8px 24px -8px rgba(6, 26, 99, 0.45);
                }

                /* Section padding */
                .kd-section { padding: 80px 0; }
                @media (max-width: 1023px) { .kd-section { padding: 60px 0; } }
                @media (max-width: 767px)  { .kd-section { padding: 48px 0; } }

                /* ── Tablet landscape (1024–1199px) + Portrait (768–1199px): 2-column bento ── */
                @media (max-width: 1199px) {
                    .key-differentiators-grid {
                        grid-template-columns: 1fr 1fr;
                        grid-auto-rows: auto;
                    }
                    .key-differentiators-grid > * {
                        grid-column: span 1 !important;
                        grid-row: auto !important;
                        min-height: 200px;
                    }
                    /* Integrated Resource Centre (child 7) — full width */
                    .key-differentiators-grid > *:nth-child(7) {
                        grid-column: 1 / -1 !important;
                        min-height: 240px;
                    }
                    /* Wrapper (child 4: Support + Solutions) stays as column */
                    .key-differentiators-grid > div:nth-child(4) {
                        flex-direction: column !important;
                    }
                }

                /* ── Tablet portrait (768–1023px): 2-column, tighter ── */
                @media (max-width: 1023px) {
                    .key-differentiators-grid { gap: 12px; }
                    .key-differentiators-grid > * { min-height: 180px; }
                    .bento-card { border-radius: 14px; }
                    /* Only strengthen the overlay on DARK cards (not light/white cards) */
                    .key-differentiators-grid > div.bento-card.dark > div[style*="linear-gradient"] {
                        background: linear-gradient(to right, rgba(15,23,42,0.98) 35%, rgba(15,23,42,0.75) 65%, transparent) !important;
                    }
                }

                /* ── Mobile (<768px): single column ── */
                @media (max-width: 767px) {
                    .key-differentiators-grid {
                        grid-template-columns: 1fr;
                        gap: 10px;
                    }
                    .key-differentiators-grid > * {
                        grid-column: 1 !important;
                        grid-row: auto !important;
                        min-height: 170px;
                    }
                    /* Wrapper: row layout so Support + Solutions sit side by side */
                    .key-differentiators-grid > div:nth-child(4) {
                        flex-direction: row !important;
                        min-height: 160px;
                        gap: 10px;
                    }
                    .key-differentiators-grid > div:nth-child(4) > div {
                        flex: 1;
                    }
                    /* In-house manufacturing: stack image + text */
                    .key-differentiators-grid > div:nth-child(2) {
                        flex-direction: column !important;
                        padding: 0 !important;
                        min-height: 200px;
                    }
                    .key-differentiators-grid > div:nth-child(2) img {
                        width: 100% !important;
                        height: 120px !important;
                        border-radius: 14px 14px 0 0 !important;
                    }
                    .key-differentiators-grid > div:nth-child(2) > div {
                        padding: 16px;
                    }
                    /* Only strengthen text gradient on dark image-overlay cards */
                    .key-differentiators-grid > div.bento-card.dark > div[style*="linear-gradient"] {
                        background: linear-gradient(to right, rgba(15,23,42,0.98) 45%, rgba(15,23,42,0.85) 75%, transparent) !important;
                    }
                    .bento-card { border-radius: 14px; }
                }

                /* ── Very small (<480px) ── */
                @media (max-width: 479px) {
                    .key-differentiators-grid > * { min-height: 150px; }
                    .key-differentiators-grid > div:nth-child(4) { flex-direction: column !important; }
                    .key-differentiators-grid > div:nth-child(4) > div { flex: none; }
                    .bento-card h3 { font-size: 36px !important; }
                    .bento-card h4 { font-size: 15px !important; }
                    .bento-card p  { font-size: 12px !important; }
                }
            `}</style>
        </div>
    </section>
);
export default KeyDiff;
