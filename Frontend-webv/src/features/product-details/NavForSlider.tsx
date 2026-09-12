import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';
import { productsList } from "../../contents/products/productData";

const NavForSlider: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    return (
        <div className="product-details__content-box">
            <div className="slider-container">
                <Swiper
                    modules={[Navigation, Thumbs, Autoplay]}
                    onSwiper={setSwiperInstance}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={600}
                    loop={true}
                    spaceBetween={10}
                    className="main-swiper"
                >
                    {productsList.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="product-details__img">
                                <img src={product?.image} alt="Image" />
                            </div>
                        </SwiperSlide>
                    ))}

                    <button className="custom-arrow next" onClick={() => swiperInstance?.slideNext()}>
                        <span className="fas fa-angle-right"></span>
                    </button>
                    <button className="custom-arrow prev" onClick={() => swiperInstance?.slidePrev()}>
                        <span className="fas fa-angle-left"></span>
                    </button>

                </Swiper>

                <div className="mb8" style={{ width: "80%", margin: "0 auto", paddingTop: "8px" }}>
                    <Swiper
                        modules={[Thumbs, Autoplay,]}
                        slidesPerView={2}
                        spaceBetween={10}
                        watchSlidesProgress={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        speed={600}
                        loop={true}
                        className="thumb-swiper"
                        breakpoints={{
                            540: {
                                slidesPerView: 3, spaceBetween: 10,
                            }
                        }}
                    >
                        {productsList.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="product-details__thumb-img">
                                    <img src={product?.image} alt="Image" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default NavForSlider;