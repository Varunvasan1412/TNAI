import React from 'react';
import { Link, useLocation } from 'react-router';

import Logo from "../../assets/images/brand/logo.webp"
import useRsistoreContext from '../context/useRsistoreContext';
import MobileManuList from '../menu/MobileManuList';
import SinglePageManuList from '../menu/SinglePageManuList';
const socialLinks = [
    { id: 1, icon: 'icon-facebook', href: 'https://facebook.com', label: 'Facebook' },
    { id: 2, icon: 'icon-instagram', href: 'https://instagram.com', label: 'Instagram' },
    { id: 3, icon: 'icon-link-in', href: 'https://linkedin.com', label: 'LinkedIn' },
    { id: 4, icon: 'icon-xpa', href: 'https://x.com', label: 'Twitter' },
];

const MobileNav: React.FC = () => {
    const { isMobileManu, setIsMobileManu } = useRsistoreContext();
    const currentPath = useLocation().pathname;
    const isOnePage = currentPath.includes("single-page");

    return (
        <div className={`mobile-nav__wrapper ${isMobileManu ? "expanded" : ""}`}>
            <div className="mobile-nav__overlay mobile-nav__toggler" onClick={() => setIsMobileManu((pre) => (!pre))}></div>
            {/* <!-- /.mobile-nav__overlay --> */}
            <div className="mobile-nav__content">
                <span className="mobile-nav__close mobile-nav__toggler" onClick={() => setIsMobileManu((pre) => (!pre))}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </span>

                <div className="logo-box" style={{ padding: '15px 0' }}>
                    <Link to="/" aria-label="logo image" onClick={() => setIsMobileManu((pre) => (!pre))}
                        style={{ display: 'inline-block', background: '#fff', borderRadius: '10px', padding: '8px' }}>
                        <img src="/TNAI.png" alt="TNAI Logo" style={{ height: '60px', width: 'auto', display: 'block' }} />
                    </Link>
                </div>
                <div className="mobile-nav__container">
                    {
                        isOnePage ? <SinglePageManuList /> : <MobileManuList />
                    }
                </div>
                <ul className="mobile-nav__contact list-unstyled">
                    <li>
                        <span className="icon-envelope" style={{ marginRight: '8px', color: '#ffffff' }}></span>
                        <a href="mailto:info@tnaitn.org">info@tnaitn.org</a>
                    </li>
                    <li>
                        <span className="icon-call" style={{ marginRight: '8px', color: '#ffffff' }}></span>
                        <a href="tel:+919677733363">+91 96777 33363</a>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <span className="icon-location" style={{ marginRight: '8px', color: '#ffffff', marginTop: '4px' }}></span>
                        <span>Old No:114, New No: 64, <br/> Santhome High Road, <br/> Mylapore, Chennai- 600004</span>
                    </li>
                </ul>
                <div className="mobile-nav__top" style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="mobile-nav__social" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {socialLinks.map((social) => (
                            <a
                                key={social.id}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.12)',
                                    border: '1px solid rgba(22, 73, 252, 0.5)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    fontSize: '15px',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <span className={social.icon}></span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;