import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import '../../assets/css/module-css/gallery-page.css';
import useRsistoreContext from '../../components/context/useRsistoreContext';

import FooterOne from '../../components/footers/FooterOne';

// Imported wallpaper assets
import slide1 from '../../assets/images/sliderImages/slide1.png';
import slide2 from '../../assets/images/sliderImages/slide2.png';
import slide3 from '../../assets/images/sliderImages/slide3.png';
import slide4 from '../../assets/images/sliderImages/slide4.png';
import slide5 from '../../assets/images/sliderImages/slide5.png';
import wpBotanical from '../../assets/images/products/wp_botanical.png';
import wpGeometric from '../../assets/images/products/wp_geometric.png';
import wpGoldFoil from '../../assets/images/products/wp_goldfoil.png';
import wpAbstract from '../../assets/images/products/wp_abstract.png';
import wpTropical from '../../assets/images/products/wp_tropical.png';
import wpDamask from '../../assets/images/products/wp_damask.png';
import wpForest from '../../assets/images/products/wp_forest.png';
import wpLinen from '../../assets/images/products/wp_linen.png';

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  categorySlug: 'living' | 'bedroom' | 'luxury' | 'mural' | 'office' | 'geometric';
  img: string;
  material: string;
  finish: string;
  rollSize: string;
  washability: string;
  description: string;
  likes: number;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Emerald Tropical Haven',
    category: 'Living Room',
    categorySlug: 'living',
    img: wpBotanical,
    material: 'Non-Woven Embossed Silk',
    finish: 'Satin Matte',
    rollSize: '1.06m x 10m / Custom Fit',
    washability: 'Extra Washable & Scratch Proof',
    description: 'A botanical masterpiece featuring lush palm fronds and vibrant emerald hues, designed to bring nature indoors with deep rich textures.',
    likes: 142,
  },
  {
    id: 2,
    title: 'Royal Gold Damask Accent',
    category: 'Luxury & Gold',
    categorySlug: 'luxury',
    img: slide2,
    material: 'Heavyweight Vinyl on Non-Woven',
    finish: 'Metallic Foil & Velvet Emboss',
    rollSize: '0.53m x 10m',
    washability: 'Scrubbable & UV Resistant',
    description: 'Regal classical damask pattern infused with genuine gold foil accents, crafted for opulent feature walls and master suites.',
    likes: 218,
  },
  {
    id: 3,
    title: 'Nordic Minimalist Linen',
    category: 'Bedroom',
    categorySlug: 'bedroom',
    img: wpLinen,
    material: 'Natural Fabric & Fibrous Pulp',
    finish: 'Ultra-Matte Linen Weave',
    rollSize: '1.06m x 10m',
    washability: 'Spongeable with mild soap',
    description: 'Subtle woven fabric texture that radiates tranquility and acoustic warmth, ideal for serene bedrooms and Scandinavian interiors.',
    likes: 98,
  },
  {
    id: 4,
    title: 'Botanical Sanctuary Mural',
    category: 'Custom Murals',
    categorySlug: 'mural',
    img: slide4,
    material: 'Seamless Canvas Fabric',
    finish: 'Hand-painted Textured Feel',
    rollSize: 'Custom Wall Measurement',
    washability: '100% Water Resistant',
    description: 'Bespoke panoramic mural tailored to your exact wall dimensions, rendering soft watercolor flora with breathtaking detail.',
    likes: 310,
  },
  {
    id: 5,
    title: 'Geometric Metallic Art Deco',
    category: 'Geometric & Modern',
    categorySlug: 'geometric',
    img: slide5,
    material: 'Heavy Vinyl & Metallic Inks',
    finish: 'Brushed Brass & Charcoal',
    rollSize: '0.53m x 10m',
    washability: 'Highly Durable & Washable',
    description: 'Crisp 1920s Art Deco geometric grid styled with champagne gold metal linework against deep charcoal background.',
    likes: 175,
  },
  {
    id: 6,
    title: 'Executive Boardroom Wall',
    category: 'Commercial & Office',
    categorySlug: 'office',
    img: slide3,
    material: 'Commercial Grade Type II Vinyl',
    finish: 'Micro-Grain Matte',
    rollSize: '1.37m Width Heavy Commercial',
    washability: 'Stain Resistant & Scrubbable',
    description: 'Architectural grade texture engineered for high-traffic corporate lounges, boardrooms, and luxury hotel lobbies.',
    likes: 89,
  },
  {
    id: 7,
    title: 'Velvet Gold Leaf Feature Wall',
    category: 'Luxury & Gold',
    categorySlug: 'luxury',
    img: wpGoldFoil,
    material: 'Luxury Flock & Foil Emboss',
    finish: 'High-Gloss Metallic',
    rollSize: '0.70m x 10m',
    washability: 'Washable with Damp Cloth',
    description: 'Interlocking golden geometric vines layered over soft dark velvet backing for an unforgettable statement wall.',
    likes: 264,
  },
  {
    id: 8,
    title: 'Misty Alpine Forest Panorama',
    category: 'Custom Murals',
    categorySlug: 'mural',
    img: wpForest,
    material: 'Heavy Seamless Non-Woven Canvas',
    finish: 'Soft Textured Matte',
    rollSize: 'Tailored to Wall Scale',
    washability: 'Wipeable & Eco-Friendly Inks',
    description: 'Atmospheric landscape wallpaper portraying misty pine trees on mountain peaks, creating depth and openness in any room.',
    likes: 193,
  },
  {
    id: 9,
    title: 'Modern Concrete & Micro-Cement',
    category: 'Living Room',
    categorySlug: 'living',
    img: wpAbstract,
    material: 'Embossed Textured Vinyl',
    finish: 'Raw Industrial Concrete',
    rollSize: '1.06m x 10m',
    washability: 'Heavy Washable',
    description: 'Authentic industrial micro-cement texture with organic tonal variations, delivering a modern loft aesthetic effortlessly.',
    likes: 156,
  },
  {
    id: 10,
    title: 'Chinoiserie Peacock & Blossom',
    category: 'Bedroom',
    categorySlug: 'bedroom',
    img: wpDamask,
    material: 'Silk Blend Non-Woven',
    finish: 'Pearlized Iridescent Finish',
    rollSize: '0.53m x 10m',
    washability: 'Gently Washable',
    description: 'Hand-crafted Oriental blossom trees with elegant peacocks rendered on pearlescent silk backing for supreme sophistication.',
    likes: 227,
  },
  {
    id: 11,
    title: 'Oxidized Copper & Bronze',
    category: 'Commercial & Office',
    categorySlug: 'office',
    img: wpTropical,
    material: 'Commercial Fabric Backed Vinyl',
    finish: 'Patina Metallic Grain',
    rollSize: '1.37m Commercial Roll',
    washability: 'Scrub Resistant',
    description: 'Dynamic metallic patina wall texture imitating aged copper and bronze plates for trendy cafes, offices, and boutiques.',
    likes: 114,
  },
  {
    id: 12,
    title: 'Contemporary Linear Weave',
    category: 'Geometric & Modern',
    categorySlug: 'geometric',
    img: wpGeometric,
    material: '3D Embossed Non-Woven',
    finish: 'Soft Satin Texture',
    rollSize: '1.06m x 10m',
    washability: 'Washable & UV Colorfast',
    description: 'Dynamic 3D linear wave structure creating subtle light and shadow play across walls depending on room lighting.',
    likes: 168,
  },
];

const CATEGORIES = [
  { label: 'All Designs', slug: 'all' },
  { label: 'Living Room', slug: 'living' },
  { label: 'Bedroom', slug: 'bedroom' },
  { label: 'Luxury & Gold', slug: 'luxury' },
  { label: 'Custom Murals', slug: 'mural' },
  { label: 'Commercial', slug: 'office' },
  { label: 'Geometric', slug: 'geometric' },
];

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const { searchQuery, setSearchQuery } = useRsistoreContext();
  const [likedMap, setLikedMap] = useState<{ [id: number]: boolean }>({});
  const [likesCountMap, setLikesCountMap] = useState<{ [id: number]: number }>(() => {
    const initial: { [id: number]: number } = {};
    GALLERY_ITEMS.forEach(item => {
      initial[item.id] = item.likes;
    });
    return initial;
  });
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);

  const toggleLike = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedMap(prev => {
      const isLiked = !!prev[id];
      const newLiked = !isLiked;
      setLikesCountMap(cPrev => ({
        ...cPrev,
        [id]: cPrev[id] + (newLiked ? 1 : -1),
      }));
      return { ...prev, [id]: newLiked };
    });
  };

  const filteredItems = GALLERY_ITEMS.filter(item => {
    const matchesTab = activeTab === 'all' || item.categorySlug === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCategoryCount = (slug: string) => {
    if (slug === 'all') return GALLERY_ITEMS.length;
    return GALLERY_ITEMS.filter(i => i.categorySlug === slug).length;
  };

  return (
    <div className="gallery-page-wrap">
      {/* ══ 1. HERO BANNER SECTION ═══════════════════════════════════ */}
      <section className="gallery-hero">
        <div className="gallery-hero__inner">
          <div className="gallery-hero__left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h6 className="section-title__tagline" style={{ color: 'var(--gold, #D4A72C)', marginBottom: 12 }}>
                <span className="section-title__tagline-border" style={{ backgroundColor: 'var(--gold, #D4A72C)' }}></span>SIGNATURE SHOWCASE
              </h6>
            </motion.div>

            <motion.h1
              className="gallery-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Transforming Spaces With <span>Bespoke Wall Designs</span>
            </motion.h1>

            <motion.p
              className="gallery-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Discover our curated portfolio of luxury wallpapers, custom panoramic murals, textured vinyls, and metallic accents designed for elegant homes and commercial spaces.
            </motion.p>

            <motion.div
              className="gallery-hero__badges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="gallery-hero__badge-item">
                <div className="gallery-hero__badge-icon">🎨</div>
                <span>Custom Murals</span>
              </div>
              <div className="gallery-hero__badge-item">
                <div className="gallery-hero__badge-icon">✨</div>
                <span>3D Embossed</span>
              </div>
              <div className="gallery-hero__badge-item">
                <div className="gallery-hero__badge-icon">🏆</div>
                <span>Premium Quality</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="gallery-hero__right"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={slide1} alt="Wallpaper Showcase" className="gallery-hero__img" />
          </motion.div>
        </div>
      </section>

      {/* ══ 2. GALLERY CONTROLS & FILTER TABS ════════════════════════ */}
      <section className="gallery-controls">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="gallery-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                className={`gallery-filter-btn ${activeTab === cat.slug ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.slug)}
              >
                {cat.label}
                <span className="count">{getCategoryCount(cat.slug)}</span>
              </button>
            ))}
          </div>

          {/* Search & Toolbar */}
          <div className="gallery-toolbar">
            <div className="gallery-search" style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C5A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gallery-search-icon">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search wallpaper style, room type, or texture..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingRight: '40px' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    padding: '5px'
                  }}
                  title="Clear Search"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <div className="gallery-stats">
              Showing <span>{filteredItems.length}</span> of {GALLERY_ITEMS.length} Designs
            </div>
          </div>

          {/* ══ 3. GALLERY CARDS GRID ════════════════════════════════ */}
          <motion.div layout className="gallery-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => {
                const isLiked = !!likedMap[item.id];
                const currentLikes = likesCountMap[item.id] || item.likes;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="gallery-card"
                    onClick={() => setModalItem(item)}
                  >
                    <div className="gallery-card__img-wrap">
                      <span className="gallery-card__badge">{item.category}</span>
                      <img src={item.img} alt={item.title} loading="lazy" />

                      <div className="gallery-card__overlay">
                        <button
                          className="gallery-card__action-btn"
                          title="Quick View Details"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalItem(item);
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                        </button>
                        <button
                          className={`gallery-card__action-btn ${isLiked ? 'liked' : ''}`}
                          title="Favorite"
                          onClick={e => toggleLike(item.id, e)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                        <a
                          href={`https://wa.me/919677733363?text=${encodeURIComponent(`Hi, I am interested in inquiring about the "${item.title}" wallpaper design.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gallery-card__action-btn"
                          title="Inquire on WhatsApp"
                          onClick={e => e.stopPropagation()}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.301-1.129z" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <div className="gallery-card__info">
                      <h3 className="gallery-card__title">{item.title}</h3>
                      <div className="gallery-card__meta">
                        <div className="gallery-card__material" style={{ display: 'flex', alignItems: 'center' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A72C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', flexShrink: 0 }}>
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                          </svg>
                          {item.material}
                        </div>
                        <div
                          className="gallery-card__likes"
                          onClick={e => toggleLike(item.id, e)}
                          style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill={isLiked ? "#ef4444" : "none"} stroke={isLiked ? "#ef4444" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          <span>{currentLikes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-5" style={{ color: '#94a3b8' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <h4>No Wallpapers Found</h4>
              <p>Try clearing your search query or selecting a different category filter.</p>
              <button
                className="gallery-filter-btn active mt-3"
                onClick={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* ══ 4. CONSULTATION CTA BANNER ═════════════════════════════ */}
          <div className="gallery-cta-banner position-relative">
            <div className="gallery-cta-banner__glow" />
            <span className="gallery-hero__badge mb-3">Custom Interior Wall Solutions</span>
            <h2 className="gallery-cta-banner__title">Looking for a Customized Mural or Wall Size?</h2>
            <p className="gallery-cta-banner__desc">
              We offer personalized site visits, precise wall measurements, 3D visualization previews, and professional wallpaper installation across Tamil Nadu.
            </p>
            <div className="gallery-cta-banner__btn-group">
              <Link to="/contact" className="gallery-cta-btn-primary">
                Book Free Consultation
              </Link>
              <a
                href="https://wa.me/919677733363?text=Hi%2C%20I%20would%20like%20to%20request%20a%20wallpaper%20catalog%20and%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-cta-btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.301-1.129z" />
                </svg>
                Chat with Design Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. INTERACTIVE LIGHTBOX MODAL ═══════════════════════════ */}
      <AnimatePresence>
        {modalItem && (
          <div className="gallery-modal-overlay" onClick={() => setModalItem(null)}>
            <motion.div
              className="gallery-modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button className="gallery-modal__close" onClick={() => setModalItem(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="gallery-modal__img-side">
                <img src={modalItem.img} alt={modalItem.title} />
              </div>

              <div className="gallery-modal__content-side">
                <div>
                  <span className="gallery-modal__category">{modalItem.category}</span>
                  <h2 className="gallery-modal__title">{modalItem.title}</h2>
                  <p className="gallery-modal__desc">{modalItem.description}</p>

                  <div className="gallery-modal__specs">
                    <div className="gallery-modal__spec-item">
                      <div className="gallery-modal__spec-label">Material & Type</div>
                      <div className="gallery-modal__spec-val">{modalItem.material}</div>
                    </div>
                    <div className="gallery-modal__spec-item">
                      <div className="gallery-modal__spec-label">Surface Finish</div>
                      <div className="gallery-modal__spec-val">{modalItem.finish}</div>
                    </div>
                    <div className="gallery-modal__spec-item">
                      <div className="gallery-modal__spec-label">Standard Roll / Size</div>
                      <div className="gallery-modal__spec-val">{modalItem.rollSize}</div>
                    </div>
                    <div className="gallery-modal__spec-item">
                      <div className="gallery-modal__spec-label">Durability</div>
                      <div className="gallery-modal__spec-val">{modalItem.washability}</div>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919677733363?text=${encodeURIComponent(`Hi, I am interested in requesting a price quote for "${modalItem.title}" wallpaper.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gallery-modal__cta-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.301-1.129z" />
                  </svg>
                  Request Price & Swatch Sample
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FooterOne />
    </div>
  );
};

export default Gallery;
