import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import TextAnimation from '../../components/elements/TextAnimation';

import p1 from '../../assets/images/project/image-1.webp';
import p2 from '../../assets/images/project/project-1-2.jpg';
import p3 from '../../assets/images/project/project-1-3.jpg';
import p4 from '../../assets/images/project/project-1-4.jpg';
import p5 from '../../assets/images/project/project-1-5.jpg';
import p6 from '../../assets/images/project/project-1-6.jpg';
import p7 from '../../assets/images/project/project-1-7.jpg';

const fallbackImages = [p1, p2, p3, p4, p5, p6, p7];
const IMAGE_EXTS = /\.(jpe?g|png|webp|gif|svg|avif|bmp)(\?.*)?$/i;

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const ProductListing: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState<any>(null);
    const [activeSubCat, setActiveSubCat] = useState<number | string>('');
    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        const envBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://crm.rsistore.in';
        const cleanBaseUrl = envBaseUrl.endsWith('/') ? envBaseUrl.slice(0, -1) : envBaseUrl;
        setBaseUrl(cleanBaseUrl);

        fetch(`${cleanBaseUrl}/api/product/web/products`)
            .then(res => res.json())
            .then(result => {
                if (result.status && result.data) {
                    const allProducts = result.data;

                    // Filter products belonging to this category slug
                    const categoryProducts = allProducts.filter((p: any) =>
                        p.category && slugify(p.category.category_name) === category
                    );

                    categoryProducts.sort((a: any, b: any) => a.id - b.id);

                    if (categoryProducts.length > 0) {
                        const catName = categoryProducts[0].category.category_name;

                        // Group by subcategory
                        const subCatMap = new Map();

                        categoryProducts.forEach((p: any) => {
                            if (p.subcategory) {
                                if (!subCatMap.has(p.subcategory.id)) {
                                    subCatMap.set(p.subcategory.id, {
                                        id: p.subcategory.id,
                                        name: p.subcategory.sub_category_name,
                                        products: []
                                    });
                                }
                                subCatMap.get(p.subcategory.id).products.push({
                                    id: p.id,
                                    name: p.product_name,
                                    images: p.images || []
                                });
                            }
                        });

                        const subCategories = Array.from(subCatMap.values());
                        subCategories.sort((a: any, b: any) => a.id - b.id);

                        setCategoryData({
                            slug: category,
                            title: catName,
                            subCategories: subCategories
                        });

                        if (subCategories.length > 0) {
                            setActiveSubCat(subCategories[0].id);
                        }
                    }
                }
            })
            .catch(err => console.error("Error fetching products:", err))
            .finally(() => setLoading(false));
    }, [category]);

    if (loading) {
        return (
            <section className="product-listing-page">
                <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', color: '#64748B' }}>Loading products...</p>
                </div>
            </section>
        );
    }

    if (!categoryData || categoryData.subCategories.length === 0) {
        return (
            <section className="product-listing-page">
                <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', color: '#64748B', marginBottom: '20px' }}>Category not found or has no products.</p>
                    <button className="thm-btn" onClick={() => navigate(-1)}>
                        Go Back <span className="icon-arrow-right"></span>
                    </button>
                </div>
            </section>
        );
    }

    const activeSubCatData = categoryData.subCategories.find((s: any) => s.id === activeSubCat);
    const products = activeSubCatData?.products ?? [];

    const getProductImage = (product: any) => {
        // Prefer regular_images (new API field); fall back to legacy images array
        const src: any[] = product.regular_images?.length
            ? product.regular_images
            : (product.images ?? []);

        if (src.length > 0) {
            const validImg = src.find((img: any) => {
                const url = img.image_path || img.url || (typeof img === 'string' ? img : '');
                return IMAGE_EXTS.test(url);
            }) ?? src[0];

            const imgUrl = validImg?.image_path || validImg?.url || validImg;
            if (typeof imgUrl === 'string') {
                if (imgUrl.startsWith('http')) return imgUrl;
                const path = imgUrl.startsWith('/') ? imgUrl : '/' + imgUrl;
                return baseUrl + path;
            }
        }
        return fallbackImages[product.id % fallbackImages.length];
    };

    return (
        <section className="product-listing-page">
            <div className="container">

                {/* ── Page Header ── */}
                <div className="plist-header">

                    {/* LEFT CONTENT */}
                    <div className="plist-header__text">

                        <div className="section-title text-center sec-title-animation animation-style1" style={{ textAlign: 'left', marginBottom: 0 }}>
                            <h3 className="section-title__title title-animation" style={{ lineHeight: '1.2' }}>
                                <TextAnimation>{categoryData.title}</TextAnimation>
                            </h3>
                        </div>

                        <p className="plist-subtitle">
                            {categoryData.subCategories.length} sub-categories
                            &nbsp;·&nbsp;
                            {
                                categoryData.subCategories.reduce(
                                    (acc: number, s: any) => acc + s.products.length,
                                    0
                                )
                            } products
                        </p>

                    </div>

                    {/* RIGHT ACTIONS */}
                    <div className="plist-header__actions">

                        {/* Back Button */}
                        <button
                            type="button"
                            className="plist-back-btn"
                            onClick={() => navigate(-1)}
                        >
                            <i className="fa fa-arrow-left"></i>
                            <span>Back</span>
                        </button>

                    </div>

                </div>

                <div className="row">
                    {/* ── Product Grid (Left Side) ── */}
                    <div className="col-lg-9 order-2 order-lg-1">
                        {products.length === 0 ? (
                            <div className="plist-empty">
                                <i className="fa fa-solid fa-box-open"></i>
                                <p>No products in this category yet.</p>
                            </div>
                        ) : (
                            <div className="row plist-grid" key={activeSubCat}>
                                {products.map((product: any, idx: number) => (
                                    <div
                                        key={product.id}
                                        className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-6 plist-col"
                                        style={{ animationDelay: `${Math.min(idx * 0.07, 0.6)}s` }}
                                    >
                                        <div
                                            className="plist-card"
                                            onClick={() => navigate(`/products/${category}/${product.id}`)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => e.key === 'Enter' && navigate(`/products/${category}/${product.id}`)}
                                        >
                                            {/* Image */}
                                            <div className="plist-card__img">
                                                <img
                                                    src={getProductImage(product)}
                                                    alt={product.name}
                                                    loading="lazy"
                                                />
                                                <div className="plist-card__overlay">
                                                    <div className="plist-card__view-btn">
                                                        <i className="fa fa-solid fa-arrow-up-right-from-square"></i>
                                                    </div>
                                                </div>
                                                <div className="plist-card__gloss" aria-hidden="true"></div>
                                            </div>

                                            <div className="plist-card__body">
                                                <h4 className="plist-card__name">{product.name}</h4>

                                                <p className="plist-card__desc">
                                                    Premium electrochemical product for industrial and research applications.
                                                </p>

                                                <div className="plist-card__bottom">
                                                    <span className="plist-card__view">
                                                        Explore
                                                    </span>

                                                    <span className="plist-card__arrow">
                                                        <i className="fa fa-arrow-right"></i>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="plist-card__accent" aria-hidden="true"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Sidebar (Right Side) ── */}
                    <div className="col-lg-3 order-1 order-lg-2 mb-5 mb-lg-0">
                        <div style={{ position: 'sticky', top: '100px' }}>
                            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#061B4A', marginBottom: '20px' }}>
                                Categories
                            </h4>
                            <div className="plist-categories-wrapper">
                                {categoryData.subCategories.map((sub: any) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => setActiveSubCat(sub.id)}
                                        className={`plist-category-btn ${activeSubCat === sub.id ? 'active' : ''}`}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '12px 18px',
                                            background: activeSubCat === sub.id ? 'var(--rsistore-gradient)' : '#F8FAFC',
                                            color: activeSubCat === sub.id ? '#FFFFFF' : '#061B4A',
                                            border: activeSubCat === sub.id ? '1px solid transparent' : '1px solid #E2E8F0',
                                            borderRadius: '50px',
                                            fontWeight: activeSubCat === sub.id ? 700 : 600,
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            textAlign: 'left',
                                            whiteSpace: 'nowrap',
                                            gap: '12px'
                                        }}
                                    >
                                        <span>{sub.name}</span>
                                        <small style={{
                                            backgroundColor: activeSubCat === sub.id ? 'rgba(255,255,255,0.2)' : '#E2E8F0',
                                            padding: '2px 8px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            color: activeSubCat === sub.id ? '#FFF' : '#64748B',
                                            fontWeight: 700
                                        }}>
                                            {sub.products.length}
                                        </small>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProductListing;
