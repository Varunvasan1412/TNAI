import React, { useState } from 'react';
import Swal from 'sweetalert2';
import FooterOne from '../../components/footers/FooterOne';
import PageBanner from '../../components/elements/PageBanner';
import '../../assets/css/module-css/contact-page.css';
import {
    FaBullhorn, FaShieldAlt, FaUsers, FaHandshake, FaBookOpen,
    FaCommentDots, FaHeartbeat, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
    FaClock, FaPaperPlane, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn,
    FaCalendarAlt, FaGraduationCap, FaQuestionCircle, FaChevronRight
} from 'react-icons/fa';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface FormState {
    name: string; email: string; phone: string;
    subject: string; message: string;
    agreePrivacy: boolean;
}

const Contact: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        name: '', email: '', phone: '', subject: '', message: '', agreePrivacy: false,
    });
    const [loading, setLoading] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        { q: "How can I become a TNAI member?", a: "You can apply for membership online through our portal or by downloading the application form and submitting it to our office with the required documents." },
        { q: "What are the benefits of TNAI membership?", a: "Members enjoy access to exclusive events, professional development resources, networking opportunities, and our monthly publications." },
        { q: "How can I join SNAI?", a: "Nursing students can join SNAI through their respective nursing colleges or institutions. Contact your college SNAI advisor for details." },
        { q: "How can I participate in events?", a: "Check our Events page regularly. Members get priority registration and discounted fees for all TNAI workshops and conferences." },
        { q: "Whom do I contact for certificates or documents?", a: "Please email our administrative desk at tnatsnb@gmail.com with your membership details for document requests." }
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
            Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'Please fill in all required fields.', confirmButtonColor: '#EF4444' });
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            Swal.fire({ icon: 'warning', title: 'Invalid Email', text: 'Please enter a valid email address.', confirmButtonColor: '#EF4444' });
            return;
        }
        if (!form.agreePrivacy) {
            Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to the privacy policy before submitting.', confirmButtonColor: '#EF4444' });
            return;
        }

        setLoading(true);
        try {
            // Mock submission for now
            await new Promise(resolve => setTimeout(resolve, 1500));
            Swal.fire({ icon: 'success', title: 'Message Sent!', text: 'Thank you for reaching out. We will get back to you shortly.', confirmButtonColor: '#0E49FC' });
            setForm({ name: '', email: '', phone: '', subject: '', message: '', agreePrivacy: false });
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Network Error', text: 'Unable to connect to the server. Please try again later.', confirmButtonColor: '#EF4444' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page-wrapper">
            {/* 1. HERO SECTION */}
            <PageBanner
                bgImage="/Contact.png"
                isContentBoxed={true}
                minHeight="80vh"
                titleMain="CONTACT US"
            >
                <h2 style={{ color: '#0E49FC', fontSize: '32px', fontWeight: 700, margin: 0, fontFamily: '"Open Sans", sans-serif' }}>
                    We are here for you.
                </h2>
                <div style={{ width: '40px', height: '2px', backgroundColor: '#0E49FC', margin: '15px 0 25px 0' }}></div>

                <p style={{ color: '#00227D', fontSize: '16px', lineHeight: '1.6', maxWidth: '90%', marginBottom: '30px', fontWeight: 600 }}>
                    Reach out to us for membership support, event inquiries, collaboration opportunities or any other information. We look forward to connecting with you.
                </p>
                <div style={{ width: '50px', height: '3px', backgroundColor: '#00227D', marginBottom: '40px' }}></div>

                <div className="contact-hero-features">
                    <div className="contact-hero-feature">
                        <FaHandshake />
                        <div>
                            <h4>Support</h4>
                            <p>We are here<br />to help</p>
                        </div>
                    </div>
                    <div className="contact-hero-feature">
                        <FaUsers />
                        <div>
                            <h4>Collaborate</h4>
                            <p>Together we<br />achieve more</p>
                        </div>
                    </div>
                    <div className="contact-hero-feature">
                        <FaBookOpen />
                        <div>
                            <h4>Grow Together</h4>
                            <p>Building a stronger<br />nursing community</p>
                        </div>
                    </div>
                </div>
            </PageBanner>

            {/* 2. VOICE YOUR CONCERN BANNER */}
            <section className="voice-banner">
                <div className="voice-banner-icon-bg">
                    <FaBullhorn />
                </div>
                <div className="voice-banner-content">
                    <h3 className="voice-banner-title">VOICE YOUR CONCERN</h3>
                    <p className="voice-banner-desc">
                        Your feedback helps us serve you better. Share your concerns or suggestions and we will address them promptly.
                    </p>
                </div>
                <div className="voice-banner-features">
                    <div className="voice-banner-feature">
                        <FaShieldAlt className="voice-banner-feature-icon" />
                        <div className="voice-banner-feature-title">Safe & Secure</div>
                        <div className="voice-banner-feature-desc">Your information is<br />kept confidential</div>
                    </div>
                    <div className="voice-banner-feature">
                        <FaCommentDots className="voice-banner-feature-icon" />
                        <div className="voice-banner-feature-title">We Listen</div>
                        <div className="voice-banner-feature-desc">We value your feedback<br />and act on it</div>
                    </div>
                    <div className="voice-banner-feature">
                        <FaHeartbeat className="voice-banner-feature-icon" />
                        <div className="voice-banner-feature-title">Better Together</div>
                        <div className="voice-banner-feature-desc">Your voice helps us<br />improve continuously</div>
                    </div>
                </div>
                <a href="#" className="voice-banner-btn">
                    Share Your Concern <FaChevronRight style={{ fontSize: '12px' }} />
                </a>
            </section>

            {/* 3. INFO CARDS GRID */}
            <section className="info-cards-grid">
                <div className="info-card">
                    <div className="info-card-icon"><FaPhoneAlt /></div>
                    <div className="info-card-content">
                        <div className="info-card-title">Phone</div>
                        <div className="info-card-text" style={{ lineHeight: '1.8' }}>
                            044 - 2381 6786<br />
                            +91 98402 12345
                        </div>
                        <div className="info-card-text" style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>Mon - Fri, 9:00 AM - 5:00 PM</div>
                    </div>
                </div>
                <div className="info-card">
                    <div className="info-card-icon"><FaEnvelope /></div>
                    <div className="info-card-content">
                        <div className="info-card-title">Email</div>
                        <div className="info-card-text" style={{ color: '#0E49FC', fontWeight: 600 }}>tnatsnb@gmail.com</div>
                        <div className="info-card-text" style={{ marginTop: '10px' }}>We will get back to you as soon as possible.</div>
                    </div>
                </div>
                <div className="info-card">
                    <div className="info-card-icon"><FaMapMarkerAlt /></div>
                    <div className="info-card-content">
                        <div className="info-card-title">Office Address</div>
                        <div className="info-card-text" style={{ lineHeight: '1.6' }}>
                            No. 4/25 & 4/75, 24th Street,<br />
                            Ashtalakshmi Nagar,<br />
                            Alapakkam, Chennai - 600116,<br />
                            Tamil Nadu, India.
                        </div>
                    </div>
                </div>
                <div className="info-card">
                    <div className="info-card-icon"><FaClock /></div>
                    <div className="info-card-content">
                        <div className="info-card-title">Office Hours</div>
                        <div className="info-card-text" style={{ lineHeight: '1.8' }}>
                            Monday - Friday<br />
                            <span style={{ color: '#0E49FC', fontWeight: 600 }}>9:00 AM - 5:00 PM</span>
                        </div>
                        <div className="info-card-text" style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>(Saturday, Sunday & Public Holidays - Closed)</div>
                    </div>
                </div>
            </section>

            {/* 4. FORM AND MAP GRID */}
            <section className="form-map-grid">
                <div className="form-section">
                    <div className="section-header">
                        <div className="section-header-icon"><FaEnvelope /></div>
                        <div>
                            <h3 className="section-header-title">Send Us a Message</h3>
                            <p className="section-header-subtitle">Fill in the details below and we will get back to you.</p>
                        </div>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input type="text" name="name" className="form-input" placeholder="Your Name" value={form.name} onChange={handleChange} />
                            <input type="email" name="email" className="form-input" placeholder="Email Address *" value={form.email} onChange={handleChange} required />
                        </div>
                        <input type="tel" name="phone" className="form-input" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
                        <input type="text" name="subject" className="form-input" placeholder="Subject *" value={form.subject} onChange={handleChange} required />
                        <textarea name="message" className="form-textarea" placeholder="Your Message *" value={form.message} onChange={handleChange} required></textarea>

                        <label className="form-checkbox">
                            <input type="checkbox" name="agreePrivacy" checked={form.agreePrivacy} onChange={handleChange} />
                            I agree to the privacy policy.
                        </label>

                        <button type="submit" className="form-submit-btn" disabled={loading}>
                            <FaPaperPlane /> {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                <div className="map-section">
                    <div className="section-header">
                        <div className="section-header-icon"><FaMapMarkerAlt /></div>
                        <div>
                            <h3 className="section-header-title">Find Us</h3>
                            <p className="section-header-subtitle">Visit our office or get directions on the map.</p>
                        </div>
                    </div>

                    <div className="map-container" style={{ position: 'relative', zIndex: 1 }}>
                        <MapContainer center={[13.0478142, 80.1191029]} zoom={13} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[13.0478142, 80.1191029]}>
                                <Popup>
                                    <strong>TNAI Tamil Nadu State Branch</strong><br />
                                    Ashtalakshmi Nagar, Chennai.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>

                    <div className="map-address-box">
                        <div className="map-address-text">
                            <FaMapMarkerAlt />
                            <span>No. 4/25 & 4/75, 24th Street, Ashtalakshmi Nagar,<br />Alapakkam, Chennai - 600116, Tamil Nadu, India.</span>
                        </div>
                        <a href="https://maps.google.com/?q=Ashtalakshmi+Nagar+Alapakkam+Chennai" target="_blank" rel="noreferrer" className="get-dir-btn">
                            <FaPaperPlane /> Get Directions
                        </a>
                    </div>

                    <div className="map-footer">
                        <div className="qr-section">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TNAI+Contact" alt="QR Code" className="qr-img" />
                            <div className="qr-text">
                                <h5>Scan to save our contact</h5>
                                <p>Scan the QR code to save<br />our contact details.</p>
                            </div>
                        </div>
                        <div className="social-section">
                            <h5>Follow Us</h5>
                            <div className="social-icons">
                                <a href="#" className="social-icon"><FaFacebookF /></a>
                                <a href="#" className="social-icon"><FaInstagram /></a>
                                <a href="#" className="social-icon"><FaYoutube /></a>
                                <a href="#" className="social-icon"><FaLinkedinIn /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. BOTTOM GRID (QUICK ENQUIRIES + FAQS) */}
            <section className="bottom-grid">
                <div className="quick-enquiries">
                    <h3 className="section-title">Quick Enquiries</h3>
                    <p className="section-subtitle">Choose a category to help us direct your query to the right team.</p>

                    <div className="enquiries-grid">
                        <a href="#" className="enquiry-card">
                            <FaUsers className="enquiry-card-icon" />
                            <span className="enquiry-card-text">Membership<br />Support</span>
                        </a>
                        <a href="#" className="enquiry-card">
                            <FaCalendarAlt className="enquiry-card-icon" />
                            <span className="enquiry-card-text">Events &<br />Programs</span>
                        </a>
                        <a href="#" className="enquiry-card">
                            <FaGraduationCap className="enquiry-card-icon" />
                            <span className="enquiry-card-text">SNAI<br />Related Queries</span>
                        </a>
                        <a href="#" className="enquiry-card">
                            <FaHandshake className="enquiry-card-icon" />
                            <span className="enquiry-card-text">Collaboration<br />& Partnerships</span>
                        </a>
                        <a href="#" className="enquiry-card">
                            <FaQuestionCircle className="enquiry-card-icon" />
                            <span className="enquiry-card-text">General<br />Enquiries</span>
                        </a>
                    </div>
                </div>

                <div className="faq-section">
                    <h3 className="section-title">Frequently Asked Questions</h3>
                    <p className="section-subtitle">Find quick answers to common questions below.</p>

                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div className="faq-item" key={index}>
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={openFaq === index}
                                >
                                    {faq.q}
                                    <FaChevronRight />
                                </button>
                                <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
                                    {faq.a}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FooterOne />
        </div>
    );
};

export default Contact;
