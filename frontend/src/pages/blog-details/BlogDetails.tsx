import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import { motion } from 'framer-motion';
import FooterOne from '../../components/footers/FooterOne';
import '../../assets/css/module-css/blog-details.css';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/swiper-bundle.css";

/* =============================================================
   CONTENT BLOCK TYPES
   ============================================================= */
type ContentBlock =
    | { type: 'p'; text: string }
    | { type: 'h2'; id: string; text: string }
    | { type: 'h3'; text: string }
    | { type: 'h4'; text: string }
    | { type: 'img'; src: string; alt: string; caption?: string }
    | { type: 'quote'; text: string; attribution?: string }
    | { type: 'callout'; title: string; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    | { type: 'table'; headers: string[]; rows: string[][] }
    | { type: 'divider' };

/* =============================================================
   ARTICLE META TYPE
   ============================================================= */
interface ArticleMeta {
    category: string;
    title: string;
    summary: string;
    date: string;
    readTime: string;
    author: string;
    heroImg: string;
    tags: string[];
}

interface ArticleEntry {
    meta: ArticleMeta;
    content: ContentBlock[];
}

// Static ARTICLES_MAP removed.

// Static RELATED array removed.

/* =============================================================
   ICONS
   ============================================================= */
const CalIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const ClockIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const UserIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const MailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
const ArrowRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
const BulbIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>;
const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.13 1 .37 1.97.72 2.91a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.29 6.29l.98-.96a2 2 0 0 1 2.11-.45c.94.35 1.91.59 2.91.72A2 2 0 0 1 22 16.92z" /></svg>;
const PinIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;

/* =============================================================
   BLOCK RENDERER
   ============================================================= */
const renderBlock = (block: ContentBlock, idx: number): React.ReactNode => {
    switch (block.type) {
        case 'p': return <div key={idx} className="bd-p" dangerouslySetInnerHTML={{ __html: block.text }} />;
        case 'h2': return <h2 key={idx} className="bd-h2" id={block.id}>{block.text}</h2>;
        case 'h3': return <h3 key={idx} className="bd-h3">{block.text}</h3>;
        case 'h4': return <h4 key={idx} className="bd-h4">{block.text}</h4>;
        case 'img': return (
            <figure key={idx} className="bd-img-block">
                <img src={block.src} alt={block.alt} loading="lazy" />
                {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
        );
        case 'quote': return (
            <blockquote key={idx} className="bd-quote">
                <p className="bd-quote__text">{block.text}</p>
                {block.attribution && <p className="bd-quote__author">{block.attribution}</p>}
            </blockquote>
        );
        case 'callout': return (
            <div key={idx} className="bd-callout">
                <div className="bd-callout__icon"><BulbIcon /></div>
                <div className="bd-callout__content">
                    <p className="bd-callout__title">{block.title}</p>
                    <p className="bd-callout__text">{block.text}</p>
                </div>
            </div>
        );
        case 'ul': return <ul key={idx} className="bd-list">{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
        case 'ol': return <ol key={idx} className="bd-list bd-list--ordered">{block.items.map((item, i) => <li key={i}>{item}</li>)}</ol>;
        case 'table': return (
            <div key={idx} className="bd-table-wrap">
                <table className="bd-table">
                    <thead><tr>{block.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
                    <tbody>{block.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
                </table>
            </div>
        );
        case 'divider': return <hr key={idx} className="bd-divider" />;
        default: return null;
    }
};

/* =============================================================
   MAIN COMPONENT
   ============================================================= */
const BlogDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const [article, setArticle] = useState<ArticleEntry | null>(null);
    const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
    const [additionalImages, setAdditionalImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://crm.rsistore.in';
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

        fetch(`${cleanBaseUrl}/api/crm/web/blog`)
            .then(res => res.json())
            .then(result => {
                if (result.status && Array.isArray(result.data)) {
                    const sorted = [...result.data].sort((a: any, b: any) => {
                        if (typeof a.id === 'number' && typeof b.id === 'number') {
                            return b.id - a.id;
                        }
                        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
                    });

                    const mapped = sorted.map((item: any) => {
                        let imageUrl = item.blog_image;
                        if (imageUrl && !imageUrl.startsWith('http')) {
                            const path = imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl;
                            imageUrl = cleanBaseUrl + path;
                        }
                        const itemSlug = item.blog_title ? item.blog_title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : '';
                        return {
                            id: item.id,
                            title: item.blog_title,
                            slug: itemSlug,
                            image: imageUrl || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=400&fit=crop',
                            date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : ''
                        };
                    });
                    setRecentBlogs(mapped.filter((b: any) => String(b.id) !== String(slug)).slice(0, 4));
                }
            })
            .catch(err => console.error("Error fetching recent blogs:", err));
    }, [slug]);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://crm.rsistore.in';
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

        fetch(`${cleanBaseUrl}/api/crm/web/blog/${slug}`)
            .then(res => res.json())
            .then(result => {
                if (result.status && result.data) {
                    const item = result.data;

                    let imageUrl = item.blog_image;
                    if (imageUrl && !imageUrl.startsWith('http')) {
                        const path = imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl;
                        imageUrl = cleanBaseUrl + path;
                    }

                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = item.blog_description || "";
                    const textContent = tempDiv.textContent || tempDiv.innerText || "";

                    const entry: ArticleEntry = {
                        meta: {
                            category: item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'General',
                            title: item.blog_title,
                            summary: textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent,
                            date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                            readTime: '5 min read',
                            author: item.author_name || 'RSI Team',
                            heroImg: imageUrl || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=800&fit=crop&crop=center&q=90',
                            tags: []
                        },
                        content: [
                            { type: 'p', text: item.blog_description || '' }
                        ]
                    };
                    setArticle(entry);

                    let imgs = item.additional_images || item.images;
                    if (typeof imgs === 'string') {
                        try { imgs = JSON.parse(imgs); } catch (e) { imgs = []; }
                    }
                    if (Array.isArray(imgs) && imgs.length > 0) {
                        const parsedImgs = imgs.map((img: any) => {
                            const path = img.image_path || img.path || img.url || img;
                            if (typeof path === 'string' && path.startsWith('http')) return path;
                            const cleanPath = typeof path === 'string' && path.startsWith('/') ? path : '/' + path;
                            return cleanBaseUrl + cleanPath;
                        });
                        setAdditionalImages(parsedImgs);
                    }
                }
            })
            .catch(err => console.error("Error fetching blog details:", err))
            .finally(() => setLoading(false));
    }, [slug]);

    const ARTICLE = article?.meta;
    const CONTENT = article?.content || [];
    const TOC = CONTENT
        .filter((b): b is Extract<ContentBlock, { type: 'h2' }> => b.type === 'h2')
        .map(b => ({ id: b.id, label: b.text }));

    // @ts-ignore
    const [activeToc, setActiveToc] = useState(TOC[0]?.id ?? '');
    const [progress, setProgress] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActiveToc(e.target.id); }),
            { rootMargin: '-15% 0px -70% 0px' }
        );
        TOC.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, [TOC]);

    // @ts-ignore
    const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const share = (platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(ARTICLE?.title || '');
        const map: Record<string, string> = {
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            email: `mailto:?subject=${title}&body=${url}`,
        };
        if (map[platform]) window.open(map[platform], '_blank', 'noopener');
    };

    if (loading) {
        return <div style={{ padding: '200px 0', textAlign: 'center' }}>Loading...</div>;
    }

    if (!article || !ARTICLE) return <Navigate to="/blog" replace />;

    return (
        <div className="bd-wrap">
            {/* Reading progress bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '3px', background: 'rgba(0,0,0,0.08)', zIndex: 9999, pointerEvents: 'none' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #D4A72C, #FFF1A6)', transition: 'width 0.1s linear', borderRadius: '0 2px 2px 0' }} />
            </div>

            {/* HERO */}
            <section className="bd-hero">
                <div className="bd-hero__left">
                    <motion.div className="bd-hero__inner" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
                        <span className="bd-hero__cat">{ARTICLE.category}</span>
                        <h1 className="bd-hero__title">{ARTICLE.title}</h1>
                        <div className="bd-hero__meta">
                            <span className="bd-hero__meta-item"><CalIcon />{ARTICLE.date}</span>
                            <span className="bd-hero__meta-item"><ClockIcon />{ARTICLE.readTime}</span>
                            <span className="bd-hero__meta-item"><UserIcon />{ARTICLE.author}</span>
                        </div>
                        <p className="bd-hero__summary">{ARTICLE.summary}</p>
                    </motion.div>
                </div>
                <div className="bd-hero__right">
                    <div className="bd-hero__gradient" />
                    <img src={ARTICLE.heroImg} alt={ARTICLE.title} className="bd-hero__img" loading="lazy" />
                </div>
            </section>

            {/* ARTICLE BODY */}
            <section className="bd-article">
                <div className="bd-layout">

                    {/* Share sidebar */}
                    <div className="bd-share">
                        <span className="bd-share__label">Share</span>
                        {[
                            { k: 'facebook', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
                            { k: 'linkedin', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
                            { k: 'twitter', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg> },
                            { k: 'email', icon: <MailIcon /> },
                        ].map(s => (
                            <button key={s.k} className="bd-share__btn" onClick={() => share(s.k)} aria-label={s.k}>{s.icon}</button>
                        ))}
                    </div>

                    {/* Article body */}
                    <article className="bd-body">
                        {CONTENT.map((block, idx) => renderBlock(block, idx))}

                        {/* Gallery Section */}
                        {/* Gallery Section */}
                        {additionalImages.length > 0 && (
                            <div className="bd-gallery" style={{ marginTop: '60px' }}>
                                <style>{`
                                    .bd-gallery-masonry-wrapper {
                                        display: none;
                                    }
                                    .bd-gallery-swiper-wrapper {
                                        display: block;
                                        padding-bottom: 20px;
                                    }
                                    @media (min-width: 768px) {
                                        .bd-gallery-masonry-wrapper {
                                            display: block;
                                        }
                                        .bd-gallery-swiper-wrapper {
                                            display: none;
                                        }
                                        .bd-gallery-masonry {
                                            column-count: 2;
                                            column-gap: 20px;
                                        }
                                    }
                                    @media (min-width: 1024px) {
                                        .bd-gallery-masonry {
                                            column-count: 3;
                                        }
                                    }
                                    .bd-gallery-item {
                                        break-inside: avoid;
                                        margin-bottom: 20px;
                                        cursor: pointer;
                                        border-radius: 16px;
                                        overflow: hidden;
                                        position: relative;
                                        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
                                        transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                                    }
                                    .bd-gallery-item:hover {
                                        box-shadow: 0 12px 30px rgba(0,0,0,0.15);
                                        transform: translateY(-4px);
                                    }
                                    .bd-gallery-item img {
                                        width: 100%;
                                        height: auto;
                                        display: block;
                                        transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                                    }
                                    .bd-gallery-item:hover img {
                                        transform: scale(1.08);
                                    }
                                    .bd-gallery-overlay {
                                        position: absolute;
                                        inset: 0;
                                        background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%);
                                        opacity: 0;
                                        transition: opacity 0.4s ease;
                                        z-index: 1;
                                        display: flex;
                                        align-items: flex-end;
                                        justify-content: center;
                                        padding-bottom: 24px;
                                        pointer-events: none;
                                    }
                                    .bd-gallery-item:hover .bd-gallery-overlay {
                                        opacity: 1;
                                    }
                                    .bd-gallery-icon {
                                        color: white;
                                        background: rgba(255,255,255,0.25);
                                        backdrop-filter: blur(8px);
                                        padding: 12px;
                                        border-radius: 50%;
                                        transform: translateY(20px);
                                        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                                    }
                                    .bd-gallery-item:hover .bd-gallery-icon {
                                        transform: translateY(0);
                                    }
                                `}</style>
                                <h3 style={{ marginBottom: '32px', fontSize: '28px', fontWeight: '800', color: 'var(--rsistore-black)', letterSpacing: '-0.5px' }}>Gallery</h3>
                                
                                {/* Mobile Swiper Carousel */}
                                <div className="bd-gallery-swiper-wrapper">
                                    <Swiper
                                        modules={[Autoplay]}
                                        loop={true}
                                        spaceBetween={16}
                                        slidesPerView={1.15}
                                        centeredSlides={true}
                                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                                    >
                                        {additionalImages.map((src, i) => (
                                            <SwiperSlide key={i} onClick={() => setLightboxIndex(i + 1)}>
                                                <div className="bd-gallery-item" style={{ marginBottom: 0 }}>
                                                    <img src={src} alt={`Gallery ${i}`} loading="lazy" />
                                                    <div className="bd-gallery-overlay">
                                                        <div className="bd-gallery-icon">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                {/* Desktop Masonry */}
                                <div className="bd-gallery-masonry-wrapper">
                                    <motion.div
                                        className="bd-gallery-masonry"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-50px" }}
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                                        }}
                                    >
                                        {additionalImages.map((src, i) => (
                                            <motion.div
                                                key={i}
                                                className="bd-gallery-item"
                                                onClick={() => setLightboxIndex(i + 1)}
                                                variants={{
                                                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                                                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
                                                }}
                                            >
                                                <img src={src} alt={`Gallery ${i}`} loading="lazy" />
                                                <div className="bd-gallery-overlay">
                                                    <div className="bd-gallery-icon">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Right sidebar */}
                    <aside className="bd-sidebar">
                        <div className="bd-sidebar__card" style={{ marginBottom: '24px' }}>
                            <p className="bd-toc__title" style={{ marginBottom: '16px' }}>Featured Image</p>
                            <div style={{ overflow: 'hidden', cursor: 'pointer', borderRadius: '12px' }} onClick={() => setLightboxOpen(true)}>
                                <img src={ARTICLE?.heroImg} alt={ARTICLE?.title} style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                            </div>
                        </div>

                        <div className="bd-sidebar__card">
                            <p className="bd-toc__title">Recent Blogs</p>
                            <div className="bd-recent-blogs">
                                {recentBlogs.map((b) => (
                                    <Link to={`/blog/${b.id}`} key={b.id} className="bd-recent-blog-card" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', textDecoration: 'none' }}>
                                        <img src={b.image} alt={b.title} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '14px', margin: '0 0 4px 0', color: 'var(--rsistore-black)', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.title}</h4>
                                            <span style={{ fontSize: '12px', color: '#64748B' }}>{b.date}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Expert Help CTA */}
                        <div className="bd-expert-help">
                            <div className="bd-expert-help__inner">
                                <h3 className="bd-expert-help__title">Need Wallpaper Design Support?</h3>
                                <p className="bd-expert-help__text">
                                    Our team at The Wall Project is ready to assist you with your wallpaper and wall decor needs.
                                </p>
                                <ul className="bd-expert-help__list">
                                    <li>
                                        <div className="bd-expert-help__icon-wrap"><PhoneIcon /></div>
                                        <div className="bd-expert-help__info">
                                            <span className="bd-expert-help__label">Call Us</span>
                                            <a href="tel:+919677733363">+91 96777 33363</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bd-expert-help__icon-wrap"><MailIcon /></div>
                                        <div className="bd-expert-help__info">
                                            <span className="bd-expert-help__label">Mail Us</span>
                                            <a href="mailto:info@thewallproject.in">info@thewallproject.in</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bd-expert-help__icon-wrap"><PinIcon /></div>
                                        <div className="bd-expert-help__info">
                                            <span className="bd-expert-help__label">Location</span>
                                            <span>Coimbatore, Tamil Nadu, India</span>
                                        </div>
                                    </li>
                                </ul>
                                <Link to="/contact" className="thm-btn bd-expert-help__btn" style={{ width: '100%', justifyContent: 'center' }}>
                                    Contact Us Now <span className="icon-arrow-right"></span>
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* RELATED */}
            <section className="bd-related">
                <div className="bd-related__inner">
                    <div className="bd-related__header">
                        <h2 className="bd-related__title">Continue Reading</h2>
                        <Link to="/blog" className="bd-related__link">View all articles <ArrowRight /></Link>
                    </div>
                    <div className="bd-related__grid">
                        {/* Currently empty since API only fetches one article */}
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            {/* <section className="bd-nl">
                <div className="bd-nl__inner">
                    <motion.div className="bd-nl__card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <div className="bd-nl__icon"><MailIcon /></div>
                        <div className="bd-nl__text">
                            <h3 className="bd-nl__heading">Get the Latest Insights Directly in Your Inbox</h3>
                            <p className="bd-nl__sub">Join researchers and engineers who receive our latest articles, research updates, and product insights.</p>
                        </div>
                        <form onSubmit={e => e.preventDefault()} className="bd-nl__form">
                            <input type="email" placeholder="Enter your email address" value={nlEmail} onChange={e => setNlEmail(e.target.value)} className="bd-nl__input" />
                            <button type="submit" className="bd-nl__btn">Subscribe Now</button>
                        </form>
                    </motion.div>
                </div>
            </section> */}

            {ARTICLE && (
                <Lightbox
                    open={lightboxOpen || lightboxIndex >= 0}
                    index={lightboxIndex >= 0 ? lightboxIndex : 0}
                    close={() => { setLightboxOpen(false); setLightboxIndex(-1); }}
                    slides={[{ src: ARTICLE.heroImg }, ...additionalImages.map(src => ({ src }))]}
                />
            )}

            <FooterOne />
        </div>
    );
};

export default BlogDetails;
