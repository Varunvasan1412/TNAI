import React from 'react';
import { Link, useLocation } from 'react-router';
import logo from "../../assets/images/brand/logo.webp"
import MenuList from './MenuList';
import useRsistoreContext from '../context/useRsistoreContext';
import SinglePageManuList from './SinglePageManuList';


const MenuOne: React.FC = () => {
    const { setIsSearch, setIsSidebar, setIsMobileManu } = useRsistoreContext();
    // const [cart, setCart] = useState();
    const currentPath = useLocation().pathname;
    const isOnePage = currentPath.includes("single-page");



    const handleSearch = () => {
        setIsSearch(pre => !pre)
    }
    const handlSidebar = () => {
        setIsSidebar(pre => !pre)
    }
    const handlMobileMenu = () => {
        setIsMobileManu(pre => !pre)
    }
    return (
        <div className="main-menu__wrapper">
            <div className="main-menu__wrapper-inner">
                <div className="main-menu__left">
                    <div className="main-menu__logo" style={{ padding: 0 }}>
                        <Link to="/"><img src="/TNAI.png" alt="Logo" style={{ maxHeight: '300px', width: 'auto' }} /></Link>
                    </div>
                </div>
                <div className="main-menu__main-menu-box" style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: '30px' }}>
                    {/* Mobile only toggler */}
                    <a href="#" onClick={handlMobileMenu} className="mobile-nav__toggler mobile-nav__toggler--mobile navSidebar-button">
                        <span className="icon-dots-menu-one"></span>
                        <span className="icon-dots-menu-two"></span>
                        <span className="icon-dots-menu-three"></span>
                    </a>
                    {
                        isOnePage ? <SinglePageManuList /> : <MenuList />
                    }
                </div>
                <div className="main-menu__right">
                    {/* iPad toggler - right side */}
                    <a href="#" onClick={handlMobileMenu} className="mobile-nav__toggler mobile-nav__toggler--tablet navSidebar-button">
                        <span className="icon-dots-menu-one"></span>
                        <span className="icon-dots-menu-two"></span>
                        <span className="icon-dots-menu-three"></span>
                    </a>
                    <div className="main-menu__nav-sidebar-icon" onClick={handlSidebar} style={{ display: 'none' }}>
                        <a className="navSidebar-button" href="#">
                            <span className="icon-dots-menu-one"></span>
                            <span className="icon-dots-menu-two"></span>
                            <span className="icon-dots-menu-three"></span>
                        </a>
                    </div>
                    <div className="main-menu__btn-box">
                        <style>{`
                            .custom-login-btn {
                                background-color: #00227D !important;
                                color: white !important;
                                padding: 10px 24px;
                                border-radius: 6px;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                font-weight: 700;
                                font-family: "Outfit", "Open Sans", "Segoe UI", sans-serif !important;
                                font-size: 14px !important;
                                text-decoration: none;
                                transition: all 0.35s ease;
                                border: 2px solid #00227D;
                                white-space: nowrap;
                                overflow: hidden;
                                position: relative;
                                z-index: 1;
                            }
                            .custom-login-btn::before {
                                position: absolute;
                                top: 0;
                                left: 0;
                                content: "";
                                width: 50%;
                                height: 0;
                                visibility: hidden;
                                background-color: white;
                                opacity: 0;
                                z-index: -1;
                                transition: all 0.4s ease-in-out;
                            }
                            .custom-login-btn::after {
                                position: absolute;
                                background-color: white;
                                bottom: 0;
                                right: 0;
                                content: "";
                                width: 50%;
                                height: 0;
                                visibility: hidden;
                                opacity: 0;
                                z-index: -1;
                                transition: all 0.4s ease-in-out;
                            }
                            .custom-login-btn:hover::before,
                            .custom-login-btn:hover::after {
                                width: 100%;
                                height: 100%;
                                visibility: visible;
                                opacity: 1;
                            }
                            .custom-login-btn:hover {
                                color: #00227D !important;
                                box-shadow: 0 4px 12px rgba(0, 34, 125, 0.3);
                            }
                            .custom-login-btn i {
                                font-size: 16px;
                            }
                            @media (max-width: 991px) {
                                .custom-login-btn {
                                    padding: 8px 16px;
                                    font-size: 13px !important;
                                }
                            }
                        `}</style>
                        <Link to="/login" className="custom-login-btn">
                            <i className="far fa-user"></i> LOGIN
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuOne;