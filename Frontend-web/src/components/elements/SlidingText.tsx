import React from 'react';

import slidingTextImg1 from '../../assets/images/resources/sliding-text-img-1.png';
import MarqueeSlider from './MarqueeSlider';
import type { SecProp } from '../../features/home-one/AboutOne';

interface SlidingTextItem {
    id: number;
    label: string;
}

const slidingTextItems: SlidingTextItem[] = [
    { id: 1, label: 'Happy Clients' },
    { id: 2, label: 'Skilled Technicians' },
    { id: 3, label: 'Quality Guarantee' },
    { id: 4, label: '24/7 Our Service' },
    { id: 5, label: 'Replacment Device' },
    { id: 6, label: 'Repairing & Testing' },
];

const SlidingText: React.FC<SecProp> = ({secClass}) => {
    return (
        <section className={`sliding-text ${secClass}`}>
            <div className="sliding-text__inner">
                {/* <ul className="sliding-text__list marquee_mode-1 list-unstyled"> */}
                <MarqueeSlider
                    mode="1"
                    className='sliding-text__list'
                >
                    {slidingTextItems.map((item) => (
                        <li key={item.id}>
                            <div className="icon">
                                <img src={slidingTextImg1} alt="icon" />
                            </div>
                           <p>{item.label}</p>
                        </li>
                    ))}
                </MarqueeSlider>
                {/* </ul> */}
            </div>
        </section>
    );
};

export default React.memo(SlidingText);