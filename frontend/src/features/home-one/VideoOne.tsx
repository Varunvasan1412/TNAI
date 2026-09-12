import React from 'react';

import videoOneBg from '../../assets/images/about/bg for contact bg.png';
import JarallaxSection from '../../components/elements/JarallaxSection';
import TextAnimation from '../../components/elements/TextAnimation';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface ContactInfo {
    id: number;
    iconClass: string;
    lines: { text: string; href?: string }[];
}

const contactInfoItems: ContactInfo[] = [
    {
        id: 1,
        iconClass: 'icon-location',
        lines: [{ text: 'No.145-F, Srinivasa complex, Dr Radhakrishna St, Sivananda Colony, Tatabad, Coimbatore, Tamil Nadu 641012' }],
    },
    {
        id: 2,
        iconClass: 'icon-call',
        lines: [
            { text: '+91 96777 33363', href: 'tel:+919677733363' },
        ],
    },
    {
        id: 3,
        iconClass: 'icon-envelope',
        lines: [
            { text: 'info@thewallproject.in', href: 'mailto:info@thewallproject.in' },
        ],
    },
];

const VideoOne: React.FC = () => {
    return (
        <SectionWrapper className="video-one" id='contact'>
            <JarallaxSection className="video-one__bg-color" imgSrc={videoOneBg} overlayOpacity={0.8} >
                <div></div>
            </JarallaxSection>

            <div className="container">
                <div className="video-one__inner">
                    <div className="section-title text-center sec-title-animation animation-style1">
                        <h6 className="section-title__tagline">
                            <span className="section-title__tagline-border"></span>Get In Touch
                        </h6>
                        <h3 className="section-title__title title-animation">
                            <TextAnimation animationStyle='style1'>
                                Request a Quote or Product Enquiry
                            </TextAnimation>
                        </h3>
                    </div>
                    <p className="video-one__text pb-3">
                        The Wall Project provides premium custom wallpapers, wall coverings, and decorative
                        <br /> interior solutions to residential, commercial, and architectural clients
                        <br /> across India and worldwide.
                    </p>
                    <div className="video-one__contact-box mb-5">
                        <div className="row justify-content-center mt-3">
                            <div className="col-xl-12">
                                <div
                                    className="video-one-contact__info-box"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        borderRadius: '30px',
                                        padding: '0',
                                        position: 'relative',
                                        zIndex: 10
                                    }}
                                >
                                    <h3 className="video-one-contact__info-title text-center mb-5" style={{ fontSize: '36px', fontWeight: 700 }}>
                                        Contact Information
                                    </h3>
                                    <div className="row justify-content-center text-center">
                                        {contactInfoItems.map((item) => (
                                            <div key={item.id} className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                <div className="contact-info-item d-flex flex-column align-items-center">
                                                    <div className="icon mb-3" style={{ fontSize: '48px', color: 'var(--rsistore-base)' }}>
                                                        <span className={item.iconClass}></span>
                                                    </div>
                                                    <div className="content">
                                                        {item.lines.map((line, index) => (
                                                            <p key={index} className="mb-0" style={{ fontSize: '18px', fontWeight: 500, color: 'var(--rsistore-black)' }}>
                                                                {line.href ? (
                                                                    <a href={line.href} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}>{line.text}</a>
                                                                ) : (
                                                                    line.text
                                                                )}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </SectionWrapper>
    );
};

export default VideoOne;