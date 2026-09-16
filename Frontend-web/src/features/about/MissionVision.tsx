import React from 'react';
import { FaEye, FaBullseye, FaMountain, FaUserShield, FaChartLine, FaShieldAlt, FaHandshake } from 'react-icons/fa';
import '../../assets/css/module-css/about-page.css';

const MissionVision: React.FC = () => {
    return (
        <section className="mission-vision-section" style={{ padding: '40px 0 80px 0' }}>
            <div className="container-fluid px-3 px-md-5">
                <div className="mv-main-container">
                    
                    {/* Left Column */}
                    <div className="mv-left-col">
                        <h2 className="mv-section-title">OUR VISION, MISSION & OBJECTIVES</h2>
                        
                        <div className="mv-item">
                            <div className="mv-icon-box">
                                <FaEye size={36} color="#ffffff" />
                            </div>
                            <div className="mv-text-box">
                                <h4>VISION</h4>
                                <p>Excellence in nursing leadership for healthier communities and a stronger nation.</p>
                            </div>
                        </div>

                        <div className="mv-item">
                            <div className="mv-icon-box">
                                <FaBullseye size={36} color="#ffffff" />
                            </div>
                            <div className="mv-text-box">
                                <h4>MISSION</h4>
                                <p>To advance the nursing profession through education, advocacy, collaboration and service.</p>
                            </div>
                        </div>

                        <div className="mv-item">
                            <div className="mv-icon-box">
                                <FaMountain size={36} color="#ffffff" />
                            </div>
                            <div className="mv-text-box">
                                <h4>OBJECTIVES</h4>
                                <ul>
                                    <li>Promote professional development</li>
                                    <li>Uphold nurses' rights and welfare</li>
                                    <li>Encourage research and evidence-based practice</li>
                                    <li>Strengthen unity and networking among nurses</li>
                                    <li>Contribute to quality healthcare for all</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="mv-right-col">
                        <h2 className="mv-section-title">ADVOCATING FOR NURSES</h2>
                        <p className="mv-desc">
                            We represent, support and empower nurses at all levels by advocating for policies, professional growth, leadership opportunities and recognition.
                        </p>
                        
                        <div className="mv-cards-grid">
                            <div className="mv-card">
                                <FaUserShield size={42} color="#00227D" className="mv-card-icon" />
                                <h4>Professional<br/>Representation</h4>
                                <p>Voice for nurses in policy making and decision forums.</p>
                            </div>
                            
                            <div className="mv-card">
                                <FaChartLine size={42} color="#00227D" className="mv-card-icon" />
                                <h4>Career Growth<br/>& Development</h4>
                                <p>Encouraging continuous learning and leadership advancement.</p>
                            </div>

                            <div className="mv-card">
                                <FaShieldAlt size={42} color="#00227D" className="mv-card-icon" />
                                <h4>Rights & Welfare<br/>Protection</h4>
                                <p>Safeguarding the rights and welfare of every nursing professional.</p>
                            </div>

                            <div className="mv-card">
                                <FaHandshake size={42} color="#00227D" className="mv-card-icon" />
                                <h4>Collaboration &<br/>Networking</h4>
                                <p>Building partnerships for a stronger nursing community.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MissionVision;
