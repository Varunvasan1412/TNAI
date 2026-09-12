import React from 'react';
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

interface PageBannerProps {
    titleMain: string;
    titleSub?: string;
    subtitle?: string;
    tagline?: string;
    desc?: string;
    minHeight?: string;
    bgImage?: string;
    isContentBoxed?: boolean;
    children?: React.ReactNode;
}

const PageBanner: React.FC<PageBannerProps> = ({
    titleMain,
    titleSub,
    subtitle,
    tagline,
    desc,
    minHeight = '45vh',
    bgImage = '/Hero.png',
    isContentBoxed = false,
    children
}) => {
    return (
        <SectionWrapper id="page-banner" className="page-hero-section">
            <style>{`
                .page-hero-section {
                    position: relative;
                    width: 100%;
                    min-height: ${minHeight};
                    display: flex;
                    align-items: center;
                    background-image: url('${bgImage}');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    padding-top: 130px;
                    margin-top: 110px;
                }
                .page-banner-custom-container {
                    width: 100%;
                    padding: 0 55px;
                }
                .page-hero-content {
                    max-width: 650px;
                    padding-left: 15px;
                    margin-top: -30px;
                    padding-bottom: 30px;
                    font-family: "Open Sans", sans-serif;
                }
                .page-hero-subtitle {
                    color: #0E49FC;
                    font-weight: 600;
                    font-size: 14px;
                    margin-bottom: 15px;
                    display: flex;
                    flex-direction: column;
                }
                .page-hero-subtitle::after {
                    content: '';
                    display: block;
                    width: 40px;
                    height: 2px;
                    background-color: #00227D;
                    margin-top: 8px;
                }
                .page-hero-title-main {
                    color: #00227D;
                    font-size: 48px;
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 5px;
                    font-family: "Open Sans", sans-serif;
                    text-transform: uppercase;
                }
                .page-hero-title-sub {
                    color: #0E49FC;
                    font-size: 36px;
                    font-weight: 700;
                    line-height: 1.2;
                    margin-bottom: 25px;
                    font-family: "Open Sans", sans-serif;
                    text-transform: uppercase;
                }
                .page-hero-tagline {
                    color: #00227D;
                    font-weight: 600;
                    font-size: 16px;
                    margin-bottom: 15px;
                }
                .page-hero-desc {
                    color: #00227D;
                    font-size: 16px;
                    margin-bottom: 35px;
                    line-height: 1.5;
                    max-width: 90%;
                }
                @media (max-width: 991px) {
                    .page-hero-section {
                        min-height: auto;
                        padding: 40px 0 40px 0;
                        margin-top: 80px;
                        background-position: center;
                    }
                    .page-banner-custom-container {
                        padding: 0 15px;
                    }
                    .page-hero-content {
                        background: rgba(255, 255, 255, 0.95);
                        padding: 25px;
                        border-radius: 12px;
                        margin: 0;
                    }
                    .page-hero-title-main {
                        font-size: 32px;
                    }
                    .page-hero-title-sub {
                        font-size: 24px;
                    }
                }
            `}</style>
            <div className={isContentBoxed ? "page-banner-custom-container" : "container"}>
                <motion.div
                    className="page-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {subtitle && (
                        <div className="page-hero-subtitle">
                            {subtitle}
                        </div>
                    )}
                    <h1 className="page-hero-title-main">
                        {titleMain}
                    </h1>
                    {titleSub && (
                        <h2 className="page-hero-title-sub">
                            {titleSub}
                        </h2>
                    )}
                    {tagline && (
                        <div className="page-hero-tagline">
                            {tagline}
                        </div>
                    )}
                    {desc && (
                        <p className="page-hero-desc">
                            {desc}
                        </p>
                    )}
                    {children}
                </motion.div>
            </div>
        </SectionWrapper>
    );
};

export default PageBanner;
