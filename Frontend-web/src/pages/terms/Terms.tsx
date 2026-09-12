import React from 'react';
import FooterOne from '../../components/footers/FooterOne';
import Banner from '../../features/banner/Banner';

const Terms: React.FC = () => {
    return (
        <>
            <Banner
                title="Terms and Conditions"
                subTitle="Terms & Conditions"
                bgImage="/banner image.png"
            />

            <section className="terms-content" style={{ padding: '90px 0', background: '#F8FAFC' }}>
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
                                        The Wall Project — Terms & Conditions
                                    </h2>
                                    <p style={{ color: '#64748B', fontSize: '15px', margin: 0 }}>
                                        Effective Date: August 2026 | Last Updated: August 2026
                                    </p>
                                </div>

                                <p style={{ marginBottom: '40px', color: '#475569', lineHeight: '1.85', fontSize: '16px' }}>
                                    Welcome to <strong>The Wall Project - Wallpaper Store</strong>. By browsing, accessing, or making purchases on our website or through our store at Coimbatore, Tamil Nadu, you agree to adhere to and be bound by the following Terms & Conditions. Please read these terms carefully before engaging with our products and services.
                                </p>

                                {/* 1 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    1. Acceptance of Terms
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    By using this website or placing orders with The Wall Project, you acknowledge that you have read, understood, and agreed to be bound by these Terms & Conditions, along with our Privacy Policy. If you do not agree with any part of these terms, please do not use our services.
                                </p>

                                {/* 2 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    2. Products, Custom Printing & Color Variations
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    The Wall Project specializes in premium wallpapers, 3D wall coverings, textured wall murals, and decorative interior panels. While we display product textures and color palettes accurately, actual printed wallpaper colors may slightly vary due to screen resolutions, room lighting conditions, and batch printing variations.
                                </p>

                                {/* 3 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    3. Wall Measurement & Custom Orders
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    Customers ordering custom-sized wall murals or tailored wallpapers are responsible for providing exact wall measurements (width and height). The Wall Project recommends adding 2 to 3 inches of margin to measurements to account for wall unevenness during installation.
                                </p>

                                {/* 4 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    4. Pricing & Payment Terms
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    All product prices are stated in Indian Rupees (INR) and are subject to change without prior notice. Full payment or required advance deposit must be completed before order processing, printing, or dispatch. We accept secure UPI, credit/debit cards, bank transfers, and standard payment gateways.
                                </p>

                                {/* 5 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    5. Delivery & Shipping Policy
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    We deliver across Coimbatore, Tamil Nadu, and pan-India via trusted courier and logistics partners. Dispatch timelines typically range between 3 to 7 business days depending on custom printing and order volume. The Wall Project is not liable for minor delivery delays caused by courier logistics or local events.
                                </p>

                                {/* 6 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    6. Installation & Wall Surface Conditions
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    For optimal wallpaper longevity, surfaces must be clean, smooth, dry, and primed before application. The Wall Project provides professional installation guidance; however, we are not responsible for adhesive failure or damage resulting from damp walls, rough plaster, or improper self-installation.
                                </p>

                                {/* 7 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    7. Returns, Cancellations & Replacements
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    Custom-printed wallpapers and cut wall rolls are non-refundable once printing has commenced. Standard unopened wallpaper rolls may be returned or exchanged within 7 days of delivery, provided they remain in original condition. Any damaged or defective items must be reported within 48 hours of delivery with photographic evidence.
                                </p>

                                {/* 8 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    8. Intellectual Property Rights
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    All contents of this website—including images, wallpaper designs, brand logos, graphics, text, and layout—are the exclusive intellectual property of <strong>The Wall Project</strong>. Unauthorized copying, distribution, or commercial reuse is strictly prohibited.
                                </p>

                                {/* 9 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    9. Limitation of Liability
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    The Wall Project shall not be liable for indirect, incidental, or consequential damages resulting from product installation, wall prep errors, or improper storage. Our total liability for any claim shall not exceed the purchase price of the specific product.
                                </p>

                                {/* 10 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    10. Governing Law & Jurisdiction
                                </h3>
                                <p style={{ marginBottom: '32px', color: '#475569', lineHeight: '1.8' }}>
                                    These Terms & Conditions are governed by the laws of India. Any legal disputes or claims arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in <strong>Coimbatore, Tamil Nadu, India</strong>.
                                </p>

                                {/* 11 */}
                                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark, #020D3F)' }}>
                                    11. Contact & Support Details
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

export default Terms;
