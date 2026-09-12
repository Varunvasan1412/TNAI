import React from 'react';
import { Link } from 'react-router';
import TextAnimation from '../../components/elements/TextAnimation';

import wpBotanical from '../../assets/images/products/wp_botanical.png';
import wpGeometric from '../../assets/images/products/wp_geometric.png';
import wpAbstract from '../../assets/images/products/wp_abstract.png';

const InsideTES: React.FC = () => (
    <section className="ites-section" style={{ background: '#FAFAFA' }}>
        <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>

            <div className="inside-tes-layout" style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>

                {/* Left Card: Facility Showcase */}
                <div style={{
                    flex: '1.6',
                    background: '#ffffff',
                    borderRadius: '24px',
                    padding: '40px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    display: 'flex',
                    gap: '40px'
                }}>
                    {/* Text Column */}
                    <div className="ites-text-col" style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="section-title sec-title-animation animation-style1" style={{ marginBottom: 0 }}>
                            <h6 className="section-title__tagline"><span className="section-title__tagline-border"></span>INSIDE THE WALL PROJECT</h6>
                            <h3 className="section-title__title title-animation" style={{ fontSize: '32px', lineHeight: 1.2, marginBottom: '24px' }}>
                                <TextAnimation>State-of-the-Art Design & Printing Studio</TextAnimation>
                            </h3>
                        </div>

                        <p style={{ color: '#334155', fontSize: '15px', lineHeight: 1.7, fontWeight: 600, margin: '0 0 40px 0' }}>
                            Our state-of-the-art wallpaper studio is equipped with high-definition digital printing machinery, custom texture embossing systems, and precision color matching technology.
                        </p>

                        <div>
                            <Link to="/gallery" className="thm-btn">
                                Explore Our Collections <span className="icon-arrow-right"></span>
                            </Link>
                        </div>
                    </div>

                    {/* Masonry Image Grid */}
                    <div className="ites-img-grid" style={{
                        flex: 1,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        gap: '8px',
                        minHeight: '400px'
                    }}>
                        <img src={wpBotanical} alt="Botanical Wallpaper Studio Showcase" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', gridColumn: '1 / 3', gridRow: '1 / 3' }} />
                        <img src={wpGeometric} alt="3D Geometric Texture Wallpaper" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', gridColumn: '3 / 4', gridRow: '1 / 2' }} />
                        <img src={wpAbstract} alt="Abstract Luxe Custom Wallpaper" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', gridColumn: '3 / 4', gridRow: '2 / 3' }} />
                    </div>
                </div>

                {/* Right Card: Stats Grid */}
                <div style={{
                    flex: '1',
                    background: '#ffffff',
                    borderRadius: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '1fr 1fr',
                    overflow: 'hidden'
                }}>

                    {/* Stat 1 */}
                    <div style={{ borderRight: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '16px', color: '#0F172A' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '48px', fontWeight: 800, background: 'linear-gradient(135deg, #8C5A00 0%, #D4A72C 50%, #FFF1A6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>25+</h3>
                        <p style={{ color: '#0F172A', fontSize: '14px', fontWeight: 700, margin: '12px 0 0 0', lineHeight: 1.4 }}>Years of<br />Experience</p>
                    </div>

                    {/* Stat 2 */}
                    <div style={{ borderBottom: '1px solid #F1F5F9', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '16px', color: '#0F172A' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '48px', fontWeight: 800, background: 'linear-gradient(135deg, #8C5A00 0%, #D4A72C 50%, #FFF1A6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>500+</h3>
                        <p style={{ color: '#0F172A', fontSize: '14px', fontWeight: 700, margin: '12px 0 0 0', lineHeight: 1.4 }}>Wallpaper<br />Designs</p>
                    </div>

                    {/* Stat 3 */}
                    <div style={{ borderRight: '1px solid #F1F5F9', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '16px', color: '#0F172A' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '48px', fontWeight: 800, background: 'linear-gradient(135deg, #8C5A00 0%, #D4A72C 50%, #FFF1A6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>50+</h3>
                        <p style={{ color: '#0F172A', fontSize: '14px', fontWeight: 700, margin: '12px 0 0 0', lineHeight: 1.4 }}>Cities<br />Served</p>
                    </div>

                    {/* Stat 4 */}
                    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '16px', color: '#0F172A' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '48px', fontWeight: 800, color: '#141e30', margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>1000+</h3>
                        <p style={{ color: '#0F172A', fontSize: '14px', fontWeight: 700, margin: '12px 0 0 0', lineHeight: 1.4 }}>Happy<br />Customers</p>
                    </div>

                </div>
            </div>

            <style>{`
                /* Section padding */
                .ites-section { padding: 80px 0; }
                @media (max-width: 1023px) { .ites-section { padding: 60px 0; } }
                @media (max-width: 767px)  { .ites-section { padding: 48px 0; } }

                /* ── Tablet landscape (1024–1199px) ──
                   Stack the two main cards, keep inner layout intact */
                @media (max-width: 1199px) {
                    .inside-tes-layout { flex-direction: column; }
                    .ites-text-col { width: 260px !important; }
                }

                /* ── Tablet portrait (768–1023px) ──
                   Stack main cards, shrink text col, shrink image grid */
                @media (max-width: 1023px) {
                    .inside-tes-layout { flex-direction: column; gap: 16px !important; }
                    .ites-text-col { width: 220px !important; }
                    .ites-img-grid { min-height: 300px !important; }
                }

                /* ── Mobile (<768px) ── */
                @media (max-width: 767px) {
                    .inside-tes-layout { gap: 12px !important; }

                    /* Left card: stack text over image grid */
                    .inside-tes-layout > div:first-child {
                        flex-direction: column !important;
                        padding: 24px !important;
                        gap: 24px !important;
                    }
                    .ites-text-col { width: 100% !important; }

                    /* Image grid: 2 cols at mobile */
                    .ites-img-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        grid-template-rows: repeat(3, 140px) !important;
                        min-height: unset !important;
                    }
                    /* Last image (wide one) spans both columns */
                    .ites-img-grid img:last-child {
                        grid-column: 1 / -1 !important;
                        grid-row: auto !important;
                    }

                    /* Stats card: 2×2 grid */
                    .inside-tes-layout > div:last-child { grid-template-columns: 1fr 1fr !important; }
                    .inside-tes-layout > div:last-child > div {
                        border-right: none !important;
                        border-bottom: 1px solid #F1F5F9 !important;
                        padding: 20px !important;
                    }
                    .inside-tes-layout > div:last-child > div:last-child { border-bottom: none !important; }
                    .inside-tes-layout > div:last-child h3 { font-size: 36px !important; }
                }

                /* ── Very small (<480px) ── */
                @media (max-width: 479px) {
                    .ites-img-grid { grid-template-rows: repeat(3, 120px) !important; }
                    .inside-tes-layout > div:last-child { grid-template-columns: 1fr 1fr !important; }
                    .inside-tes-layout > div:last-child h3 { font-size: 30px !important; }
                    .inside-tes-layout > div:last-child > div { padding: 16px !important; }
                }
            `}</style>
        </div>
    </section>
);
export default InsideTES;
