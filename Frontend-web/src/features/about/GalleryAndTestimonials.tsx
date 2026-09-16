import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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

const GalleryAndTestimonials: React.FC = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    
    const galleryImages = [
        "/demo.png", "/demo.png", "/demo.png", "/demo.png", "/demo.png"
    ];

    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setLightboxOpen(true);
    };

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
        <div className="gt-section pb-5 pt-0" style={{ background: '#ffffff' }}>
            <style>{`
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
                    .gallery-img {
                        height: 120px;
                        width: 100%; /* 1 image on mobile */
                    }
                }
            `}</style>
            <div className="container-fluid px-3 px-md-5">
                <div className="gt-wrapper">
                    <div className="gt-column">
                        <div className="gt-header">
                            <h3 className="gt-header-title">PHOTO GALLERY</h3>
                            <button onClick={() => openLightbox(0)} className="gt-view-all" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>VIEW GALLERY</button>
                        </div>
                        <div className="gallery-marquee-container">
                            <div className="gallery-marquee">
                                {galleryImages.map((src, idx) => (
                                    <img key={idx} src={src} alt={`Gallery ${idx + 1}`} className="gallery-img" style={{ cursor: 'pointer' }} onClick={() => openLightbox(idx)} />
                                ))}
                                {/* Duplicated for infinite marquee effect */}
                                {galleryImages.map((src, idx) => (
                                    <img key={`dup-${idx}`} src={src} alt={`Gallery ${idx + 1}`} className="gallery-img" style={{ cursor: 'pointer' }} onClick={() => openLightbox(idx)} />
                                ))}
                            </div>
                        </div>
                        <Lightbox
                            open={lightboxOpen}
                            close={() => setLightboxOpen(false)}
                            index={photoIndex}
                            slides={galleryImages.map(src => ({ src }))}
                        />
                    </div>

                    <div className="gt-column">
                        <div className="gt-header">
                            <h3 className="gt-header-title">MEMBER TESTIMONIALS</h3>
                        </div>
                        <div className="testimonial-content">
                            <FaQuoteLeft className="testimonial-quote-icon" />
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
                                            <FaArrowLeft />
                                        </div>
                                        <div className="testimonial-arrow" onClick={nextTestimonial}>
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryAndTestimonials;
