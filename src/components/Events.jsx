import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Events.css";
import "./EventsModal.css";
import "./EventCards.css";
import Taraweh1Image from "../assets/taraweh1.png";
import Taraweh2Image from "../assets/taraweh2.JPG";
import Openings1Image from "../assets/openings1.PNG";
import Openings2Image from "../assets/openings2.jpeg";
import QuranImage from "../assets/quran_memorization.png";
import DaycareImage from "../assets/daycare.png";
import MarriageImage from "../assets/marriage_contract.png";
import EducationImage from "../assets/educational_programs.png";
import QuranCarrierImage from "../assets/quran_carrier.png";
import MarriageDetailImage from "../assets/marriage.png";

// Carousel Events (Grand Opening and Taraweeh only)
const carouselEvents = [
    {
        titleKey: "events.grandOpeningTitle",
        descKey: "events.grandOpeningDesc",
        image: Openings1Image,
        detailImage: Openings2Image,
        link: "/event/grand-opening"
    },
    {
        titleKey: "events.taraweehTitle",
        descKey: "events.taraweehDesc",
        image: Taraweh1Image,
        detailImage: Taraweh2Image,
        link: "/event/taraweeh"
    }
];

// Card Events (Other programs)
const cardEvents = [
    {
        titleKey: "events.quranTitle",
        descKey: "events.quranDesc",
        image: QuranImage,
        detailImage: QuranCarrierImage,
        link: "/event/quran",
        links: [
            { labelKey: "navbar.quranBoys", url: "/quran-boys-application" },
            { labelKey: "navbar.quranGirls", url: "/quran-girls-application" }
        ]
    },
    {
        titleKey: "events.daycareTitle",
        descKey: "events.daycareDesc",
        image: DaycareImage,
        link: "/event/daycare"
    },
    {
        titleKey: "events.marriageTitle",
        descKey: "events.marriageDesc",
        image: MarriageImage,
        detailImage: MarriageDetailImage,
        link: "/event/marriage",
        links: [
            { labelKey: "navbar.applyOnlineForm", url: "/marriage-certificate" }
        ]
    },
    {
        titleKey: "events.eduTitle",
        descKey: "events.eduDesc",
        image: EducationImage,
        link: "/event/education"
    }
];

function Events() {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ image: null, links: null });

    // Auto-advance slides every 8 seconds (slower)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselEvents.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselEvents.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselEvents.length) % carouselEvents.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const openModal = (event) => {
        setModalData({
            image: event.detailImage || event.image,
            links: event.links || null
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalData({ image: null, links: null });
    };

    return (
        <section id="events" className="events-section">
            <div className="w-100 px-3">
                <h2 className="section-heading text-center mb-4">{t('events.heading')}</h2>

                <div className="carousel-container">
                    {/* Carousel Slides */}
                    <div className="carousel-slides">
                        {carouselEvents.map((event, index) => (
                            <div
                                key={index}
                                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            >
                                <img
                                    src={event.image}
                                    alt={t(event.titleKey)}
                                    className="carousel-image"
                                />
                                <div className="carousel-caption">
                                    <h3>{t(event.titleKey)}</h3>
                                    <p>{t(event.descKey)}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => openModal(event)}
                                    >
                                        {t('events.learnMore')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
                        &#10095;
                    </button>

                    {/* Dot Indicators */}
                    <div className="carousel-dots">
                        {carouselEvents.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Event Cards Section */}
                <div className="event-cards-container">
                    <div className="row g-4 mt-4">
                        {cardEvents.map((event, index) => (
                            <div key={index} className="col-md-6 col-lg-3">
                                <div className="event-card">
                                    <div className="event-card-image">
                                        <img src={event.image} alt={t(event.titleKey)} />
                                    </div>
                                    <div className="event-card-body">
                                        <h4>{t(event.titleKey)}</h4>
                                        <p>{t(event.descKey)}</p>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => openModal(event)}
                                        >
                                            {t('events.learnMore')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {modalOpen && (
                <div className="image-modal" onClick={closeModal}>
                    <div className="modal-content">
                        <span className="modal-close" onClick={closeModal}>&times;</span>
                        <img src={modalData.image} alt="Event" className="modal-image" />

                        {/* Render Links if available */}
                        {modalData.links && (
                            <div className="modal-actions">
                                {modalData.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        to={link.url}
                                        className="modal-btn"
                                        onClick={closeModal}
                                    >
                                        {t(link.labelKey)}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default Events;
