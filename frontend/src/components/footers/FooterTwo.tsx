import React, { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

import footerPostImg1 from '../../assets/images/blog/footer-widget-post-img-1.jpg';
import footerPostImg2 from '../../assets/images/blog/footer-widget-post-img-2.jpg';

import footerShape1 from '../../assets/images/shapes/footer-widget-shape-1.png';
import footerLogo from '../../assets/images/brand/logo.webp';
import FadeInAdvanced from '../elements/FadeInAdvanced';

interface WorkingHour {
    id: number;
    day: string;
    hours: string;
}

interface NavLink {
    id: number;
    label: string;
    to: string;
}

interface SocialLink {
    id: number;
    icon: string;
    href: string;
}

const workingHours: WorkingHour[] = [
    { id: 1, day: 'Mon - Fri', hours: '9:00 AM - 5:00 PM' },
    { id: 2, day: 'Saturday', hours: '8:00 AM - 6:00 PM' },
    { id: 3, day: 'Sunday', hours: 'Closed' },
];

const quickLinks: NavLink[] = [
    { id: 1, label: 'About Us', to: '/about' },
    { id: 2, label: 'Help & FAQs', to: '/contact' },
    { id: 3, label: 'Contact', to: '/contact' },
];

const serviceLinks: NavLink[] = [
    { id: 1, label: 'Electric Repair', to: '/contact' },
    { id: 2, label: 'Smart Watch Repair', to: '/contact' },
    { id: 3, label: 'Smartphone Repair', to: '/contact' },
    { id: 4, label: 'Laptop Repair', to: '/contact' },
    { id: 5, label: 'Desktop Repair', to: '/contact' },
];


interface FooterPost {
    id: number;
    image: string;
    title: string;
    date: string;
    to: string;
}

const footerPosts: FooterPost[] = [
    {
        id: 1,
        image: footerPostImg1,
        title: 'Great Tips to Choose A Professional Rpaire',
        date: 'Aug 22, 2025',
        to: '/blog/cyclic-voltammetry-guide',
    },
    {
        id: 2,
        image: footerPostImg2,
        title: 'Revitalising your people in to a retail downturn.',
        date: 'Nov 17, 2025',
        to: '/blog/cyclic-voltammetry-guide',
    },
];

const socialLinks: SocialLink[] = [
    { id: 1, icon: 'icon-facebook', href: '#' },
    { id: 2, icon: 'icon-xpa', href: '#' },
    { id: 3, icon: 'icon-link-in', href: '#' },
    { id: 4, icon: 'icon-instagram', href: '#' },
];

const bottomMenuLinks: NavLink[] = [
    { id: 1, label: 'Support', to: '/contact' },
    { id: 2, label: 'Terms and Condition', to: '/about' },
    { id: 3, label: 'Privacy and Policy', to: '/about' },
];

const FooterTwo = () => {
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
        <footer className="site-footer">
            <div className="site-footer__bg-color">
                <div className="footer-widget__shape-1">
                    <img src={footerShape1} alt="footer shape" />
                </div>
            </div>
            <div className="container">
                <div className="site-footer__top">
                    <div className="row">
                        {/* About Column */}
                        <FadeInAdvanced className="col-xl-3" variant='fadeInUp' delay={100}>
                            <div className="footer-widget__column footer-widget__about">
                                <div className="footer-widget__logo">
                                    <Link to="/"><img src={footerLogo} alt="The Wall Project Logo" /></Link>
                                </div>
                                <p className="footer-widget__about-text">
                                    Secure other greater pleasures, or else he endures pains to avoid worse pains selection
                                </p>
                                <div className="footer-widget__working-box">
                                    <h3 className="footer-widget__working-title">Working Hours:</h3>
                                    <ul className="footer-widget__working-hour list-unstyled">
                                        {workingHours.map((item) => (
                                            <li key={item.id}>
                                                <p>{item.day}<span>{item.hours}</span></p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </FadeInAdvanced>

                        {/* Right Columns */}
                        <div className="col-xl-9">
                            <div className="footer-widget__right">
                                {/* Newsletter */}
                                <div className="footer-widget__column footer-widget__newsletter">
                                    <div className="footer-widget__newsletter-bg" ></div>
                                    <h3 className="footer-widget__newsletter-title">
                                        Subscribe To Our Newsletter To<br /> Get Latest Update
                                    </h3>
                                    <form className="footer-widget__newsletter-form mc-form" onSubmit={handleSubmit}>
                                        <div className="footer-widget__newsletter-form-input-box">
                                            <input
                                                type="email"
                                                placeholder="Enter email address..."
                                                name="EMAIL"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="footer-widget__newsletter-btn thm-btn">
                                            Subscribe
                                        </button>
                                    </form>
                                </div>

                                <div className="footer-widget__right-bottom">
                                    <div className="row">
                                        {/* Quick Links */}
                                        <FadeInAdvanced className="col-xl-4 col-lg-4 col-md-4" variant='fadeInUp' delay={200}>
                                            <div className="footer-widget__column footer-widget__usefull-link">
                                                <div className="footer-widget__title-box">
                                                    <h3 className="footer-widget__title">Quick Links</h3>
                                                </div>
                                                <div className="footer-widget__link-box">
                                                    <ul className="footer-widget__link list-unstyled">
                                                        {quickLinks.map((link) => (
                                                            <li key={link.id}>
                                                                <Link to={link.to}>{link.label}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </FadeInAdvanced>

                                        {/* Services */}
                                        <FadeInAdvanced className="col-xl-4 col-lg-4 col-md-4 " variant='fadeInUp' delay={300}>
                                            <div className="footer-widget__column footer-widget__services">
                                                <div className="footer-widget__title-box">
                                                    <h3 className="footer-widget__title">Our Services</h3>
                                                </div>
                                                <ul className="footer-widget__link list-unstyled">
                                                    {serviceLinks.map((link) => (
                                                        <li key={link.id}>
                                                            <Link to={link.to}>{link.label}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </FadeInAdvanced>

                                        {/* Contact Info */}
                                        <FadeInAdvanced className="col-xl-4 col-lg-4 col-md-4" variant='fadeInUp' delay={400}>
                                            <div className="footer-widget__contact-box">
                                                <div className="footer-widget__title-box">
                                                    <h3 className="footer-widget__title">Recent Posts</h3>
                                                </div>
                                                <ul className="footer-widget__contact list-unstyled">

                                                    {footerPosts.map((post) => (
                                                        <li key={post.id}>
                                                            <div className="footer-widget__post-img">
                                                                <img src={post.image} alt="" />
                                                            </div>
                                                            <div className="footer-widget__post-content">
                                                                <h3 className="footer-widget__post-title">
                                                                    <Link to={post.to}>{post.title}</Link>
                                                                </h3>
                                                                <p className="footer-widget__post-date">
                                                                    <span className="fas fa-calendar-alt"></span> {post.date}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ))}

                                                </ul>
                                            </div>
                                        </FadeInAdvanced>
                                    </div>

                                    {/* Social Links */}
                                    <div className="site-footer__social">
                                        {socialLinks.map((social) => (
                                            <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer">
                                                <span className={social.icon}></span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="site-footer__bottom">
                <div className="container">
                    <div className="site-footer__bottom-inner">
                        <p className="site-footer__bottom-text">
                            © Copyright 2026 by <Link to="/">The Wall Project</Link>. All Rights Reserved.
                        </p>
                        <ul className="list-unstyled site-footer__bottom-menu">
                            {bottomMenuLinks.map((link) => (
                                <li key={link.id}>
                                    <Link to={link.to}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterTwo;