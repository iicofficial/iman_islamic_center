import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Reservation.css"; // Reuse existing styles
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaCheckCircle, FaMale, FaFemale, FaPhoneAlt } from "react-icons/fa";
import { sendEmail } from "../utils/emailService";
import StatusModal from './StatusModal';
import { DatePicker, TimePicker } from './DateTimePicker';
import jsPDF from "jspdf";
import logo from "../assets/logo.png";

function DivorceFormalization() {
    const { t } = useLanguage();
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

    const generatePDF = () => {
        try {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;

            // Header
            doc.setFillColor(245, 245, 245);
            doc.rect(0, 0, pageWidth, 40, 'F');
            if (logo) {
                doc.addImage(logo, 'PNG', 15, 5, 30, 30);
            }

            doc.setTextColor(39, 86, 155);
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("IMAN ISLAMIC CENTER", 55, 18);
            doc.setFontSize(14);
            doc.setFont("helvetica", "normal");
            doc.text("Divorce Formalization Request", 55, 28);

            let yPos = 55;
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);

            // Details
            const addField = (label, value) => {
                doc.setFont("helvetica", "bold");
                doc.text(`${label}:`, 20, yPos);
                doc.setFont("helvetica", "normal");
                doc.text(String(value || "N/A"), 60, yPos);
                yPos += 10;
            };

            addField("Party 1", formData.name1);
            addField("Party 2", formData.name2);
            addField("Phone", formData.phone);
            addField("Email", formData.email);
            addField("Preferred Date", formData.date);
            addField("Preferred Time", formatTime12Hour(formData.time));

            yPos += 5;
            doc.setFont("helvetica", "bold");
            doc.text("Notes:", 20, yPos);
            yPos += 7;
            doc.setFont("helvetica", "normal");
            const splitNotes = doc.splitTextToSize(formData.notes || "No additional notes.", 170);
            doc.text(splitNotes, 20, yPos);

            // Footer
            const dateStr = new Date().toLocaleString();
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.text(`Generated on: ${dateStr}`, 20, 280);

            doc.save(`IIC_Divorce_${formData.name1.replace(/\s+/g, '_')}.pdf`);
        } catch (error) {
            console.error("PDF generation failed:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Sending request...' });

        const gasUrl = import.meta.env.VITE_GAS_URL;

        if (!gasUrl) {
            console.error('GAS URL configuration missing');
            setStatus({ type: 'error', message: 'System Error: Email configuration is missing.' });
            return;
        }

        const formattedTime = formatTime12Hour(formData.time);

        const templateParams = {
            form_title: "Divorce Formalization Request",
            user_name: `${formData.name1} & ${formData.name2}`,
            sender_name: "Iman Islamic Center(IIC)",
            from_name: "Iman Islamic Center(IIC)",
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
Notes: ${formData.notes}`
        };

        try {
            await sendEmail(templateParams);

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
                message: `Email sent to ${formData.email}. PDF Downloaded.`
            });
            generatePDF();
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
