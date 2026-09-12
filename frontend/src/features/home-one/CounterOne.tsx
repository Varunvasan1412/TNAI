import React from 'react';

import counterOneBg from '../../assets/images/backgrounds/wallpaper_store_counter_bg.png';
import CounterUp from '../../components/elements/CounterUp';
import JarallaxSection from '../../components/elements/JarallaxSection';

interface CounterItem {
    id: number;
    iconClass: string;
    count: number;
    suffix: string;
    label: string;
}

const counterItems: CounterItem[] = [
    {
        id: 1,
        iconClass: 'icon-project-complete',
        count: 500,
        suffix: '+',
        label: 'Wallpaper Designs',
    },
    {
        id: 2,
        iconClass: 'icon-happy-customer',
        count: 10,
        suffix: 'k+',
        label: 'Happy Homeowners',
    },
    {
        id: 3,
        iconClass: 'icon-technician-1',
        count: 25,
        suffix: '+',
        label: 'Years of Decor Expertise',
    },
    {
        id: 4,
        iconClass: 'icon-like',
        count: 100,
        suffix: '%',
        label: 'Quality Assured',
    },
];

const CounterOne: React.FC = () => {
    return (
        <JarallaxSection className="counter-one"
            imgSrc={counterOneBg}
            overlayOpacity={0.75}
        >
            <div className="container">
                <ul className="row list-unstyled">
                    {counterItems.map((item) => (
                        <li key={item.id} className="col-xl-3 col-lg-6 col-md-6 col-6">
                            <div className="counter-one__single">
                                <div className="counter-one__icon">
                                    <span className={item.iconClass}></span>
                                </div>
                                <div className="counter-one__count-box">
                                    <h3 className="odometer"><CounterUp ending={item?.count} /></h3>
                                    <span>{item.suffix}</span>
                                </div>
                                <p className="counter-one__count-text">{item.label}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </JarallaxSection>
    );
};

export default CounterOne;
