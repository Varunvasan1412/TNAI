import React, { useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import projectImg1 from '../../assets/images/project/project-2-1.jpg';
import projectImg2 from '../../assets/images/project/project-2-2.jpg';
import projectImg3 from '../../assets/images/project/project-2-3.jpg';
import projectImg4 from '../../assets/images/project/project-2-4.jpg';
import projectImg5 from '../../assets/images/project/project-2-5.jpg';
import TextAnimation from '../../components/elements/TextAnimation';
import Lightbox from 'yet-another-react-lightbox';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface ProjectItem {
    id: number;
    image: string;
    title: string;
    subTitle: string;
    to: string;
}

const projectItems: ProjectItem[] = [
    { id: 1, image: projectImg1, title: 'AC Dust Cleaning', subTitle: 'Cleaning', to: '/products' },
    { id: 2, image: projectImg2, title: 'Heating Service', subTitle: 'Maintenance', to: '/products' },
    { id: 3, image: projectImg3, title: 'AC Repairing', subTitle: 'Repair', to: '/products' },
    { id: 4, image: projectImg4, title: 'AC Installation', subTitle: 'Technology', to: '/products' },
    { id: 5, image: projectImg5, title: 'AC Checking', subTitle: 'Maintenance', to: '/products' },
    { id: 6, image: projectImg1, title: 'AC Dust Cleaning', subTitle: 'Cleaning', to: '/products' },
    { id: 7, image: projectImg2, title: 'Heating Service', subTitle: 'Maintenance', to: '/products' },
    { id: 8, image: projectImg3, title: 'AC Repairing', subTitle: 'Repair', to: '/products' },
    { id: 9, image: projectImg4, title: 'AC Installation', subTitle: 'Technology', to: '/products' },
    { id: 10, image: projectImg5, title: 'AC Checking', subTitle: 'Maintenance', to: '/products' },
    { id: 11, image: projectImg1, title: 'AC Dust Cleaning', subTitle: 'Cleaning', to: '/products' },
];

const ProjectTwo: React.FC = () => {
    const [openLightBox, setOpenLightBox] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const images: string[] = projectItems.map(project => project.image);
    return (
        <SectionWrapper id="projects" className="project-two">
            <div className="container">
                <div className="project-two__top">
                    <div className="section-title text-left sec-title-animation animation-style2">
                        <h6 className="section-title__tagline">
                            <span className="section-title__tagline-border"></span>Our Successful Project
                        </h6>
                        <h3 className="section-title__title title-animation">
                            <TextAnimation>We Have Completed Our <br /> Commercial Project</TextAnimation>
                        </h3>
                    </div>
                    <div className="project-two__btn-box">
                        <Link to="/products" className="thm-btn">
                            View All Projects <span className="icon-arrow-right"></span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="project-two__carousel  ">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                    modules={[Autoplay]}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 2 },
                        570: { slidesPerView: 2, spaceBetween: 2 },
                        768: { slidesPerView: 3, spaceBetween: 2 },
                        1000: { slidesPerView: 4, spaceBetween: 2 },
                        1200: { slidesPerView: 5, spaceBetween: 2 },
                        1600: { slidesPerView: 6, spaceBetween: 2 },
                        2000: { slidesPerView: 7, spaceBetween: 2 },
                        2560: { slidesPerView: 8, spaceBetween: 2 },
                        3200: { slidesPerView: 9, spaceBetween: 2 },
                    }}
                >
                    {projectItems.map((project, i) => (
                        <SwiperSlide key={project.id}>
                            <div className="item" >
                                <div className="project-two__single">
                                    <div className="project-two__img-box">
                                        <div className="project-two__img">
                                            <img src={project.image} alt="" />
                                            <div className="project-two__arrow" onClick={() => { setIndex(i); setOpenLightBox((pre: boolean) => !pre) }}>
                                                <Link to="#" className="img-popup">
                                                    <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="project-two__content">
                                            <h3 className="project-two__title">
                                                <Link to={project.to}>{project.title}</Link>
                                            </h3>
                                            <p className="project-two__sub-title">{project.subTitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Lightbox
                open={openLightBox}
                close={() => setOpenLightBox(false)}
                index={index}
                slides={images.map((src) => ({ src }))}
            />
        </SectionWrapper>
    );
};

export default ProjectTwo;