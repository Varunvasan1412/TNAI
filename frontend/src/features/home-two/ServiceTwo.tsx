import React from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import servicesTwoShape1 from '../../assets/images/shapes/services-two-shape-1.png';
import servicesImg1 from '../../assets/images/services/services-1-1.jpg';
import servicesImg2 from '../../assets/images/services/services-1-2.jpg';
import servicesImg3 from '../../assets/images/services/services-1-3.jpg';
import servicesImg4 from '../../assets/images/services/services-1-4.jpg';
import servicesImg5 from '../../assets/images/services/services-1-5.jpg';
import TextAnimation from '../../components/elements/TextAnimation';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface ServiceItem {
    id: number;
    image: string;
    iconClass: string;
    title: string;
    to: string;
    hoverText: string;
}

const serviceItems: ServiceItem[] = [
    {
        id: 1,
        image: servicesImg1,
        iconClass: 'icon-ac1',
        title: 'A/C Installation',
        to: '/products',
        hoverText: 'There are many variations of passages of Lorem Ipsum available, but the majority',
    },
    {
        id: 2,
        image: servicesImg2,
        iconClass: 'icon-air-conditioning',
        title: 'Heating Service',
        to: '/products',
        hoverText: 'There are many variations of passages of Lorem Ipsum available, but the majority',
    },
    {
        id: 3,
        image: servicesImg3,
        iconClass: 'icon-ac',
        title: 'Dust Cleaning',
        to: '/products',
        hoverText: 'There are many variations of passages of Lorem Ipsum available, but the majority',
    },
    {
        id: 4,
        image: servicesImg4,
        iconClass: 'icon-customer-support',
        title: 'Coolling Services',
        to: '/products',
        hoverText: 'There are many variations of passages of Lorem Ipsum available, but the majority',
    },
    {
        id: 5,
        image: servicesImg5,
        iconClass: 'icon-settings-1',
        title: 'A/C Repairing',
        to: '/products',
        hoverText: 'There are many variations of passages of Lorem Ipsum available, but the majority',
    },
];

const ServiceTwo: React.FC = () => {
    return (
        <SectionWrapper id='services' className="services-two">
            <div className="services-two__bg-color">
                <div className="services-two__shape-1">
                    <img src={servicesTwoShape1} alt="" />
                </div>
            </div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Our Service
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation>Keeping Your AC Running <br /> With Smoothly</TextAnimation>
                    </h3>
                </div>
                <div className="services-two__carousel  ">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        speed={1000}
                        modules={[Autoplay]}
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 10 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            1200: { slidesPerView: 3, spaceBetween: 20 },
                            1600: { slidesPerView: 4, spaceBetween: 20 },
                            2200: { slidesPerView: 5, spaceBetween: 20 },
                        }}
                    > 
                        {serviceItems.map((service) => (
                            <SwiperSlide key={service.id}>
                                <div className="item" >
                                    <div className="services-two__single">
                                        <div className="services-two__img-box">
                                            <div className="services-two__img">
                                                <img src={service.image} alt="" />
                                            </div>
                                            <div className="services-two__hover-content">
                                                <p className="services-two__hover-text">{service.hoverText}</p>
                                                <div className="services-two__btn-box">
                                                    <Link to={service.to} className="thm-btn">
                                                        read more
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="services-two__icon">
                                                <span className={service.iconClass}></span>
                                            </div>
                                        </div>
                                        <div className="services-two__content">
                                            <h3 className="services-two__title">
                                                <Link to={service.to}>{service.title}</Link>
                                            </h3>
                                        </div>
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

export default ServiceTwo;