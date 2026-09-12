import React, { useState } from 'react';
import { Link } from 'react-router';
import shapeOne from "../../assets/images/shapes/main-slider-two-shape-1.png"
import slideImg from "../../assets/images/resources/main-slider-two-img-1-1.jpg"
import slideImgSmall from "../../assets/images/resources/main-slider-two-small-img-1-1.jpg"

import slideImgTwo from "../../assets/images/resources/main-slider-two-img-1-2.jpg"
import slideImgSmallTwo from "../../assets/images/resources/main-slider-two-small-img-1-2.jpg"

import slideImgThree from "../../assets/images/resources/main-slider-two-img-1-3.jpg"
import slideImgSmallThree from "../../assets/images/resources/main-slider-two-small-img-1-3.jpg"

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import useRsistoreContext from '../../components/context/useRsistoreContext';
import SectionWrapper from '../../components/elements/SectionWrapper';

const MainSliderTwo: React.FC = () => {
    const { handleVideoClick } = useRsistoreContext();
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleVideo = (e: React.MouseEvent<HTMLAnchorElement>) => {
        handleVideoClick(e, "https://www.youtube.com/watch?v=Get7rqXYrbQ");
    }
    return (
        <SectionWrapper id='home' className="main-slider-two">
            <div className="main-slider-two__carousel  ">
                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    onSwiper={setSwiperInstance}
                >

                    <SwiperSlide>
                        <div className={`item ${activeIndex === 0 ? 'active' : ''}`}>
                            <div className="main-slider-two__bg one" >
                            </div>
                            <div className="main-slider-two__overly"></div>
                            <div className="main-slider-two__shape-1">
                                <img src={shapeOne} alt="image" className="float-bob-x" />
                            </div>
                            <div className="main-slider-two__img">
                                <img src={slideImg} alt="image" />
                            </div>
                            <div className="main-slider-two__small-img">
                                <img src={slideImgSmall} alt="image" />
                            </div>
                            <div className="container">
                                <div className="main-slider-two__content">
                                    <div className="main-slider-two__sub-title-box">
                                        <div className="main-slider-two__sub-title-shape"></div>
                                        <p className="main-slider-two__sub-title">Best Repairs Services</p>
                                    </div>
                                    <h2 className="main-slider-two__title">Cooling Comfort <span>One Repair</span> <br /> at Time In
                                        Your Home
                                    </h2>
                                    <p className="main-slider-two__text">We have been operating for over a decade, providing
                                        top-notch services We have been <br /> operating for over a decade lenitive antique
                                        corrupt quo quad molestation</p>
                                    <div className="main-slider-two__btn-box">
                                        <div className="main-slider-two__btn">
                                            <Link to="/about" className="thm-btn">Discover More <span
                                                className="icon-arrow-right"></span></Link>
                                        </div>
                                        <div className="main-slider-two__video-link">
                                            <Link to="#" onClick={handleVideo} className="video-popup">
                                                <div className="main-slider-two__video-icon">
                                                    <span className="fa fa-play"></span>
                                                    <i className="ripple"></i>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item ${activeIndex === 1 ? 'active' : ''}`}>
                            <div className="main-slider-two__bg two" >
                            </div>
                            <div className="main-slider-two__overly"></div>
                            <div className="main-slider-two__shape-1">
                                <img src={shapeOne} alt="image" className="float-bob-x" />
                            </div>
                            <div className="main-slider-two__img">
                                <img src={slideImgTwo} alt="image" />
                            </div>
                            <div className="main-slider-two__small-img">
                                <img src={slideImgSmallTwo} alt="image" />
                            </div>
                            <div className="container">
                                <div className="main-slider-two__content">
                                    <div className="main-slider-two__sub-title-box">
                                        <div className="main-slider-two__sub-title-shape"></div>
                                        <p className="main-slider-two__sub-title">Best Repairs Services</p>
                                    </div>
                                    <h2 className="main-slider-two__title">Keeping Your <span>AC Running</span> <br /> With Smoothly
                                    </h2>
                                    <p className="main-slider-two__text">We have been operating for over a decade, providing
                                        top-notch services We have been <br /> operating for over a decade lenitive antique
                                        corrupt quo quad molestation</p>
                                    <div className="main-slider-two__btn-box">
                                        <div className="main-slider-two__btn">
                                            <Link to="/about" className="thm-btn">Discover More <span
                                                className="icon-arrow-right"></span></Link>
                                        </div>
                                        <div className="main-slider-two__video-link">
                                            <Link to="#" onClick={handleVideo} className="video-popup">
                                                <div className="main-slider-two__video-icon">
                                                    <span className="fa fa-play"></span>
                                                    <i className="ripple"></i>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item ${activeIndex === 2 ? 'active' : ''}`}>
                            <div className="main-slider-two__bg three" >
                            </div>
                            <div className="main-slider-two__overly"></div>
                            <div className="main-slider-two__shape-1">
                                <img src={shapeOne} alt="image" className="float-bob-x" />
                            </div>
                            <div className="main-slider-two__img">
                                <img src={slideImgThree} alt="image" />
                            </div>
                            <div className="main-slider-two__small-img">
                                <img src={slideImgSmallThree} alt="image" />
                            </div>
                            <div className="container">
                                <div className="main-slider-two__content">
                                    <div className="main-slider-two__sub-title-box">
                                        <div className="main-slider-two__sub-title-shape"></div>
                                        <p className="main-slider-two__sub-title">Best Repairs Services</p>
                                    </div>
                                    <h2 className="main-slider-two__title">Heating & <span>AC Installation</span> <br />
                                        Repair Company <span>Since 2003.</span>
                                    </h2>
                                    <p className="main-slider-two__text">We have been operating for over a decade, providing
                                        top-notch services We have been <br /> operating for over a decade lenitive antique
                                        corrupt quo quad molestation</p>
                                    <div className="main-slider-two__btn-box">
                                        <div className="main-slider-two__btn">
                                            <Link to="/about" className="thm-btn">Discover More <span className="icon-arrow-right"></span></Link>
                                        </div>
                                        <div className="main-slider-two__video-link">
                                            <Link to="#" onClick={handleVideo} className="video-popup">
                                                <div className="main-slider-two__video-icon">
                                                    <span className="fa fa-play"></span>
                                                    <i className="ripple"></i>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className="owl-nav">
                    <button
                        onClick={() => swiperInstance?.slidePrev()}
                        type="button"
                        role="presentation"
                        className="owl-prev"
                    >
                        <span className="icon-arrow-right"></span>
                    </button>
                    <button
                        onClick={() => swiperInstance?.slideNext()}
                        type="button"
                        role="presentation"
                        className="owl-next"
                    >
                        <span className="icon-arrow-right"></span>
                    </button>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default MainSliderTwo;