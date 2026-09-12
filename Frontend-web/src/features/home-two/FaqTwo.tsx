import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router';

import faqOneImg1 from '../../assets/images/resources/faq-one-img-1.jpg';
import CounterUp from '../../components/elements/CounterUp';
import TextAnimation from '../../components/elements/TextAnimation';

interface FaqItem {
    id: number;
    question: string;
    answer: string;
    isActive: boolean;
}

const faqItems: FaqItem[] = [
    {
        id: 1,
        question: 'Why is my air conditioner not cooling properly ?',
        answer: 'It is a long established fact that a reader will be distr acted bioiiy the rea dablea content of a page when looking at its layout Thoiie point',
        isActive: false,
    },
    {
        id: 2,
        question: 'How often should I service my air conditioner ?',
        answer: 'It is a long established fact that a reader will be distr acted bioiiy the rea dablea content of a page when looking at its layout Thoiie point',
        isActive: true,
    },
    {
        id: 3,
        question: 'Why is my AC making strange noises ?',
        answer: 'It is a long established fact that a reader will be distr acted bioiiy the rea dablea content of a page when looking at its layout Thoiie point',
        isActive: false,
    },
    {
        id: 4,
        question: 'What qualifications and certifications do your advisors have?',
        answer: 'It is a long established fact that a reader will be distr acted bioiiy the rea dablea content of a page when looking at its layout Thoiie point',
        isActive: false,
    },
];

const FaqTwo: React.FC = () => {
    const [activeFaq, setActiveFaq] = useState<number>(2);
    return (
        <section className="faq-one">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5">
                        <div
                            className="faq-one__left"
                        >
                            <div className="faq-one__img-box">
                                <div className="faq-one__img">
                                    <img src={faqOneImg1} alt="" />
                                </div>
                                <div className="faq-one__ratting-box">
                                    <div className="faq-one__ratting">
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                    </div>
                                    <p className="faq-one__ratting-text">
                                        Based on
                                        <span className="odometer" ><CounterUp ending={5748} /></span>
                                        <span>+</span> reviews, Trust<br /> Pilot and ambitionbox.
                                    </p>
                                </div>
                                <div className="faq-one__shape-1"></div>
                                <div className="faq-one__shape-2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7">
                        <div className="faq-one__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <h6 className="section-title__tagline">
                                    <span className="section-title__tagline-border"></span>Trusted Professionals
                                </h6>
                                <h3 className="section-title__title title-animation">
                                    <TextAnimation > Frequently Asking Any Question</TextAnimation>
                                </h3>
                            </div>
                            <div className="accrodion-grp faq-one-accrodion" >
                                {faqItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`accrodion ${activeFaq === item?.id ? 'active' : ''}`}
                                    >
                                        <div className="accrodion-title" onClick={() => setActiveFaq(item?.id)}>
                                            <h4>{item.question}</h4>
                                        </div>
                                        <div style={{ display: `${activeFaq === item?.id ? 'block' : 'none'}` }} className="accrodion-content">
                                            <div className="inner">
                                                <motion.p
                                                    initial={{ y: -40, opacity: 0 }}
                                                    whileInView={{ y: 0, opacity: 1 }}
                                                    transition={{
                                                        duration: 0.5,
                                                        ease: "easeOut"
                                                    }}
                                                    viewport={{ amount: 0.05 }}
                                                >
                                                    {item.answer}
                                                </motion.p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="faq-one__bottom">
                    <p className="faq-one__bottom-text">Have Any Questions? Quick Answers to Common Questions.</p>
                    <div className="faq-one__bottom-btn">
                        <Link to="/contact" className="thm-btn">
                            here to help<span className="icon-arrow-right"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqTwo;