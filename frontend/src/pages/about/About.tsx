import React from 'react';
import '../../assets/css/module-css/about-page.css';

import HowWeWork from '../../features/about/HowWeWork';
import InsideTES from '../../features/about/InsideTES';
import MissionVision from '../../features/about/MissionVision';
import FooterOne from '../../components/footers/FooterOne';
// import BrandOne from '../../features/home-one/BrandOne';

const About: React.FC = () => {
    return (
        <div className="about-page-wrap">
            {/* Hero goes here */}
            <HowWeWork />
            <InsideTES />
            <MissionVision />
            {/* <KeyDiff /> */}
            {/* <Certifications /> */}
            {/* <PartnersReach /> */}
            {/* <BrandOne /> */}
            <FooterOne />
        </div>
    );
};

export default About;
