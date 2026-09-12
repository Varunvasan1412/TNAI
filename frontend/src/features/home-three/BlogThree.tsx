import React from 'react';
import { Link } from 'react-router';

import blog3Img1 from '../../assets/images/blog/blog-3-1.jpg';
import blog3Img2 from '../../assets/images/blog/blog-3-2.jpg';
import blog3Img3 from '../../assets/images/blog/blog-3-3.jpg';
import TextAnimation from '../../components/elements/TextAnimation';
import type { AnimationVariant } from '../../components/elements/FadeInAdvanced';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface BlogItem {
    id: number;
    image: string;
    author: string;
    date: string;
    title: string;
    path: string;
    animation: AnimationVariant;
    animationDelay: number;
}

const blogItems: BlogItem[] = [
    {
        id: 1,
        image: blog3Img1,
        author: 'By admin',
        date: '20, June 2024',
        title: 'Water leakage can be due to a clogged drain line',
        path: '/blog/cyclic-voltammetry-guide',
        animation: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 2,
        image: blog3Img2,
        author: 'By admin',
        date: '20, June 2024',
        title: 'Regular maintenance cleaning or replacing air filters',
        path: '/blog/cyclic-voltammetry-guide',
        animation: 'fadeInUp',
        animationDelay: 300,
    },
    {
        id: 3,
        image: blog3Img3,
        author: 'By admin',
        date: '20, June 2024',
        title: 'Elase They Endures Pains to Avoid The Worse Pains Taken',
        path: '/blog/cyclic-voltammetry-guide',
        animation: 'fadeInRight',
        animationDelay: 500,
    },
];

const BlogThree: React.FC = () => {
    return (
        <SectionWrapper id='blog' className="blog-three">
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Blog & News
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation> Get Latest News & Updates</TextAnimation>
                    </h3>
                </div>

                <div className="row">
                    {blogItems.map((blog) => (
                        <FadeInAdvanced
                            key={blog.id}
                            className={`col-xl-4 col-lg-4 `}
                            delay={blog.animationDelay}
                            variant={blog.animation}
                        >
                            <div className="blog-three__single">
                                <div className="blog-three__img-box">
                                    <div className="blog-three__img">
                                        <img src={blog.image} alt={blog.title} />
                                    </div>
                                    <div className="blog-three__content">
                                        <ul className="blog-three__meta list-unstyled">
                                            <li>
                                                <div className="icon">
                                                    <span className="fas fa-user"></span>
                                                </div>
                                                <p>{blog.author}</p>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <span className="fas fa-calendar-alt"></span>
                                                </div>
                                                <p>{blog.date}</p>
                                            </li>
                                        </ul>
                                        <h3 className="blog-three__title">
                                            <Link to={blog.path}>{blog.title}</Link>
                                        </h3>
                                        <div className="blog-three__btn-box">
                                            <Link to={blog.path} className="thm-btn">
                                                Read More <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInAdvanced>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default BlogThree;