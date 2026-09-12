import React from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import testimonial3Img1 from '../../assets/images/testimonial/testimonial-3-1.jpg';
import testimonial3Img2 from '../../assets/images/testimonial/testimonial-3-2.jpg';
import testimonial3Img3 from '../../assets/images/testimonial/testimonial-3-3.jpg';
import TextAnimation from '../../components/elements/TextAnimation';

interface TestimonialItem {
    id: number;
    image: string;
    name: string;
    role: string;
    rating: number;
    text: string;
    path: string;
}

const testimonialItems: TestimonialItem[] = [
    {
        id: 1,
        image: testimonial3Img1,
        name: 'Dianne Russell',
        role: 'Founder',
        rating: 5,
        text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
        path: '/about',
    },
    {
        id: 2,
        image: testimonial3Img2,
        name: 'Stanley Richard',
        role: 'Co-Founder',
        rating: 5,
        text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
        path: '/about',
    },
    {
        id: 3,
        image: testimonial3Img3,
        name: 'Quentin Ambrose',
        role: 'Manager',
        rating: 5,
        text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
        path: '/about',
    },
    {
        id: 4,
        image: testimonial3Img1,
        name: 'Dianne Russell',
        role: 'Founder',
        rating: 5,
        text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
        path: '/about',
    },
];

const TestimonialsThree: React.FC = () => {
    return (
        <section className="testimonial-three">
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Testimonials
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation> Clients Feedback About Their <br /> Experience With Us</TextAnimation>
                    </h3>
                </div>

                <div className="testimonial-three__carousel  ">
                    <Swiper
                        slidesPerView={3}
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        speed={1000}

                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 10 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            992: { slidesPerView: 3, spaceBetween: 30 },
                            1600: { slidesPerView: 4, spaceBetween: 30 },
                            2200: { slidesPerView: 5, spaceBetween: 30 },
                        }}
                    >
                        {testimonialItems.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="item">
                                    <div className="testimonial-three__single">
                                        <div className="testimonial-three__img-box">
                                            <div className="testimonial-three__img">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                        </div>
                                        <div className="testimonial-three__content">
                                            <div className="testimonial-three__name-box">
                                                <h3>
                                                    <Link to={item.path}>{item.name}</Link>
                                                </h3>
                                                <p>{item.role}</p>
                                            </div>
                                            <div className="testimonial-three__ratting">
                                                {Array.from({ length: item.rating }).map((_, index) => (
                                                    <span key={index} className="fas fa-star"></span>
                                                ))}
                                            </div>
                                            <p className="testimonial-three__text">{item.text}</p>
                                        </div>
                                        <div className="testimonial-three__quote">
                                            <span className="icon-quote"></span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsThree;