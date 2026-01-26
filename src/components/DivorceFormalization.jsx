import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Reservation.css"; // Reuse existing styles
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaCheckCircle, FaMale, FaFemale, FaPhoneAlt } from "react-icons/fa";
import { sendEmail } from "../utils/emailService";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import { generateArabicPdf, buildPdfTemplate } from "../utils/pdfGenerator";
import StatusModal from './StatusModal';
import { DatePicker, TimePicker } from './DateTimePicker';

function DivorceFormalization() {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        name1: "",
        name2: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        notes: ""
    });

    const [status, setStatus] = useState({ type: '', message: '' });

    // Helper function to convert 24-hour time to 12-hour AM/PM format
    const formatTime12Hour = (time24) => {
        if (!time24) return "N/A";
        const [h, m] = time24.split(':');
        const hourNum = parseInt(h);
        const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        return `${hour12}:${m} ${ampm}`;
    };

    const generatePDF = async () => {
        const title = t('divorceFormalization.title');
        const sections = [
            {
                title: t('divorceFormalization.subtitle'),
                fields: [
                    { label: t('divorceFormalization.party1'), value: formData.name1 },
                    { label: t('divorceFormalization.party2'), value: formData.name2 },
                    { label: "Phone", value: formData.phone },
                    { label: t('divorceFormalization.email'), value: formData.email },
                    { label: t('divorceFormalization.date'), value: formData.date },
                    { label: t('divorceFormalization.time'), value: formatTime12Hour(formData.time) },
                    { label: t('divorceFormalization.notes'), value: formData.notes },
                ]
            }
        ];

        const template = buildPdfTemplate(title, sections, language, t('navbar.brandName'));
        await generateArabicPdf(template, `IIC_Divorce_${formData.name1.replace(/\s+/g, '_')}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Sending request...' });

        const formattedTime = formatTime12Hour(formData.time);
        const templateParams = {
            form_title: "Divorce Formalization Request",
            user_name: `${formData.name1} & ${formData.name2}`,
            sender_name: "Iman Islamic Center (IIC)",
            from_name: "Iman Islamic Center (IIC)",
            user_email: formData.email,
            to_email: "dev@iman-islam.org", // Organization email
            reply_to: formData.email,
            date: `${formData.date} at ${formattedTime}`,
            location: "Main Office",
            phone: formData.phone,
            message: `New Divorce Formalization Request:
Parties: ${formData.name1} & ${formData.name2}
Phone: ${formData.phone}
Preferred Date: ${formData.date}
Preferred Time: ${formattedTime}
Email: ${formData.email}
Notes: ${formData.notes}`,
            formType: 'divorce',
            name1: formData.name1,
            name2: formData.name2,
            date: formData.date,
            time: formData.time,
            notes: formData.notes
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
                console.error("PDF generation failure", pdfError);
            }
            // Reset form on success (optional, but keep it if user expects it)
            setFormData({
                name1: "",
                name2: "",
                email: "",
                phone: "",
                date: "",
                time: "",
                notes: ""
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
                                    <div className="col-md-6">
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

                                    {/* Phone */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaPhoneAlt className="me-2" /> {t('quranBoys.mobile')}</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                className="form-control-modern"
                                                placeholder="(402) 000-0000"
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
                                        <button
                                            type="submit"
                                            className="btn-modern-reservation"
                                            disabled={status.type === 'info'}
                                        >
                                            <span>{status.type === 'info' ? t('common.processing') || 'Processing...' : t('divorceFormalization.submit')}</span>
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
