import React, { useEffect, useRef } from 'react';
import useRsistoreContext from '../context/useRsistoreContext';
interface Props {
    id: string;
    children: React.ReactNode;
    className?: string;
    thresHold?: number;
}

const SectionWrapper: React.FC<Props> = ({ id, children, className, thresHold = 0.6 }) => {
    const { setActiveSection, } = useRsistoreContext();
    const ref = useRef<HTMLElement | null>(null);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveSection(id);
                }
            },
            { threshold: thresHold }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [id, setActiveSection, thresHold]);


    return (
        <section ref={ref} id={id} className={className}>
            {children}
        </section>
    );
};

export default SectionWrapper;