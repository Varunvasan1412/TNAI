import React from "react";
import { Link } from "react-router";

import testimonialImg1 from "../../assets/images/testimonial/testimonial-1-1.jpg";
import testimonialImg2 from "../../assets/images/testimonial/testimonial-1-2.jpg";
import testimonialImg3 from "../../assets/images/testimonial/testimonial-1-3.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Testimonial {
    id: number;
    name: string;
    subTitle: string;
    image: string;
    rating: number;
    text: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Adam Smith",
        subTitle: "Co-Founder",
        image: testimonialImg1,
        rating: 5,
        text: '"Adipiscing elit, sed do eiusmod tempor incididunt ut labored etos dolore magna aliquant. Ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip',
    },
    {
        id: 2,
        name: "Robert Son",
        subTitle: "Co-Founder",
        image: testimonialImg2,
        rating: 5,
        text: '"Adipiscing elit, sed do eiusmod tempor incididunt ut labored etos dolore magna aliquant. Ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip',
    },
    {
        id: 3,
        name: "Alisha Martin",
        subTitle: "Co-Founder",
        image: testimonialImg3,
        rating: 5,
        text: '"Adipiscing elit, sed do eiusmod tempor incididunt ut labored etos dolore magna aliquant. Ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip',
    },
    {
        id: 4,
        name: "Adam Smith",
        subTitle: "Co-Founder",
        image: testimonialImg1,
        rating: 5,
        text: '"Adipiscing elit, sed do eiusmod tempor incididunt ut labored etos dolore magna aliquant. Ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip',
    },
    {
        id: 5,
        name: "Robert Son",
        subTitle: "Co-Founder",
        image: testimonialImg2,
        rating: 5,
        text: '"Adipiscing elit, sed do eiusmod tempor incididunt ut labored etos dolore magna aliquant. Ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip',
    },
    {
        id: 6,
        name: "Alisha Martin",
        subTitle: "Co-Founder",
        image: testimonialImg3,
        rating: 5,
        text: '"Adipiscing elit, sed do eiusmod tempor incididunt ut labored etos dolore magna aliquant. Ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip',
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

const TestimonialsSec: React.FC = () => {
    return (
        <section className="testimonial-page">
            <div className="container">
                <div className="row">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="col-xl-6 col-lg-6">
                            <div className="testimonial-one__single">
                                <div className="testimonial-one__single-bdr"></div>
                                <div className="testimonial-one__quote">
                                    <span className="fas fa-quote-right"></span>
                                </div>
                                <div className="testimonial-one__client-info-box">
                                    <div className="testimonial-one__client-info">
                                        <div className="testimonial-one__client-img-box">
                                            <div className="testimonial-one__client-img">
                                                <img
                                                    src={testimonial.image}
                                                    alt={`${testimonial.name} - ${testimonial.subTitle}`}
                                                />
                                            </div>
                                        </div>
                                        <div className="testimonial-one__client-content">
                                            <h3 className="testimonial-one__client-name">
                                                <Link to="/about">{testimonial.name}</Link>
                                            </h3>
                                            <p className="testimonial-one__client-sub-title">
                                                {testimonial.subTitle}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="testimonial-one__client-ratting">
                                        {Array.from({ length: testimonial.rating }, (_, i) => (
                                            <span key={i} className="fas fa-star"></span>
                                        ))}
                                    </div>
                                </div>
                                <p className="testimonial-one__text">{testimonial.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSec;