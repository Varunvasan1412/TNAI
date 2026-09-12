import React from 'react';
import MainSlider from '../features/home-one/MainSlider';
import FeatureOne from '../features/home-one/FeatureOne';
import AboutOne from '../features/home-one/AboutOne';
import ServiceOne from '../features/home-one/ServiceOne';
import WhyChooseOne from '../features/home-one/WhyChooceOne';
import CounterOne from '../features/home-one/CounterOne';
import ProjectOne from '../features/home-one/ProjectOne';
import VideoOne from '../features/home-one/VideoOne';
// import BrandOne from '../features/home-one/BrandOne';
import FooterOne from '../components/footers/FooterOne';

const HomeOne: React.FC = () => {
    return (
        <>
            <MainSlider />
            {/* Removed intermediate sections as requested */}
            <FooterOne />
        </>
    );
};

export default HomeOne;