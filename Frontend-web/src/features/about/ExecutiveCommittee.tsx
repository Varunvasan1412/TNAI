import React from 'react';
import { Link } from 'react-router';
import '../../assets/css/module-css/about-page.css';

const ExecutiveCommittee: React.FC = () => {
    const committeeMembers = [
        {
            role: 'PRESIDENT',
            name: 'Dr. (Mrs.) B. Lakshmi',
            image: '/speaker1.jpg'
        },
        {
            role: 'VICE PRESIDENT',
            name: 'Mrs. P. Saroja',
            image: '/speaker2.jpg'
        },
        {
            role: 'SECRETARY',
            name: 'Mrs. K. Jayanthi',
            image: '/speaker3.jpg'
        },
        {
            role: 'TREASURER',
            name: 'Mr. C. Selvi',
            image: '/speaker4.jpg'
        }
    ];

    return (
        <section className="executive-committee-section">
            <div className="container-fluid px-3 px-md-5">
                <div className="section-header-en mb-4 pb-0" style={{ borderBottom: 'none' }}>
                    <div className="header-title-en">
                        <h3 style={{ textTransform: 'uppercase' }}>Our Executive Committee</h3>
                    </div>
                    <Link to="/committee" className="view-all-en">VIEW ALL</Link>
                </div>

                <div className="row">
                    {committeeMembers.map((member, index) => (
                        <div className="col-lg-3 col-md-6 mb-4" key={index}>
                            <div className="committee-card">
                                <div className="committee-img-box">
                                    <img src={member.image} alt={member.name} className="img-fluid committee-img" />
                                </div>
                                <div className="committee-info-box">
                                    <div className="role-line"></div>
                                    <h4 className="committee-role">{member.role}</h4>
                                    <p className="committee-name">{member.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExecutiveCommittee;
