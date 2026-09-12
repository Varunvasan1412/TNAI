import React from 'react';
import { Link } from 'react-router';
import type { ProductItem } from '../../contents/products/productData';

type ProductProps = {
    product: ProductItem;
    index?: number;
}

const ProductGridView: React.FC<ProductProps> = ({ product, index = 0 }) => {
    return (
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <div
                className="single-product-style1 pcard-premium"
                style={{ animationDelay: `${index * 0.07}s` }}
            >
                <div className="single-product-style1__img">
                    <img src={product?.image} alt={product?.title} />
                    <img src={product?.image} alt={product?.title} />

                    {/* Badges */}
                    {(product?.isNew || product?.discouunt) && (
                        <ul className="single-product-style1__overlay pcard-badges">
                            {product?.isNew && (
                                <li><p className="badge-new">New</p></li>
                            )}
                            {product?.discouunt && (
                                <li><p className="badge-sale">{product.discouunt}% Off</p></li>
                            )}
                        </ul>
                    )}

                    {/* Side action icons — appear on hover */}
                    <ul className="single-product-style1__info pcard-actions">
                        <li>
                            <a href="#" title="Add to Wishlist">
                                <i className="fa fa-regular fa-heart"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" title="Quick View">
                                <i className="fa fa-regular fa-eye"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" title="Compare">
                                <i className="fa fa-solid fa-repeat"></i>
                            </a>
                        </li>
                    </ul>

                    {/* Image hover gradient overlay */}
                    <div className="pcard-img-overlay"></div>
                </div>

                <div className="single-product-style1__content pcard-content">
                    <div className="single-product-style1__content-left">
                        <h4>
                            <Link to="/product-details">{product?.title}</Link>
                        </h4>
                        <div className="pcard-price">
                            {product?.previousPrice && (
                                <span className="pcard-price__old">${product.previousPrice}.00</span>
                            )}
                            <span className="pcard-price__current">${product.price}.00</span>
                        </div>
                    </div>
                    <div className="single-product-style1__content-right">
                        <div className="single-product-style1__review pcard-rating">
                            <i className="fa fa-star"></i>
                            <p>{product?.rating}</p>
                        </div>
                    </div>
                </div>

                {/* Add to Cart CTA */}
                <div className="pcard-cart-btn">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fa fa-solid fa-cart-plus"></i>
                        <span>Add to Cart</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductGridView;
