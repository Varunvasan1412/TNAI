import React from 'react';
import { useParams } from 'react-router';
import Banner from '../../features/banner/Banner';
import ProductDetail from '../../features/product-detail/ProductDetail';
import FooterOne from '../../components/footers/FooterOne';
const ProductDetailPage: React.FC = () => {
    // We don't need params here anymore since ProductDetail fetches the data
    useParams<{ category: string; productId: string }>();
    const title = 'Product Details';

    return (
        <>
            <Banner
                title={title}
                subTitle="Products"
                bgImage="/banner image.png"
            />
            <ProductDetail />
            <FooterOne />
        </>
    );
};

export default ProductDetailPage;
