import React from 'react';
import { Link } from 'react-router';  
import type { ProductItem } from '../../contents/products/productData';

type ProductProps = {
    product: ProductItem
}
const ProductListView: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className="col-xl-6 col-lg-6">
            <div className="single-product-style2">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="single-product-style2__img">
                            <img src={product?.image} alt="" />
                            <img src={product?.image} alt="" />
                            {
                                product?.isNew || product?.discouunt
                                    ?
                                    (<ul className="single-product-style1__overlay">
                                        {
                                            product?.isNew && product?.discouunt ? <>
                                                <li>
                                                    <p>New</p>
                                                </li>
                                                <li>
                                                    <p>{product?.discouunt}% Off</p>
                                                </li>
                                            </> : <li>
                                                <p>{product?.isNew ? "New" : `${product?.discouunt}% Off`}</p>
                                            </li>
                                        } 
                                    </ul>)
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="single-product-style2__content">
                            <div className="single-product-style2__review">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="single-product-style2__text">
                                <h4>
                                    <Link to="/product-details">
                                        {product?.title}
                                    </Link>
                                </h4>
                                {
                                    product?.previousPrice ? <p><del>${product?.previousPrice}.00</del> ${product?.price}.00</p> : <p>${product?.price}.00</p>
                                }
                            </div>
                            <ul className="single-product-style2__info">
                                <li>
                                    <a href="#" title="Add to Wishlist">
                                        <i
                                            className="fa fa-regular fa-heart">
                                        </i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Add to cart">
                                        <i
                                            className="fa fa-solid fa-cart-plus">
                                        </i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Quick View">
                                        <i className="fa fa-regular fa-eye">
                                        </i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Compare">
                                        <i
                                            className="fa fa-solid fa-repeat">
                                        </i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListView;