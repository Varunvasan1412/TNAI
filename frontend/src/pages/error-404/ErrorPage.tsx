import React from 'react';
import { Link } from 'react-router';
import HeaderOne from '../../components/headers/HeaderOne';
import FooterOne from '../../components/footers/FooterOne';
import Banner from '../../features/banner/Banner';
import errorPageImg from '../../assets/images/resources/error-page-img1.png';

const ErrorPage: React.FC = () => {
    return (
        <div className="page-wrapper">
            <HeaderOne />
            <Banner title="404 Error" subTitle="404 Error" />
            <section className="error-page">
                <div className="container">
                    <div className="error-page__inner text-center">
                        <div className="error-page__img float-bob-y">
                            <img src={errorPageImg} alt="404 error illustration" />
                        </div>

                        <div className="error-page__content">
                            <h2>Oops! Page Not Found!</h2>
                            <p>The page you are looking for does not exist. It might have been moved or deleted.</p>
                            <div className="btn-box">
                                <Link to="/" className="thm-btn">
                                    Back To Home <span className="icon-arrow-right"></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterOne />
        </div>
    );
};

export default React.memo(ErrorPage);