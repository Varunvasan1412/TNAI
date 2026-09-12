import React from 'react';
import serviceDetailsImg1 from '../../assets/images/services/service-details-img-5.jpg';
import serviceDetailsImgBox1 from '../../assets/images/services/service-details-img-box-img-1.jpg';
import serviceDetailsImgBox2 from '../../assets/images/services/service-details-img-box-img-2.jpg';
import ServiceDetailsSidebar from '../maintenance/ServiceDetailsSidebar';
import ServiceDetailsFaq from '../maintenance/ServiceDetailsFaq';

interface PointsListItem {
    id: number;
    text: string;
}

interface ImgBoxItem {
    id: number;
    image: string;
    imageAlt: string;
    iconClass: string;
    title: string;
    text: string;
}

const pointsListData: PointsListItem[] = [
    {
        id: 1,
        text: 'It is a long established fact that a reader will be distr acted bioiiy the rea dablea',
    },
    {
        id: 2,
        text: 'Distr acted bioiiy the rea dablea content of a page when looking at its layout',
    },
    {
        id: 3,
        text: 'Content of a page when looking at its layout toile point',
    },
    {
        id: 4,
        text: 'Reader will be distr acted bioiiy the rea dablea content of a page when looking',
    },
];

const imgBoxData: ImgBoxItem[] = [
    {
        id: 1,
        image: serviceDetailsImgBox1,
        imageAlt: 'Quality full work service detail',
        iconClass: 'icon-project-complete',
        title: 'Quality Full Work',
        text: 'Duis acute arura dolor in reprehenderit in voluptate velit esse cillum dolore Velit esse quam nihil molestiae thos consequatur, Velia ease chillum dolore',
    },
    {
        id: 2,
        image: serviceDetailsImgBox2,
        imageAlt: '100% work satisfaction service detail',
        iconClass: 'icon-certified',
        title: '100% Work Satisfication',
        text: 'Duis acute arura dolor in reprehenderit in voluptate velit esse cillum dolore Velit esse quam nihil molestiae thos consequatur, Velia ease chillum dolore',
    },
];

const ShortCircuitMain: React.FC = () => {
    return (
        <section className="service-details">
            <div className="container">
                <div className="row">
                    <ServiceDetailsSidebar />
                    <div className="col-xl-8 col-lg-7">
                        <div className="service-details__left">

                            <div className="service-details__img">
                                <img src={serviceDetailsImg1} alt="Maintenance service overview" />
                            </div>

                            <h3 className="service-details__title-1">
                                Short circuit repair</h3>
                            <p className="service-details__text-1">
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa
                            </p>
                            <p className="service-details__text-2">
                                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborer et dolore magna
                                aliqua. Out enigma ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute inure dolor in the reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat null pariatur. Excepteur snit occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>

                            <ul className="service-details__points-list list-unstyled">
                                {pointsListData.map((point) => (
                                    <li key={point.id}>
                                        <div className="icon">
                                            <span className="icon-arrow-right"></span>
                                        </div>
                                        <p>{point.text}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="service-details__img-box">
                                <div className="row">
                                    {imgBoxData.map((item) => (
                                        <div key={item.id} className="col-xl-6">
                                            <div className="service-details__img-box-single">
                                                <div className="service-details__img-box-img">
                                                    <img src={item.image} alt={item.imageAlt} />
                                                </div>
                                                <div className="service-details__img-box-content">
                                                    <div className="service-details__img-box-content-icon-and-title">
                                                        <div className="service-details__img-box-content-icon">
                                                            <span className={item.iconClass}></span>
                                                        </div>
                                                        <h3 className="service-details__img-box-content-title">
                                                            {item.title}
                                                        </h3>
                                                    </div>
                                                    <p className="service-details__img-box-content-text">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <ServiceDetailsFaq />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShortCircuitMain;