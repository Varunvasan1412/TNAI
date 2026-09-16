import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaChevronRight, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa';

const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'TNAI', to: '/tnai' },
    { label: 'SNAI', to: '/snai' },
    { label: 'Events', to: '/events' },
    { label: 'Membership', to: '/membership' },
    { label: 'Contact Us', to: '/contact' },
];

const importantLinks = [
    { label: 'TNAI National', href: '#' },
    { label: 'Indian Nursing Council', href: '#' },
    { label: 'Directorate of Medical Education', href: '#' },
    { label: 'Tamil Nadu Nurses & Midwives Council', href: '#' },
    { label: 'Government Orders', href: '#' },
];

const FooterOne: React.FC = () => {
    return (
        <footer className="tnan-footer">
            <style>{`
                .tnan-footer {
                    background-color: #00227D;
                    color: #ffffff;
                    font-family: "Open Sans", sans-serif;
                    padding-top: 50px;
                }
                .tnan-footer-top {
                    padding-bottom: 40px;
                }
                .tnan-footer-col {
                    padding: 0 30px;
                    border-right: 1px solid rgba(255, 255, 255, 0.2);
                }
                .tnan-footer-col:last-child {
                    border-right: none;
                }
                .tnan-footer-col-1 {
                    display: flex;
                    gap: 15px;
                }
                .tnan-footer-logo img {
                    width: 110px;
                    height: 110px;
                    background-color: #ffffff;
                    border-radius: 50%;
                    padding: 5px;
                    object-fit: contain;
                }
                .tnan-footer-info h4 {
                    color: #ffffff;
                    font-size: 22px;
                    font-weight: 600;
                    font-family: "Open Sans", sans-serif;
                    margin-bottom: 5px;
                    line-height: 1.4;
                }
                .tnan-footer-info p {
                    color: #ffffff;
                    font-size: 15px;
                    font-weight: 400;
                    margin: 0;
                    line-height: 1.7;
                }
                .tnan-footer-socials {
                    display: flex;
                    gap: 12px;
                    margin-top: 15px;
                }
                .tnan-footer-socials a {
                    color: #00227D;
                    background-color: #ffffff;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    font-size: 18px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .tnan-footer-socials a:hover {
                    background-color: #0E49FC;
                    color: #ffffff;
                }
                .tnan-footer-title {
                    color: #ffffff;
                    font-size: 18px;
                    font-weight: 600;
                    font-family: "Open Sans", sans-serif;
                    margin-bottom: 25px;
                    text-transform: uppercase;
                }
                .tnan-footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .tnan-footer-links li {
                    margin-bottom: 12px;
                }
                .tnan-footer-links a {
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 1.7;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: color 0.3s ease;
                }
                .tnan-footer-links a svg {
                    font-size: 10px;
                }
                .tnan-footer-links a:hover {
                    color: #0E49FC;
                }
                .tnan-footer-contact {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .tnan-footer-contact li {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    margin-bottom: 18px;
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 1.7;
                }
                .tnan-footer-contact svg {
                    font-size: 16px;
                    margin-top: 5px;
                }
                .tnan-footer-bottom {
                    text-align: center;
                    padding: 20px 0;
                    font-size: 13px;
                }
                @media (max-width: 991px) {
                    .tnan-footer-col {
                        border-right: none;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                        padding: 40px 15px;
                    }
                }
                @media (max-width: 991px) and (min-width: 768px) {
                    .tnan-footer-col:nth-last-child(-n+2) {
                        border-bottom: none;
                    }
                }
                @media (max-width: 767px) {
                    .tnan-footer-col:last-child {
                        border-bottom: none;
                    }
                }
                @media (max-width: 991px) {
                    .tnan-footer-top {
                        padding-bottom: 0;
                    }
                    .tnan-footer-col-1 {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .tnan-footer-logo img {
                        width: 80px;
                        height: 80px;
                    }
                }
                .tnan-footer-image {
                    width: 100%;
                    text-align: center;
                }
                .footer-skyline-img {
                    width: 45%;
                    max-width: 1000px;
                    height: auto;
                    object-fit: contain;
                    margin-bottom: -90px;
                    margin-top: -90px;
                }
                @media (max-width: 1199px) {
                    .footer-skyline-img {
                        width: 60%;
                        margin-bottom: -75px;
                        margin-top: -90px;
                    }
                }
                @media (max-width: 991px) {
                    .footer-skyline-img {
                        width: 75%;
                        margin-bottom: -60px;
                        margin-top: -90px;
                    }
                }
                @media (max-width: 767px) {
                    .footer-skyline-img {
                        width: 95%;
                        margin-bottom: -50px;
                        margin-top: -60px;
                    }
                }
            `}</style>

            <div className="container-fluid px-4 px-lg-5">
                <div className="tnan-footer-top">
                    <div className="row">
                        {/* Column 1: Info & Socials */}
                        <div className="col-lg-4 col-md-6 tnan-footer-col">
                            <div className="tnan-footer-col-1">
                                <div className="tnan-footer-logo">
                                    <Link to="/">
                                        <img src="/TNAI.png" alt="TNAI Logo" />
                                    </Link>
                                </div>
                                <div className="tnan-footer-info">
                                    <h4>THE TRAINED NURSES'<br />ASSOCIATION OF INDIA</h4>
                                    <p style={{ fontSize: '18px', fontWeight: 600, fontFamily: '"Open Sans", sans-serif', marginBottom: '10px', marginTop: '5px' }}>TAMIL NADU STATE BRANCH</p>
                                    <p>Together We Care</p>
                                    <p>Together We Serve</p>
                                    <p>Together We Grow</p>
                                    <div className="tnan-footer-socials">
                                        <a href="#"><FaFacebookF /></a>
                                        <a href="#"><FaInstagram /></a>
                                        <a href="#"><FaYoutube /></a>
                                        <a href="#"><FaLinkedinIn /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div className="col-lg-2 col-md-6 tnan-footer-col">
                            <h4 className="tnan-footer-title">QUICK LINKS</h4>
                            <ul className="tnan-footer-links">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.to}>
                                            <FaChevronRight /> {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Important Links */}
                        <div className="col-lg-3 col-md-6 tnan-footer-col">
                            <h4 className="tnan-footer-title">IMPORTANT LINKS</h4>
                            <ul className="tnan-footer-links">
                                {importantLinks.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                                            <FaChevronRight /> {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Contact Us */}
                        <div className="col-lg-3 col-md-6 tnan-footer-col">
                            <h4 className="tnan-footer-title">CONTACT US</h4>
                            <ul className="tnan-footer-contact">
                                <li>
                                    <FaMapMarkerAlt />
                                    <div>
                                        No. 4/25 & 4/75, 24th Street,<br />
                                        Ashtalakshmi Nagar, Alapakkam,<br />
                                        Chennai - 600116, Tamil Nadu.
                                    </div>
                                </li>
                                <li>
                                    <FaPhoneAlt />
                                    <div>044 - 2381 6786</div>
                                </li>
                                <li>
                                    <FaEnvelope />
                                    <div>tnatsnb@gmail.com</div>
                                </li>
                                <li>
                                    <FaGlobe />
                                    <div>www.tnaitamilnadu.com</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tnan-footer-image">
                <img src="/Footer.png" alt="Tamil Nadu Skyline" className="footer-skyline-img" />
            </div>

            <div className="tnan-footer-bottom">
                <div className="container">
                    © 2026 The Trained Nurses' Association of India, Tamil Nadu State Branch. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default FooterOne;