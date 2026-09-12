import React, { useState } from 'react';
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
            "Follow these 6 steps and you'll get your Help Scout account up and running in no time. If you'd like to get a full tour of Help Scout and all its features, attend one of our weekly live demos or take a video tour.",
    },
    {
        id: 2,
        question: 'How often should I service my air conditioner?',
        answer:
            "Follow these 6 steps and you'll get your Help Scout account up and running in no time. If you'd like to get a full tour of Help Scout and all its features, attend one of our weekly live demos or take a video tour.",
        isActive: true,
    },
    {
        id: 3,
        question: 'Why is my AC making strange noises?',
        answer:
            "Follow these 6 steps and you'll get your Help Scout account up and running in no time. If you'd like to get a full tour of Help Scout and all its features, attend one of our weekly live demos or take a video tour.",
    },
    {
        id: 4,
        question: 'What qualifications and certifications do your advisors have?',
        answer:
            "Follow these 6 steps and you'll get your Help Scout account up and running in no time. If you'd like to get a full tour of Help Scout and all its features, attend one of our weekly live demos or take a video tour.",
    },
];

const ServiceDetailsFaq: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(
        faqData.find((item) => item.isActive)?.id ?? null
    );

    const handleToggle = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="service-details__faq-box">
            <div className="accrodion-grp faq-one-accrodion">
                {faqData.map((item) => (
                    <div
                        key={item.id}
                        className={`accrodion${openId === item.id ? ' active' : ''}`}
                    >
                        <div className="accrodion-title" onClick={() => handleToggle(item.id)}>
                            <h4>{item.question}</h4>
                        </div>
                        {openId === item.id && (
                            <div className="accrodion-content">
                                <motion.div
                                    initial={{ y: -40, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut"
                                    }}
                                    viewport={{ amount: 0.05 }}
                                    className="inner">
                                    <p>{item.answer}</p>
                                </motion.div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceDetailsFaq;