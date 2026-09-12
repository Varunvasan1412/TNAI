import React, { useRef } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import servicesThreeShape1 from '../../assets/images/shapes/services-three-shape-1.png';
import servicesThreeShape2 from '../../assets/images/shapes/services-three-shape-2.png';
import TextAnimation from '../../components/elements/TextAnimation';
import SectionWrapper from '../../components/elements/SectionWrapper';

/* ── Outline SVG Icons for Wallpapers ── */
const PaletteIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.5-.72 1.5-1.5 0-.4-.15-.78-.42-1.07-.27-.29-.42-.67-.42-1.07 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9z" />
    </svg>
);

const LayersIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
    </svg>
);

const MuralIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
);

const SparkleIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
    </svg>
);

const BuildingIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="6" x2="9" y2="6.01" />
        <line x1="15" y1="6" x2="15" y2="6.01" />
        <line x1="9" y1="10" x2="9" y2="10.01" />
        <line x1="15" y1="10" x2="15" y2="10.01" />
        <line x1="9" y1="14" x2="9" y2="14.01" />
        <line x1="15" y1="14" x2="15" y2="14.01" />
        <path d="M10 22v-4h4v4" />
    </svg>
);

const PrintIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
    </svg>
);

interface ServiceItem {
    id: number;
    icon: React.ReactNode;
    subTitle: string;
    title: string;
    text: string;
    path: string;
}

const serviceItems: ServiceItem[] = [
    {
        id: 1,
        icon: <LayersIcon />,
        subTitle: 'Living Room & Bedroom',
        title: '3D Embossed Wallpapers',
        text: 'High-definition 3D textured wallpapers crafted with deep embossing for living rooms, bedrooms, and feature walls.',
        path: '/gallery',
    },
    {
        id: 2,
        icon: <MuralIcon />,
        subTitle: 'Feature Walls & Accent Spaces',
        title: 'Custom Panoramic Murals',
        text: 'Bespoke large-format wall murals printed to your exact wall dimensions with vibrant colors and rich textures.',
        path: '/gallery',
    },
    {
        id: 3,
        icon: <PaletteIcon />,
        subTitle: 'Modern Interiors',
        title: 'Textured Vinyl Wall Coverings',
        text: 'Durable, washable, and scratch-resistant textured vinyl wall coverings ideal for high-traffic and commercial spaces.',
        path: '/gallery',
    },
    {
        id: 4,
        icon: <SparkleIcon />,
        subTitle: 'Luxury Decor',
        title: 'Metallic & Foil Accent Papers',
        text: 'Exquisite gold, silver, and copper metallic wallpaper foils designed to reflect light and add opulent charm.',
        path: '/gallery',
    },
    {
        id: 5,
        icon: <BuildingIcon />,
        subTitle: 'Commercial Spaces',
        title: 'Architectural Canvas Murals',
        text: 'Heavy-duty canvas and fabric-backed wallpapers engineered for hotels, corporate offices, and boutique stores.',
        path: '/gallery',
    },
    {
        id: 6,
        icon: <PrintIcon />,
        subTitle: 'Bespoke Printing',
        title: 'Custom Photo Wallpapers',
        text: 'Personalized high-resolution photo prints scaled to custom specifications with eco-friendly non-toxic inks.',
        path: '/gallery',
    },
];

const ServiceOne: React.FC = () => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <SectionWrapper id='services' className="services-three services-one-slider">
            <div className="services-three__shape-1">
                <img src={servicesThreeShape1} alt="" />
            </div>
            <div className="services-three__shape-2 rotate-me">
                <img src={servicesThreeShape2} alt="" />
            </div>

            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Our Collections
                    </h6>
                    <h3 className="section-title__title title-animation mb-3">
                        <TextAnimation>Bespoke Wallpaper &amp;<br />Murals Solutions</TextAnimation>
                    </h3>
                    <p className="text-center">
                        We design, customize, and supply luxury wallpapers, 3D murals, textured vinyls, and architectural wall decor tailored to your dimensions.
                    </p>
                </div>

                {/* Slider with custom arrows */}
                <div className="services-one-slider__wrap">
                    <button ref={prevRef} className="services-one-slider__arrow services-one-slider__arrow--prev" aria-label="Previous">
                        <span className="icon-arrow-right"></span>
                    </button>
                    <button ref={nextRef} className="services-one-slider__arrow services-one-slider__arrow--next" aria-label="Next">
                        <span className="icon-arrow-right"></span>
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        speed={800}
                        onBeforeInit={(swiper) => {
                            if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }
                        }}
                        onInit={(swiper) => {
                            if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 24 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                    >
                        {serviceItems.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="services-three__single">
                                    <div className="services-three__icon">
                                        {item.icon}
                                    </div>
                                    <div className="services-three__content">
                                        <p className="services-three__sub-title">{item.subTitle}</p>
                                        <h3 className="services-three__title">
                                            <Link to={item.path}>{item.title}</Link>
                                        </h3>
                                        <p className="services-three__text">{item.text}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default ServiceOne;
