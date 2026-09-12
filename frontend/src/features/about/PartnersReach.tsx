import React from 'react';
import TextAnimation from '../../components/elements/TextAnimation';
import MarqueeSlider from '../../components/elements/MarqueeSlider';

const partners = [
    'MSME', 'FEDTIS', 'Govt. of India', 'NSIC', 'ISO Certified',
];

const PartnersReach: React.FC = () => (
    <section className="partners-reach" style={{ padding: '80px 0 60px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
            <div className="section-title text-center sec-title-animation animation-style1" style={{ marginBottom: '32px' }}>
                <h6 className="section-title__tagline">
                    <span className="section-title__tagline-border"></span>Our&nbsp;Partners
                </h6>
                <h3 className="section-title__title title-animation">
                    <TextAnimation>Recognitions &amp; Affiliations</TextAnimation>
                </h3>
            </div>

            <div className="partners-marquee">
                <MarqueeSlider mode="1" speed={40}>
                    {partners.map((p, i) => (
                        <div key={i} className="partners-marquee__logo">{p}</div>
                    ))}
                </MarqueeSlider>
            </div>
        </div>
    </section>
);

export default PartnersReach;
