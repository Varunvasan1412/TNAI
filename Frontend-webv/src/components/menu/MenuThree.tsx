import React from 'react';
import MenuList from './MenuList';
import { Link, useLocation } from 'react-router';
import logo from "../../assets/images/brand/logo.webp"
import useRsistoreContext from '../context/useRsistoreContext';
import SinglePageManuList from './SinglePageManuList';

const MenuThree: React.FC = () => {
    const { setIsSearch, setIsSidebar, setIsMobileManu } = useRsistoreContext();
    const currentPath = useLocation().pathname;
    const isOnePage = currentPath.includes("single-page")
    const getCartCount = localStorage.getItem("cartCount");
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
        <div className="main-menu-three__wrapper">
            <div className="container">
                <div className="main-menu-three__wrapper-inner">
                    <div className="main-menu-three__left">
                        <div className="main-menu-three__logo">
                            <Link to="/"><img src={logo} alt="Logo" /></Link>
                        </div>
                    </div>
                    <div className="main-menu-two__main-menu-box">
                        <a href="#" className="mobile-nav__toggler" onClick={handlMobileMenu}><i className="fa fa-bars"></i></a>
                        {
                            isOnePage ? <SinglePageManuList /> : <MenuList />
                        }
                    </div>
                    <div className="main-menu-three__right">
                        <div className="main-menu-three__btn-box">
                            <Link to="/contact" className="thm-btn">Get A Quote<span
                                className="icon-arrow-right"></span></Link>
                        </div>
                        <div className="main-menu-three__search-box" onClick={handleSearch}>
                            <span className="main-menu-three__search searcher-toggler-box icon-search-interface-symbol"></span>
                        </div>
                        <div className="main-menu-three__cart">
                            <Link to="/products" className="main-menu__cart">
                                <span className="far fa-shopping-cart"></span>
                                <span className="main-menu__cart-count">0{getCartCount}</span>
                            </Link>
                        </div>
                        <div className="main-menu-three__nav-sidebar-icon" onClick={handlSidebar}>
                            <Link className="navSidebar-button" to="#">
                                <span className="icon-dots-menu-three-one"></span>
                                <span className="icon-dots-menu-three-two"></span>
                                <span className="icon-dots-menu-three-three"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuThree;