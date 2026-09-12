import React from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import testimonialShape1 from '../../assets/images/shapes/testimonial-one-shape-1.png';
import testimonialShape2 from '../../assets/images/shapes/testimonial-one-shape-2.png';
const testimonialImg1 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&q=80';
const testimonialImg2 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&q=80';
const testimonialImg3 = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face&q=80';
import TextAnimation from '../../components/elements/TextAnimation';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    image: string;
    rating: number;
    text: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        role: 'Home Owner, Chennai',
        image: testimonialImg1,
        rating: 5,
        text: '"Excellent service! The team handled our complete home wiring with great professionalism. Work was neat, timely, and the pricing was very reasonable. Highly recommended!"',
    },
    {
        id: 2,
        name: 'Priya Sharma',
        role: 'Business Owner, Coimbatore',
        image: testimonialImg2,
        rating: 5,
        text: '"RS India did the entire electrical setup for our new office. Their attention to safety standards and quality of work is outstanding. We are very happy with the results."',
    },
    {
        id: 3,
        name: 'Arun Venkatesh',
        role: 'Apartment Resident, Madurai',
        image: testimonialImg3,
        rating: 5,
        text: '"Called them for a short circuit issue and they responded within the hour. Diagnosed the problem quickly and fixed it safely. Very trustworthy and skilled electricians."',
    },
    {
        id: 4,
        name: 'Meena Sundarajan',
        role: 'Factory Manager, Salem',
        image: testimonialImg1,
        rating: 5,
        text: '"We hired RS India for our factory\'s industrial electrical work. They delivered on time with zero safety incidents. Their team is knowledgeable and highly efficient."',
    },
    {
        id: 5,
        name: 'Karthik Rajan',
        role: 'Villa Owner, Trichy',
        image: testimonialImg2,
        rating: 5,
        text: '"Fantastic experience from start to finish. They installed all lighting fixtures and the electrical panel in our new villa beautifully. Clean work and fair pricing."',
    },
    {
        id: 6,
        name: 'Deepa Krishnan',
        role: 'Shop Owner, Tirunelveli',
        image: testimonialImg3,
        rating: 5,
        text: '"After a fire incident, RS India rewired our entire shop safely and quickly. Their expertise gave us confidence. The new setup has been running perfectly ever since."',
    },
];

const TestimonialOne: React.FC = () => {
    return (
        <section className="testimonial-one">
            <div className="testimonial-one__bg" ></div>
            <div className="testimonial-one__shape-1 float-bob-x">
                <img src={testimonialShape1} alt="shape 1" />
            </div>
            <div className="testimonial-one__shape-2 float-bob-y">
                <img src={testimonialShape2} alt="shape 2" />
            </div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Testimonials
                    </h6>
                    <h3 className="section-title__title title-animation"><TextAnimation animationStyle='style2'>What Our Customer Says?</TextAnimation></h3>
                </div>
                <div className="testimonial-one__carousel  ">
                    <Swiper modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        speed={1000}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            992: {
                                slidesPerView: 2,
                            },
                            1200: {
                                slidesPerView: 3,
                            },
                            1600: {
                                slidesPerView: 4,
                            },
                            2200: {
                                slidesPerView: 5,
                            },
                        }}>


                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="item" >
                                    <div className="testimonial-one__single">
                                        <div className="testimonial-one__single-bdr"></div>
                                        <div className="testimonial-one__quote">
                                            <span className="fas fa-quote-right"></span>
                                        </div>
                                        <div className="testimonial-one__client-info-box">
                                            <div className="testimonial-one__client-info">
                                                <div className="testimonial-one__client-img-box">
                                                    <div className="testimonial-one__client-img">
                                                        <img src={testimonial.image} alt={testimonial.name} />
                                                    </div>
                                                </div>
                                                <div className="testimonial-one__client-content">
                                                    <h3 className="testimonial-one__client-name">
                                                        <Link to="/about">{testimonial.name}</Link>
                                                    </h3>
                                                    <p className="testimonial-one__client-sub-title">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="testimonial-one__client-ratting" style={{ marginBottom: '16px' }}>
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <span key={i} className="fas fa-star"></span>
                                            ))}
                                        </div>
                                        <p className="testimonial-one__text">{testimonial.text}</p>
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

export default TestimonialOne;