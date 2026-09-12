import React from 'react';
import MainSlider from '../features/home-one/MainSlider';
import FeatureOne from '../features/home-one/FeatureOne';
import AboutOne from '../features/home-one/AboutOne';
import ServiceOne from '../features/home-one/ServiceOne';
import WhyChooseOne from '../features/home-one/WhyChooceOne';
import CounterOne from '../features/home-one/CounterOne';
import ProjectOne from '../features/home-one/ProjectOne';
import VideoOne from '../features/home-one/VideoOne';
import TeamOne from '../features/home-one/TeamOne';
// import BrandOne from '../features/home-one/BrandOne';
import PricingOne from '../features/home-one/PricingOne';
import TestimonialOne from '../features/home-one/TestimonialOne';
import FooterOne from '../components/footers/FooterOne';

const HomeOneSinglePage: React.FC = () => {
    return (
        <>
            <MainSlider />
            <FeatureOne />
            <AboutOne />
            <ServiceOne />
            <WhyChooseOne />
            <CounterOne />
            <ProjectOne />
            <VideoOne />
            <TeamOne />
            {/* <BrandOne /> */}
            <PricingOne />
            <TestimonialOne />
            <FooterOne />
        </>
    );
};

export default HomeOneSinglePage;