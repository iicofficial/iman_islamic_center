import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Reservation.css";
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaCheckCircle, FaPhoneAlt } from "react-icons/fa";
import { sendEmail } from "../utils/emailService";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import { generateArabicPdf, buildPdfTemplate } from "../utils/pdfGenerator";
import StatusModal from './StatusModal';
import { DatePicker, TimePicker } from './DateTimePicker';

function Reservation() {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        message: ""
    });

    const [status, setStatus] = useState({ type: '', message: '' });

    const formatTime12Hour = (time24) => {
        if (!time24) return "N/A";
        const [h, m] = time24.split(':');
        const hourNum = parseInt(h);
        const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        return `${hour12}:${m} ${ampm}`;
    };

    const generatePDF = async () => {
        const title = t('reservation.title');
        const sections = [
            {
                title: t('reservation.subtitle'),
                fields: [
                    { label: t('reservation.fullName'), value: formData.name },
                    { label: t('reservation.email'), value: formData.email },
                    { label: "Phone", value: formData.phone },
                    { label: t('reservation.date'), value: formData.date },
                    { label: t('reservation.time'), value: formatTime12Hour(formData.time) },
                    { label: t('reservation.reason'), value: formData.message },
                ]
            }
        ];

        const template = buildPdfTemplate(title, sections, language, t('navbar.brandName'));
        await generateArabicPdf(template, `IIC_Visit_${formData.name.replace(/\s+/g, '_')}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Scheduling your visit...' });

        const formattedTime = formatTime12Hour(formData.time);
        const templateParams = {
            form_title: "Visit Request - Reservation",
            user_name: formData.name,
            sender_name: "Iman Islamic Center (IIC)",
            from_name: "Iman Islamic Center (IIC)",
            user_email: formData.email,
            to_email: "dev@iman-islam.org", // Organization email
            reply_to: formData.email,
            date: `${formData.date} at ${formattedTime}`,
            location: "Iman Islamic Center",
            phone: formData.phone || "Not provided",
            message: `New Visit Request:
Phone: ${formData.phone}
Name: ${formData.name}
Date: ${formData.date}
Time: ${formattedTime}
Email: ${formData.email}
Reason: ${formData.message || "General Visit"}`,
            formType: 'visit',
            name: formData.name,
            date: formData.date,
            time: formData.time
        };

        try {
            await sendEmail(templateParams);

            setStatus({
                type: 'success',
                message: `Request Submitted! Confirmation emails have been sent to you and IIC. PDF is downloading.`
            });
        } catch (err) {
            console.error('Email send failure:', err);
            setStatus({
                type: 'warning',
                message: 'Request Submitted, but we had trouble sending the email. Your PDF is downloading below.'
            });
        } finally {
            try {
                await generatePDF();
            } catch (pdfError) {
                console.error("PDF Generation failed:", pdfError);
            }
        }
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
                                                value={formData.name}
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
                                                value={formData.email}
                                                className="form-control-modern"
                                                placeholder={t('reservation.enterEmail')}
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaPhoneAlt className="me-2" /> Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                className="form-control-modern"
                                                placeholder="(123) 456-7890"
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="col-md-6">
                                        <DatePicker
                                            label={t('reservation.date')}
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
                                            label={t('reservation.time')}
                                            value={formData.time}
                                            onChange={handleChange}
                                            name="time"
                                            required
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="col-12">
                                        <div className="input-group-modern">
                                            <label>{t('reservation.reason')}</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                className="form-control-modern"
                                                rows="3"
                                                placeholder={t('reservation.reasonPlaceholder')}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="col-12 text-center mt-4">
                                        <button
                                            type="submit"
                                            className="btn-modern-reservation"
                                            disabled={status.type === 'info'}
                                        >
                                            <span>{status.type === 'info' ? t('common.processing') || 'Processing...' : t('reservation.submit')}</span>
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

            {/* Status Modal */}
            <StatusModal
                show={!!status.message}
                status={status}
                onClose={() => setStatus({ type: '', message: '' })}
            />
        </section>
    );
}

export default Reservation;

