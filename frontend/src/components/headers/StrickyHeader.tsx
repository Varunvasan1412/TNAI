import React, { useEffect, useState } from 'react';
import type { ReactNode } from "react";

type StrickyHeaderProp = {
    menu: ReactNode;
    className?: string;
};
const StrickyHeader: React.FC<StrickyHeaderProp> = ({ menu, className }) => {
    const [isStick, setIsSticky] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [setIsSticky]);

    return (
        <div className={`stricky-header stricked-menu main-menu ${className} ${isStick ? 'stricky-fixed' : ''}`}>
            <div className="sticky-header__content">
                {menu}
            </div>
        </div>
    );
};

export default StrickyHeader;