import React from 'react';
import { Link } from 'react-router';
 
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import TextAnimation from '../../components/elements/TextAnimation';
import { blogTwoPosts } from '../../contents/blog/blogData';
import SectionWrapper from '../../components/elements/SectionWrapper';

const BlogTwo: React.FC = () => {
    return (
        <SectionWrapper id='blog' className="blog-two">
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
                    {blogTwoPosts.map((blog) => (
                        <FadeInAdvanced
                            key={blog.id}
                            className={`col-xl-4 col-lg-4`}
                            variant={blog.animation}
                            delay={blog.animationDelay}
                        >
                            <div className="blog-two__single">
                                <div className="blog-two__img-box">
                                    <div className="blog-two__img">
                                        <img src={blog.image} alt="" />
                                        <Link to={blog.to} className="blog-two__link">
                                            <span className="sr-only"></span>
                                        </Link>
                                        <div className="blog-two__date">
                                            <p>
                                                {blog.dateDay} <br /> {blog.dateMonth}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-two__content">
                                    <h3 className="blog-two__title">
                                        <Link to={blog.to}>{blog.title}</Link>
                                    </h3>
                                    <p className="blog-two__text">{blog.text}</p>
                                    <div className="blog-two__read-more">
                                        <Link to={blog.to}>
                                            Read More<span className="icon-arrow-right"></span>
                                        </Link>
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

export default BlogTwo;