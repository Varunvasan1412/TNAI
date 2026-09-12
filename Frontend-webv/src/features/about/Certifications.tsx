import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextAnimation from '../../components/elements/TextAnimation';

const certs = [
    { image: '/ISO_CERTIFICATE_TES.webp', name: 'ISO 9001:2015' },
    { image: '/msme_tes.webp', name: 'MSME Registered' },
    { image: '/TES-gst.webp', name: 'GST Certificate' },
];

const Certifications: React.FC = () => {
    const [selectedCert, setSelectedCert] = useState<string | null>(null);

    return (
        <section className="certifications" style={{ paddingBottom: '0' }}>
            <div className="certifications__inner" style={{ paddingBottom: '40px' }}>
                {/* Header */}
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline"><span className="section-title__tagline-border"></span>Our Certifications</h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation>Trusted &amp; Certified</TextAnimation>
                    </h3>
                </div>

                {/* Grid */}
                <div className="certifications__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 0 20px' }}>
                    {certs.map((c, i) => (
                        <motion.div
                            key={c.name}
                            style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                gap: '24px',
                                cursor: 'zoom-in'
                            }}
                            onClick={() => setSelectedCert(c.image)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div style={{ background: '#fff', padding: '16px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0', width: '100%', display: 'flex', justifyContent: 'center', transition: 'transform 0.2s', ...({ '&:hover': { transform: 'scale(1.02)' } } as any) }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <img src={c.image} alt={c.name} style={{ width: '100%', height: 'auto', maxHeight: '380px', objectFit: 'contain', borderRadius: '8px' }} />
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', textAlign: 'center' }}>{c.name}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(15, 23, 42, 0.9)',
                            zIndex: 99999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '40px',
                            cursor: 'zoom-out',
                            backdropFilter: 'blur(8px)'
                        }}
                    >
                        <motion.img 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            src={selectedCert} 
                            alt="Certificate Full View" 
                            style={{
                                maxHeight: '90vh',
                                maxWidth: '90vw',
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }} 
                        />
                        <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedCert(null); }}
                            style={{
                                position: 'absolute',
                                top: '32px',
                                right: '32px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                fontSize: '28px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                                paddingBottom: '4px'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
                        >
                            ×
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;
