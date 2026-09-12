import React, { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

import footerShape1 from '../../assets/images/shapes/site-footer-two-shape-1.png';
import logo2 from '../../assets/images/brand/logo.webp';
import FadeInAdvanced from '../elements/FadeInAdvanced';

interface NavLink {
    id: number;
    label: string;
    path: string;
}

interface ServiceLink {
    id: number;
    label: string;
    path: string;
}

interface SocialLink {
    id: number;
    icon: string;
    href: string;
    label: string;
}

interface BottomMenuLink {
    id: number;
    label: string;
    path: string;
}

const companyLinks: NavLink[] = [
    { id: 1, label: 'Home', path: '/' },
    { id: 2, label: 'About Us', path: '/about' },
    { id: 3, label: 'Contact', path: '/contact' },
];

const serviceLinks: ServiceLink[] = [
    { id: 1, label: 'Electric Repair', path: '/' },
    { id: 2, label: 'Lighting & Fixture', path: '/' },
    { id: 3, label: 'European Lard Sration', path: '/' },
    { id: 4, label: 'Electric Maintenance', path: '/' },
    { id: 5, label: 'Colling Service', path: '/' },
];

const socialLinks: SocialLink[] = [
    { id: 1, icon: 'icon-facebook', href: '#', label: 'Facebook' },
    { id: 2, icon: 'icon-xpa', href: '#', label: 'X' },
    { id: 3, icon: 'icon-link-in', href: '#', label: 'LinkedIn' },
    { id: 4, icon: 'icon-instagram', href: '#', label: 'Instagram' },
];

const bottomMenuLinks: BottomMenuLink[] = [
    { id: 1, label: 'Support', path: '/contact' },
    { id: 2, label: 'Terms and Condition', path: '/' },
    { id: 3, label: 'Privacy and Policy', path: '/' },
];

const FooterThree: React.FC = () => {
    const [email, setEmail] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Email Required',
                text: 'Please enter your email address.',
                confirmButtonColor: '#e74c3c',
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                confirmButtonColor: '#e74c3c',
            });
            return;
        }

        try {
            /*
             * ─────────────────────────────────────────────
             *  NOTE: Add your backend / API call here.
             *  Example:
             *
             *  await axios.post('/api/newsletter/subscribe', { email });
             *       — or —
             *  await fetch('/api/newsletter/subscribe', {
             *      method: 'POST',
             *      headers: { 'Content-Type': 'application/json' },
             *      body: JSON.stringify({ email }),
             *  });
             * ─────────────────────────────────────────────
             */

            Swal.fire({
                icon: 'success',
                title: 'Subscribed!',
                text: 'Thank you for subscribing to our newsletter.',
                confirmButtonColor: '#9de73cff',
            });

            setEmail('');

        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Subscription Failed',
                text: 'Something went wrong. Please try again later.',
                confirmButtonColor: '#e74c3c',
            });
        }
    };
    return (
        <footer className="site-footer-two">
            <div className="site-footer-two__shape-1 float-bob-x">
                <img src={footerShape1} alt="Decorative footer shape" />
            </div>

            <div className="container">
                <div className="site-footer-two__top">
                    <div className="row">
                        {/* About Column */}
                        <FadeInAdvanced className="col-xl-4 col-lg-6 col-md-6 " variant='fadeInUp' delay={50}>
                            <div className="footer-widget-two__column footer-widget-two__about">
                                <div className="footer-widget-two__logo">
                                    <Link to="/">
                                        <img src={logo2} alt="The Wall Project logo" />
                                    </Link>
                                </div>
                                <p className="footer-widget-two__about-text">
                                    Secure other greater pleasures, or else he endures<br />
                                    pains to avoid worse pains selection
                                </p>
                                <ul className="footer-widget-two__contact list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-phone-call"></span>
                                        </div>
                                        <div className="content">
                                            <h3>Contact</h3>
                                            <p><a href="tel:+919677733363">+91 96777 33363</a></p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-location"></span>
                                        </div>
                                        <div className="content">
                                            <h3>Location</h3>
                                            <p>No.145-F, Srinivasa complex, Dr Radhakrishna St, Sivananda Colony, Tatabad, Coimbatore, Tamil Nadu 641012</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </FadeInAdvanced>

                        {/* Company Links Column */}
                        <FadeInAdvanced className="col-xl-2 col-lg-6 col-md-6 " variant='fadeInUp' delay={100}>
                            <div className="footer-widget-two__column footer-widget-two__usefull-link">
                                <div className="footer-widget-two__title-box">
                                    <h3 className="footer-widget-two__title">Our Company</h3>
                                </div>
                                <div className="footer-widget-two__link-box">
                                    <ul className="footer-widget-two__link list-unstyled">
                                        {companyLinks.map((link) => (
                                            <li key={link.id}>
                                                <Link to={link.path}>{link.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </FadeInAdvanced>

                        {/* Services Links Column */}
                        <FadeInAdvanced className="col-xl-3 col-lg-6 col-md-6 " variant='fadeInUp' delay={150}>
                            <div className="footer-widget-two__column footer-widget-two__services">
                                <div className="footer-widget-two__title-box">
                                    <h3 className="footer-widget-two__title">Our Service</h3>
                                </div>
                                <ul className="footer-widget-two__link list-unstyled">
                                    {serviceLinks.map((link) => (
                                        <li key={link.id}>
                                            <Link to={link.path}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeInAdvanced>

                        {/* Newsletter Column */}
                        <FadeInAdvanced className="col-xl-3 col-lg-6 col-md-6 " variant='fadeInUp' delay={400}>
                            <div className="footer-widget-two__column footer-widget-two__newsletter">
                                <h3 className="footer-widget-two__newsletter-title">
                                    Subscribe To Our Newsletter To Get Latest Update
                                </h3>
                                <form className="footer-widget-two__newsletter-form mc-form" onSubmit={handleSubmit}>
                                    <div className="footer-widget-two__newsletter-form-input-box">
                                        <input
                                            type="email"
                                            placeholder="Enter email address..."
                                            name="EMAIL"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="footer-widget-two__newsletter-btn">
                                            <span className="icon-send"></span>
                                        </button>
                                    </div>
                                </form>
                                <div className="site-footer-two__social">
                                    {socialLinks.map((social) => (
                                        <a key={social.id} href={social.href} aria-label={social.label}>
                                            <i className={social.icon}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </FadeInAdvanced>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="site-footer-two__bottom">
                <div className="container">
                    <div className="site-footer-two__bottom-inner">
                        <p className="site-footer-two__bottom-text">
                            © Copyright 2026 by <Link to="/">The Wall Project</Link>. All Rights Reserved.
                        </p>
                        <ul className="list-unstyled site-footer-two__bottom-menu">
                            {bottomMenuLinks.map((link) => (
                                <li key={link.id}>
                                    <Link to={link.path}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterThree;