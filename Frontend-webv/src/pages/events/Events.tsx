import React from 'react';
import { Link } from 'react-router';
import {
    FaCalendarAlt, FaMapMarkerAlt, FaRegClock, FaArrowRight,
    FaUsers, FaChalkboardTeacher, FaGraduationCap,
    FaVideo, FaHeartbeat, FaStar,
    FaBookOpen, FaAward, FaChartLine, FaRibbon, FaGlobe, FaCalendarCheck, FaRegEnvelope
} from 'react-icons/fa';
import HeaderOne from '../../components/headers/HeaderOne';
import FooterOne from '../../components/footers/FooterOne';
import PageBanner from '../../components/elements/PageBanner';
import '../../assets/css/module-css/events-page.css';

const Events: React.FC = () => {
    return (
        <div className="custom-cursor__cursor-outer">
            <HeaderOne />

            <PageBanner
                bgImage="/Hero.png"
                isContentBoxed={true}
                minHeight="80vh"
                titleMain="EVENTS"
            >
                <h2 style={{ color: '#0E49FC', fontSize: '28px', fontWeight: 700, margin: 0, fontFamily: '"Open Sans", sans-serif' }}>
                    Connect. Learn. Inspire.
                </h2>
                <div style={{ width: '40px', height: '2px', backgroundColor: '#0E49FC', margin: '15px 0 25px 0' }}></div>

                <p style={{ color: '#00227D', fontSize: '16px', lineHeight: '1.6', maxWidth: '90%', marginBottom: '30px', fontWeight: 600 }}>
                    A platform for nurses to come together, share knowledge, build networks and drive excellence in nursing practice.
                </p>
                <div style={{ width: '50px', height: '3px', backgroundColor: '#00227D', marginBottom: '40px' }}></div>
            </PageBanner>

            <div className="events-page-content">
                <div className="container-fluid px-3 px-md-5">

                    {/* UPCOMING EVENTS */}
                    <div className="events-section-header">
                        <h3 className="events-section-title">UPCOMING EVENTS</h3>
                        <Link to="/events" className="events-view-all">VIEW ALL EVENTS <FaArrowRight /></Link>
                    </div>

                    <div className="events-grid">
                        <div className="event-page-card">
                            <div className="event-card-top">
                                <div className="event-date-box">
                                    <FaCalendarAlt />
                                    <div className="day">25</div>
                                    <div className="month-year">MAY<br />2025</div>
                                </div>
                                <div className="event-info">
                                    <h4>State Executive<br />Committee Meeting</h4>
                                    <div className="event-meta"><FaRegClock /> 10:00 AM - 04:00 PM</div>
                                    <div className="event-meta"><FaMapMarkerAlt /> Chennai</div>
                                </div>
                            </div>
                            <Link to="/events" className="event-view-btn">VIEW DETAILS <FaArrowRight style={{ marginLeft: '5px' }} /></Link>
                        </div>

                        <div className="event-page-card">
                            <div className="event-card-top">
                                <div className="event-date-box blue">
                                    <FaCalendarAlt />
                                    <div className="day">08</div>
                                    <div className="month-year">JUN<br />2025</div>
                                </div>
                                <div className="event-info">
                                    <h4>CNE Programme on<br />Critical Care Nursing</h4>
                                    <div className="event-meta"><FaRegClock /> 09:30 AM - 04:30 PM</div>
                                    <div className="event-meta"><FaMapMarkerAlt /> Coimbatore</div>
                                </div>
                            </div>
                            <Link to="/events" className="event-view-btn">VIEW DETAILS <FaArrowRight style={{ marginLeft: '5px' }} /></Link>
                        </div>

                        <div className="event-page-card">
                            <div className="event-card-top">
                                <div className="event-date-box">
                                    <FaCalendarAlt />
                                    <div className="day">12</div>
                                    <div className="month-year">JUL<br />2025</div>
                                </div>
                                <div className="event-info">
                                    <h4>International Nurses<br />Day Celebrations</h4>
                                    <div className="event-meta"><FaRegClock /> 10:00 AM - 01:00 PM</div>
                                    <div className="event-meta"><FaMapMarkerAlt /> Madurai</div>
                                </div>
                            </div>
                            <Link to="/events" className="event-view-btn">VIEW DETAILS <FaArrowRight style={{ marginLeft: '5px' }} /></Link>
                        </div>

                        <div className="event-page-card">
                            <div className="event-card-top">
                                <div className="event-date-box">
                                    <FaCalendarAlt />
                                    <div className="day">20</div>
                                    <div className="month-year">AUG<br />2025</div>
                                </div>
                                <div className="event-info">
                                    <h4>Workshop on<br />Nursing Leadership</h4>
                                    <div className="event-meta"><FaRegClock /> 09:30 AM - 04:30 PM</div>
                                    <div className="event-meta"><FaMapMarkerAlt /> Tiruchirappalli</div>
                                </div>
                            </div>
                            <Link to="/events" className="event-view-btn">VIEW DETAILS <FaArrowRight style={{ marginLeft: '5px' }} /></Link>
                        </div>
                    </div>

                    {/* EXPLORE EVENTS BY CATEGORY */}
                    <div className="events-section-header">
                        <h3 className="events-section-title">EXPLORE EVENTS BY CATEGORY</h3>
                    </div>

                    <div className="categories-grid">
                        <Link to="/events" className="category-card">
                            <FaUsers />
                            <span>Conference &<br />Conventions</span>
                        </Link>
                        <Link to="/events" className="category-card">
                            <FaChalkboardTeacher />
                            <span>Workshops &<br />Training</span>
                        </Link>
                        <Link to="/events" className="category-card">
                            <FaGraduationCap />
                            <span>CNE<br />Programs</span>
                        </Link>
                        <Link to="/events" className="category-card">
                            <FaUsers />
                            <span>Meetings</span>
                        </Link>
                        <Link to="/events" className="category-card">
                            <FaVideo />
                            <span>Webinars</span>
                        </Link>
                        <Link to="/events" className="category-card">
                            <FaHeartbeat />
                            <span>Health<br />Camps</span>
                        </Link>
                        <Link to="/events" className="category-card">
                            <FaStar />
                            <span>Special<br />Events</span>
                        </Link>
                    </div>

                    {/* WHY PARTICIPATE SECTION */}
                    <div className="why-participate-section">
                        <div className="why-title">WHY PARTICIPATE?</div>
                        <div className="why-features">
                            <div className="why-feature-item">
                                <FaBookOpen />
                                <span className="why-feature-text">Enhance<br />Knowledge</span>
                            </div>
                            <div className="why-feature-item">
                                <FaUsers />
                                <span className="why-feature-text">Build<br />Professional<br />Networks</span>
                            </div>
                            <div className="why-feature-item">
                                <FaAward />
                                <span className="why-feature-text">Earn CNE<br />Credits</span>
                            </div>
                            <div className="why-feature-item">
                                <FaChartLine />
                                <span className="why-feature-text">Advance<br />Your Career</span>
                            </div>
                            <div className="why-feature-item">
                                <FaRibbon />
                                <span className="why-feature-text">Stay Updated with<br />Latest Trends</span>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM GRID: PAST EVENTS & IMPACT */}
                    <div className="events-bottom-grid">

                        {/* PAST EVENTS */}
                        <div className="past-events-col">
                            <div className="events-section-header">
                                <h3 className="events-section-title">GLIMPSES OF PAST EVENTS</h3>
                                <Link to="/events" className="events-view-all">VIEW GALLERY <FaArrowRight /></Link>
                            </div>

                            <div className="past-events-gallery">
                                <img src="/TNAI.png" alt="Large Event Logo" className="gallery-img large-card" style={{objectFit: 'contain', border: '1px solid #eef1f6', padding: '10px'}} />
                                <img src="/Hero.png" alt="Past Event 2" className="gallery-img" />
                                <img src="/Contact.png" alt="Past Event 3" className="gallery-img" />
                                <img src="/Footer.png" alt="Past Event 4" className="gallery-img" />
                                <img src="/demo.png" alt="Past Event 5" className="gallery-img" />
                            </div>
                            <div className="gallery-pagination">
                                <div className="gallery-dot active"></div>
                                <div className="gallery-dot"></div>
                                <div className="gallery-dot"></div>
                                <div className="gallery-dot"></div>
                            </div>
                        </div>

                        {/* OUR IMPACT */}
                        <div className="impact-col">
                            <div className="events-section-header">
                                <h3 className="events-section-title">OUR IMPACT</h3>
                            </div>

                            <div className="impact-list">
                                <div className="impact-item">
                                    <div className="impact-icon"><FaUsers /></div>
                                    <div className="impact-text">
                                        <h5>150+</h5>
                                        <p>Events Conducted</p>
                                    </div>
                                </div>
                                <div className="impact-item">
                                    <div className="impact-icon"><FaCalendarCheck /></div>
                                    <div className="impact-text">
                                        <h5>25,000+</h5>
                                        <p>Nurses Participated</p>
                                    </div>
                                </div>
                                <div className="impact-item">
                                    <div className="impact-icon"><FaGlobe /></div>
                                    <div className="impact-text">
                                        <h5>30+</h5>
                                        <p>Cities Reached</p>
                                    </div>
                                </div>
                                <div className="impact-item">
                                    <div className="impact-icon"><FaStar /></div>
                                    <div className="impact-text">
                                        <h5>100+</h5>
                                        <p>Knowledge Sessions Delivered</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* NEWSLETTER SECTION */}
                    <div className="events-newsletter-section">
                        <div className="newsletter-left">
                            <div className="newsletter-icon">
                                <FaRegEnvelope />
                            </div>
                            <div className="newsletter-text">
                                <h4>STAY CONNECTED</h4>
                                <p>Subscribe to our newsletter and never miss an update<br/>on upcoming events and programs.</p>
                            </div>
                        </div>
                        <div className="newsletter-right">
                            <input type="text" className="newsletter-input" placeholder="Enter your email address" />
                            <button className="newsletter-btn">SUBSCRIBE</button>
                        </div>
                    </div>

                </div>
            </div>

            <FooterOne />
        </div>
    );
};

export default Events;
