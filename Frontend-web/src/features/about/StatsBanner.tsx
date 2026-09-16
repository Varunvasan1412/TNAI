import React from 'react';
import CountUp from 'react-countup';
import '../../assets/css/module-css/about-page.css';

const StatsBanner: React.FC = () => {
    return (
        <section className="stats-banner-section">
            <div className="container-fluid px-3 px-md-5">
                <div className="stats-banner-container">
                    <div className="stats-grid">
                        
                        {/* Stat 1 */}
                        <div className="stat-item">
                            <div className="stat-icon-wrapper laurel-wrapper">
                                <img src="/75.webp" alt="75 Years" className="stat-image-icon laurel-img" />
                            </div>
                            <div className="stat-text-box laurel-text-box">
                                <h3>YEARS OF<br />SERVICE</h3>
                                <p>A rich legacy of dedication<br />and commitment.</p>
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="stat-item with-border">
                            <div className="stat-icon-wrapper">
                                <img src="/80.webp" alt="Members" className="stat-image-icon" />
                            </div>
                            <div className="stat-text-box">
                                <h3><CountUp end={87000} enableScrollSpy scrollSpyOnce separator="," />+</h3>
                                <h4>TNAI MEMBERS</h4>
                                <p>(As on May 2025)</p>
                            </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="stat-item with-border">
                            <div className="stat-icon-wrapper">
                                <img src="/80.webp" alt="Units" className="stat-image-icon" />
                            </div>
                            <div className="stat-text-box">
                                <h3><CountUp end={342} enableScrollSpy scrollSpyOnce /></h3>
                                <h4>SNA UNITS</h4>
                                <p>Across Tamil Nadu</p>
                            </div>
                        </div>

                        {/* Stat 4 */}
                        <div className="stat-item with-border">
                            <div className="stat-icon-wrapper">
                                <img src="/80.webp" alt="Members" className="stat-image-icon" />
                            </div>
                            <div className="stat-text-box">
                                <h3><CountUp end={66730} enableScrollSpy scrollSpyOnce separator="," />+</h3>
                                <h4>SNAI MEMBERS</h4>
                                <p>(As on May 2025)</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsBanner;
