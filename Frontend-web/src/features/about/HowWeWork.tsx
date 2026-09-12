import React from 'react';
import { motion } from 'framer-motion';
import TextAnimation from '../../components/elements/TextAnimation';

const steps = [
    { 
        num: '01', 
        title: 'Consultation', 
        desc: 'We analyze your room dimensions, interior aesthetics, and wall texture preferences.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
        )
    },
    { 
        num: '02', 
        title: 'Custom Design',   
        desc: 'Bespoke pattern scaling, color matching, and 3D preview visualization for your space.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"></path>
            </svg>
        )
    },
    { 
        num: '03', 
        title: 'Precision Crafting',
        desc: 'High-definition printing on eco-friendly, washable, textured vinyl & canvas substrates.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
        )
    },
    { 
        num: '04', 
        title: 'Delivery & Fitting',    
        desc: 'Safe nationwide packaging with professional wallpaper installation support.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
        )
    },
];

const HowWeWork: React.FC = () => (
    <section className="how-we-work hww-section" style={{ background: '#F8FAFC', padding: '90px 0', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
            
            <div className="section-title text-center sec-title-animation animation-style1 hww-header" style={{ marginBottom: '55px' }}>
                <h6 className="section-title__tagline" style={{ color: '#8C5A00', fontWeight: 700 }}>
                    <span className="section-title__tagline-border" style={{ backgroundColor: '#8C5A00' }}></span>ADAPTIVE DECOR WORKFLOW
                </h6>
                <h3 className="section-title__title title-animation" style={{ color: '#020D3F', fontSize: '38px', fontWeight: 800 }}>
                    <TextAnimation>Tailored Process From Concept to Installation</TextAnimation>
                </h3>
            </div>

            <div className="hww-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, duration: 0.6 }}
                        className="hww-card"
                        style={{ 
                            background: '#ffffff',
                            borderRadius: '24px',
                            padding: '36px 28px',
                            boxShadow: '0 10px 30px rgba(2, 13, 63, 0.05)',
                            border: '1px solid rgba(212, 167, 44, 0.25)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '24px',
                            position: 'relative',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{
                                    width: '50px', 
                                    height: '50px', 
                                    borderRadius: '50%', 
                                    background: 'linear-gradient(135deg, #020D3F, #0A1C66)', 
                                    color: '#D4A72C',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    fontWeight: 800, 
                                    fontSize: '18px',
                                    border: '1px solid rgba(212, 167, 44, 0.4)',
                                    boxShadow: '0 4px 12px rgba(2, 13, 63, 0.15)'
                                }}>
                                    {step.num}
                                </div>
                                <div style={{ color: '#D4A72C', opacity: 0.85 }}>
                                    {step.icon}
                                </div>
                            </div>
                            <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#020D3F', marginBottom: '12px', letterSpacing: '-0.01em' }}>
                                {step.title}
                            </h4>
                            <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
                                {step.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}

            </div>
        </div>
    </section>
);

export default HowWeWork;
