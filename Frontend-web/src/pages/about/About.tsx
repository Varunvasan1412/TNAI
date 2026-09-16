import React from 'react';
import { Link } from 'react-router';
import { FaUserPlus, FaFileAlt } from 'react-icons/fa';
import MissionVision from '../../features/about/MissionVision';
import StatsBanner from '../../features/about/StatsBanner';
import EventsAndNews from '../../features/about/EventsAndNews';
import ExecutiveCommittee from '../../features/about/ExecutiveCommittee';
import GalleryAndTestimonials from '../../features/about/GalleryAndTestimonials';
import '../../assets/css/module-css/about-page.css';
import '../../assets/css/module-css/contact-page.css'; // For the hero features CSS

import FooterOne from '../../components/footers/FooterOne';
import PageBanner from '../../components/elements/PageBanner';
import OurLegacy from '../../features/about/OurLegacy';

const About: React.FC = () => {
    return (
        <div className="about-page-wrap">
            <PageBanner
                bgImage="/Contact.png"
                isContentBoxed={true}
                minHeight="80vh"
                titleMain=""
            >
                <h1 className="hero-title-main" style={{ marginTop: '40px' }}>
                    THE TRAINED NURSES'<br />ASSOCIATION OF INDIA
                </h1>
                <h2 className="hero-title-sub">
                    TAMIL NADU STATE BRANCH
                </h2>
                <div className="hero-tagline" style={{ marginBottom: '30px' }}>
                    Together We Care &bull; Together We Serve &bull; Together We Grow
                </div>
                <div className="hero-btn-group">
                    <Link to="/membership" className="hero-btn-primary">
                        <FaUserPlus /> BECOME A MEMBER
                    </Link>
                    <Link to="/circulars" className="hero-btn-secondary">
                        <FaFileAlt /> LATEST CIRCULARS
                    </Link>
                </div>
            </PageBanner>

            <OurLegacy />
            <MissionVision />
            <ExecutiveCommittee />
            <StatsBanner />
            <EventsAndNews />
            <GalleryAndTestimonials />
            <FooterOne />
        </div>
    );
};

export default About;
