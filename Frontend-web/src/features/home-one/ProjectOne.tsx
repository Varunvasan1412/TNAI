import React, { useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import useRsistoreContext from '../../components/context/useRsistoreContext';

import wpBotanical from '../../assets/images/products/wp_botanical.png';
import wpGeometric from '../../assets/images/products/wp_geometric.png';
import wpGoldFoil from '../../assets/images/products/wp_goldfoil.png';
import wpAbstract from '../../assets/images/products/wp_abstract.png';
import wpTropical from '../../assets/images/products/wp_tropical.png';
import wpDamask from '../../assets/images/products/wp_damask.png';
import wpForest from '../../assets/images/products/wp_forest.png';
import wpLinen from '../../assets/images/products/wp_linen.png';

import Lightbox from 'yet-another-react-lightbox';
import TextAnimation from '../../components/elements/TextAnimation';
import SectionWrapper from '../../components/elements/SectionWrapper';

type FilterCategory = 'textured' | 'murals' | 'floral' | 'luxury' | 'all';

interface FilterItem {
    label: string;
    filter: FilterCategory;
}

interface ProjectItem {
    id: number;
    image: string;
    title: string;
    subTitle: string;
    to: string;
    categories: FilterCategory[];
}

const filterItems: FilterItem[] = [
    { label: 'All', filter: 'all' },
    { label: '3D & Textured', filter: 'textured' },
    { label: 'Custom Murals', filter: 'murals' },
    { label: 'Botanical & Floral', filter: 'floral' },
    { label: 'Luxury & Metallic', filter: 'luxury' },
];

const allProjects: ProjectItem[] = [
    { id: 1, image: wpBotanical, title: 'Botanical Sanctuary Mural', subTitle: 'Custom Murals', to: '/gallery', categories: ['murals', 'floral'] },
    { id: 2, image: wpGeometric, title: '3D Geometric Embossed', subTitle: '3D & Textured', to: '/gallery', categories: ['textured'] },
    { id: 3, image: wpGoldFoil, title: 'Royal Metallic Gold Foil', subTitle: 'Luxury & Metallic', to: '/gallery', categories: ['luxury'] },
    { id: 4, image: wpAbstract, title: 'Abstract Luxe Waves', subTitle: '3D & Textured', to: '/gallery', categories: ['textured', 'luxury'] },
    { id: 5, image: wpTropical, title: 'Tropical Paradise Canvas', subTitle: 'Botanical & Floral', to: '/gallery', categories: ['floral', 'murals'] },
    { id: 6, image: wpDamask, title: 'Opulent Damask Pattern', subTitle: 'Luxury & Metallic', to: '/gallery', categories: ['luxury'] },
    { id: 7, image: wpForest, title: 'Panoramic Forest View', subTitle: 'Custom Murals', to: '/gallery', categories: ['murals', 'floral'] },
    { id: 8, image: wpLinen, title: 'Artisan Linen Texture', subTitle: '3D & Textured', to: '/gallery', categories: ['textured'] },
];

const ProjectOne: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
    const [openLightBox, setOpenLightBox] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const { searchQuery, setSearchQuery } = useRsistoreContext();

    const filteredProjects = allProjects.filter(p => {
        const matchesCategory = activeFilter === 'all' || p.categories.includes(activeFilter);
        const matchesSearch = !searchQuery || 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.subTitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const images: string[] = filteredProjects.map(p => p.image);

    return (
        <SectionWrapper className="project-one project-gallery" id='projects'>
            <div className="container">
                {/* Heading */}
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Our Products
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation>Explore Our Wallpaper Collections</TextAnimation>
                    </h3>
                </div>

                {searchQuery && (
                    <div className="text-center mb-4" style={{ marginBottom: '20px' }}>
                        <p style={{ display: 'inline-block', marginRight: '15px' }}>Showing results for: <strong>"{searchQuery}"</strong></p>
                        <button 
                            onClick={() => setSearchQuery("")} 
                            style={{ padding: '5px 15px', borderRadius: '5px', border: '1px solid #d4a72c', background: 'transparent', color: '#020D3F', cursor: 'pointer' }}
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Filter tabs */}
                <div className="project-three__menu-box">
                    <ul className="project-filter clearfix post-filter has-dynamic-filters-counter list-unstyled">
                        {filterItems.map((item) => (
                            <li
                                key={item.filter}
                                onClick={() => setActiveFilter(item.filter)}
                                className={activeFilter === item.filter ? 'active' : ''}
                            >
                                <span className="filter-text">{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Full-width slider */}
            <div className="project-two__carousel">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={0}
                    loop={filteredProjects.length > 4}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    speed={1000}
                    modules={[Autoplay]}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 2 },
                        570: { slidesPerView: 2, spaceBetween: 2 },
                        768: { slidesPerView: 3, spaceBetween: 2 },
                        1000: { slidesPerView: 4, spaceBetween: 2 },
                        1200: { slidesPerView: 5, spaceBetween: 2 },
                    }}
                >
                    {filteredProjects.map((project, i) => (
                        <SwiperSlide key={project.id}>
                            <div className="project-two__single">
                                <div className="project-two__img-box">
                                    <div className="project-two__img">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="project-two__content">
                                        <p className="project-two__sub-title">{project.subTitle}</p>
                                        <h3 className="project-two__title">
                                            <Link to={project.to}>{project.title}</Link>
                                        </h3>
                                        <div className="project-two__arrow">
                                            <a
                                                onClick={() => {
                                                    setIndex(i);
                                                    setOpenLightBox(true);
                                                }}
                                                className="img-popup"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <span className="icon-arrow-right"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <Lightbox
                open={openLightBox}
                close={() => setOpenLightBox(false)}
                slides={images.map((src) => ({ src }))}
                index={index}
            />
        </SectionWrapper>
    );
};

export default ProjectOne;
