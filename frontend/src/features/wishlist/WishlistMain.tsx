import React, { useState } from "react";
import { Link } from "react-router";

/* =======================
   Image Imports (TOP)
======================= */
import wishlistImg1 from "../../assets/images/shop/wishlist-page-img-1.jpg";
import wishlistImg2 from "../../assets/images/shop/wishlist-page-img-2.jpg";
import wishlistImg3 from "../../assets/images/shop/wishlist-page-img-3.jpg";
import wishlistImg4 from "../../assets/images/shop/wishlist-page-img-4.jpg";

/* =======================
   Types
======================= */
interface WishlistItem {
    id: number;
    name: string;
    price: number;
    stock: string;
    image: string;
}

/* =======================
   Data Array
======================= */
const wishlistItems: WishlistItem[] = [
    {
        id: 1,
        name: "Fite ON AC_DC Adapter",
        price: 120.99,
        stock: "In Stock",
        image: wishlistImg1
    },
    {
        id: 2,
        name: "Gaming Headset",
        price: 100.99,
        stock: "In Stock",
        image: wishlistImg2
    },
    {
        id: 3,
        name: "Wireless Mouse",
        price: 106.99,
        stock: "In Stock",
        image: wishlistImg3
    },
    {
        id: 4,
        name: "Screwdriver and wrench",
        price: 170.0,
        stock: "In Stock",
        image: wishlistImg4
    }
];

/* =======================
   Component
======================= */
const WishlistMain: React.FC = () => {
    const [wishlistProduct, setWishlistProduct] = useState<WishlistItem[]>(wishlistItems);
    const removeProduct = (id: number) => {
        setWishlistProduct((pre) => pre.filter((p) => p.id !== id))
    }
    return (
        <section className="wishlist-page">
            <div className="container">
                <div className="table-responsive">
                    <table className="table wishlist-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>Stock Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {wishlistProduct.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="product-box">
                                            <div className="cross-icon">
                                                <a href="#" onClick={() => removeProduct(item?.id)}>
                                                    <i className="fas fa-times"></i>
                                                </a>
                                            </div>

                                            <div className="img-box">
                                                <img src={item.image} alt={item.name} />
                                            </div>

                                            <h3>
                                                <Link to="/product-details">
                                                    {item.name}
                                                </Link>
                                            </h3>
                                        </div>
                                    </td>

                                    <td>${item.price.toFixed(2)}</td>

                                    <td>{item.stock}</td>

                                    <td>
                                        <div className="product-select">
                                            <Link
                                                className="thm-btn wishlist-page__btn"
                                                to="/product-details"
                                            >
                                                Select Product
                                                <span><i className="icon-arrow-right"></i></span>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Social Share */}
                <div className="product-details__social two">
                    <div className="title">
                        <h3>Share with friends:</h3>
                    </div>

                    <div className="product-details__social-link">
                        <a href="#"><span className="fab fa-twitter"></span></a>
                        <a href="#"><span className="fab fa-facebook"></span></a>
                        <a href="#"><span className="fab fa-pinterest-p"></span></a>
                        <a href="#"><span className="fab fa-instagram"></span></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WishlistMain;
