import React from 'react';
import { motion } from 'framer-motion';
import TextAnimation from '../../components/elements/TextAnimation';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

const MissionVision: React.FC = () => (
    <section
        className="mission-vision-section"
        style={{
            background: 'linear-gradient(180deg, #FAFAFA 0%, #F6F3EC 50%, #FAFAFA 100%)',
            padding: '90px 0 110px 0',
            position: 'relative',
            overflow: 'hidden',
        }}
    >
        {/* Decorative subtle ambient background glows */}
        <div
            style={{
                position: 'absolute',
                top: '-10%',
                left: '5%',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(212, 167, 44, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }}
        />
        <div
            style={{
                position: 'absolute',
                bottom: '-10%',
                right: '5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(212, 167, 44, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }}
        />

        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
            
            {/* Section Header */}
            <motion.div
                className="section-title text-center sec-title-animation animation-style1"
                style={{ marginBottom: '56px' }}
                {...fadeUp(0)}
            >
                <h6 className="section-title__tagline" style={{ justifyContent: 'center' }}>
                    <span className="section-title__tagline-border"></span>OUR PURPOSE & PROMISE
                </h6>
                <h3 className="section-title__title title-animation" style={{ fontSize: '36px', lineHeight: 1.25 }}>
                    <TextAnimation>Driven by Passion, Defined by Excellence</TextAnimation>
                </h3>
            </motion.div>

            {/* Cards Grid */}
            <div className="mv-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                
                {/* Mission Card */}
                <motion.div
                    className="mv-card"
                    {...fadeUp(0.15)}
                    style={{
                        background: '#ffffff',
                        borderRadius: '24px',
                        padding: '44px 40px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0,0,0,0.02)',
                        border: '1px solid rgba(212, 167, 44, 0.25)',
                        position: 'relative',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                            {/* Icon Badge */}
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 20px rgba(20, 30, 48, 0.15)',
                                }}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A72C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <circle cx="12" cy="12" r="6" />
                                    <circle cx="12" cy="12" r="2" />
                                </svg>
                            </div>
                            <span
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 800,
                                    letterSpacing: '1.5px',
                                    color: '#8C5A00',
                                    background: 'rgba(212, 167, 44, 0.12)',
                                    padding: '6px 14px',
                                    borderRadius: '20px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                OUR MISSION
                            </span>
                        </div>

                        <h4 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '16px', lineHeight: 1.3 }}>
                            Transforming Spaces Into Works of Art
                        </h4>

                        <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                            Our mission is to deliver premium-quality wallpapers, custom wall murals, and architectural wall solutions that transform residential and commercial spaces into inspiring art. We are committed to maintaining the highest standards of craftsmanship, vibrant color reproduction, and eco-friendly materials while ensuring competitive pricing and reliable nationwide delivery.
                        </p>
                    </div>

                    <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4A72C', display: 'inline-block' }}></span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B' }}>Craftsmanship • Eco-Friendly • Nationwide Delivery</span>
                    </div>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                    className="mv-card"
                    {...fadeUp(0.3)}
                    style={{
                        background: '#ffffff',
                        borderRadius: '24px',
                        padding: '44px 40px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0,0,0,0.02)',
                        border: '1px solid rgba(212, 167, 44, 0.25)',
                        position: 'relative',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                            {/* Icon Badge */}
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #8C5A00 0%, #D4A72C 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 20px rgba(212, 167, 44, 0.25)',
                                }}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <span
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 800,
                                    letterSpacing: '1.5px',
                                    color: '#8C5A00',
                                    background: 'rgba(212, 167, 44, 0.12)',
                                    padding: '6px 14px',
                                    borderRadius: '20px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                OUR VISION
                            </span>
                        </div>

                        <h4 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '16px', lineHeight: 1.3 }}>
                            The Premier Destination for Luxury Wall Decor
                        </h4>

                        <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                            At The Wall Project, our vision is to be the premier destination for luxury wallpaper and bespoke interior wall decor. We aim to empower interior designers, architects, and homeowners by offering an expansive range of high-definition, textured, and custom-printed wall designs. Through sustainable production and creative excellence, we elevate interior environments.
                        </p>
                    </div>

                    <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4A72C', display: 'inline-block' }}></span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B' }}>Design Leadership • Innovation • Global Standard</span>
                    </div>
                </motion.div>

            </div>
        </div>

        <style>{`
            .mv-card:hover {
                transform: translateY(-6px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.07), 0 2px 6px rgba(212, 167, 44, 0.2) !important;
                border-color: rgba(212, 167, 44, 0.5) !important;
            }
            @media (max-width: 991px) {
                .mv-cards-grid {
                    grid-template-columns: 1fr !important;
                    gap: 24px !important;
                }
            }
            @media (max-width: 767px) {
                .mission-vision-section {
                    padding: 60px 0 90px 0 !important;
                }
                .mv-card {
                    padding: 32px 24px !important;
                    border-radius: 20px !important;
                }
            }
        `}</style>
    </section>
);

export default MissionVision;

