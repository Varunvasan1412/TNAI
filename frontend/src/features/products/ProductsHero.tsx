import React from 'react';
import { motion } from 'framer-motion';
import TextAnimation from '../../components/elements/TextAnimation';
import '../../assets/css/module-css/about-page.css';

const heroImg = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1100&h=800&fit=crop&crop=center&q=90'; // Tech/research imagery for products

const badges = [
    { icon: '🏭', label: 'In-house\nManufacturing' },
    { icon: '🔬', label: 'Advanced\nTesting' },
    { icon: '⚙️', label: 'Custom\nSolutions' },
    { icon: '🌍', label: 'Global\nDelivery' },
];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

const ProductsHero: React.FC = () => (
    <section className="about-hero">
        {/* ── Left content ── */}
        <div className="about-hero__left">
            <motion.div
                className="section-title sec-title-animation animation-style1"
                style={{ marginBottom: 0 }}
                {...fadeUp(0)}
            >
                <h6 className="section-title__tagline">
                    <span className="section-title__tagline-border"></span>OUR PRODUCTS
                </h6>
                <h3
                    className="section-title__title title-animation about-hero__heading"
                    style={{ lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 22 }}
                >
                    <TextAnimation animationStyle="style1">
                        High-Performance Materials for Cutting-Edge Research
                    </TextAnimation>
                </h3>
            </motion.div>

            <motion.p className="about-hero__subtext" {...fadeUp(0.2)}>
                Discover our comprehensive range of electrochemical consumables, from 
                advanced binders and foils to state-of-the-art cell fixtures.
            </motion.p>

            <motion.div className="about-hero__badges" {...fadeUp(0.25)}>
                {badges.map((b, i) => (
                    <div className="about-hero__badge" key={i}>
                        <div className="about-hero__badge-icon">{b.icon}</div>
                        <span style={{ whiteSpace: 'pre-line', lineHeight: '1.3' }}>{b.label}</span>
                    </div>
                ))}
            </motion.div>
        </div>

        {/* ── Right image ── */}
        <motion.div
            className="about-hero__right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
        >
            <div className="about-hero__img-fade" />
            <img src={heroImg} alt="Electrochemical Products" className="about-hero__img" />
        </motion.div>
    </section>
);

export default ProductsHero;
