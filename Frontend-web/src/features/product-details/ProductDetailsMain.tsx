import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import QuantityOfProduct from './QuantityOfProduct';
import NavForSlider from './NavForSlider';

const ProductDetailsMain: React.FC = () => {
    const [quantityValue, setQuantityValue] = useState(1); 
    const [selectedSize, setSelectedSize] = useState('XXL');
    const sizes = ['XXL', 'XL', 'XS', 'M', 'L', 'S'];
    const navigate = useNavigate();
    const handleSizeChange = (size: string): void => {
        setSelectedSize(size);
    };

    const handleAddToWishlist = () => { 
        navigate("/wishlist")

    };

    const handleAddToCart = () => { 
        navigate("/cart")
    };
    return (
        <section className="product-details">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-xl-6">
                        <div className="product-details__left">
                            <div className="product-details__left-inner">
                                <NavForSlider />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-6">
                        <div className="product-details__right">
                            <div className="product-details__top">
                                <h3 className="product-details__title">
                                    Think, Plan, Achieve <span>$86.00</span>
                                </h3>
                            </div>
                            <div className="product-details__reveiw">
                                {[...Array(5)].map((_, index) => (
                                    <i key={index} className="icon-star"></i>
                                ))}
                                <span>55 customer reviews</span>
                            </div>
                            <div className="product-details__content">
                                <p className="product-details__content-text1">
                                    The power to be found between the pages of a book is formidable, indeed.
                                    And these 80 inspiring quotes about books and importance of reading are here
                                    to remind you of that. From beloved bestsellers to iconic celebrities, these
                                    quotes exemplify the benefits of reading and of a good books to comfort,
                                    challenge, and inspire you.
                                </p>
                                <p className="product-details__content-text2">
                                    REF. 4231/406 <br />
                                    Available in store
                                </p>
                            </div>
                            <div className="product-details__select">
                                <div className="product-details__select-size">
                                    <h3>Size:</h3>
                                    <ul className="list-unstyled">
                                        {sizes.map((size, index) => (
                                            <li key={size}>
                                                <input
                                                    type="radio"
                                                    id={`size${index + 1}`}
                                                    name="size"
                                                    value={size}
                                                    checked={selectedSize === size}
                                                    onChange={() => handleSizeChange(size)}
                                                />
                                                <label htmlFor={`size${index + 1}`}>
                                                    <i></i>
                                                    <span>{size}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="product-details__inner">
                                <div className="product-details__quantity">
                                    <h3 className="product-details__quantity-title">Quantity</h3>
                                    <QuantityOfProduct value={quantityValue} onChange={setQuantityValue} />
                                </div>

                                <div className="product-details__buttons-boxes">
                                    <div className="product-details__buttons-1">
                                        <button
                                            onClick={handleAddToWishlist}
                                            className="thm-btn"
                                            type="button"
                                        >
                                            Add to Wishlist
                                            <span><i className="icon-right-arrow"></i></span>
                                        </button>
                                    </div>

                                    <div className="product-details__buttons-2">
                                        <button
                                            onClick={handleAddToCart}
                                            className="thm-btn"
                                            type="button"
                                        >
                                            Add to Cart
                                            <span><i className="icon-right-arrow"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="product-details__social">
                                <div className="title">
                                    <h3>Share with friends:</h3>
                                </div>
                                <div className="product-details__social-link">
                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                        <span className="fab fa-twitter"></span>
                                    </a>
                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                        <span className="fab fa-facebook"></span>
                                    </a>
                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                        <span className="fab fa-pinterest-p"></span>
                                    </a>
                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                        <span className="fab fa-instagram"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsMain;