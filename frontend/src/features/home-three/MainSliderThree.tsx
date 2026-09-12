import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import shape1 from "../../assets/images/shapes/main-slider-three-shape-1.png"
import shape2 from "../../assets/images/shapes/main-slider-three-shape-2.png"
import { Link } from 'react-router';
import useRsistoreContext from '../../components/context/useRsistoreContext';
import SectionWrapper from '../../components/elements/SectionWrapper';
const MainSliderThree: React.FC = () => {
    const { handleVideoClick } = useRsistoreContext();
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <SectionWrapper id='home' className="main-slider-three">
            <div className="main-slider-three__carousel  ">
                <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    spaceBetween={0}
                    effect="fade"
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                    <SwiperSlide>
                        <div className={`item ${activeIndex === 0 ? 'active' : ''}`}>
                            <div className="main-slider-three__bg one" >
                            </div>
                            <div className="main-slider-three__overly"></div>
                            <div className="main-slider-three__shape-1">
                                <img src={shape1} alt="image" className="float-bob-x" />
                            </div>
                            <div className="main-slider-three__shape-2">
                                <img src={shape2} alt="image" className="float-bob-x" />
                            </div>
                            <div className="container">
                                <div className="main-slider-three__content">
                                    <p className="main-slider-three__sub-title">Welcome to The Wall Project - Wallpaper Store</p>
                                    <h2 className="main-slider-three__title">Transforming Spaces With <br />
                                        <span>Custom Wallpapers</span></h2>
                                    <p className="main-slider-three__text">Discover luxury wallpapers, bespoke 3D murals, and textured wall coverings <br /> designed to elevate residential, commercial, and studio interiors.</p>
                                    <div className="main-slider-three__btn-box">
                                        <Link to="/gallery" className="thm-btn">Explore Collection <span
                                            className="icon-arrow-right"></span></Link>
                                    </div>
                                    <div className="main-slider-three__video-link">
                                        <Link to="#" onClick={(e) => handleVideoClick(e, "https://www.youtube.com/watch?v=Get7rqXYrbQ")} className="video-popup">
                                            <div className="main-slider-three__video-icon">
                                                <span className="fa fa-play"></span>
                                                <i className="ripple"></i>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item ${activeIndex === 1 ? 'active' : ''}`}>
                            <div className="main-slider-three__bg two" >
                            </div>
                            <div className="main-slider-three__overly"></div>
                            <div className="main-slider-three__shape-1">
                                <img src={shape1} alt="image" className="float-bob-x" />
                            </div>
                            <div className="main-slider-three__shape-2">
                                <img src={shape2} alt="image" className="float-bob-x" />
                            </div>
                            <div className="container">
                                <div className="main-slider-three__content">
                                    <p className="main-slider-three__sub-title">Welcome to The Wall Project - Wallpaper Store</p>
                                    <h2 className="main-slider-three__title">Elevate Your Interior <br />
                                        <span>Wall Aesthetics</span></h2>
                                    <p className="main-slider-three__text">Explore our exclusive range of embossed textures, metallic accents, <br /> and custom-fit wall designs crafted for modern living.</p>
                                    <div className="main-slider-three__btn-box">
                                        <Link to="/gallery" className="thm-btn">View Designs <span
                                            className="icon-arrow-right"></span></Link>
                                    </div>
                                    <div className="main-slider-three__video-link">
                                        <Link to="#" onClick={(e) => handleVideoClick(e, "https://www.youtube.com/watch?v=Get7rqXYrbQ")} className="video-popup">
                                            <div className="main-slider-three__video-icon">
                                                <span className="fa fa-play"></span>
                                                <i className="ripple"></i>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item ${activeIndex === 2 ? 'active' : ''}`}>
                            <div className="main-slider-three__bg three" >
                            </div>
                            <div className="main-slider-three__overly"></div>
                            <div className="main-slider-three__shape-1">
                                <img src={shape1} alt="image" className="float-bob-x" />
                            </div>
                            <div className="main-slider-three__shape-2">
                                <img src={shape2} alt="image" className="float-bob-x" />
                            </div>
                            <div className="container">
                                <div className="main-slider-three__content">
                                    <p className="main-slider-three__sub-title">Welcome to The Wall Project - Wallpaper Store</p>
                                    <h2 className="main-slider-three__title">Premium Murals & <br />
                                        <span>Custom Printing</span></h2>
                                    <p className="main-slider-three__text">We bring your wall decor visions to life with high-definition custom printing, <br /> eco-friendly materials, and professional installation.</p>
                                    <div className="main-slider-three__btn-box">
                                        <Link to="/contact" className="thm-btn">Get A Quote <span
                                            className="icon-arrow-right"></span></Link>
                                    </div>
                                    <div className="main-slider-three__video-link">
                                        <Link to="#" onClick={(e) => handleVideoClick(e, "https://www.youtube.com/watch?v=Get7rqXYrbQ")} className="video-popup">
                                            <div className="main-slider-three__video-icon">
                                                <span className="fa fa-play"></span>
                                                <i className="ripple"></i>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </SectionWrapper >
    );
};

export default MainSliderThree;