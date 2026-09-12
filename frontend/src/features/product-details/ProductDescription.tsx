import React, { useState, type FormEvent } from 'react';
import type { ReactElement } from 'react';
import reviewImg from "../../assets/images/shop/review-1-1.jpg"
import reviewImg2 from "../../assets/images/shop/review-1-2.jpg"
import Swal from 'sweetalert2';

interface Review {
    id: number;
    name: string;
    date: string;
    rating: number;
    image: string;
    comment: string;
}

const ProductDescription: React.FC = () => {
    const [isActiveTab, setActiveTab] = useState<number>(1);
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [reviewForm, setReviewForm] = useState({
        message: '',
        name: '',
        email: '',
    });

    const handleReviewChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setReviewForm((prev) => ({ ...prev, [name]: value }));
    };
    // Sample reviews data
    const reviews: Review[] = [
        {
            id: 1,
            name: "Kevin martin",
            date: "20 Oct, 2025 . 4:00 pm",
            rating: 5,
            image: reviewImg,
            comment: "Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some injected or words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrang hidden in the middle of text."
        },
        {
            id: 2,
            name: "Martin Kellis",
            date: "20 Oct, 2025 . 4:00 pm",
            rating: 5,
            image: reviewImg2,
            comment: "It has survived not only five centuries, but also the leap into electronic typesetting unchanged. It was popularised in the sheets containing lorem ipsum is simply free text. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin varius mauris non dignissim."
        }
    ];

    const handleSubmitReview = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!reviewForm.name.trim() || !reviewForm.email.trim() || !reviewForm.message.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in all required fields.',
                confirmButtonColor: '#e74c3c',
            });
            return;
        }

        if (selectedRating === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Rating Required',
                text: 'Please select a star rating before submitting.',
                confirmButtonColor: '#e74c3c',
            });
            return;
        }

        try {
            /*
             * ─────────────────────────────────────────────
             *  NOTE: Add your backend / API call here.
             *  Example:
             *
             *  await axios.post('/api/reviews', {
             *      ...reviewForm,
             *      rating: selectedRating,
             *  });
             *       — or —
             *  await fetch('/api/reviews', {
             *      method: 'POST',
             *      headers: { 'Content-Type': 'application/json' },
             *      body: JSON.stringify({ ...reviewForm, rating: selectedRating }),
             *  });
             * ─────────────────────────────────────────────
             */

            Swal.fire({
                icon: 'success',
                title: 'Review Submitted!',
                text: 'Thank you for your review.',
                confirmButtonColor: '#59e73cff',
            });

            // Reset form and rating
            setReviewForm({ message: '', name: '', email: '' });
            setSelectedRating(0);

        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Something went wrong. Please try again later.',
                confirmButtonColor: '#e74c3c',
            });
        }
    };

    const renderStars = (count: number, interactive = false): ReactElement[] => {
        return Array.from({ length: count }, (_, index) => (
            <i
                key={index}
                className="fa fa-star"
                style={{
                    cursor: interactive ? 'pointer' : 'default',
                    color: interactive && index < selectedRating ? '#f0cf25ff' : '',
                }}
                onClick={() => interactive && setSelectedRating(index + 1)}
            ></i>
        ));
    };

    return (
        <section className="product-description">
            <div className="container">
                <div className="product-details__description">
                    <div className="product-details__main-tab-box tabs-box">
                        <ul className="tab-buttons clearfix list-unstyled">
                            <li
                                onClick={() => setActiveTab(1)}
                                className={`tab-btn ${isActiveTab === 1 ? 'active-btn' : ''}`}
                            >
                                <span>Description</span>
                            </li>
                            <li
                                onClick={() => setActiveTab(2)}
                                className={`tab-btn ${isActiveTab === 2 ? 'active-btn' : ''}`}
                            >
                                <span>Additional information</span>
                            </li>
                            <li
                                onClick={() => setActiveTab(3)}
                                className={`tab-btn ${isActiveTab === 3 ? 'active-btn' : ''}`}
                            >
                                <span>Reviews ({reviews.length})</span>
                            </li>
                        </ul>
                        <div className="tabs-content">
                            {/* Description Tab */}
                            <div className={`tab ${isActiveTab === 1 ? 'active-tab' : ''}`}>
                                <div className="product-details__tab-content-inner">
                                    <div className="product-details__description-content">
                                        <p className="product-details__description-text-1">
                                            I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
                                            I will give you a complete account of the system, and expound the actual
                                            teachings of the great explorer of the truth, the master-builder of
                                            human happiness. No one rejects, dislikes, or avoids pleasure itself,
                                            because it is pleasure, but because those who do not know how to pursue
                                            pleasure rationally encounter consequences
                                        </p>
                                        <div className="product-description__list">
                                            <ul className="list-unstyled">
                                                <li>
                                                    <p><span className="icon-right-arrow"></span> Nam at elit nec neque
                                                        suscipit gravida.</p>
                                                </li>
                                                <li>
                                                    <p><span className="icon-right-arrow"></span> Aenean egestas orci eu
                                                        maximus tincidunt.</p>
                                                </li>
                                                <li>
                                                    <p><span className="icon-right-arrow"></span> Curabitur vel turpis id
                                                        tellus cursus laoreet.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="product-details__description-text-2">
                                            Quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia
                                            deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                                            rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
                                            nobis est eligendi optio cumque nihil impedit quo
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information Tab */}
                            <div className={`tab ${isActiveTab === 2 ? 'active-tab' : ''}`}>
                                <div className="product-details__tab-content-inner">
                                    <div className="product-details__additional-information-content">
                                        <p className="product-details__additional-information-text-1">
                                            Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many variations of
                                            passages of Lorem Ipsum available, but the majority have alteration in some
                                            injected or words which don't look even slightly believable. If you are
                                            going to use a passage of Lorem Ipsum, you need to be sure there isn't
                                            anything embarrang hidden in the middle of text.
                                        </p>
                                        <p className="product-details__additional-information-text-2">
                                            Quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                                            culpa qui officia deserunt mollitia animi, id est laborum et dolorum
                                            fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
                                            libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit
                                            quo
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews Tab */}
                            <div className={`tab ${isActiveTab === 3 ? 'active-tab' : ''}`}>
                                <div className="product-details__tab-content-inner">
                                    {/* Review One Start */}
                                    <div className="review-one">
                                        <div className="comments-area">
                                            <div className="review-one__title">
                                                <h3>{reviews.length} Reviews</h3>
                                            </div>

                                            {/* Render Reviews Dynamically */}
                                            {reviews.map((review) => (
                                                <div key={review.id} className="comment-box">
                                                    <div className="comment">
                                                        <div className="author-thumb">
                                                            <figure className="thumb">
                                                                <img src={review.image} alt={review.name} />
                                                            </figure>
                                                        </div>

                                                        <div className="review-one__content">
                                                            <div className="review-one__content-top">
                                                                <div className="info">
                                                                    <h2>{review.name} <span>{review.date}</span></h2>
                                                                </div>
                                                                <div className="reply-btn">
                                                                    {renderStars(review.rating)}
                                                                </div>
                                                            </div>

                                                            <div className="review-one__content-bottom">
                                                                <p>{review.comment}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Review One End */}

                                    {/* Start Review Form */}
                                    <div className="review-form-one">
                                        <div className="review-form-one__inner">
                                            <h3 className="review-form-one__title">Add a review</h3>
                                            <div className="review-form-one__rate-box">
                                                <p className="review-form-one__rate-text">Rate this product?</p>
                                                <div className="review-form-one__rate">
                                                    {renderStars(5, true)}
                                                </div>
                                            </div>
                                            <form
                                                onSubmit={handleSubmitReview}
                                                className="review-form-one__form contact-form-validated"
                                            >
                                                <div className="row">
                                                    <div className="col-xl-12">
                                                        <div className="review-form-one__input-box text-message-box">
                                                            <textarea
                                                                name="message"
                                                                placeholder="Write a comment"
                                                                value={reviewForm.message}
                                                                onChange={handleReviewChange}
                                                                required
                                                            />




                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-6 col-lg-6">
                                                        <div className="review-form-one__input-box">
                                                            <input
                                                                type="text"
                                                                placeholder="Your name"
                                                                name="name"
                                                                value={reviewForm.name}
                                                                onChange={handleReviewChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6">
                                                        <div className="review-form-one__input-box">
                                                            <input
                                                                type="email"
                                                                placeholder="Email address"
                                                                name="email"
                                                                value={reviewForm.email}
                                                                onChange={handleReviewChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-12">
                                                        <button type="submit" className="thm-btn review-form-one__btn">
                                                            Submit a review
                                                            <span><i className="icon-right-arrow"></i></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="result"></div>
                                        </div>
                                    </div>
                                    {/* End Review Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDescription;