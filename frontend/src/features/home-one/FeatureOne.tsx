import React from 'react';
import { Link } from 'react-router';

import featureOneShape1 from '../../assets/images/shapes/feature-one-shape-1.png';
import FadeInAdvanced, { type AnimationVariant } from '../../components/elements/FadeInAdvanced';

interface FeatureItem {
    id: number;
    iconClass: string;
    title: string;
    to: string;
    text: string;
    animationType: AnimationVariant;
    animationDelay: number;
}

const featureItems: FeatureItem[] = [
    {
        id: 1,
        iconClass: 'icon-technician-1',
        title: 'Bespoke Wallpaper \nCraftsmanship',
        to: '/about',
        text: 'Designed and printed by experienced artisans specializing in luxury wallpapers, 3D murals, textured vinyls, and custom wall decor.',
        animationType: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 2,
        iconClass: 'icon-services',
        title: 'Design & Fitting \nConsultation',
        to: '/contact',
        text: 'Get expert guidance for pattern selection, precise wall measurement, custom scaling, and professional installation from our specialist team.',
        animationType: 'fadeInUp',
        animationDelay: 200,
    },
    {
        id: 3,
        iconClass: 'icon-setting',
        title: 'Premium Material \nAssurance',
        to: '/about',
        text: 'Every wallpaper roll undergoes strict quality inspection for color accuracy, texture definition, washable finish, and long service life.',
        animationType: 'fadeInRight',
        animationDelay: 300,
    },
];

const FeatureOne: React.FC = () => {
    return (
        <section className="feature-one">
            <div className="container">
                <div className="row">
                    {featureItems.map((item) => (
                        <FadeInAdvanced
                            key={item?.id}
                            delay={item?.animationDelay}
                            variant={item?.animationType}
                            className={`col-xl-4 col-lg-4 `}
                        >
                            <div className="feature-one__single">
                                <div className="feature-one__single-inner">
                                    <div className="feature-one__shape-1">
                                        <img src={featureOneShape1} alt="" />
                                    </div>
                                    <div className="feature-one__icon-and-title">
                                        <div className="feature-one__icon">
                                            <span className={item.iconClass}></span>
                                        </div>
                                        <h3 className="feature-one__title">
                                            <Link to={item.to}>
                                                {item.title.split('\n').map((line, i) => (
                                                    <React.Fragment key={i}>
                                                        {line}
                                                        {i < item.title.split('\n').length - 1 && <br />}
                                                    </React.Fragment>
                                                ))}
                                            </Link>
                                        </h3>
                                    </div>
                                    <p className="feature-one__text">{item.text}</p>
                                </div>
                            </div>
                        </FadeInAdvanced>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureOne;