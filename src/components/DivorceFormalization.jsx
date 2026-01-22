import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Reservation.css"; // Reuse existing styles
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaCheckCircle, FaMale, FaFemale } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import StatusModal from './StatusModal';
import { DatePicker, TimePicker } from './DateTimePicker';

function DivorceFormalization() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name1: "",
        name2: "",
        email: "",
        date: "",
        time: "",
        notes: ""
    });

    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Sending request...' });

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS configuration missing');
            setStatus({ type: 'error', message: 'System Error: Email configuration is missing.' });
            return;
        }

        emailjs.init(publicKey);

        const templateParams = {
            form_title: "Divorce Formalization Request",
            user_name: `${formData.name1} & ${formData.name2}`,
            date: `${formData.date} at ${formData.time}`,
            location: "Main Office",
            to_email: formData.email,
            phone: "Not provided"
        };

        try {
            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            // Google Sheets Submission
            try {
                const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyBbx7DHeVbKQqNBZPMDUQm6i0b57x67--mTpgBFsNEyQ_do3Q2m0-GAnm3tIlZYKdI4w/exec";
                await fetch(SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, formType: 'divorce' }),
                });
            } catch (sheetError) {
                console.error("Google Sheets Error:", sheetError);
            }

            setStatus({
                type: 'success',
                message: `Request Sent! A confirmation has been sent to ${formData.email}.`
            });
            // Reset form on success
            setFormData({
                name1: "",
                name2: "",
                email: "",
                date: "",
                time: "",
                notes: ""
            });
        } catch (err) {
            console.error('Email send failure:', err);
            setStatus({
                type: 'error',
                message: 'Failed to send request. Please try again later.'
            });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="reservation-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="reservation-card">
                            <div className="reservation-header text-center">
                                <h2 className="section-title">{t('divorceFormalization.title')}</h2>
                                <p className="section-subtitle">{t('divorceFormalization.subtitle')}</p>
                            </div>

                            <form className="reservation-form" onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    {/* Husband Name */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaMale className="me-2" /> {t('divorceFormalization.party1')}</label>
                                            <input
                                                type="text"
                                                name="name1"
                                                value={formData.name1}
                                                className="form-control-modern"
                                                placeholder={t('divorceFormalization.enterParty1')}
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Wife Name */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaFemale className="me-2" /> {t('divorceFormalization.party2')}</label>
                                            <input
                                                type="text"
                                                name="name2"
                                                value={formData.name2}
                                                className="form-control-modern"
                                                placeholder={t('divorceFormalization.enterParty2')}
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-12">
                                        <div className="input-group-modern">
                                            <label><FaEnvelope className="me-2" /> {t('divorceFormalization.email')}</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                className="form-control-modern"
                                                placeholder={t('divorceFormalization.enterEmail')}
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="col-md-6">
                                        <DatePicker
                                            label={t('divorceFormalization.date')}
                                            value={formData.date}
                                            onChange={handleChange}
                                            name="date"
                                            required
                                            minDate={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                    {/* Time */}
                                    <div className="col-md-6">
                                        <TimePicker
                                            label={t('divorceFormalization.time')}
                                            value={formData.time}
                                            onChange={handleChange}
                                            name="time"
                                            required
                                        />
                                    </div>

                                    {/* Notes */}
                                    <div className="col-12">
                                        <div className="input-group-modern">
                                            <label>{t('divorceFormalization.notes')}</label>
                                            <textarea
                                                name="notes"
                                                value={formData.notes}
                                                className="form-control-modern"
                                                rows="3"
                                                placeholder={t('divorceFormalization.notesPlaceholder')}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="col-12 text-center mt-4">
                                        <button type="submit" className="btn-modern-reservation">
                                            <span>{t('divorceFormalization.submit')}</span>
                                            <FaCheckCircle className="ms-2" />
                                        </button>
                                        <p className="form-hint mt-3">
                                            {t('divorceFormalization.hint')}
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Modal */}
            <StatusModal
                show={!!status.message}
                status={status}
                onClose={() => setStatus({ type: '', message: '' })}
            />
        </section>
    );
}

export default DivorceFormalization;
