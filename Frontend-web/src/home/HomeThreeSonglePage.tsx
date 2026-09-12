import React from 'react';
import MainSliderThree from '../features/home-three/MainSliderThree';
import AboutThree from '../features/home-three/AboutThree';
import ServiceThree from '../features/home-three/ServiceThree';
import ContactTwo from '../features/home-two/ContactTwo';
import ProjectThree from '../features/home-three/ProjectThree';
import WhyChooseThree from '../features/home-three/WhyChooseThree';
import CounterThree from '../features/home-three/CounterThree';
import TeamThree from '../features/home-three/TeamThree';
import ProcessThree from '../features/home-three/ProcessThree';
import SlidingText from '../components/elements/SlidingText';
import TestimonialsThree from '../features/home-three/TestimonialsThree';
import BrandThree from '../features/home-three/BrandThree';
import FooterThree from '../components/footers/FooterThree';

const HomeThreeSonglePage: React.FC = () => {
    return (
        <>
            <MainSliderThree />
            <AboutThree />
            <ServiceThree />
            <ContactTwo sectionClass='contact-two' />
            <ProjectThree />
            <WhyChooseThree />
            <CounterThree />
            <TeamThree />
            <ProcessThree />
            <SlidingText />
            <TestimonialsThree />
            <BrandThree />
            <FooterThree />
        </>
    );
};

export default HomeThreeSonglePage;