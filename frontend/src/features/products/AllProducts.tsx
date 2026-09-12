import React, { useState } from 'react';
import CustomSelect from '../../components/elements/CustomSelect';
import ProductGridView from './ProductGridView';
import ProductListView from './ProductListView';
import { productsList, type ProductItem } from '../../contents/products/productData';

const CATEGORIES = [
    { label: "All",          icon: "fa-th-large"  },
    { label: "AC & Cooling", icon: "fa-snowflake"  },
    { label: "Tools",        icon: "fa-wrench"     },
    { label: "Cables",       icon: "fa-plug"       },
    { label: "Power",        icon: "fa-bolt"       },
    { label: "Accessories",  icon: "fa-keyboard"   },
];

const AllProducts: React.FC = () => {
    const [sortValue, setSortValue]         = useState<string>("Sort by popular");
    const [isGrid, setGrid]                 = useState<boolean>(true);
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [currentPage, setCurrentPage]     = useState(1);

    const ITEMS_PER_PAGE = 12;

    /* Filter by category */
    const filteredProducts = activeCategory === "All"
        ? productsList
        : productsList.filter((p) => p.category === activeCategory);

    /* Paginate filtered list */
    const totalPages    = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex    = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    return (
        <div className="col-xl-9 col-lg-12">
            <div className="product__items">

                {/* ── Horizontal Category Tabs ── */}
                <div className="pcat-tabs-wrap">
                    <div className="pcat-tabs">
                        {CATEGORIES.map((cat) => {
                            const count = cat.label === "All"
                                ? productsList.length
                                : productsList.filter((p) => p.category === cat.label).length;
                            return (
                                <button
                                    key={cat.label}
                                    className={`pcat-tab ${activeCategory === cat.label ? "active" : ""}`}
                                    onClick={() => handleCategoryChange(cat.label)}
                                    type="button"
                                >
                                    <span className="pcat-tab__icon">
                                        <i className={`fa fa-solid ${cat.icon}`}></i>
                                    </span>
                                    <span className="pcat-tab__label">{cat.label}</span>
                                    <span className="pcat-tab__count">{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Showing result + Sort ── */}
                <div className="row">
                    <div className="col-xl-12">
                        <div className="product__showing-result">
                            <div className="product__showing-text-box">
                                <p className="product__showing-text">
                                    {filteredProducts.length === 0
                                        ? "No products found"
                                        : `Showing ${startIndex + 1}–${startIndex + currentProducts.length} of ${filteredProducts.length} results`}
                                </p>
                            </div>
                            <div className="product__showing-sort">
                                <div className="select-box">
                                    <CustomSelect
                                        optionArray={[
                                            { id: 1, value: "Sort by popular", label: "Sort by popular" },
                                            { id: 2, value: "Sort by Price",   label: "Sort by Price"   },
                                            { id: 3, value: "Sort by Ratings", label: "Sort by Ratings" },
                                        ]}
                                        value={sortValue}
                                        onChange={(v) => setSortValue(v)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Grid / List toggle + Products ── */}
                <div className="product__all">
                    <div className="product__all-tab">
                        <div className="product__all-tab-button">
                            <ul className="tabs-button-box clearfix">
                                <li
                                    className={`tab-btn-item ${isGrid ? "active-btn-item" : ""}`}
                                    onClick={() => setGrid(true)}
                                >
                                    <div className="product__all-tab-button-icon one">
                                        <i className="fa fa-solid fa-bars"></i>
                                    </div>
                                </li>
                                <li
                                    className={`tab-btn-item ${!isGrid ? "active-btn-item" : ""}`}
                                    onClick={() => setGrid(false)}
                                >
                                    <div className="product__all-tab-button-icon">
                                        <i className="fa fa-solid fa-list-ul"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="tabs-content-box">
                            <div className="tab-content-box-item tab-content-box-item-active">
                                <div className="product__all-tab-content-box-item">
                                    <div className="product__all-tab-single">
                                        {filteredProducts.length === 0 ? (
                                            <div className="pcat-empty">
                                                <i className="fa fa-solid fa-box-open"></i>
                                                <p>No products in this category yet.</p>
                                            </div>
                                        ) : (
                                            /* key=activeCategory re-mounts the row so entrance animation replays */
                                            <div className="row pcard-grid-row" key={activeCategory}>
                                                {currentProducts.map((item: ProductItem, idx: number) =>
                                                    isGrid
                                                        ? <ProductGridView product={item} key={item.id} index={idx} />
                                                        : <ProductListView product={item} key={item.id} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Pagination ── */}
                    {totalPages > 1 && (
                        <ul className="styled-pagination text-center clearfix list-unstyled">
                            <li className="arrow prev">
                                <button
                                    onClick={(e) => { handlePageChange(currentPage - 1); e.preventDefault(); }}
                                    disabled={currentPage === 1}
                                >
                                    <span className="fas fa-angle-left"></span>
                                </button>
                            </li>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <li key={index} className={`count ${currentPage === index + 1 ? "active" : ""}`}>
                                    <button onClick={() => handlePageChange(index + 1)} className="pg-btn">
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className="arrow next">
                                <button
                                    aria-label="Next"
                                    onClick={(e) => { handlePageChange(currentPage + 1); e.preventDefault(); }}
                                    disabled={currentPage === totalPages}
                                >
                                    <span className="fas fa-angle-right"></span>
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
