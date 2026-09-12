import React from 'react';
import logo from "../../assets/images/brand/logo.webp"
import { Link } from 'react-router';
import useRsistoreContext from '../context/useRsistoreContext';
const SideBar: React.FC = () => {
    const { isSidebar, setIsSidebar } = useRsistoreContext();
    return (
        <div className={`xs-sidebar-group info-group info-sidebar ${isSidebar ? 'isActive' : ''}`}>
            <div className="xs-overlay xs-bg-black" onClick={() => setIsSidebar(false)}></div>
            <div className="xs-sidebar-widget">
                <div className="sidebar-widget-container">
                    <div className="widget-heading" onClick={() => setIsSidebar(false)}>
                        <Link to="#" className="close-side-widget">X</Link>
                    </div>
                    <div className="sidebar-textwidget">
                        <div className="sidebar-info-contents">

                            <div className="content-inner">
                                <div className="logo" style={{ marginBottom: '20px', background: '#fff', borderRadius: '12px', padding: '8px', display: 'inline-block' }}>
                                    <Link to="/"><img src={logo} alt="The Wall Project" style={{ height: '100px', width: 'auto', display: 'block' }} /></Link>
                                </div>
                                <div className="content-box">
                                    <h4>About Us</h4>
                                    <div className="inner-text">
                                        <p>The Wall Project - Wallpaper Store provides premium custom wallpapers, wall coverings, and decorative interior solutions.
                                        </p>
                                    </div>
                                </div>


                                <div className="sidebar-contact-info">
                                    <h4>Contact Info</h4>
                                    <ul className="list-unstyled">
                                        <li>
                                            <span className="icon-location"></span> No.145-F, Srinivasa complex, Dr Radhakrishna St, Sivananda Colony, Tatabad, Coimbatore, Tamil Nadu 641012
                                        </li>
                                        <li>
                                            <span className="icon-call"></span>
                                            <a href="tel:+919677733363">+91 96777 33363</a>
                                        </li>
                                        <li>
                                            <span className="icon-envelope"></span>
                                            <a href="mailto:info@thewallproject.in">info@thewallproject.in</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="thm-social-link1" style={{ marginTop: '20px' }}>
                                    <ul className="social-box list-unstyled" style={{ display: 'flex', gap: '10px' }}>
                                        <li>
                                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><span className="icon-facebook" aria-hidden="true"></span></a>
                                        </li>
                                        <li>
                                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><span className="icon-instagram" aria-hidden="true"></span></a>
                                        </li>
                                        <li>
                                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><span className="icon-link-in" aria-hidden="true"></span></a>
                                        </li>
                                        <li>
                                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><span className="icon-xpa" aria-hidden="true"></span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;