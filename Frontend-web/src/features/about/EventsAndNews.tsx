import React from 'react';
import { Link } from 'react-router';
import { FaRegCalendarAlt, FaRegFileAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../../assets/css/module-css/about-page.css';

const EventsAndNews: React.FC = () => {
    const events = [
        { date: '25', monthYear: 'MAY\n2026', title: 'State Executive Committee Meeting', location: 'Chennai' },
        { date: '08', monthYear: 'JUN\n2026', title: 'CNE Programme on Critical Care Nursing', location: 'Coimbatore' },
        { date: '12', monthYear: 'JUL\n2026', title: 'International Nurses Day Celebrations', location: 'Madurai' },
        { date: '20', monthYear: 'AUG\n2026', title: 'Workshop on Nursing Leadership', location: 'Tiruchirappalli' }
    ];

    const news = [
        { title: 'TNAI TNSB Election Result 2026', date: '07 May 2026' },
        { title: 'Executive Committee Meeting Circular', date: '30 Apr 2026' },
        { title: 'CNE Programme Schedule 2026', date: '25 Apr 2026' },
        { title: 'Government Order - Nursing Officers', date: '15 Apr 2026' },
        { title: 'Annual General Body Meeting Notice', date: '05 Apr 2026' }
    ];

    return (
        <section className="events-news-section">
            <div className="container-fluid px-3 px-md-5">
                <div className="events-news-container">
                    <div className="row">
                        {/* Upcoming Events Column */}
                        <div className="col-lg-6 events-col-left">
                            <div className="section-header-en">
                                <div className="header-title-en">
                                    <FaRegCalendarAlt className="header-icon-en" />
                                    <h3>UPCOMING EVENTS</h3>
                                </div>
                                <Link to="/events" className="view-all-en">VIEW ALL</Link>
                            </div>
                            
                            <div className="events-grid-en">
                                {events.map((event, index) => (
                                    <div className="event-card-en" key={index}>
                                        <div className="event-date-box-en">
                                            <span className="event-date-en">{event.date}</span>
                                            <span className="event-month-en">{event.monthYear}</span>
                                        </div>
                                        <div className="event-info-en">
                                            <h4>{event.title}</h4>
                                        </div>
                                        <div className="event-location-en">
                                            <FaMapMarkerAlt /> {event.location}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Latest News Column */}
                        <div className="col-lg-6 news-col-right">
                            <div className="section-header-en">
                                <div className="header-title-en">
                                    <FaRegFileAlt className="header-icon-en" />
                                    <h3>LATEST NEWS & CIRCULARS</h3>
                                </div>
                                <Link to="/circulars" className="view-all-en">VIEW ALL</Link>
                            </div>
                            
                            <div className="news-list-en">
                                {news.map((item, index) => (
                                    <div className="news-item-en" key={index}>
                                        <div className="news-icon-en">
                                            <FaRegFileAlt />
                                        </div>
                                        <div className="news-title-en">
                                            {item.title}
                                        </div>
                                        <div className="news-date-en">
                                            {item.date}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsAndNews;
