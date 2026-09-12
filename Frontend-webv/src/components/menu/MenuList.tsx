import React from 'react';
import { Link, useLocation } from 'react-router';
import { type MenuItem } from './menuContent';

const removedList: MenuItem[] = [
    { id: 1, menuItem: "Home Two", menuLink: "/home-two" },
    { id: 2, menuItem: "Home Three", menuLink: "/home-three" },
    { id: 3, menuItem: "Home One Single Page", menuLink: "/single-page-home-one" },
    { id: 4, menuItem: "Home Two Single Page", menuLink: "/single-page-home-two" },
    { id: 5, menuItem: "Home Three Single Page", menuLink: "/single-page-home-three" },
    { id: 6, menuItem: "Team", menuLink: "/team" },
    { id: 7, menuItem: "Team Details", menuLink: "/team-details" },
    { id: 8, menuItem: "Projects", menuLink: "/projects" },
    { id: 9, menuItem: "Project Details", menuLink: "/project-details" },
    { id: 10, menuItem: "Testimonials", menuLink: "/testimonials" },
    { id: 11, menuItem: "Pricing", menuLink: "/pricing" },
    { id: 12, menuItem: "FAQs", menuLink: "/faqs" },
    { id: 13, menuItem: "Maintenance Service", menuLink: "/maintenance-service" },
    { id: 14, menuItem: "Lighting & Fixtures", menuLink: "/lighting-fixtures" },
    { id: 15, menuItem: "Installing Ceiling Fan", menuLink: "/installing-ceiling-fan" },
    { id: 16, menuItem: "Commercial Services", menuLink: "/commercial-services" },
    { id: 17, menuItem: "Short Circuit Repair", menuLink: "/short-circuit-repair" },
    { id: 18, menuItem: "Electric Panel Repair", menuLink: "/electric-panel-repair" },
    { id: 19, menuItem: "Products", menuLink: "/products" },
    { id: 20, menuItem: "Product Details", menuLink: "/product-details" },
    { id: 21, menuItem: "Cart", menuLink: "/cart" },
    { id: 22, menuItem: "Checkout", menuLink: "/checkout" },
    { id: 23, menuItem: "Wishlist", menuLink: "/wishlist" },
    { id: 24, menuItem: "Sign Up", menuLink: "/sign-up" },
    { id: 25, menuItem: "Login", menuLink: "/login" },
    { id: 26, menuItem: "Blog Standard", menuLink: "/blog-standard" },
    { id: 27, menuItem: "Blog Left Sidebar", menuLink: "/blog-left-sidebar" },
    { id: 28, menuItem: "Blog Right Sidebar", menuLink: "/blog-right-sidebar" },
    { id: 29, menuItem: "Blog Details", menuLink: "/blog/cyclic-voltammetry-guide" },
];

const MenuList: React.FC = () => {
    const currentPath = useLocation().pathname;
    const findLocation = (array: MenuItem[]): boolean => {
        return array.some(item => item?.menuLink === currentPath);
    };
    return (
        <>
            <style>{`
            .custom-nav-list {
                display: flex;
                align-items: center;
                gap: 2px;
                margin: 0;
                padding: 0;
                list-style: none;
            }
            .custom-nav-list li {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .custom-nav-list li a {
                position: relative;
                color: #00227D !important;
                font-family: "Outfit", "Open Sans", "Segoe UI", sans-serif !important;
                font-weight: 600 !important;
                font-size: 15px !important;
                padding: 10px 8px;
                border-radius: 6px;
                transition: all 0.3s ease;
                text-decoration: none;
                letter-spacing: 0.5px;
            }
            .custom-nav-list li a:hover,
            .custom-nav-list li a:focus,
            .custom-nav-list li a:active {
                background-color: #00227D !important;
                color: white !important;
            }
            .custom-nav-list li a::before,
            .custom-nav-list li a::after {
                display: none !important;
            }
            .custom-nav-list li.current a::after {
                content: '';
                position: absolute;
                bottom: 4px;
                left: 50%;
                transform: translateX(-50%);
                width: 30px;
                height: 2px;
                background-color: #00227D;
                display: block !important;
            }
            .custom-nav-list li.current a:hover::after,
            .custom-nav-list li.current a:focus::after,
            .custom-nav-list li.current a:active::after {
                background-color: white;
            }
            @media (max-width: 991px) {
                .custom-nav-list {
                    flex-direction: column;
                    align-items: flex-start;
                    width: 100%;
                }
                .custom-nav-list li {
                    width: 100%;
                    align-items: flex-start;
                }
                .custom-nav-list li a {
                    display: block;
                    width: 100%;
                }
                .custom-nav-list li.current a::after {
                    display: none !important;
                }
            }
        `}</style>
            <ul className="main-menu__list custom-nav-list">
                <li className={currentPath === "/" ? "current" : ""}>
                    <Link to="/">HOME</Link>
                </li>
                <li className={currentPath === "/about" ? "current" : ""}>
                    <Link to="/about">ABOUT US</Link>
                </li>
                <li className={currentPath === "/tnai" ? "current" : ""}>
                    <Link to="/tnai">TNAI</Link>
                </li>
                <li className={currentPath === "/snai" ? "current" : ""}>
                    <Link to="/snai">SNAI</Link>
                </li>
                <li className={currentPath === "/events" ? "current" : ""}>
                    <Link to="/events">EVENTS</Link>
                </li>
                <li className={currentPath === "/membership" ? "current" : ""}>
                    <Link to="/membership">MEMBERSHIP</Link>
                </li>
                <li className={currentPath === "/contact" ? "current" : ""}>
                    <Link to="/contact">CONTACT US</Link>
                </li>
            </ul>
        </>
    );
};

export default MenuList;