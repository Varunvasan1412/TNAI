import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

import blogShape1 from '../../assets/images/shapes/blog-one-shape-1.png';
import blogShape2 from '../../assets/images/shapes/blog-one-shape-2.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import FadeInAdvanced, { type AnimationVariant } from '../../components/elements/FadeInAdvanced';
import TextAnimation from '../../components/elements/TextAnimation';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface BlogPost {
    id: number;
    title: string;
    image: string;
    dateDay: string;
    dateMonth: string;
    author: string;
    category: string;
    to: string;
    animation: AnimationVariant;
    animationDelay: number;
}

const animationVariants: AnimationVariant[] = ['fadeInLeft', 'fadeInUp', 'fadeInRight'];
const animationDelays = [100, 200, 300];

const BlogOne: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://crm.rsistore.in';
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

        fetch(`${cleanBaseUrl}/api/crm/web/blog`)
            .then(res => res.json())
            .then(result => {
                if (result.status && result.data && result.data.length > 0) {
                    const sortedData = [...result.data].sort((a: any, b: any) => {
                        if (typeof a.id === 'number' && typeof b.id === 'number') {
                            return b.id - a.id;
                        }
                        const timeA = new Date(a.created_at || a.updated_at || 0).getTime();
                        const timeB = new Date(b.created_at || b.updated_at || 0).getTime();
                        return timeB - timeA;
                    });

                    const mapped: BlogPost[] = sortedData.slice(0, 3).map((item: any, index: number) => {
                        let imageUrl = item.blog_image;
                        if (imageUrl && !imageUrl.startsWith('http')) {
                            const path = imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl;
                            imageUrl = cleanBaseUrl + path;
                        }

                        const d = new Date(item.created_at || item.updated_at || Date.now());
                        const dateDay = isNaN(d.getTime()) ? '01' : d.getDate().toString().padStart(2, '0');
                        const dateMonth = isNaN(d.getTime()) ? 'Jan' : d.toLocaleDateString('en-US', { month: 'short' });

                        return {
                            id: item.id,
                            title: item.blog_title || 'Untitled Blog Post',
                            image: imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=280&fit=crop&q=85',
                            dateDay,
                            dateMonth,
                            author: item.author || 'Admin',
                            category: item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'Research',
                            to: `/blog/${item.id}`,
                            animation: animationVariants[index % animationVariants.length],
                            animationDelay: animationDelays[index % animationDelays.length],
                        };
                    });

                    setPosts(mapped);
                }
            })
            .catch(err => console.error("Error fetching blogs for BlogOne:", err));
    }, []);

    return (
        <SectionWrapper className="blog-one" id='blog'>
            <div className="blog-one__shape-1 float-bob-x">
                <img src={blogShape1} alt="shape 1" />
            </div>
            <div className="blog-one__shape-2 rotate-me">
                <img src={blogShape2} alt="shape 2" />
            </div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>blog & News
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation>Latest Research <br /> Insights & News</TextAnimation>
                    </h3>
                </div>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    speed={800}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        992: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                >
                    {posts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <FadeInAdvanced
                                className="blog-one__single"
                                variant={post.animation}
                                delay={post.animationDelay}
                                style={{ margin: 0, height: '100%' }}
                            >
                                <div className="blog-one__img-box">
                                    <div className="blog-one__img">
                                        <img src={post.image} alt={post.title} style={{ height: '240px', width: '100%', objectFit: 'cover' }} />
                                        <div className="blog-one__plus">
                                            <Link to={post.to}>
                                                <i className="fa fa-plus"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="blog-one__date">
                                        <p>
                                            {post.dateDay} <br /> {post.dateMonth}
                                        </p>
                                    </div>
                                </div>
                                <div className="blog-one__content">
                                    <ul className="blog-one__meta list-unstyled">
                                        <li>
                                            <p><span className="icon-user"></span>{post.author}</p>
                                        </li>
                                        <li>
                                            <p><span className="icon-speech-bubbles"></span>{post.category}</p>
                                        </li>
                                    </ul>
                                    <h3 className="blog-one__title">
                                        <Link to={post.to}>{post.title}</Link>
                                    </h3>
                                    <div className="blog-one__read-more">
                                        <Link to={post.to}>
                                            Learn More <span className="icon-arrow-right"></span>
                                        </Link>
                                    </div>
                                </div>
                            </FadeInAdvanced>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </SectionWrapper>
    );
};

export default BlogOne;