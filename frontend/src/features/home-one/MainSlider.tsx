import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import CountUp from 'react-countup';
import SectionWrapper from '../../components/elements/SectionWrapper';

const TESTIMONIALS = [
    {
        id: 1,
        text: "TNAI Tamil Nadu State Branch has been instrumental in my professional growth. The CNE programmes and support from the association are truly invaluable.",
        author: "Mrs. A. Priya",
        role: "Staff Nurse, Chennai"
    },
    {
        id: 2,
        text: "The dedication of TNAI towards the welfare of nurses is commendable. It provides a great platform for networking and skill enhancement.",
        author: "Mr. R. Kumar",
        role: "Nursing Superintendent, Madurai"
    },
    {
        id: 3,
        text: "Joining TNAI was the best decision of my career. The resources and guidance available here have helped me excel in my field.",
        author: "Ms. S. Lakshmi",
        role: "Clinical Instructor, Coimbatore"
    }
];

const MainSlider: React.FC = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => {
        setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const prevTestimonial = () => {
        setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    return (
        <>
            <SectionWrapper id="home" className="hero-section">
                <style>{`
                .hero-section {
                    position: relative;
                    width: 100%;
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    background-image: url('/Hero.png');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    padding-top: 130px;
                    margin-top: 110px;
                }
                .hero-content {
                    max-width: 650px;
                    padding-left: 15px;
                    margin-top: -60px;
                    padding-bottom: 60px;
                    font-family: "Open Sans", sans-serif;
                }
                .hero-subtitle {
                    color: #00227D;
                    font-weight: 600;
                    font-size: 14px;
                    margin-bottom: 15px;
                    display: flex;
                    flex-direction: column;
                }
                .hero-subtitle::after {
                    content: '';
                    display: block;
                    width: 40px;
                    height: 2px;
                    background-color: #1B41AA;
                    margin-top: 8px;
                }
                .hero-title-main {
                    color: #00227D;
                    font-size: 48px;
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 5px;
                    font-family: "Open Sans", sans-serif;
                }
                .hero-title-sub {
                    color: #0E49FC;
                    font-size: 36px;
                    font-weight: 700;
                    line-height: 1.2;
                    margin-bottom: 25px;
                    font-family: "Open Sans", sans-serif;
                }
                .hero-tagline {
                    color: #00227D;
                    font-weight: 600;
                    font-size: 16px;
                    margin-bottom: 15px;
                }
                .hero-desc {
                    color: #00227D;
                    font-size: 16px;
                    margin-bottom: 35px;
                    line-height: 1.5;
                    max-width: 90%;
                }
                .hero-btn-group {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                .hero-btn-primary {
                    background-color: #00227D;
                    color: white !important;
                    padding: 12px 24px;
                    border-radius: 6px;
                    font-weight: 600;
                    font-family: "Open Sans", sans-serif;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.35s ease;
                    border: 2px solid #00227D;
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }
                .hero-btn-primary::before,
                .hero-btn-primary::after {
                    position: absolute;
                    content: "";
                    width: 50%;
                    height: 0;
                    visibility: hidden;
                    background-color: white;
                    opacity: 0;
                    z-index: -1;
                    transition: all 0.4s ease-in-out;
                }
                .hero-btn-primary::before {
                    top: 0;
                    left: 0;
                }
                .hero-btn-primary::after {
                    bottom: 0;
                    right: 0;
                }
                .hero-btn-primary:hover::before,
                .hero-btn-primary:hover::after {
                    width: 100%;
                    height: 100%;
                    visibility: visible;
                    opacity: 1;
                }
                .hero-btn-primary:hover {
                    color: #00227D !important;
                    box-shadow: 0 4px 12px rgba(0, 34, 125, 0.3);
                }
                
                .hero-btn-secondary {
                    background-color: white;
                    color: #00227D !important;
                    padding: 12px 24px;
                    border-radius: 6px;
                    font-weight: 600;
                    font-family: "Open Sans", sans-serif;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.35s ease;
                    border: 2px solid #00227D;
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }
                .hero-btn-secondary::before,
                .hero-btn-secondary::after {
                    position: absolute;
                    content: "";
                    width: 50%;
                    height: 0;
                    visibility: hidden;
                    background-color: #00227D;
                    opacity: 0;
                    z-index: -1;
                    transition: all 0.4s ease-in-out;
                }
                .hero-btn-secondary::before {
                    top: 0;
                    left: 0;
                }
                .hero-btn-secondary::after {
                    bottom: 0;
                    right: 0;
                }
                .hero-btn-secondary:hover::before,
                .hero-btn-secondary:hover::after {
                    width: 100%;
                    height: 100%;
                    visibility: visible;
                    opacity: 1;
                }
                .hero-btn-secondary:hover {
                    color: white !important;
                    box-shadow: 0 4px 12px rgba(0, 34, 125, 0.3);
                }
                @media (max-width: 991px) {
                            .hero-section {
                        min-height: auto;
                        padding: 40px 0 60px 0;
                        margin-top: 80px;
                        background-position: center;
                    }
                    .hero-content {
                        background: rgba(255, 255, 255, 0.95);
                        padding: 25px;
                        border-radius: 12px;
                        margin: 0 0 20px 0;
                    }
                    .hero-title-main {
                        font-size: 28px;
                    }
                    .hero-title-sub {
                        font-size: 30px;
                    }
                }
                
                /* Quick Links Bar Styles */
                .quick-links-section {
                    position: relative;
                    z-index: 10;
                    margin-top: -50px; 
                }
                .quick-links-wrapper {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 30px 20px;
                    width: 100%;
                    flex-wrap: nowrap;
                }
                .ql-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    text-decoration: none;
                    color: #060EB7;
                    position: relative;
                    flex: 1;
                    padding: 10px;
                    transition: transform 0.3s ease;
                }
                .ql-item:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 50px;
                    width: 1px;
                    background-color: #777777;
                }
                .ql-item:hover {
                    transform: translateY(-5px);
                    color: #060EB7;
                }
                .ql-item i {
                    font-size: 32px;
                    margin-bottom: 12px;
                    color: #060EB7;
                }
                .ql-item span {
                    font-size: 13px;
                    font-weight: 700;
                    line-height: 1.3;
                    font-family: "Outfit", sans-serif;
                }
                .new-badge {
                    position: absolute;
                    top: 0px;
                    right: 15px;
                    background-color: #060EB7;
                    color: white;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 2px 6px;
                    border-radius: 12px;
                }
                @media (max-width: 991px) {
                    .quick-links-section {
                        margin-top: -30px;
                        padding: 0 15px;
                    }
                    .quick-links-wrapper {
                        flex-wrap: wrap;
                        padding: 20px;
                        justify-content: center;
                        gap: 15px;
                    }
                    .ql-item {
                        flex: 0 0 30%;
                    }
                    .ql-item::after {
                        display: none;
                    }
                    .new-badge {
                        right: 10px;
                    }
                }
                @media (max-width: 767px) {
                    .ql-item {
                        flex: 0 0 45%;
                    }
                }
                /* President Section Styles */
                .president-section {
                    padding: 130px 0 80px;
                    background-color: #ffffff;
                    font-family: "Open Sans", sans-serif;
                }
                .president-wrapper {
                    display: flex;
                    gap: 40px;
                    align-items: stretch;
                }
                .president-image {
                    flex: 0 0 28%;
                }
                .president-image img {
                    width: 100%;
                    border-radius: 12px;
                    object-fit: cover;
                    height: 100%;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                .president-content {
                    flex: 1;
                    padding: 10px 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .president-title {
                    color: #00227D;
                    font-size: 22px;
                    font-weight: 600;
                    margin-bottom: 25px;
                    position: relative;
                    padding-bottom: 15px;
                    text-transform: uppercase;
                    font-family: "Open Sans", sans-serif;
                }
                .president-title::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 50px;
                    height: 3px;
                    background-color: #00227D;
                }
                .president-content p {
                    color: #00227D;
                    font-size: 15px;
                    line-height: 1.7;
                    margin-bottom: 20px;
                    font-weight: 400;
                }
                .president-btn {
                    align-self: flex-start;
                }
                .president-signature {
                    height: 45px;
                    margin-bottom: 15px;
                    object-fit: contain;
                    align-self: flex-start;
                }
                .president-name {
                    color: #0E49FC;
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 4px;
                }
                .president-designation, .president-branch {
                    color: #00227D;
                    font-size: 14px;
                    margin-bottom: 2px;
                    font-weight: 600;
                }
                .president-about {
                    flex: 0 0 33%;
                    background-color: #F0F4FF;
                    border-radius: 12px;
                    padding: 35px 30px;
                    display: flex;
                    flex-direction: column;
                }
                .about-title {
                    color: #00227D;
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 30px;
                    font-family: "Open Sans", sans-serif;
                }
                .about-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 40px 0;
                }
                .about-list li {
                    color: #00227D;
                    font-size: 14px;
                    font-weight: 500;
                    margin-bottom: 18px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .about-list li i {
                    color: #0E49FC;
                    font-size: 18px;
                }
                .about-footer {
                    margin-top: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                .about-star {
                    height: 80px;
                    margin-bottom: 15px;
                }
                .about-motto {
                    color: #0E49FC;
                    font-size: 15px;
                    font-weight: 800;
                    letter-spacing: 1px;
                }
                
                @media (max-width: 1199px) {
                    .president-wrapper {
                        gap: 20px;
                    }
                    .president-image {
                        flex: 0 0 30%;
                    }
                    .president-about {
                        flex: 0 0 35%;
                        padding: 25px 20px;
                    }
                }
                
                @media (max-width: 991px) {
                    .president-wrapper {
                        flex-direction: column;
                        align-items: center;
                    }
                    .president-image {
                        max-width: 350px;
                        margin: 0 auto;
                    }
                    .president-content {
                        text-align: center;
                        align-items: center;
                        margin: 20px 0;
                    }
                    .president-title::after {
                        left: 50%;
                        transform: translateX(-50%);
                    }
                    .president-signature {
                        align-self: center;
                    }
                    .president-btn {
                        align-self: center;
                    }
                    .president-about {
                        width: 100%;
                        max-width: 600px;
                    }
                }

                /* Events & News Section Styles */
                .en-section {
                    padding: 80px 0;
                    background-color: #fcfcfc;
                    font-family: "Open Sans", sans-serif;
                }
                .en-wrapper {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    background: #ffffff;
                    border: 1px solid #eef1f6;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                    padding: 30px 0;
                }
                @media (max-width: 991px) {
                    .en-wrapper {
                        grid-template-columns: 1fr;
                        padding: 25px 0;
                    }
                }
                .en-column {
                    display: flex;
                    flex-direction: column;
                    padding: 0 40px;
                }
                .en-column:first-child {
                    border-right: 1px solid #eef1f6;
                }
                @media (max-width: 991px) {
                    .en-column {
                        padding: 0 20px;
                    }
                    .en-column:first-child {
                        border-right: none;
                        border-bottom: 1px solid #eef1f6;
                        padding-bottom: 40px;
                        margin-bottom: 40px;
                    }
                }
                .en-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                    border-bottom: 2px solid #eef1f6;
                    padding-bottom: 15px;
                }
                .en-header-title {
                    color: #00227D;
                    font-size: 22px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin: 0;
                    text-transform: uppercase;
                    font-family: "Open Sans", sans-serif;
                }
                .en-header-title i {
                    font-size: 24px;
                }
                .en-view-all {
                    color: #00227D;
                    font-size: 15px;
                    font-weight: 600;
                    text-decoration: none;
                    text-transform: uppercase;
                    transition: color 0.3s ease;
                }
                .en-view-all:hover {
                    color: #0E49FC;
                    text-decoration: none;
                }
                /* Event Cards */
                .en-events-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                }
                @media (max-width: 1399px) {
                    .en-events-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 20px;
                    }
                }
                @media (max-width: 575px) {
                    .en-events-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .event-card {
                    background: #ffffff;
                    border: 1px solid #00227D;
                    border-radius: 12px;
                    padding: 35px 20px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                    transition: transform 0.3s ease;
                }
                .event-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
                }
                .event-date-box {
                    background-color: #00227D;
                    color: white;
                    border-radius: 8px;
                    padding: 10px;
                    width: 75px;
                    height: 75px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    line-height: 1.1;
                    margin-bottom: 25px;
                }
                .event-date-box .day {
                    font-size: 24px;
                    font-weight: 800;
                }
                .event-date-box .month-year {
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-top: 2px;
                }
                .event-title {
                    color: #00227D;
                    font-size: 15px;
                    font-weight: 400;
                    margin-bottom: 25px;
                    line-height: 1.7;
                    flex-grow: 1;
                }
                .event-location {
                    color: #0E49FC;
                    font-size: 13px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-top: auto;
                }
                
                /* News List */
                .news-list-wrapper {
                    background: #ffffff;
                    border: 1px solid #eef1f6;
                    border-radius: 12px;
                    padding: 0 25px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                }
                .news-item {
                    display: flex;
                    align-items: center;
                    padding: 18px 0;
                    border-bottom: 1px solid #eef1f6;
                    text-decoration: none;
                    transition: background-color 0.2s ease;
                }
                .news-item:last-child {
                    border-bottom: none;
                }
                .news-item:hover .news-title {
                    color: #0E49FC;
                }
                .news-icon {
                    color: #00227D;
                    font-size: 20px;
                    margin-right: 15px;
                    flex-shrink: 0;
                }
                .news-title {
                    color: #00227D;
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 1.7;
                    flex-grow: 1;
                    padding-right: 20px;
                    transition: color 0.3s ease;
                }
                .news-date {
                    color: #0E49FC;
                    font-size: 13px;
                    font-weight: 600;
                    flex-shrink: 0;
                    text-align: right;
                }
                @media (max-width: 575px) {
                    .en-header-title {
                        align-items: flex-start;
                    }
                    .en-header-title i {
                        margin-top: 2px;
                    }
                    .news-item {
                        display: grid;
                        grid-template-columns: 25px 1fr;
                        grid-template-areas: 
                            "icon title"
                            "icon date";
                        align-items: start;
                        gap: 4px 10px;
                        padding: 15px 0;
                    }
                    .news-icon {
                        grid-area: icon;
                        margin-right: 0;
                    }
                    .news-title {
                        grid-area: title;
                        padding-right: 0;
                    }
                    .news-date {
                        grid-area: date;
                        text-align: left;
                        padding-left: 0;
                    }
                }

                /* Statistics Banner */
                .stats-banner-container {
                    padding: 10px 0;
                    background-color: #fcfcfc;
                    font-family: "Open Sans", sans-serif;
                }
                .stats-banner {
                    background: #00227D;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 40px;
                    color: white;
                    position: relative;
                    min-height: 140px;
                }
                .stats-feather {
                    height: 80px;
                    width: auto;
                    object-fit: contain;
                }
                .stats-content {
                    display: flex;
                    flex-grow: 1;
                    justify-content: space-evenly;
                    align-items: center;
                }
                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .stat-icon {
                    font-size: 32px;
                }
                .stat-text {
                    display: flex;
                    flex-direction: column;
                }
                .stat-number {
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 1.1;
                }
                .stat-label {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    margin-top: 4px;
                }
                .stat-divider {
                    width: 1px;
                    height: 50px;
                    background-color: rgba(255, 255, 255, 0.2);
                }
                @media (max-width: 991px) {
                    .stats-banner {
                        flex-direction: column;
                        padding: 30px 20px;
                        gap: 20px;
                    }
                    .stats-content {
                        flex-direction: column;
                        gap: 20px;
                        width: 100%;
                    }
                    .stat-divider {
                        width: 100%;
                        height: 1px;
                        max-width: 200px;
                    }
                    .stats-feather {
                        display: none;
                    }
                }

                /* Gallery & Testimonial Section */
                .gt-section {
                    padding: 80px 0;
                    background-color: #fcfcfc;
                    font-family: "Open Sans", sans-serif;
                }
                .gt-wrapper {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    background: #ffffff;
                    border: 1px solid #eef1f6;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                    padding: 30px 0;
                }
                .gt-column {
                    display: flex;
                    flex-direction: column;
                    padding: 0 40px;
                }
                .gt-column:first-child {
                    border-right: 1px solid #eef1f6;
                }
                .gt-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                }
                .gt-header-title {
                    color: #00227D;
                    font-size: 22px;
                    font-weight: 600;
                    margin: 0;
                    text-transform: uppercase;
                    font-family: "Open Sans", sans-serif;
                }
                .gt-view-all {
                    color: #00227D;
                    font-size: 15px;
                    font-weight: 600;
                    text-decoration: none;
                    text-transform: uppercase;
                }
                .gt-view-all:hover {
                    color: #0E49FC;
                }
                .gallery-marquee-container {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    position: relative;
                }
                .gallery-marquee {
                    display: inline-flex;
                    gap: 15px;
                    animation: marquee 15s linear infinite;
                }
                .gallery-marquee:hover {
                    animation-play-state: paused;
                }
                .gallery-img {
                    width: calc((100% / 4) - 11.25px); /* To show exactly 4 images */
                    flex-shrink: 0;
                    height: 130px;
                    object-fit: contain;
                    background-color: #ffffff;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid #eef1f6;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 7.5px)); }
                }
                .testimonial-content {
                    display: flex;
                    gap: 20px;
                    align-items: flex-start;
                }
                .testimonial-quote-icon {
                    color: #00227D;
                    font-size: 40px;
                    line-height: 1;
                }
                .testimonial-text-box {
                    display: flex;
                    flex-direction: column;
                }
                .testimonial-text {
                    color: #00227D;
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 1.7;
                    margin-bottom: 20px;
                }
                .testimonial-author {
                    color: #0E49FC;
                    font-size: 15px;
                    font-weight: 700;
                    margin-bottom: 2px;
                }
                .testimonial-role {
                    color: #0E49FC;
                    font-size: 13px;
                    font-weight: 500;
                }
                .testimonial-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 15px;
                }
                .testimonial-dots {
                    display: flex;
                    gap: 6px;
                }
                .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #bbccff;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .dot.active {
                    background-color: #00227D;
                }
                .testimonial-arrows {
                    display: flex;
                    gap: 10px;
                }
                .testimonial-arrow {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: transparent;
                    border: 1px solid #00227D;
                    color: #00227D;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .testimonial-arrow:hover {
                    background: #00227D;
                    color: white;
                }
                .testimonial-fade {
                    animation: fadeIn 0.4s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 991px) {
                    .gt-wrapper {
                        grid-template-columns: 1fr;
                        padding: 25px 0;
                    }
                    .gt-column {
                        padding: 0 20px;
                    }
                    .gt-column:first-child {
                        border-right: none;
                        border-bottom: 1px solid #eef1f6;
                        padding-bottom: 40px;
                        margin-bottom: 40px;
                    }
                    .gallery-img {
                        width: calc((100% / 2) - 7.5px); /* 2 images on tablet */
                    }
                }
                @media (max-width: 575px) {
                    .gallery-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .gallery-img {
                        height: 120px;
                        width: 100%; /* 1 image on mobile */
                    }
                }
                
                /* CTA Section */
                .cta-section {
                    padding: 0 0 80px;
                    background-color: #fcfcfc;
                    font-family: "Open Sans", sans-serif;
                }
                .cta-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #F3F6FF;
                    border-radius: 12px;
                    padding: 40px 60px;
                }
                .cta-left {
                    display: flex;
                    align-items: center;
                    gap: 25px;
                }
                .cta-icon-box {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    border: 1px solid #00227D;
                    background: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 30px;
                    color: #00227D;
                    flex-shrink: 0;
                }
                .cta-content {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .cta-title {
                    color: #00227D;
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0;
                    text-transform: uppercase;
                }
                .cta-subtitle {
                    color: #00227D;
                    font-size: 14px;
                    font-weight: 500;
                    margin: 0;
                    line-height: 1.5;
                }
                @media (max-width: 991px) {
                    .cta-wrapper {
                        flex-direction: column;
                        text-align: center;
                        gap: 25px;
                    }
                    .cta-left {
                        flex-direction: column;
                    }
                }
            `}</style>
                <div className="container-fluid px-3 px-md-5">
                    <div className="hero-content">
                        <div className="hero-subtitle">
                            Proudly Serving the Nursing Profession Since 1950
                        </div>
                        <h1 className="hero-title-main">
                            THE TRAINED NURSES'<br />ASSOCIATION OF INDIA
                        </h1>
                        <h2 className="hero-title-sub">
                            TAMIL NADU STATE BRANCH
                        </h2>
                        <div className="hero-tagline">
                            Together We Care &bull; Together We Serve &bull; Together We Grow
                        </div>
                        <p className="hero-desc">
                            Together we care, connect with one another and lead the future of nursing.
                        </p>
                        <div className="hero-btn-group">
                            <Link to="/membership" className="hero-btn-primary">
                                <i className="fa fa-user-plus"></i> BECOME A MEMBER
                            </Link>
                            <Link to="/circulars" className="hero-btn-secondary">
                                <i className="far fa-file-alt"></i> LATEST CIRCULARS
                            </Link>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            <div className="quick-links-section">
                <div className="container-fluid px-3 px-md-5">
                    <div className="quick-links-wrapper">
                        <Link to="/our-executive-members" className="ql-item">
                            <i className="fa fa-users"></i>
                            <span>OUR EXECUTIVE<br />MEMBERS</span>
                        </Link>
                        <Link to="/events-calendar" className="ql-item">
                            <i className="far fa-calendar-alt"></i>
                            <span>EVENTS<br />CALENDAR</span>
                        </Link>
                        <Link to="/membership" className="ql-item">
                            <i className="fa fa-user-plus"></i>
                            <span>MEMBERSHIP<br />REGISTRATION</span>
                        </Link>
                        <Link to="/downloads" className="ql-item">
                            <i className="fa fa-arrow-circle-down"></i>
                            <span>DOWNLOADS</span>
                        </Link>
                        <Link to="/photo-gallery" className="ql-item">
                            <i className="far fa-images"></i>
                            <span>PHOTO<br />GALLERY</span>
                        </Link>
                        <Link to="/voice-your-concern" className="ql-item">
                            <i className="fa fa-bullhorn"></i>
                            <span>VOICE YOUR<br />CONCERN</span>
                        </Link>
                        <Link to="/newsletters" className="ql-item">
                            <div className="new-badge">NEW</div>
                            <i className="far fa-envelope"></i>
                            <span>NEWSLETTERS</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="president-section">
                <div className="container-fluid px-3 px-md-5">
                    <div className="president-wrapper">
                        <div className="president-image">
                            <img src="/Hero/ceo.png" alt="President" />
                        </div>
                        <div className="president-content">
                            <h3 className="president-title">WELCOME MESSAGE FROM THE PRESIDENT</h3>
                            <p>It is a privilege and an honor to lead such a dynamic organization that has been at the forefront of nursing excellence and empowerment for decades.</p>
                            <p>Together, let us continue to uphold the values of our noble profession and work towards a healthier and stronger society.</p>
                            <img src="/Hero/Signature.webp" alt="Signature" className="president-signature" />
                            <h4 className="president-name">Dr. (Mrs.) B. Lakshmi</h4>
                            <div className="president-designation">President</div>
                            <div className="president-branch">TNAI Tamil Nadu State Branch</div>
                            <Link to="/message" className="hero-btn-primary president-btn" style={{ width: 'fit-content', marginTop: '25px' }}>READ MORE <i className="fas fa-arrow-right"></i></Link>
                        </div>
                        <div className="president-about">
                            <h3 className="about-title">ABOUT TNAI TAMIL NADU</h3>
                            <ul className="about-list">
                                <li><i className="fas fa-check-circle"></i> 75+ Years of Dedicated Service</li>
                                <li><i className="fas fa-check-circle"></i> Professional Development & Empowerment</li>
                                <li><i className="fas fa-check-circle"></i> Advocacy for Nurses' Rights & Welfare</li>
                                <li><i className="fas fa-check-circle"></i> Continuing Nursing Education</li>
                                <li><i className="fas fa-check-circle"></i> Networking, Collaboration & Unity</li>
                            </ul>
                            <div className="about-footer">
                                <img src="/Hero/star.webp" alt="Star" className="about-star" />
                                <div className="about-motto">UNITY &bull; SERVICE &bull; EXCELLENCE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="en-section">
                <div className="container-fluid px-3 px-md-5">
                    <div className="en-wrapper">

                        {/* Left Column: Upcoming Events */}
                        <div className="en-column">
                            <div className="en-header">
                                <h3 className="en-header-title">
                                    <i className="far fa-calendar-alt"></i> UPCOMING EVENTS
                                </h3>
                                <Link to="/events" className="en-view-all">VIEW ALL</Link>
                            </div>
                            <div className="en-events-grid">
                                <div className="event-card">
                                    <div className="event-date-box">
                                        <div className="day">25</div>
                                        <div className="month-year">MAY<br />2026</div>
                                    </div>
                                    <div className="event-title">State Executive Committee Meeting</div>
                                    <div className="event-location"><i className="fas fa-map-marker-alt"></i> Chennai</div>
                                </div>
                                <div className="event-card">
                                    <div className="event-date-box">
                                        <div className="day">08</div>
                                        <div className="month-year">JUN<br />2026</div>
                                    </div>
                                    <div className="event-title">CNE Programme on Critical Care Nursing</div>
                                    <div className="event-location"><i className="fas fa-map-marker-alt"></i> Coimbatore</div>
                                </div>
                                <div className="event-card">
                                    <div className="event-date-box">
                                        <div className="day">12</div>
                                        <div className="month-year">JUL<br />2026</div>
                                    </div>
                                    <div className="event-title">International Nurses Day Celebrations</div>
                                    <div className="event-location"><i className="fas fa-map-marker-alt"></i> Madurai</div>
                                </div>
                                <div className="event-card">
                                    <div className="event-date-box">
                                        <div className="day">20</div>
                                        <div className="month-year">AUG<br />2026</div>
                                    </div>
                                    <div className="event-title">Workshop on Nursing Leadership</div>
                                    <div className="event-location"><i className="fas fa-map-marker-alt"></i> Tiruchirappalli</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Latest News & Circulars */}
                        <div className="en-column">
                            <div className="en-header">
                                <h3 className="en-header-title">
                                    <i className="far fa-file-alt"></i> LATEST NEWS & CIRCULARS
                                </h3>
                                <Link to="/news" className="en-view-all">VIEW ALL</Link>
                            </div>
                            <div className="news-list-wrapper">
                                <Link to="/news/1" className="news-item">
                                    <div className="news-icon"><i className="far fa-file-alt"></i></div>
                                    <div className="news-title">TNAI TNSB Election Result 2026</div>
                                    <div className="news-date">07 May 2026</div>
                                </Link>
                                <Link to="/news/2" className="news-item">
                                    <div className="news-icon"><i className="far fa-file-alt"></i></div>
                                    <div className="news-title">Executive Committee Meeting Circular</div>
                                    <div className="news-date">30 Apr 2026</div>
                                </Link>
                                <Link to="/news/3" className="news-item">
                                    <div className="news-icon"><i className="far fa-file-alt"></i></div>
                                    <div className="news-title">CNE Programme Schedule 2026</div>
                                    <div className="news-date">25 Apr 2026</div>
                                </Link>
                                <Link to="/news/4" className="news-item">
                                    <div className="news-icon"><i className="far fa-file-alt"></i></div>
                                    <div className="news-title">Government Order - Nursing Officers</div>
                                    <div className="news-date">15 Apr 2026</div>
                                </Link>
                                <Link to="/news/5" className="news-item">
                                    <div className="news-icon"><i className="far fa-file-alt"></i></div>
                                    <div className="news-title">Annual General Body Meeting Notice</div>
                                    <div className="news-date">05 Apr 2026</div>
                                </Link>
                                <Link to="/news/6" className="news-item">
                                    <div className="news-icon"><i className="far fa-file-alt"></i></div>
                                    <div className="news-title">Call for Applications: Florence Nightingale Award</div>
                                    <div className="news-date">20 Mar 2026</div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="stats-banner-container">
                <div className="container-fluid px-3 px-md-5">
                    <div className="stats-banner">
                        <img src="/Hero/Feather_left.webp" alt="left feather" className="stats-feather" />

                        <div className="stats-content">
                            <div className="stat-item">
                                <i className="fas fa-university stat-icon"></i>
                                <div className="stat-text">
                                    <span className="stat-number">
                                        <CountUp end={38} enableScrollSpy scrollSpyOnce />+
                                    </span>
                                    <span className="stat-label">BRANCHES</span>
                                </div>
                            </div>

                            <div className="stat-divider"></div>

                            <div className="stat-item">
                                <i className="fas fa-users stat-icon"></i>
                                <div className="stat-text">
                                    <span className="stat-number">
                                        <CountUp end={87000} enableScrollSpy scrollSpyOnce separator="," />+
                                    </span>
                                    <span className="stat-label">TNAI MEMBERS</span>
                                </div>
                            </div>

                            <div className="stat-divider"></div>

                            <div className="stat-item">
                                <i className="fas fa-users stat-icon"></i>
                                <div className="stat-text">
                                    <span className="stat-number">
                                        <CountUp end={342} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className="stat-label">SNA UNITS</span>
                                </div>
                            </div>

                            <div className="stat-divider"></div>

                            <div className="stat-item">
                                <i className="fas fa-user stat-icon"></i>
                                <div className="stat-text">
                                    <span className="stat-number">
                                        <CountUp end={66730} enableScrollSpy scrollSpyOnce separator="," />+
                                    </span>
                                    <span className="stat-label">SNAI MEMBERS</span>
                                </div>
                            </div>
                        </div>

                        <img src="/Hero/Feather_right.webp" alt="right feather" className="stats-feather" />
                    </div>
                </div>
            </div>

            <div className="gt-section">
                <div className="container-fluid px-3 px-md-5">
                    <div className="gt-wrapper">
                        <div className="gt-column">
                            <div className="gt-header">
                                <h3 className="gt-header-title">PHOTO GALLERY</h3>
                                <Link to="/gallery" className="gt-view-all">VIEW GALLERY</Link>
                            </div>
                            <div className="gallery-marquee-container">
                                <div className="gallery-marquee">
                                    <img src="/demo.png" alt="Gallery 1" className="gallery-img" />
                                    <img src="/demo.png" alt="Gallery 2" className="gallery-img" />
                                    <img src="/demo.png" alt="Gallery 3" className="gallery-img" />
                                    <img src="/demo.png" alt="Gallery 4" className="gallery-img" />
                                    <img src="/demo.png" alt="Gallery 5" className="gallery-img" />
                                    {/* Duplicated for infinite marquee effect */}
                                    <img src="/demo.png" alt="Gallery 1" className="gallery-img" />
                                    <img src="/demo.png" alt="Gallery 2" className="gallery-img" />
                                    <img src="/demo.png" alt="Gallery 3" className="gallery-img" />
                                    <img src="/demo.png" alt="Gallery 4" className="gallery-img" />
                                    <img src="/demo.png" alt="Gallery 5" className="gallery-img" />
                                </div>
                            </div>
                        </div>

                        <div className="gt-column">
                            <div className="gt-header">
                                <h3 className="gt-header-title">MEMBER TESTIMONIALS</h3>
                            </div>
                            <div className="testimonial-content">
                                <i className="fas fa-quote-left testimonial-quote-icon"></i>
                                <div className="testimonial-text-box testimonial-fade" key={activeTestimonial}>
                                    <div className="testimonial-text">
                                        {TESTIMONIALS[activeTestimonial].text}
                                    </div>
                                    <div className="testimonial-author">{TESTIMONIALS[activeTestimonial].author}</div>
                                    <div className="testimonial-role">{TESTIMONIALS[activeTestimonial].role}</div>
                                    <div className="testimonial-footer">
                                        <div className="testimonial-dots">
                                            {TESTIMONIALS.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`dot ${idx === activeTestimonial ? 'active' : ''}`}
                                                    onClick={() => setActiveTestimonial(idx)}
                                                ></div>
                                            ))}
                                        </div>
                                        <div className="testimonial-arrows">
                                            <div className="testimonial-arrow" onClick={prevTestimonial}>
                                                <i className="fas fa-arrow-left"></i>
                                            </div>
                                            <div className="testimonial-arrow" onClick={nextTestimonial}>
                                                <i className="fas fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
                <div className="container-fluid px-3 px-md-5">
                    <div className="cta-wrapper">
                        <div className="cta-left">
                            <div className="cta-icon-box">
                                <i className="fas fa-bullhorn"></i>
                            </div>
                            <div className="cta-content">
                                <h3 className="cta-title">VOICE YOUR CONCERN</h3>
                                <p className="cta-subtitle">
                                    Your feedback helps us serve you better.<br />
                                    Share your concerns or suggestions and we will address them promptly.
                                </p>
                            </div>
                        </div>
                        <Link to="/contact" className="hero-btn-primary">
                            SHARE NOW <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainSlider;