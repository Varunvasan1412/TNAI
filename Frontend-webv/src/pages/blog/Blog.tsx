import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import TextAnimation from '../../components/elements/TextAnimation';
import FooterOne from '../../components/footers/FooterOne';
import '../../assets/css/module-css/blog-page.css';

/* ── Images ── */
import heroImg from '../../assets/images/about/aboutimg2.png';

const badges = [
    { icon: '🏭', label: 'In-house\nManufacturing' },
    { icon: '🔬', label: 'Advanced\nTesting' },
    { icon: '⚙️', label: 'Custom\nSolutions' },
    { icon: '🌍', label: 'Global\nDelivery' },
];

/* ── Types ── */
interface Post {
    id: number;
    image: string;
    category: string;
    title: string;
    date: string;
    readTime: string;
    excerpt: string;
}

const ITEMS_PER_PAGE = 8;

/* ── Icons ── */
const CalIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const SearchIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
);

// const MailIcon = () => (
//     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
//         <polyline points="22,6 12,13 2,6" />
//     </svg>
// );



/* ── Component ── */
const Blog: React.FC = () => {
    const [activeCat, setActiveCat] = useState('All');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [featuredPost, setFeaturedPost] = useState<Post | null>(null);


    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://crm.rsistore.in';
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

        fetch(`${cleanBaseUrl}/api/crm/web/blog`)
            .then(res => res.json())
            .then(result => {
                if (result.status && result.data && result.data.length > 0) {
                    const sortedData = [...result.data].sort((a: any, b: any) => {
                        if (typeof a.id === 'number' && typeof b.id === 'number') {
                            return b.id - a.id;
                        }
                        const timeA = new Date(a.created_at || a.updated_at || 0).getTime();
                        const timeB = new Date(b.created_at || b.updated_at || 0).getTime();
                        return timeB - timeA;
                    });

                    const mappedPosts = sortedData.map((item: any) => {
                        const tempDiv = document.createElement("div");
                        tempDiv.innerHTML = item.blog_description || "";
                        const textContent = tempDiv.textContent || tempDiv.innerText || "";

                        let imageUrl = item.blog_image;
                        if (imageUrl && !imageUrl.startsWith('http')) {
                            // Ensure the path starts with a slash
                            const path = imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl;
                            imageUrl = cleanBaseUrl + path;
                        }

                        return {
                            id: item.id,
                            image: imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=280&fit=crop&q=85',
                            category: item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'General',
                            title: item.blog_title,
                            date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '',
                            readTime: '5 min read',
                            excerpt: textContent.length > 100 ? textContent.substring(0, 100) + '...' : textContent,
                        };
                    });
                    setFeaturedPost(mappedPosts[0]);
                    setPosts(mappedPosts.slice(1));
                }
            })
            .catch(err => console.error("Error fetching blogs:", err));
    }, []);

    const categories = useMemo(() => {
        const cats = new Set<string>();
        cats.add('All');
        if (featuredPost?.category) cats.add(featuredPost.category);
        posts.forEach(p => {
            if (p.category) cats.add(p.category);
        });
        return Array.from(cats);
    }, [posts, featuredPost]);

    const filtered = useMemo(() => {
        let currentPosts = [...posts];
        if (activeCat !== 'All') currentPosts = currentPosts.filter(p => p.category.toLowerCase() === activeCat.toLowerCase());
        if (search.trim()) {
            const q = search.toLowerCase();
            currentPosts = currentPosts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
        }
        return currentPosts;
    }, [activeCat, search, posts]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const pagePosts = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handleCat = (cat: string) => { setActiveCat(cat); setPage(1); };
    const handlePage = (p: number) => { if (p >= 1 && p <= totalPages) { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); } };

    const pageNums = (): (number | '...')[] => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (page <= 3) return [1, 2, 3, '...', totalPages];
        if (page >= totalPages - 2) return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', page, '...', totalPages];
    };

    return (
        <div className="bp-wrap">

            {/* ══ 1. HERO — same pattern as About & Contact ════════════ */}
            <section className="bp-hero">
                <div className="bp-hero__left">
                    <motion.div
                        className="section-title sec-title-animation animation-style1"
                        style={{ marginBottom: 0 }}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65 }}
                    >
                        <h6 className="section-title__tagline">
                            <span className="section-title__tagline-border"></span>OUR BLOG
                        </h6>
                        <h3 className="section-title__title title-animation bp-hero__heading">
                            <TextAnimation animationStyle="style1">
                                Insights, Innovations and Research
                            </TextAnimation>
                        </h3>
                    </motion.div>
                    <motion.p
                        className="bp-hero__sub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.15 }}
                    >
                        Stay updated with the latest trends, research, and innovations
                        in electrochemistry and advanced materials.
                    </motion.p>

                    <motion.div
                        className="bp-hero__badges"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.25 }}
                    >
                        {badges.map((b, i) => (
                            <div className="bp-hero__badge" key={i}>
                                <div className="bp-hero__badge-icon">{b.icon}</div>
                                <span style={{ whiteSpace: 'pre-line', lineHeight: '1.3' }}>{b.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
                <div className="bp-hero__right">
                    <div className="bp-hero__fade" />
                    <img src={heroImg} alt="Electrochemical Research Lab" className="bp-hero__img" />
                </div>
            </section>

            {/* ══ 2. FEATURED ARTICLE ══════════════════════════════════ */}
            {featuredPost && (
                <section className="bp-featured">
                    <div className="bp-featured__inner">
                        <motion.div
                            className="bp-featured__card"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bp-featured__img-wrap">
                                <img src={featuredPost.image} alt={featuredPost.title} className="bp-featured__img" />
                            </div>
                            <div className="bp-featured__content">
                                <span className="bp-featured__label">FEATURED ARTICLE</span>
                                <h2 className="bp-featured__title">{featuredPost.title}</h2>
                                <div className="bp-featured__meta">
                                    <CalIcon />
                                    {featuredPost.date}
                                    <span>•</span>
                                    {featuredPost.readTime}
                                </div>
                                <p className="bp-featured__excerpt">{featuredPost.excerpt}</p>
                                <Link to={`/blog/${featuredPost.id}`} className="thm-btn" style={{ width: 'fit-content', marginTop: '10px' }}>
                                    Read Full Article <span className="icon-arrow-right"></span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ══ 3. ARTICLES ══════════════════════════════════════════ */}
            <section className="bp-articles">
                <div className="bp-articles__inner">
                    <h2 className="bp-articles__title">Explore Our Latest Articles</h2>

                    {/* Filter row */}
                    <div className="bp-filter">
                        <div className="bp-chips">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`bp-chip${activeCat === cat ? ' bp-chip--active' : ''}`}
                                    onClick={() => handleCat(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <form onSubmit={e => { e.preventDefault(); setPage(1); }} className="bp-search">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                                className="bp-search__input"
                            />
                            <button type="submit" className="bp-search__btn"><SearchIcon /></button>
                        </form>
                    </div>

                    {/* 4-column grid */}
                    <div className="bp-grid">
                        {pagePosts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                className="bp-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04, duration: 0.4 }}
                            >
                                <div className="bp-card__img-wrap">
                                    <img src={post.image} alt={post.title} className="bp-card__img" />
                                </div>
                                <div className="bp-card__body">
                                    <span className="bp-card__cat">{post.category}</span>
                                    <h3 className="bp-card__title">
                                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                    </h3>
                                    <p className="bp-card__meta">
                                        <CalIcon />
                                        {post.date}
                                        <span>•</span>
                                        {post.readTime}
                                    </p>
                                    <p className="bp-card__excerpt">{post.excerpt}</p>
                                    <Link to={`/blog/${post.id}`} className="bp-card__more">Read More →</Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bp-pagination">
                            <button className="bp-pagination__btn bp-pagination__btn--arrow" onClick={() => handlePage(page - 1)} disabled={page === 1} aria-label="Prev">‹</button>
                            {pageNums().map((p, i) =>
                                p === '...'
                                    ? <span key={`e${i}`} className="bp-pagination__ellipsis">…</span>
                                    : <button key={p} className={`bp-pagination__btn${page === p ? ' bp-pagination__btn--active' : ''}`} onClick={() => handlePage(p as number)}>{p}</button>
                            )}
                            <button className="bp-pagination__btn bp-pagination__btn--arrow" onClick={() => handlePage(page + 1)} disabled={page === totalPages} aria-label="Next">›</button>
                        </div>
                    )}
                </div>
            </section>

            {/* ══ 4. NEWSLETTER CTA ════════════════════════════════════ */}
            {/* <section className="bp-nl">
                <div className="bp-nl__inner">
                    <motion.div
                        className="bp-nl__card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bp-nl__icon"><MailIcon /></div>
                        <div className="bp-nl__text">
                            <h3 className="bp-nl__heading">Get the Latest Insights Directly in Your Inbox</h3>
                            <p className="bp-nl__sub">Join researchers and engineers who receive our latest articles, research updates, and product insights.</p>
                        </div>
                        <form onSubmit={e => e.preventDefault()} className="bp-nl__form">
                            <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} className="bp-nl__input" />
                            <button type="submit" className="thm-btn">Subscribe Now <span className="icon-arrow-right"></span></button>
                        </form>
                    </motion.div>
                </div>
            </section> */}

            <FooterOne />
        </div>
    );
};

export default Blog;
