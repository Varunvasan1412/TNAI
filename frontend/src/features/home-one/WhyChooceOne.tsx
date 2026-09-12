import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import the actual video
import thewallproject from '../../assets/images/backgrounds/wallproject_video.mp4';
import featureTwoShape1 from '../../assets/images/shapes/feature-two-shape-1.png';
import TextAnimation from '../../components/elements/TextAnimation';
import FadeInAdvanced, { type AnimationVariant } from '../../components/elements/FadeInAdvanced';

interface ChooseItem {
    id: number;
    iconClass: string;
    title: string;
    text: string;
    animationType: AnimationVariant;
    animationDelay: number;
}

const leftColumnItems: ChooseItem[] = [
    {
        id: 1,
        iconClass: 'icon-setting',
        title: 'Custom Design & Manufacturing',
        text: 'Tailored solutions built to your exact specifications and research requirements.',
        animationType: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 3,
        iconClass: 'icon-certified',
        title: 'Made in India',
        text: 'Proudly engineered and manufactured in India to global quality standards.',
        animationType: 'fadeInLeft',
        animationDelay: 300,
    },
];

const rightColumnItems: ChooseItem[] = [
    {
        id: 2,
        iconClass: 'icon-like',
        title: 'Decor-Focused Solutions',
        text: 'Purpose-designed wallpapers crafted with the aesthetic needs of modern interiors in mind.',
        animationType: 'fadeInLeft',
        animationDelay: 200,
    },
    {
        id: 4,
        iconClass: 'icon-product-return',
        title: 'Premium Quality Materials',
        text: 'Only the highest grade textures, eco-friendly inks, and durable paper substrates used.',
        animationType: 'fadeInRight',
        animationDelay: 100,
    }
];

const videoBottomItems: ChooseItem[] = [
    {
        id: 5,
        iconClass: 'icon-send',
        title: 'Fast Delivery',
        text: 'Reliable and timely dispatch so your interior projects stay right on schedule.',
        animationType: 'fadeInUp',
        animationDelay: 200,
    },
    {
        id: 6,
        iconClass: 'icon-customer-support',
        title: 'Expert Design Support',
        text: 'Dedicated guidance and assistance from experienced interior design specialists.',
        animationType: 'fadeInUp',
        animationDelay: 300,
    },
];

const WhyChooseOne: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch(() => { });
                } else {
                    videoRef.current?.pause();
                }
            });
        }, { threshold: 0.3 });

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="why-choose-one" style={{ zIndex: 2 }}>
            <motion.div
                style={{ position: 'absolute', bottom: '-300px', right: '-350px', opacity: 0.18, zIndex: 0, pointerEvents: 'none' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                <img src={featureTwoShape1} alt="" />
            </motion.div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="why-choose-one__left">
                            <div className="section-title sec-title-animation animation-style2">
                                <h6 className="section-title__tagline">
                                    <span className="section-title__tagline-border"></span>Why Choose Us
                                </h6>
                                <h3 className="section-title__title title-animation">
                                    <TextAnimation animationStyle='style2'>
                                        Why Choose The Wall Project?
                                    </TextAnimation>
                                </h3>
                            </div>
                            <p className="why-choose-one__text">
                                The Wall Project is dedicated to transforming spaces with custom-designed wallpapers,
                                premium wall coverings, and dedicated customer support — delivering luxury wall styling right to your home or commercial space.
                            </p>
                            <div className="why-choose-one__list-box">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <ul className="why-choose-one__list list-unstyled">
                                            {leftColumnItems.map((item) => (
                                                <FadeInAdvanced as="li" key={item.id} className='liItem'
                                                    variant={item.animationType}
                                                    delay={item?.animationDelay}
                                                >
                                                    <div className="icon">
                                                        <span className={item.iconClass}></span>
                                                    </div>
                                                    <div className="content">
                                                        <h3>{item.title}</h3>
                                                    </div>
                                                </FadeInAdvanced>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <ul className="why-choose-one__list list-unstyled">
                                            {rightColumnItems.map((item) => (
                                                <FadeInAdvanced key={item.id} className='liItem' variant={item.animationType} duration={item?.animationDelay}>
                                                    <div className="icon">
                                                        <span className={item.iconClass}></span>
                                                    </div>
                                                    <div className="content">
                                                        <h3>{item.title}</h3>
                                                    </div>
                                                </FadeInAdvanced>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <FadeInAdvanced className="w-100" variant="slideInRight" delay={100}>
                            <div className="why-choose-one__img-box">
                                <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
                                    <video
                                        ref={videoRef}
                                        src={thewallproject}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </div>
                            </div>
                            <div className="why-choose-one__list-box mt-4">
                                <div className="row">
                                    {videoBottomItems.map((item) => (
                                        <div className="col-md-6" key={item.id}>
                                            <ul className="why-choose-one__list list-unstyled mb-0">
                                                <FadeInAdvanced as="li" className="liItem" variant={item.animationType} delay={item.animationDelay}>
                                                    <div className="icon">
                                                        <span className={item.iconClass}></span>
                                                    </div>
                                                    <div className="content">
                                                        <h3>{item.title}</h3>
                                                    </div>
                                                </FadeInAdvanced>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInAdvanced>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseOne;