import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Reservation.css";
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import StatusModal from './StatusModal';
import { DatePicker, TimePicker } from './DateTimePicker';

function Reservation() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        message: ""
    });

    const [status, setStatus] = useState({ type: '', message: '' });

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;

        // Helper function to convert 24-hour time to 12-hour AM/PM format
        const formatTime12Hour = (time24) => {
            if (!time24) return "N/A";
            const [h, m] = time24.split(':');
            const hourNum = parseInt(h);
            const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
            const ampm = hourNum >= 12 ? 'PM' : 'AM';
            return `${hour12}:${m} ${ampm}`;
        };

        // Header
        doc.setFillColor(245, 245, 245);
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.addImage(logo, 'PNG', 15, 5, 30, 30);

        doc.setTextColor(44, 62, 80);
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("IMAN ISLAMIC CENTER", 55, 18);
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text("Visit Reservation Confirmation", 55, 28);

        let yPos = 60;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);

        const addRow = (label, value) => {
            doc.setFont("helvetica", "bold");
            doc.text(`${label}:`, 20, yPos);
            doc.setFont("helvetica", "normal");
            doc.text(String(value || "N/A"), 70, yPos);
            yPos += 12;
        };

        addRow("Visitor Name", formData.name);
        addRow("Email Address", formData.email);
        addRow("Preferred Date", formData.date);
        addRow("Preferred Time", formatTime12Hour(formData.time));

        if (formData.message) {
            yPos += 5;
            doc.setFont("helvetica", "bold");
            doc.text("Reason for Visit:", 20, yPos);
            yPos += 7;
            doc.setFont("helvetica", "normal");
            const splitMessage = doc.splitTextToSize(formData.message, pageWidth - 40);
            doc.text(splitMessage, 20, yPos);
        }

        yPos = 250;
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text("Thank you for your interest in visiting Iman Islamic Center.", pageWidth / 2, yPos, { align: 'center' });
        doc.text("We will contact you shortly to confirm your appointment.", pageWidth / 2, yPos + 5, { align: 'center' });

        doc.save(`IIC_Visit_${formData.name.replace(/\s+/g, '_')}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Scheduling your visit...' });

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        // Reusing the Quran template to stay within the free tier limit (2 templates)
        const templateId = import.meta.env.VITE_EMAILJS_QURAN_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS configuration missing');
            setStatus({ type: 'error', message: 'System Error: Email configuration is missing. Downloading PDF anyway...' });
            generatePDF();
            return;
        }

        emailjs.init(publicKey);

        // We use the same field names as the Quran template so we don't need a new one
        const templateParams = {
            studentName: formData.name,      // Reusing 'studentName' for Visitor Name
            parentName: `Visit on ${formData.date} at ${formData.time}`, // Reusing 'parentName' for Visit details
            email: formData.email,            // Reusing 'email'
            to_email: formData.email,
            phone: "Visit Request",           // Label for the phone field
            message: formData.message || "General Visit"
        };

        try {
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            setStatus({
                type: 'success',
                message: `Visit Scheduled! A confirmation email has been sent to ${formData.email}. Downloading PDF...`
            });
        } catch (err) {
            console.error('Email send failure:', err);
            setStatus({
                type: 'warning',
                message: 'Reservation submitted, but email failed. Error: ' + (err.text || JSON.stringify(err)) + '. Downloading PDF...'
            });
        } finally {
            generatePDF();
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

