import React from 'react';
import { Link } from 'react-router'; 
import RecentPostImg1 from '../../assets/images/blog/recent-post-img-1.jpg';
import RecentPostImg2 from '../../assets/images/blog/recent-post-img-2.jpg';
import RecentPostImg3 from '../../assets/images/blog/recent-post-img-3.jpg';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';

interface BlogSidebar {
    wrapper: string;
    inner: string;
}
const BlogSidebar: React.FC<BlogSidebar> = ({ wrapper, inner }) => {
    return (
        <div className={wrapper}>
            <div className={inner}>
                <FadeInAdvanced
                    variant={'fadeInUp'}
                    delay={100}
                    className="sidebar__single sidebar__search"
                >
                    <form className="sidebar__search-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="search" placeholder="Search..." />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </FadeInAdvanced>
                {/*Start Sidebar Single*/}
                <FadeInAdvanced
                    variant={'fadeInUp'}
                    delay={100}
                    className="sidebar__single sidebar__category"
                >
                    <h3 className="sidebar__title">Categories</h3>
                    <ul className="sidebar__category-list list-unstyled">
                        <li><Link to="#">New Technologies <span>(12)</span></Link></li>
                        <li className="active"><Link to="#">Parallax Effect
                            <span>(15)</span></Link></li>
                        <li><Link to="#">Digital Marketing <span>(08)</span></Link></li>
                        <li><Link to="#">Content Writting <span>(20)</span></Link></li>
                        <li><Link to="#">One Page Template <span>(14)</span></Link></li>
                        <li><Link to="#">Relationship Buildup <span>(05)</span></Link></li>
                    </ul>
                </FadeInAdvanced>
                {/*End Sidebar Single*/}

                {/*Start Sidebar Single*/}
                <FadeInAdvanced
                    variant={'fadeInUp'}
                    delay={100}
                    className="sidebar__single sidebar__post"
                >
                    <h3 className="sidebar__title">Recent Post</h3>
                    <div className="sidebar__post-box">
                        <div className="sidebar__post-single">
                            <div className="sidebar-post__img">
                                <img src={RecentPostImg1} />
                            </div>
                            <div className="sidebar__post-content-box">
                                <h3><Link to="#">Regular maintenance cleaning or replacing air filters</Link>
                                </h3>
                            </div>
                        </div>

                        <div className="sidebar__post-single">
                            <div className="sidebar-post__img">
                                <img src={RecentPostImg2} />
                            </div>
                            <div className="sidebar__post-content-box">
                                <h3><Link to="#">Water leakage can be due to a clogged drain line repaire</Link>
                                </h3>
                            </div>
                        </div>

                        <div className="sidebar__post-single">
                            <div className="sidebar-post__img">
                                <img src={RecentPostImg3} />
                            </div>
                            <div className="sidebar__post-content-box">
                                <h3><Link to="#">Revitalising your people in to a retail downturn.</Link>
                                </h3>
                            </div>
                        </div>
                    </div>
                </FadeInAdvanced>
                {/*End Sidebar Single*/}

                {/*Start Sidebar Single – Expert Help CTA*/}
                <FadeInAdvanced
                    variant={'fadeInUp'}
                    delay={100}
                    className="sidebar__single sidebar__expert-help"
                >
                    <div className="sidebar__expert-help-inner">
                        <h3 className="sidebar__expert-help-title">Need Research Support?</h3>
                        <p className="sidebar__expert-help-text">
                            Our team at RSI Store is ready to support your electrochemical research needs. Let's discuss your requirements!
                        </p>
                        <ul className="sidebar__expert-help-list list-unstyled">
                            <li>
                                <div className="sidebar__expert-help-icon">
                                    <span className="icon-call"></span>
                                </div>
                                <div className="sidebar__expert-help-info">
                                    <span className="sidebar__expert-help-label">Call Us</span>
                                    <a href="tel:+919677733363">+91 96777 33363</a>
                                </div>
                            </li>
                            <li>
                                <div className="sidebar__expert-help-icon">
                                    <span className="icon-envelope"></span>
                                </div>
                                <div className="sidebar__expert-help-info">
                                    <span className="sidebar__expert-help-label">Mail Us</span>
                                    <a href="mailto:info@thewallproject.in">info@thewallproject.in</a>
                                </div>
                            </li>
                            <li>
                                <div className="sidebar__expert-help-icon">
                                    <span className="icon-location"></span>
                                </div>
                                <div className="sidebar__expert-help-info">
                                    <span className="sidebar__expert-help-label">Location</span>
                                    <span>Coimbatore, Tamil Nadu, India</span>
                                </div>
                            </li>
                        </ul>
                        <Link to="/contact" className="thm-btn sidebar__expert-help-btn" style={{ width: '100%', justifyContent: 'center' }}>
                            Contact Us Now <span className="icon-arrow-right"></span>
                        </Link>
                    </div>
                </FadeInAdvanced>
                {/*End Sidebar Single – Expert Help CTA*/}

            </div>
        </div>
    );
};

export default BlogSidebar;