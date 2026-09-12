import React from 'react';
import MainSliderTwo from '../features/home-two/MainSliderTwo';
import FeatureTwo from '../features/home-two/FeatureTwo';
import AboutTwo from '../features/home-two/AboutTwo';
import ServiceTwo from '../features/home-two/ServiceTwo';
import WhyChooseTwo from '../features/home-two/WhyChooseTwo';
import ProcessTwo from '../features/home-two/ProcessTwo';
import ProjectTwo from '../features/home-two/ProjectTwo';
import TeamTwo from '../features/home-two/TeamTwo';
import CounterOne from '../features/home-one/CounterOne';
import FaqTwo from '../features/home-two/FaqTwo';
import SlidingText from '../components/elements/SlidingText';
import PricingTwo from '../features/home-two/PricingTwo';
import TestimonialTwo from '../features/home-two/TestimonialTwo';
import ContactTwo from '../features/home-two/ContactTwo';
import FooterTwo from '../components/footers/FooterTwo';

const HomeTwo: React.FC = () => {
    return (
        <>
            <MainSliderTwo />
            <FeatureTwo />
            <AboutTwo />
            <ServiceTwo />
            <WhyChooseTwo />
            <ProcessTwo />
            <ProjectTwo />
            <TeamTwo />
            <CounterOne />
            <FaqTwo />
            <SlidingText />
            <PricingTwo />
            <TestimonialTwo />
            <ContactTwo />
            <FooterTwo />

        </>
    );
};

export default HomeTwo;