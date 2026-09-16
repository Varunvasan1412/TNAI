import React from 'react';
import { Link } from 'react-router';
import FooterOne from '../../components/footers/FooterOne';
import PageBanner from '../../components/elements/PageBanner';
import '../../assets/css/module-css/contact-page.css';
import '../../assets/css/module-css/membership-page.css';
import {
    FaClipboardList, FaLock, FaCheckCircle, FaIdBadge, FaSyncAlt,
    FaMedal, FaGraduationCap, FaChartLine, FaBook, FaHeart, FaBullhorn,
    FaStar, FaBookOpen, FaCog, FaUsers, FaBriefcase, FaTrophy
} from 'react-icons/fa';

/* ── QUICK LINKS DATA ─────────────────────────── */
interface LinkCard {
    icon: string;
    iconColor: string;
    titleColor: string;
    title: string;
    desc: string;
    to: string;
}

const cards: LinkCard[] = [
    { icon: '/online.webp',     iconColor: 'blue',   titleColor: 'blue',   title: 'ONLINE\nMEMBERSHIP',        desc: 'Join TNAI or SNAI online in a simple, secure and seamless way.',          to: '/membership/online' },
    { icon: '/TNAI.webp',       iconColor: 'green',  titleColor: 'green',  title: 'KNOW YOUR\nTNAI MEMBERSHIP', desc: 'Explore TNAI membership categories, eligibility and guidelines.',           to: '/membership/tnai' },
    { icon: '/SNAI.webp',       iconColor: 'purple', titleColor: 'purple', title: 'KNOW YOUR\nSNAI MEMBERSHIP', desc: 'Explore SNAI membership categories, eligibility and guidelines.',           to: '/membership/snai' },
    { icon: '/Zone.webp',       iconColor: 'orange', titleColor: 'orange', title: 'KNOW YOUR\nZONE',            desc: 'Find your State/Zone, connect with your representatives and stay informed.', to: '/membership/zone' },
    { icon: '/Scolorship.webp', iconColor: 'teal',   titleColor: 'teal',   title: 'SCHOLARSHIP',               desc: 'Scholarship opportunities for deserving nursing students.',                  to: '/membership/scholarship' },
    { icon: '/Download.webp',   iconColor: 'lblue',  titleColor: 'lblue',  title: 'DOWNLOAD\nFORMS',           desc: 'Access and download membership forms and related documents.',               to: '/membership/forms' },
];

/* ── ONLINE MEMBERSHIP FEATURES ──────────────── */
const onlineFeatures = [
    { icon: <FaClipboardList />, title: 'Quick & easy registration',  desc: 'Complete your registration in just a few simple steps.' },
    { icon: <FaLock />,          title: 'Secure online payment',       desc: 'Safe and hassle-free payment gateway.' },
    { icon: <FaCheckCircle />,   title: 'Instant confirmation',        desc: 'Receive instant confirmation and membership details.' },
    { icon: <FaIdBadge />,       title: 'Digital membership ID',       desc: 'Access your digital membership card anytime, anywhere.' },
    { icon: <FaSyncAlt />,       title: 'Renew anytime',               desc: 'Renew your membership quickly and conveniently.' },
];

/* ── TNAI BENEFITS ───────────────────────────── */
const tnaiBenefits = [
    { icon: <FaMedal />,       title: 'Professional Recognition', desc: 'Enhance your professional identity and credibility.' },
    { icon: <FaGraduationCap />, title: 'Continuing Education',   desc: 'Access seminars, workshops and CNE programs.' },
    { icon: <FaChartLine />,   title: 'Career Advancement',       desc: 'Opportunities for leadership, networking and career growth.' },
    { icon: <FaBook />,        title: 'Publications & Resources', desc: 'Stay updated with journals, guidelines and learning resources.' },
    { icon: <FaHeart />,       title: 'Welfare & Support',        desc: 'Support systems for you and your family.' },
    { icon: <FaBullhorn />,    title: 'Voice & Representation',   desc: 'Your voice in policy making and professional matters.' },
];

/* ── SNAI BENEFITS ───────────────────────────── */
const snaiBenefits = [
    { icon: <FaStar />,      title: 'Student Recognition',    desc: "Be recognized as part of the largest student nurses' network." },
    { icon: <FaBookOpen />,  title: 'Learning Opportunities', desc: 'Access student-focused programs and resources.' },
    { icon: <FaCog />,       title: 'Skill Development',      desc: 'Enhance your knowledge and professional skills.' },
    { icon: <FaUsers />,     title: 'Mentorship & Guidance',  desc: 'Learn from experienced nursing professionals.' },
    { icon: <FaBriefcase />, title: 'Career Support',         desc: 'Guidance for placements, exams and career pathways.' },
    { icon: <FaTrophy />,    title: 'Participation & Growth', desc: 'Engage in events, competitions and leadership activities.' },
];

/* ── COMPONENT ───────────────────────────────── */
const Membership: React.FC = () => {
    return (
        <div className="membership-page-wrapper">

            {/* ── 1. HERO ── */}
            <PageBanner bgImage="/Contact.png" isContentBoxed={true} minHeight="80vh" titleMain="MEMBERSHIP">
                <h2 style={{ color: '#0E49FC', fontSize: '28px', fontWeight: 700, margin: 0, fontFamily: '"Open Sans", sans-serif', lineHeight: '1.3' }}>
                    Stronger Together.<br />Advancing Nursing Excellence.
                </h2>
                <div style={{ width: '50px', height: '3px', backgroundColor: '#0E49FC', margin: '20px 0 25px 0' }} />
                <p style={{ color: '#00227D', fontSize: '16px', lineHeight: '1.7', maxWidth: '90%', marginBottom: '0', fontWeight: 500 }}>
                    Join hands with a legacy that empowers nurses,<br />enriches careers and advances the profession.
                </p>
            </PageBanner>

            {/* ── 2. QUICK LINKS GRID ── */}
            <section className="membership-links-section">
                <div className="membership-links-grid">
                    {cards.map((card, i) => (
                        <Link to={card.to} className="membership-link-card" key={i}>
                            <div className={`membership-link-icon membership-link-icon--${card.iconColor}`}>
                                <img src={card.icon} alt={card.title} />
                            </div>
                            <h3 className={`membership-link-title membership-link-title--${card.titleColor}`}>
                                {card.title.split('\n').map((line, j) => (
                                    <span key={j}>{line}{j < card.title.split('\n').length - 1 && <br />}</span>
                                ))}
                            </h3>
                            <p className="membership-link-desc">{card.desc}</p>
                            <span className={`membership-link-arrow membership-link-arrow--${card.iconColor}`}>→</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── 3. THREE-COLUMN INFO SECTION ── */}
            <section className="mem-info-section">
                <div className="mem-info-grid">

                    {/* COL 1: Online Membership */}
                    <div className="mem-info-col mem-info-col--blue">
                        <div className="mem-info-header">
                            <div className="mem-info-header-icon mem-info-header-icon--blue">
                                <img src="/online.webp" alt="Online Membership" />
                            </div>
                            <div>
                                <h3 className="mem-info-title">ONLINE MEMBERSHIP</h3>
                                <p className="mem-info-tagline">Simple. Secure. Seamless.</p>
                            </div>
                        </div>
                        <p className="mem-info-intro">
                            Become a member of TNAI or SNAI easily through our online membership portal.
                        </p>
                        <ul className="mem-info-features">
                            {onlineFeatures.map((f, i) => (
                                <li key={i} className="mem-info-feature-item">
                                    <span className="mem-info-feature-icon mem-info-feature-icon--blue">{f.icon}</span>
                                    <div>
                                        <strong>{f.title}</strong>
                                        <p>{f.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link to="/membership/online" className="mem-info-btn mem-info-btn--blue">
                            Join Online Now →
                        </Link>
                        <img src="/Online Membership.png" alt="Online Membership" className="mem-info-footer-img" />
                    </div>

                    {/* COL 2: TNAI Benefits */}
                    <div className="mem-info-col mem-info-col--green">
                        <div className="mem-info-header">
                            <div className="mem-info-header-icon mem-info-header-icon--green">
                                <img src="/TNAI.webp" alt="TNAI Members" />
                            </div>
                            <div>
                                <h3 className="mem-info-title">BENEFITS – TNAI MEMBERS</h3>
                                <p className="mem-info-tagline">Empowering Nurses. Enriching Lives.</p>
                            </div>
                        </div>
                        <p className="mem-info-intro">
                            As a TNAI member, you become part of a prestigious network committed to your professional growth and well-being.
                        </p>
                        <ul className="mem-info-features">
                            {tnaiBenefits.map((f, i) => (
                                <li key={i} className="mem-info-feature-item">
                                    <span className="mem-info-feature-icon mem-info-feature-icon--green">{f.icon}</span>
                                    <div>
                                        <strong>{f.title}</strong>
                                        <p>{f.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link to="/membership/tnai" className="mem-info-btn mem-info-btn--green">
                            Become A TNAI Member →
                        </Link>
                        <img src="/Benifcts-tnai.png" alt="TNAI Benefits" className="mem-info-footer-img" />
                    </div>

                    {/* COL 3: SNAI Benefits */}
                    <div className="mem-info-col mem-info-col--purple">
                        <div className="mem-info-header">
                            <div className="mem-info-header-icon mem-info-header-icon--purple">
                                <img src="/SNAI.webp" alt="SNAI Members" />
                            </div>
                            <div>
                                <h3 className="mem-info-title">BENEFITS – SNAI MEMBERS</h3>
                                <p className="mem-info-tagline">Supporting Students. Shaping Futures.</p>
                            </div>
                        </div>
                        <p className="mem-info-intro">
                            SNAI membership is designed for nursing students, supporting their journey from learning to leadership.
                        </p>
                        <ul className="mem-info-features">
                            {snaiBenefits.map((f, i) => (
                                <li key={i} className="mem-info-feature-item">
                                    <span className="mem-info-feature-icon mem-info-feature-icon--purple">{f.icon}</span>
                                    <div>
                                        <strong>{f.title}</strong>
                                        <p>{f.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link to="/membership/snai" className="mem-info-btn mem-info-btn--purple">
                            Become A SNAI Member →
                        </Link>
                        <img src="/Benificts-snai.png" alt="SNAI Benefits" className="mem-info-footer-img" />
                    </div>

                </div>
            </section>

            {/* ── 4. CTA BANNER SECTION ── */}
            <section className="mem-cta-banner">
                <div className="mem-cta-container">
                    <div className="mem-cta-content">
                        <div className="mem-cta-icon">
                            <img src="/Together.webp" alt="Together Icon" />
                        </div>
                        <div className="mem-cta-text">
                            <h3>Together We Care &bull; Together We Serve &bull; Together We Grow</h3>
                            <p>Be a part of a movement that advances nursing and builds a healthier society.</p>
                        </div>
                    </div>
                    <Link to="/contact" className="mem-cta-btn">
                        JOIN US TODAY →
                    </Link>
                </div>
            </section>

            <FooterOne />
        </div>
    );
};

export default Membership;
