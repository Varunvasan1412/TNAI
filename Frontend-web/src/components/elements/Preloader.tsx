import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import '../../assets/css/module-css/preloader.css';

const Preloader: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        // Display loader for 1.2 seconds on every route change
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (!loading) return null;

    return (
        <div className="tnan-preloader">
            <div className="tnan-preloader-inner">
                <img src="/loader-ecg.png" alt="Loading..." className="tnan-loader-icon pulse-animation" />
                <div className="tnan-loader-ring"></div>
            </div>
        </div>
    );
};

export default Preloader;
