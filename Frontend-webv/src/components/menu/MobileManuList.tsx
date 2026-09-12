import React from 'react';
import { Link, useLocation } from 'react-router';
import useRsistoreContext from '../context/useRsistoreContext';

const MobileManuList: React.FC = () => {
    const { setIsMobileManu } = useRsistoreContext();
    const currentPath = useLocation().pathname;
    const closeMobileManu = () => setIsMobileManu(false);
    return (
        <ul className="main-menu__list mobileManulist">
            <li className={`${currentPath === "/" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link to="/">Home</Link>
            </li>
            <li className={`${currentPath === "/about" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link to="/about">About Us</Link>
            </li>
            <li className={`${currentPath === "/tnai" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link to="/tnai">TNAI</Link>
            </li>
            <li className={`${currentPath === "/snai" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link to="/snai">SNAI</Link>
            </li>
            <li className={`${currentPath === "/events" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link to="/events">Events</Link>
            </li>
            <li className={`${currentPath === "/membership" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link to="/membership">Membership</Link>
            </li>
            <li className={`${currentPath === "/gallery" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link to="/gallery">Gallery</Link>
            </li>
            <li className={`${currentPath === "/contact" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
    );
};

export default MobileManuList;