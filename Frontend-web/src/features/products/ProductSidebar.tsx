import React, { useState } from 'react';
import thumbImg1 from "../../assets/images/shop/product-thumb-1.jpg"
import thumbImg2 from "../../assets/images/shop/product-thumb-2.jpg"
import thumbImg3 from "../../assets/images/shop/product-thumb-3.jpg"
import thumbImg4 from "../../assets/images/shop/product-thumb-4.jpg"

const categories = [
    { name: "All", count: 17, icon: "fa-th-large" },
    { name: "PC Repair", count: 5, icon: "fa-desktop" },
    { name: "Phone Repair", count: 4, icon: "fa-mobile-alt" },
    { name: "A/C Installation", count: 3, icon: "fa-snowflake" },
    { name: "Electrical Wire", count: 2, icon: "fa-bolt" },
    { name: "Laptop Repair", count: 3, icon: "fa-laptop" },
];

const ProductSidebar: React.FC = () => {
    const [valueRange, setValueRange] = useState<number>(50);
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const min: number = 100;
    const max: number = 500;
    const percentage: number = ((valueRange - min) / (max - min)) * 100;

    return (
        <div className="col-xl-3 col-lg-12">
            <div className="product__sidebar">
                <div className="shop-search product__sidebar-single">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Search" />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>

                <div className="product__price-ranger product__sidebar-single">
                    <h3 className="product__sidebar-title">Price</h3>
                    <div className="price-ranger">
                        <div className="ranger-min-max-block">
                            <input
                                type="range"
                                min={min}
                                max={max}
                                value={valueRange}
                                onChange={(e) => setValueRange(Number(e.target.value))}
                                style={{
                                    WebkitAppearance: 'none',
                                    appearance: 'none',
                                    width: '100%',
                                    height: '8px',
                                    borderRadius: '5px',
                                    outline: 'none',
                                    background: `linear-gradient(to right, #2AB97E ${percentage}%, #ffffff ${percentage}%)`
                                }}
                                className="custom-range-slider"
                            />
                            <div className="d-flex justify-content-between valuRange">
                                <div className="d-flex values">
                                    <span>{valueRange}</span>
                                    <span>-</span>
                                    <span>{max}</span>
                                </div>
                                <button>Filter</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium Vertical Category Tabs */}
                <div className="shop-category product__sidebar-single shop-category--v2">
                    <h3 className="product__sidebar-title">Categories</h3>
                    <ul className="list-unstyled cat-tab-list">
                        {categories.map((cat) => (
                            <li
                                key={cat.name}
                                className={activeCategory === cat.name ? 'active' : ''}
                                onClick={() => setActiveCategory(cat.name)}
                            >
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    <span className="cat-tab-icon">
                                        <i className={`fa fa-solid ${cat.icon}`}></i>
                                    </span>
                                    <span className="cat-tab-name">{cat.name}</span>
                                    <span className="cat-tab-count">{cat.count}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="shop-product-recent-products product__sidebar-single">
                    <h3 className="product__sidebar-title">Recent Products</h3>
                    <ul className="clearfix list-unstyled">
                        <li>
                            <div className="img">
                                <img src={thumbImg1} alt="Product" />
                                <a href="#"><i className="fa fa-link" aria-hidden="true"></i></a>
                            </div>
                            <div className="content">
                                <div className="title">
                                    <h5><a href="#">Gree Air Conditioner</a></h5>
                                </div>
                                <div className="price"><p>$33.00</p></div>
                                <div className="review">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star color"></i>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="img">
                                <img src={thumbImg2} alt="Product" />
                                <a href="#"><i className="fa fa-link" aria-hidden="true"></i></a>
                            </div>
                            <div className="content">
                                <div className="title">
                                    <h5><a href="#">Pliers | Cutting, Gripping</a></h5>
                                </div>
                                <div className="price"><p>$39.00</p></div>
                                <div className="review">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star color"></i>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="img">
                                <img src={thumbImg3} alt="Product" />
                                <a href="#"><i className="fa fa-link" aria-hidden="true"></i></a>
                            </div>
                            <div className="content">
                                <div className="title">
                                    <h5><a href="#">Gear and wrench</a></h5>
                                </div>
                                <div className="price"><p>$54.00</p></div>
                                <div className="review">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star color"></i>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="img">
                                <img src={thumbImg4} alt="Product" />
                                <a href="#"><i className="fa fa-link" aria-hidden="true"></i></a>
                            </div>
                            <div className="content">
                                <div className="title">
                                    <h5><a href="#">Nut Driver</a></h5>
                                </div>
                                <div className="price"><p>$44.00</p></div>
                                <div className="review">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star color"></i>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="shop-product-tags product__sidebar-single">
                    <h3 className="product__sidebar-title">Product Tags</h3>
                    <div className="shop-product__tags-list">
                        <a href="#">Repair</a>
                        <a href="#">Technology</a>
                        <a href="#">Business</a>
                        <a href="#">Virus</a>
                        <a href="#">Desktop</a>
                        <a href="#">Laptop</a>
                    </div>
                </div>

                <div className="shop-product-tags product__sidebar-single style">
                    <h3 className="product__sidebar-title">Reviews</h3>
                    <div className="sidebar-rating-box sidebar-rating-box--style2">
                        <ul className="list-unstyled">
                            <li>
                                <input type="radio" id="fivestar" name="rating" defaultChecked />
                                <label htmlFor="fivestar">
                                    <i></i>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="fourstar" name="rating" />
                                <label htmlFor="fourstar">
                                    <i></i>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star gray"></span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="threestar" name="rating" />
                                <label htmlFor="threestar">
                                    <i></i>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star gray"></span>
                                    <span className="fas fa-star gray"></span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="twostar" name="rating" />
                                <label htmlFor="twostar">
                                    <i></i>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star gray"></span>
                                    <span className="fas fa-star gray"></span>
                                    <span className="fas fa-star gray"></span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="onestar" name="rating" />
                                <label htmlFor="onestar">
                                    <i></i>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star gray"></span>
                                    <span className="fas fa-star gray"></span>
                                    <span className="fas fa-star gray"></span>
                                    <span className="fas fa-star gray"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSidebar;
