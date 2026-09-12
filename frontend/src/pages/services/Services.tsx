import React from 'react';
// import ProductsHero from '../../features/products/ProductsHero';
import ServicesSec from '../../features/services/ServicesSec';
import FooterOne from '../../components/footers/FooterOne';
import Banner from '../../features/banner/Banner';

const Services: React.FC = () => {
    return (
        <>
            <Banner
                title="Product Categories"
                subTitle="Product Categories"
                bgImage="/banner image.png"
            />
            <ServicesSec />
            {/* <ProductsHero /> */}
            <FooterOne />
        </>
    );
};

export default Services;