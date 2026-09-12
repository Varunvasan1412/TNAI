

import React, { useState } from 'react';
import Swal from 'sweetalert2';

import contactOneMap from '../../assets/images/shapes/contact-one-map.png';
import contactPopupImg1 from '../../assets/images/resources/contact-one-popup-img-1.jpg';
import contactPopupImg2 from '../../assets/images/resources/contact-one-popup-img-2.jpg';
import contactPopupImg3 from '../../assets/images/resources/contact-one-popup-img-3.jpg';
import contactPopupImg4 from '../../assets/images/resources/contact-one-popup-img-4.jpg';
import contactPopupImg5 from '../../assets/images/resources/contact-one-popup-img-5.jpg';
import TextAnimation from '../../components/elements/TextAnimation';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import CustomSelect from '../../components/elements/CustomSelect';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface MapPoint {
    id: number;
    pointClass: string;
    markerClass: string;
    image: string;
    address: string;
    street: string;
}

interface ContactItem {
    id: number;
    iconClass: string;
    label: string;
    value: string;
    href: string;
}

interface ServiceOption {
    id: number;
    label: string;
    value: string;
}

const mapPoints: MapPoint[] = [
    {
        id: 1,
        pointClass: 'contact-one__point-1',
        markerClass: 'contact-one__markar',
        image: contactPopupImg1,
        address: 'Suite 567 Springfield, IL 62701',
        street: '1234 Elm Street,',
    },
    {
        id: 2,
        pointClass: 'contact-one__point-1 contact-one__point-2',
        markerClass: 'contact-one__markar contact-one__markar-2',
        image: contactPopupImg2,
        address: 'Suite 567 Springfield, IL 62701',
        street: '1234 Elm Street,',
    },
    {
        id: 3,
        pointClass: 'contact-one__point-1 contact-one__point-3',
        markerClass: 'contact-one__markar contact-one__markar-3',
        image: contactPopupImg3,
        address: 'Suite 567 Springfield, IL 62701',
        street: '1234 Elm Street,',
    },
    {
        id: 4,
        pointClass: 'contact-one__point-1 contact-one__point-4',
        markerClass: 'contact-one__markar contact-one__markar-4',
        image: contactPopupImg4,
        address: 'Suite 567 Springfield, IL 62701',
        street: '1234 Elm Street,',
    },
    {
        id: 5,
        pointClass: 'contact-one__point-1 contact-one__point-5',
        markerClass: 'contact-one__markar contact-one__markar-5',
        image: contactPopupImg5,
        address: 'Suite 567 Springfield, IL 62701',
        street: '1234 Elm Street,',
    },
];

const contactItems: ContactItem[] = [
    {
        id: 1,
        iconClass: 'icon-call',
        label: 'Call Us Any Time:',
        value: '+088 (246) 642-27-10',
        href: 'tel:0882466422710',
    },
    {
        id: 2,
        iconClass: 'icon-envelope',
        label: 'Email Us:',
        value: 'example@mail.com',
        href: 'mailto:example@mail.com',
    },
];

const serviceOptions: ServiceOption[] = [
    { id: 1, value: "Type Of Service 01", label: 'Type Of Service 01' },
    { id: 2, value: "Type Of Service 02", label: 'Type Of Service 02' },
    { id: 3, value: "Type Of Service 03", label: 'Type Of Service 03' },
    { id: 4, value: "Type Of Service 04", label: 'Type Of Service 04' },
    { id: 5, value: "Type Of Service 05", label: 'Type Of Service 05' },
];

type ContactTwoProp = {
    sectionClass?: string;
};

const ContactTwo: React.FC<ContactTwoProp> = ({ sectionClass = "" }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        serviceType: '',
        message: '',
    });

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, serviceType: value }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in your name and email address.',
                confirmButtonColor: '#e74c3c',
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                confirmButtonColor: '#e74c3c',
            });
            return;
        }

        if (!formData.serviceType) {
            Swal.fire({
                icon: 'warning',
                title: 'Select a Service',
                text: 'Please select a service type before submitting.',
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
             *  await axios.post('/api/contact', formData);
             *       — or —
             *  await fetch('/api/contact', {
             *      method: 'POST',
             *      headers: { 'Content-Type': 'application/json' },
             *      body: JSON.stringify(formData),
             *  });
             * ─────────────────────────────────────────────
             */

            Swal.fire({
                icon: 'success',
                title: 'Submitted!',
                text: 'Thank you for reaching out. We will get back to you shortly.',
                confirmButtonColor: '#30d62d',
            });

            setFormData({
                name: '',
                email: '',
                serviceType: '',
                message: '',
            });

        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Something went wrong. Please try again later.',
                confirmButtonColor: '#e74c3c',
            });
        }
    };

    return (
        <SectionWrapper id='contact' className={`contact-one ${sectionClass}`}>
            <div className="contact-one__bg-color"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-7 col-lg-6">
                        <div className="contact-one__left">
                            <div className="contact-one__map-box">
                                <div className="contact-one__map-img">
                                    <img src={contactOneMap} alt="" />
                                </div>
                                {mapPoints.map((point) => (
                                    <div key={point.id} className={point.pointClass}>
                                        <div className={point.markerClass}>
                                            <i className="ripple"></i>
                                        </div>
                                        <div className="contact-one__popup-box">
                                            <div className="contact-one__popup">
                                                <div className="contact-one__popup-inner">
                                                    <div className="contact-one__popup-img">
                                                        <img src={point.image} alt="" />
                                                    </div>
                                                    <div className="contact-one__popup-content">
                                                        <p>
                                                            Suite 567 <br /> Springfield, IL 62701
                                                        </p>
                                                        <span>{point.street}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="contact-one__call-box">
                                <ul className="contact-one__call-list list-unstyled">
                                    {contactItems.map((item) => (
                                        <li key={item.id}>
                                            <div className="contact-one__call-icon">
                                                <span className={item.iconClass}></span>
                                            </div>
                                            <div className="contact-one__content">
                                                <p>{item.label}</p>
                                                <h4>
                                                    <a href={item.href}>{item.value}</a>
                                                </h4>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6">
                        <div className="contact-one__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <h6 className="section-title__tagline">
                                    <span className="section-title__tagline-border"></span>Contact Us
                                </h6>
                                <h3 className="section-title__title title-animation">
                                    <TextAnimation>Get Quick Appointment & Technical Support</TextAnimation>
                                </h3>
                            </div>
                            <FadeInAdvanced delay={100} variant='slideInRight'>
                                <form
                                    className="contact-form-validated contact-one__form"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="contact-one__input-box">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="contact-one__input-box">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Address"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="contact-one__input-box">
                                                <div className="select-box">
                                                    <CustomSelect
                                                        value={formData.serviceType || serviceOptions[0].value}
                                                        onChange={handleSelectChange}
                                                        optionArray={serviceOptions}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="contact-one__input-box text-message-box">
                                                <textarea
                                                    name="message"
                                                    placeholder="Message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                            <div className="contact-one__btn-box">
                                                <button type="submit" className="thm-btn">
                                                    Submit Now<span className="icon-arrow-right"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </FadeInAdvanced>
                            <div className="result"></div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default ContactTwo;