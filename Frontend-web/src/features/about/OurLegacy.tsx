import React from 'react';
import { FaUsers, FaUserTie, FaGraduationCap, FaHospitalAlt, FaHandshake, FaBullseye } from 'react-icons/fa';

const OurLegacy: React.FC = () => {
    const timelineData = [
        {
            year: "1950",
            text: "TNAI Tamil Nadu State Branch was established.",
            icon: <img src="/1950.webp" alt="1950" style={{ width: '65px', height: '65px', objectFit: 'contain' }} />
        },
        {
            year: "1960s",
            text: "Strengthened district branches and membership network.",
            icon: <img src="/1960.webp" alt="1960" style={{ width: '65px', height: '65px', objectFit: 'contain' }} />
        },
        {
            year: "1970s–1990s",
            text: "Promoted nursing education and professional development.",
            icon: <img src="/1970.webp" alt="1970" style={{ width: '65px', height: '65px', objectFit: 'contain' }} />
        },
        {
            year: "2000s",
            text: "Expanded CNE programmes and advocacy for nurses' rights and welfare.",
            icon: <img src="/2000.webp" alt="2000" style={{ width: '65px', height: '65px', objectFit: 'contain' }} />
        },
        {
            year: "2010s",
            text: "Strengthened collaborations and digital initiatives for members.",
            icon: <img src="/2010.webp" alt="2010" style={{ width: '65px', height: '65px', objectFit: 'contain' }} />
        },
        {
            year: "2020s and Beyond",
            text: "Continuing our journey towards excellence, impact and inclusion.",
            icon: <img src="/2020.webp" alt="2020" style={{ width: '65px', height: '65px', objectFit: 'contain' }} />
        }
    ];

    return (
        <section className="our-legacy-section">
            <div className="container">
                <div className="legacy-header text-center">
                    <h2 className="legacy-title">OUR LEGACY</h2>
                    <p className="legacy-subtitle">
                        For more than seven decades, TNAI Tamil Nadu State Branch has been at the forefront of nursing excellence,<br className="d-none d-md-block" />
                        working for the profession and the people of Tamil Nadu.
                    </p>
                </div>

                <div className="legacy-timeline-wrapper">
                    <div className="legacy-timeline">
                        {/* The continuous horizontal line (desktop) */}
                        <div className="legacy-timeline-line"></div>

                        {timelineData.map((item, index) => (
                            <div className="legacy-item" key={index}>
                                {/* Small circle node on the line */}
                                <div className="legacy-node"></div>

                                <div className="legacy-icon">
                                    {item.icon}
                                </div>
                                <h3 className="legacy-year">{item.year}</h3>
                                <p className="legacy-text">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurLegacy;
