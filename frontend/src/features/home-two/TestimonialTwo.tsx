import React, { useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import testimonialImg1 from '../../assets/images/testimonial/testimonial-2-1.jpg';
import testimonialImg2 from '../../assets/images/testimonial/testimonial-2-2.jpg';
import testimonialImg3 from '../../assets/images/testimonial/testimonial-2-3.jpg';
import TextAnimation from '../../components/elements/TextAnimation';

interface TestimonialItem {
    id: number;
    image: string;
    name: string;
    subTitle: string;
    text: string;
    to: string;
    starCount: number;
}

const testimonialItems: TestimonialItem[] = [
    {
        id: 1,
        image: testimonialImg1,
        name: 'Alisa Fox',
        subTitle: 'Founder',
        text: 'A logistic service provider company plays a pivotal role in the global supply chain A logistic service provider companyA logistic service provider company plays a pivotal role.',
        to: '/about',
        starCount: 5,
    },
    {
        id: 2,
        image: testimonialImg2,
        name: 'Robert Son',
        subTitle: 'Founder',
        text: 'A logistic service provider company plays a pivotal role in the global supply chain A logistic service provider companyA logistic service provider company plays a pivotal role.',
        to: '/about',
        starCount: 5,
    },
    {
        id: 3,
        image: testimonialImg3,
        name: 'Danil Aarth',
        subTitle: 'Founder',
        text: 'A logistic service provider company plays a pivotal role in the global supply chain A logistic service provider companyA logistic service provider company plays a pivotal role.',
        to: '/about',
        starCount: 5,
    },
];

const TestimonialTwo: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    return (
        <section className="testimonial-two">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-5">
                        <div className="testimonial-two__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <h6 className="section-title__tagline">
                                    <span className="section-title__tagline-border"></span>Testimonials
                                </h6>
                                <h3 className="section-title__title title-animation">
                                    <TextAnimation>What our client's says <br /> about our work.</TextAnimation>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-7">
                        <div className="testimonial-two__right">
                            <div className="testimonial-two__carousel  ">
                                <Swiper modules={[Autoplay, Navigation]}
                                    spaceBetween={30}
                                    slidesPerView={2}
                                    loop={true}
                                    autoplay={{
                                        delay: 4000,
                                        disableOnInteraction: false,
                                        pauseOnMouseEnter: false,
                                    }}
                                    onSwiper={setSwiperInstance}
                                    speed={1000}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                        },
                                        992: {
                                            slidesPerView: 2,
                                        },
                                        1600: {
                                            slidesPerView: 3,
                                        },
                                    }}>
                                    {testimonialItems.map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <div className="item" >
                                                <div className="testimonial-two__single">
                                                    <div className="testimonial-two__img">
                                                        <img src={item.image} alt="" />
                                                        <div className="testimonial-two__rating">
                                                            {Array.from({ length: item.starCount }).map((_, index) => (
                                                                <span key={index} className="fas fa-star"></span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="testimonial-two__client-info">
                                                        <div className="testimonial-two__client-content">
                                                            <h4 className="testimonial-two__client-name">
                                                                <Link to={item.to}>{item.name}</Link>
                                                            </h4>
                                                            <p className="testimonial-two__client-sub-title">{item.subTitle}</p>
                                                        </div>
                                                    </div>
                                                    <p className="testimonial-two__text">{item.text}</p>
                                                </div>
                                                <div className="testimonial-two__quote">
                                                    <span className="icon-quote"></span>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="owl-nav">
                                    <button
                                        onClick={() => swiperInstance?.slidePrev()}
                                        type="button"
                                        role="presentation"
                                        className="owl-prev"
                                    >
                                        <span className="icon-arrow-right"></span>
                                    </button>
                                    <button
                                        onClick={() => swiperInstance?.slideNext()}
                                        type="button"
                                        role="presentation"
                                        className="owl-next"
                                    >
                                        <span className="icon-arrow-right"></span>
                                    </button>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialTwo;