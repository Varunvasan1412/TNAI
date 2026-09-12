import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

type BrandItem = {
    id: number;
    image: string;
    name: string;
    link: string;
};

const brandData: BrandItem[] = [
    { id: 1, image: '/HBL.png', name: 'HBL', link: '#' },
    { id: 2, image: '/IISER.png', name: 'IISER', link: '#' },
    { id: 3, image: '/Nordische.webp', name: 'Nordische', link: '#' },
    { id: 4, image: '/hp.png', name: 'HP', link: '#' },
    { id: 5, image: '/jain.png', name: 'Jain University', link: '#' },
    { id: 6, image: '/ola.webp', name: 'Ola', link: '#' },
    { id: 7, image: '/university-of-delhi.png', name: 'University of Delhi', link: '#' },
];

const BrandOne: React.FC = () => {
    return (
        <section className="brand-one" style={{ background: '#F8FAFC', padding: '75px 0', borderTop: '1px solid rgba(212, 167, 44, 0.25)', borderBottom: '1px solid rgba(212, 167, 44, 0.25)' }}>
            <div className="container">

                {/* Heading */}
                <div className="section-title text-center sec-title-animation animation-style1" style={{ marginBottom: '45px' }}>
                    <h6 className="section-title__tagline" style={{ color: 'var(--gold-dark, #8C5A00)', marginBottom: '8px' }}>
                        <span className="section-title__tagline-border" style={{ backgroundColor: 'var(--gold-dark, #8C5A00)' }}></span>TRUSTED BY
                    </h6>
                    <h3 className="section-title__title" style={{ color: '#020D3F', fontSize: '38px', fontWeight: 800 }}>Our Valuable Clients and Partners</h3>
                </div>

                {/* Logo carousel */}
                <div className="brand-one__carousel">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={24}
                        slidesPerView={5}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed={800}
                        breakpoints={{
                            0:    { slidesPerView: 2, spaceBetween: 16 },
                            492:  { slidesPerView: 3, spaceBetween: 16 },
                            768:  { slidesPerView: 4, spaceBetween: 20 },
                            1000: { slidesPerView: 5, spaceBetween: 24 },
                        }}
                    >
                        {brandData.map((brand) => (
                            <SwiperSlide key={brand.id}>
                                <div 
                                    className="brand-one__single"
                                    style={{
                                        background: '#FFFFFF',
                                        borderRadius: '18px',
                                        padding: '16px 20px',
                                        height: '95px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid rgba(212, 167, 44, 0.25)',
                                        boxShadow: '0 8px 24px rgba(2, 13, 63, 0.05)',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <a href={brand.link} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                        <img 
                                            src={brand.image} 
                                            alt={brand.name} 
                                            style={{ maxWidth: '130px', maxHeight: '55px', objectFit: 'contain' }} 
                                        />
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </section>
    );
};

export default BrandOne;
