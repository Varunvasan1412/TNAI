import React from 'react';
import Banner from '../../features/banner/Banner';
import ProductListing from '../../features/product-listing/ProductListing';
import FooterOne from '../../components/footers/FooterOne';
import { useParams } from 'react-router';


const ProductListingPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const title = category?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') ?? 'Products';

    return (
        <>
            <Banner
                title={title}
                subTitle={title}
                bgImage="/banner image.png"
            />
            <ProductListing />
            <FooterOne />
        </>
    );
};

export default ProductListingPage;
