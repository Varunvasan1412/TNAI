import React from 'react';
import { Link, useNavigate } from 'react-router';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import TextAnimation from '../../components/elements/TextAnimation';

import img1 from '../../assets/images/project/project-1-1.png';
import img2 from '../../assets/images/project/project-1-2.jpeg';
import img3 from '../../assets/images/project/project-1-3.jpg';
import img4 from '../../assets/images/project/project-1-4.jpg';
import img5 from '../../assets/images/project/project-1-5.jpg';
import img6 from '../../assets/images/project/project-1-6.jpg';
import img7 from '../../assets/images/project/project-1-7.jpg';

const cycleImages = [img1, img2, img3, img4, img5, img6, img7];

/* Soft pastel tints — each card gets a unique background for its image box */
const cardBg = [
    '#EAF4FF', '#E8F8F3', '#F0F9E8', '#FFF4E6',
    '#F3EEFF', '#FFEEEE', '#E6FFFE', '#FFFCE8',
    '#EAF4FF', '#E8F8F3', '#F0F9E8', '#FFF4E6',
    '#F3EEFF', '#FFEEEE', '#E6FFFE', '#FFFCE8',
];

interface ServiceItem {
    id: number;
    productCount: number;
    title: string;
    path: string;
    categoryImage?: string;
}



const FlaskIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H15M10 3V8L4 20C3.7 20.6 4.1 21 4.7 21H19.3C19.9 21 20.3 20.6 20 20L14 8V3M10 14H14" />
    </svg>
);
const ChartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
);
const GlobeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);
const WrenchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);

const features = [
    { icon: <FlaskIcon />, label: 'High Purity Materials' },
    { icon: <ChartIcon />, label: 'Consistent Performance' },
    { icon: <GlobeIcon />, label: 'Global Shipping' },
    { icon: <WrenchIcon />, label: 'Custom Solutions Available' },
];

const ServicesSec: React.FC = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = React.useState<ServiceItem[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const envBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://crm.rsistore.in';
        const cleanBaseUrl = envBaseUrl.endsWith('/') ? envBaseUrl.slice(0, -1) : envBaseUrl;

        fetch(`${cleanBaseUrl}/api/product/web/products`)
            .then(res => res.json())
            .then(result => {
                if (result.status && result.data) {
                    const allProducts = result.data;
                    const catMap = new Map<string, ServiceItem>();

                    allProducts.forEach((p: any) => {
                        if (p.category) {
                            const title = p.category.category_name;
                            const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                            if (!catMap.has(slug)) {
                                const rawImg = p.category.category_image;
                                const categoryImage = rawImg
                                    ? (rawImg.startsWith('http') ? rawImg : `${cleanBaseUrl}/${rawImg.replace(/^\//, '')}`)
                                    : undefined;
                                catMap.set(slug, {
                                    id: p.category.id || Math.random(),
                                    productCount: 0,
                                    title: title,
                                    path: `/products/${slug}`,
                                    categoryImage,
                                });
                            }
                            catMap.get(slug)!.productCount += 1;
                        }
                    });

                    const categoryList = Array.from(catMap.values());

                    // Sort categories by their ID (creation order)
                    categoryList.sort((a, b) => (a.id as number) - (b.id as number));

                    setCategories(categoryList);
                }
            })
            .catch(err => console.error("Error fetching categories:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="scat-section">
            <div className="container">

                {/* ── Header ── */}
                <div className="scat-head">
                    <div className="section-title text-center sec-title-animation animation-style1 scat-head__text" style={{ textAlign: 'left', marginBottom: 0 }}>
                        <h3 className="section-title__title title-animation" style={{ fontSize: '42px', lineHeight: '1.2' }}>
                            <TextAnimation>Browse Product Categories</TextAnimation>
                        </h3>
                        <div className="scat-head__line" aria-hidden="true" style={{ marginTop: '15px' }}></div>
                    </div>
                    <button
                        type="button"
                        className="plist-back-btn scat-back-btn"
                        onClick={() => navigate(-1)}
                    >
                        <i className="fa fa-solid fa-arrow-left"></i>
                        <span>Back</span>
                    </button>
                </div>

                {/* ── Loading / Empty ── */}
                {loading ? (
                    <div style={{ padding: '60px 0', textAlign: 'center', color: '#64748B' }}>
                        Loading categories...
                    </div>
                ) : categories.length === 0 ? (
                    <div style={{ padding: '60px 0', textAlign: 'center', color: '#64748B' }}>
                        No categories found.
                    </div>
                ) : (
                    <div className="row scat-grid">
                        {categories.map((svc, idx) => (
                            <FadeInAdvanced
                                key={svc.id}
                                className="col-xl-custom col-lg-3 col-md-4 col-6 scat-col"
                                variant="fadeInUp"
                                delay={Math.min(idx * 80, 800)}
                            >
                                <Link to={svc.path} className="scat-card">
                                    {/* Image box */}
                                    <div
                                        className="scat-card__img-box"
                                        style={{ background: cardBg[idx % cardBg.length] }}
                                    >
                                        <img
                                            src={svc.categoryImage || cycleImages[idx % cycleImages.length]}
                                            alt={svc.title}
                                            loading="lazy"
                                        />
                                        {/* Hover shine */}
                                        <div className="scat-card__shine" aria-hidden="true"></div>
                                    </div>

                                    {/* Body */}
                                    <div className="scat-card__body">
                                        <h3 className="scat-card__title">{svc.title}</h3>
                                        <div className="scat-card__footer">
                                            <span className="scat-card__count">
                                                {svc.productCount} Product{svc.productCount !== 1 ? 's' : ''}
                                            </span>
                                            <span className="scat-card__arrow" aria-hidden="true">
                                                <i className="icon-arrow-right"></i>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom accent bar */}
                                    <div className="scat-card__accent" aria-hidden="true"></div>
                                </Link>
                            </FadeInAdvanced>
                        ))}
                    </div>
                )}

                {/* ── Features Bar ── */}
                <div className="scat-features">
                    {features.map((feat) => (
                        <div className="scat-feature" key={feat.label}>
                            <div className="scat-feature__icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                {feat.icon}
                            </div>
                            <span className="scat-feature__label">{feat.label}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ServicesSec;
