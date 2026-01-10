import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Events.css";
import "./EventsModal.css";
import "./EventCards.css";
import TaraweehImage from "../assets/Taraweeh20226.JPG";
import QuranImage from "../assets/quran_memorization.png";
import DaycareImage from "../assets/daycare.png";
import MarriageImage from "../assets/marriage_contract.png";
import EducationImage from "../assets/educational_programs.png";
import GrandOpeningImage from "../assets/grand_opening.jpeg";

// Carousel Events (Grand Opening and Taraweeh only)
const carouselEvents = [
    {
        titleKey: "events.grandOpeningTitle",
        descKey: "events.grandOpeningDesc",
        image: GrandOpeningImage,
        link: "/event/grand-opening"
    },
    {
        titleKey: "events.taraweehTitle",
        descKey: "events.taraweehDesc",
        image: TaraweehImage,
        link: "/event/taraweeh"
    }
];

// Card Events (Other programs)
const cardEvents = [
    {
        titleKey: "events.quranTitle",
        descKey: "events.quranDesc",
        image: QuranImage,
        link: "/event/quran"
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
        link: "/event/marriage"
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
    const [modalImage, setModalImage] = useState(null);

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselEvents.length);
        }, 5000);
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

    const openModal = (image) => {
        setModalImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalImage(null);
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
                                        onClick={() => openModal(event.image)}
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
                                            onClick={() => openModal(event.image)}
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
                        <img src={modalImage} alt="Event" className="modal-image" />
                    </div>
                </div>
            )}
        </section>
    );
}

export default Events;
