import React from 'react';
import Banner from '../../features/banner/Banner';
import FooterOne from '../../components/footers/FooterOne';
import ProductDetailsMain from '../../features/product-details/ProductDetailsMain';
import ProductDescription from '../../features/product-details/ProductDescription';
import ProductCarousel from '../../features/product-details/ProductCarousel';

const ProductDetails: React.FC = () => {
    return (
        <>
            <Banner
                title='Product Details'
                subTitle='Product Details'
                bgImage="/banner image.png"
            />
            <ProductDetailsMain />
            <ProductDescription />
            <ProductCarousel />
            <FooterOne />
        </>
    );
};

export default ProductDetails; 