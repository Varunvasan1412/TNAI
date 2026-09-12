import React from 'react';
import FooterOne from '../../components/footers/FooterOne';
import Banner from '../../features/banner/Banner';

const Privacy: React.FC = () => {
    return (
        <>
            <Banner
                title="Privacy Policy"
                subTitle="Privacy Policy"
                bgImage="/banner image.png"
            />

            <section className="privacy-content" style={{ padding: '90px 0', background: '#F8FAFC' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div
                                className="content-box"
                                style={{
                                    background: '#ffffff',
                                    padding: '56px 48px',
                                    borderRadius: '24px',
                                    boxShadow: '0px 20px 60px rgba(2, 13, 63, 0.08)',
                                    border: '1px solid rgba(212, 167, 44, 0.25)'
                                }}
                            >
                                <div style={{ borderBottom: '2px solid rgba(212, 167, 44, 0.2)', paddingBottom: '24px', marginBottom: '36px' }}>
                                    <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-dark, #020D3F)', margin: '0 0 10px' }}>
                                        The Wall Project — Privacy Policy
                                    </h2>
                                    <p style={{ color: '#64748B', fontSize: '15px', margin: 0 }}>
                                        Effective Date: August 2026 | Last Updated: August 2026
                                    </p>
                                </div>

                                <p style={{ marginBottom: '40px', color: '#475569', lineHeight: '1.85', fontSize: '16px' }}>
                                    At <strong>The Wall Project - Wallpaper Store</strong>, we respect your privacy and are committed to safeguarding your personal data. This Privacy Policy outlines how we collect, store, use, and protect your information when you browse our website or communicate with our store in Coimbatore, Tamil Nadu.
                                </p>

                                {/* 1 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    1. Information We Collect
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    We may collect personal details such as your full name, phone number, email address, shipping & billing address, wall dimensions, design preferences, and payment information when you place orders, request quotes, or inquire about custom wallpaper printing.
                                </p>

                                {/* 2 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    2. How We Use Your Information
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    Your information is used strictly to process product orders, schedule wallpaper delivery and installation, respond to your inquiries, provide customer support, and communicate important updates regarding your purchases.
                                </p>

                                {/* 3 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    3. Data Protection & Security
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    We employ robust technical and organizational security measures to protect your personal details against unauthorized access, loss, alteration, or disclosure. All digital transactions are processed through encrypted payment gateways.
                                </p>

                                {/* 4 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    4. Information Sharing & Third Parties
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    The Wall Project does not sell, rent, or trade your personal information. We only share necessary details with trusted logistics partners and payment gateway providers solely to fulfill your order and delivery.
                                </p>

                                {/* 5 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    5. Cookies & Browsing Analytics
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    Our website uses standard cookies to enhance website navigation, analyze site performance, and remember your design catalog preferences. You can adjust your web browser settings to disable cookies if preferred.
                                </p>

                                {/* 6 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    6. Contact & Data Access Rights
                                </h3>
                                <div style={{ background: '#F1F5F9', padding: '24px 28px', borderRadius: '16px', borderLeft: '4px solid var(--gold, #D4A72C)' }}>
                                    <p style={{ margin: '0 0 8px', fontWeight: 700, color: 'var(--primary-dark, #020D3F)' }}>
                                        The Wall Project - Wallpaper Store
                                    </p>
                                    <p style={{ margin: '0 0 6px', color: '#475569', fontSize: '14.5px' }}>
                                        <strong>Address:</strong> No.145-F, Srinivasa complex, Dr Radhakrishna St, Sivananda Colony, Tatabad, Coimbatore, Tamil Nadu 641012
                                    </p>
                                    <p style={{ margin: '0 0 6px', color: '#475569', fontSize: '14.5px' }}>
                                        <strong>Email:</strong> info@thewallproject.in
                                    </p>
                                    <p style={{ margin: 0, color: '#475569', fontSize: '14.5px' }}>
                                        <strong>Phone / WhatsApp:</strong> +91 96777 33363
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterOne />
        </>
    );
};

export default Privacy;
