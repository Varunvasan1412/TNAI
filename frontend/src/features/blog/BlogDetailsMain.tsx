import React from 'react';
import { Link } from 'react-router';
import BlogSidebar from './BlogSidebar';
import BlogDetailsImg1 from '../../assets/images/blog/blog-details-img-1.jpg';
import BlogDetailsImgBoxImg1 from '../../assets/images/blog/blog-details-img-box-img-1.jpg';
import BlogDetailsImgBoxImg2 from '../../assets/images/blog/blog-details-img-box-img-2.jpg';
import Comment11 from '../../assets/images/blog/comment-1-1.jpg';
import Comment12 from '../../assets/images/blog/comment-1-2.jpg';

const BlogDetailsMain: React.FC = () => {
    return (
        <section className="blog-details">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-7">
                        <div className="blog-details__left">
                            <div className="blog-details__img">
                                <img src={BlogDetailsImg1} />
                                <div className="blog-details__date">
                                    <p>12<br />Nov</p>
                                </div>
                            </div>
                            <div className="blog-details__content">
                                <div className="blog-details__user-and-meta">
                                    <div className="blog-details__user">
                                        <p><span className="icon-user-1"></span>By Admin</p>
                                    </div>
                                    <ul className="blog-details__meta list-unstyled">
                                        <li>
                                            <Link to="#"><span className="fas fa-comments"></span>Comments (05)</Link>
                                        </li>
                                        <li>
                                            <Link to="#"><span className="fas fa-clock"></span>4 Min Read</Link>
                                        </li>
                                    </ul>
                                </div>
                                <h3 className="blog-details__title">Elase They Endures Pains to Avoid The Worse Pains Taken</h3>
                                <p className="blog-details__text-1">Out enigma ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute inure dolor in the reprehenderit in voluptate velit esse cillum dolore eu fugiat null pariatur. Excepteur snit occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <p className="blog-details__text-2">The wise man therefore always holds in these matters to
                                    this principle of selection. He rejects pleasures to secure other greater pleasures,
                                    or else he endures pains to avoid worse pains to the selection point.</p>
                                <div className="blog-details__author-box">
                                    <h4 className="blog-details__author-text">“Sed do eiusmod tempor incididunt labore et dolore magna aliqua. Uther enim minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip commodo consequat. Duis aute irure dolor in reprehenderit in voluptate”</h4>
                                    <p className="blog-details__author-name">Kane Williamson<span> / CEO</span></p>
                                </div>
                                <h3 className="blog-details__title-2">Sundress Pains to Avoid The Worse Pains</h3>
                                <p className="blog-details__text-3">Out enigma ad minim veniam, quis nostrud exercitation
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute inure dolor in
                                    the reprehenderit in voluptate velit esse cillum dolore eu fugiat null pariatur.
                                    Excepteur snit occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.</p>
                                <div className="blog-details__img-box">
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <div className="blog-details__img-box-img">
                                                <img src={BlogDetailsImgBoxImg1} />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="blog-details__img-box-img">
                                                <img src={BlogDetailsImgBoxImg2} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-details__tag-and-share">
                                    <div className="blog-details__tag">
                                        <h3 className="blog-details__tag-title">Tags :</h3>
                                        <ul className="blog-details__tag-list list-unstyled">
                                            <li>
                                                <Link to="#">Analysis</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Planning</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Management</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="blog-details__share-box">
                                        <h3 className="blog-details__share-title">Share :</h3>
                                        <div className="blog-details__share">
                                            <Link to="#"><span className="icon-facebook"></span></Link>
                                            <Link to="#"><span className="icon-xpa"></span></Link>
                                            <Link to="#"><span className="icon-link-in"></span></Link>
                                            <Link to="#"><span className="icon-instagram"></span></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-one">
                                    <div className="comment-one__single">
                                        <div className="comment-one__image">
                                            <img src={Comment11} />
                                        </div>
                                        <div className="comment-one__content">
                                            <h3>Theresa Webb</h3>
                                            <span>02 June 2024 at 03:30 pm</span>
                                            <p>The wise man therefore always holds in these matters to this principle of
                                                selection. He rejects pleasures to secure other greater pleasures, or
                                                else he endures pains to avoid worse pains to the selection point. But
                                                in certain to all this circumstances</p>
                                            <div className="comment-one__btn-box">
                                                <Link to="/blog/cyclic-voltammetry-guide" className="comment-one__btn"><span
                                                    className="icon-share-alt"></span>Reply</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-one__single">
                                        <div className="comment-one__image">
                                            <img src={Comment12} />
                                        </div>
                                        <div className="comment-one__content">
                                            <h3>Cameron Williamson</h3>
                                            <span>02 June 2024 at 03:30 pm</span>
                                            <p>The wise man therefore always holds in these matters to this principle of
                                                selection. He rejects pleasures to secure other greater pleasures, or
                                                else he endures pains to avoid worse pains to the selection point. But
                                                in certain to all this circumstances</p>
                                            <div className="comment-one__btn-box">
                                                <Link to="/blog/cyclic-voltammetry-guide" className="comment-one__btn"><span
                                                    className="icon-share-alt"></span>Reply</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-form">
                                    <h3 className="comment-form__title">Leave A Reply</h3>
                                    <p className="comment-form__text">By using form u agree with the message sorage, you can
                                        contact us directly now</p>
                                    <form className="comment-one__form contact-form-validated" onSubmit={(e) => e.preventDefault()}>
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <div className="comment-form__input-box">
                                                    <input type="text" placeholder="Your Name" name="name" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="comment-form__input-box">
                                                    <input type="email" placeholder="Your Email" name="email" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="comment-form__input-box text-message-box">
                                                    <textarea name="message"
                                                        placeholder="Write your messege"></textarea>
                                                </div>
                                                <div className="comment-form__btn-box">
                                                    <button type="submit" className="footer-widget__newsletter-btn thm-btn">
                                                        submit now
                                                        <span><i className="icon-arrow-right"></i></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="result"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Start Sidebar*/}
                    <BlogSidebar wrapper='col-xl-4 col-lg-5' inner='sidebar' />
                    {/*End Sidebar*/}
                </div>
            </div>
        </section>
    );
};

export default BlogDetailsMain;