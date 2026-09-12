import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";
interface FaqItem {
    id: number;
    question: string;
    answer: string;
    isActive?: boolean;
}

const faqData: FaqItem[] = [
    {
        id: 1,
        question: 'Why is my air conditioner not cooling properly?',
        answer:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    },
    {
        id: 2,
        question: 'How often should I service my air conditioner?',
        answer:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
        isActive: true,
    },
    {
        id: 3,
        question: 'Why is my AC making strange noises?',
        answer:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    },
    {
        id: 4,
        question: 'What qualifications and certifications do your advisors have?',
        answer:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    },
    {
        id: 5,
        question: 'How do I know if my AC unit needs to be replaced?',
        answer:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    },
    {
        id: 6,
        question: 'What is the ideal temperature setting for energy efficiency?',
        answer:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    },
    {
        id: 7,
        question: 'Can I install an air conditioner myself?',
        answer:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    },
    {
        id: 8,
        question: 'How do I clean or replace my AC filter?',
        answer:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    },
];

const leftColumnFaqs = faqData.slice(0, 4);
const rightColumnFaqs = faqData.slice(4, 8);

interface AccordionItemProps {
    item: FaqItem;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onToggle }) => {
    return (
        <div className={`accrodion${isOpen ? ' active' : ''}`}>
            <div className="accrodion-title" onClick={onToggle}>
                <h4>{item.question}</h4>
            </div>
            {isOpen && (
                <div className="accrodion-content">
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut"
                        }}
                        viewport={{ amount: 0.05 }}
                        className="inner"
                    >
                        <p>{item.answer}</p>
                        <Link to="/contact" className="faq-read-more">
                            Read more
                        </Link>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

const FaqSec: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(
        faqData.find((item) => item.isActive)?.id ?? null
    ); 
    const handleToggle = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    }; 
    return (
        <section className="faq-one faq-page">
            <div className="container">
                <div className="row">
                    {/* Left Column */}
                    <div className="col-xl-6 col-lg-6">
                        <div className="faq-page__single">
                            <div className="accrodion-grp faq-one-accrodion" >
                                {leftColumnFaqs.map((item) => (
                                    <AccordionItem
                                        key={item.id}
                                        item={item}
                                        isOpen={openId === item.id}
                                        onToggle={() => handleToggle(item.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-xl-6 col-lg-6">
                        <div className="faq-page__single">
                            <div className="accrodion-grp faq-one-accrodion" >
                                {rightColumnFaqs.map((item) => (
                                    <AccordionItem
                                        key={item.id}
                                        item={item}
                                        isOpen={openId === item.id}
                                        onToggle={() => handleToggle(item.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSec;