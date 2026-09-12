import React from 'react';
import MenuThree from '../menu/MenuThree';
import StrickyHeader from './StrickyHeader';

const HeaderThree: React.FC = () => {
    return (
        <>
            <header className="main-header-three">
                <div className="main-menu-three__top">
                    <div className="container">
                        <div className="main-menu-three__top-inner">
                            <ul className="list-unstyled main-menu-three__contact-list">
                                <li>
                                    <div className="icon">
                                        <i className="icon-envelope"></i>
                                    </div>
                                    <div className="text">
                                        <p><a href="mailto:example@gamil.com">example@gamil.com</a>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="icon-location"></i>
                                    </div>
                                    <div className="text">
                                        <p>12 Green Road, 05 New York</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="main-menu-three__top-right">
                                <div className="main-menu-three__social">
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fab fa-facebook"></i></a>
                                    <a href="#"><i className="fab fa-pinterest-p"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="main-menu main-menu-three">
                    <MenuThree />
                </nav>
            </header>

            <StrickyHeader
                className='main-menu-three'
                menu={<MenuThree />}
            />
        </>
    );
};

export default HeaderThree;