import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Reservation.css";
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaCheckCircle } from "react-icons/fa";

function Reservation() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since there is no backend, we simulate the email sending
        alert(`Request sent! Confirmation for ${formData.name} on ${formData.date} at ${formData.time} has been prepared.`);
        // Note: To send actual emails, services like EmailJS or Formspree are recommended.
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="reservation" className="reservation-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="reservation-card">
                            <div className="reservation-header text-center">
                                <h2 className="section-title">{t('reservation.title')}</h2>
                                <p className="section-subtitle">{t('reservation.subtitle')}</p>
                            </div>

                            <form className="reservation-form" onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    {/* Name */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaUser className="me-2" /> {t('reservation.fullName')}</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control-modern"
                                                placeholder={t('reservation.enterName')}
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaEnvelope className="me-2" /> {t('reservation.email')}</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control-modern"
                                                placeholder={t('reservation.enterEmail')}
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaCalendarAlt className="me-2" /> {t('reservation.date')}</label>
                                            <input
                                                type="date"
                                                name="date"
                                                className="form-control-modern"
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaClock className="me-2" /> {t('reservation.time')}</label>
                                            <input
                                                type="time"
                                                name="time"
                                                className="form-control-modern"
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="col-12">
                                        <div className="input-group-modern">
                                            <label>{t('reservation.reason')}</label>
                                            <textarea
                                                name="message"
                                                className="form-control-modern"
                                                rows="3"
                                                placeholder={t('reservation.reasonPlaceholder')}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="col-12 text-center mt-4">
                                        <button type="submit" className="btn-modern-reservation">
                                            <span>{t('reservation.submit')}</span>
                                            <FaCheckCircle className="ms-2" />
                                        </button>
                                        <p className="form-hint mt-3">
                                            {t('reservation.hint')}
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reservation;
