import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./QuranBoysApplication.css";
import emailjs from '@emailjs/browser';
import StatusModal from './StatusModal';
import jsPDF from "jspdf";
import logo from "../assets/logo.png";

function QuranBoysApplication() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        studentName: "",
        grade: "",
        age: "",
        address: "",
        school: "",
        guardianName: "",
        kinship: "",
        guardianJob: "",
        workPhone: "",
        homePhone: "",
        mobile: "",
        email: "",
        guardianNameAck: "",
        signature: "",
        agreeToTerms: false
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [validationErrors, setValidationErrors] = useState({});

    // Validation helper functions
    const validateAge = (age) => {
        const ageNum = parseInt(age);
        return ageNum >= 5 && ageNum <= 15;
    };

    const validateAddress = (address) => {
        const addressLower = address.toLowerCase();
        return addressLower.includes('lincoln') && addressLower.includes('ne');
    };

    const validatePhone = (phone) => {
        // Accepts formats: (123)456-7890, (123) 456-7890, 123-456-7890
        const phoneRegex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const formatPhoneNumber = (value) => {
        // Remove all non-numeric characters
        const phoneNumber = value.replace(/\D/g, '');

        // Format as (XXX)XXX-XXXX
        if (phoneNumber.length <= 3) {
            return phoneNumber;
        } else if (phoneNumber.length <= 6) {
            return `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3)}`;
        } else {
            return `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === 'checkbox' ? checked : value;

        // Auto-format phone numbers as user types
        if (name === 'workPhone' || name === 'homePhone' || name === 'mobile') {
            newValue = formatPhoneNumber(value);
        }

        setFormData({ ...formData, [name]: newValue });

        // Clear validation error for this field when user starts typing
        if (validationErrors[name]) {
            setValidationErrors({ ...validationErrors, [name]: '' });
        }
    };

    const validateForm = () => {
        const errors = {};

        // Age validation
        if (!validateAge(formData.age)) {
            errors.age = 'Student must be between 5-15 years of age';
        }

        // Address validation
        if (!validateAddress(formData.address)) {
            errors.address = 'Student must currently reside in Lincoln, NE';
        }

        // Phone validations
        if (formData.workPhone && !validatePhone(formData.workPhone)) {
            errors.workPhone = 'Please enter a valid US phone number: (123)456-7890';
        }
        if (formData.homePhone && !validatePhone(formData.homePhone)) {
            errors.homePhone = 'Please enter a valid US phone number: (123)456-7890';
        }
        if (!validatePhone(formData.mobile)) {
            errors.mobile = 'Please enter a valid US phone number: (123)456-7890';
        }

        // Email validation
        if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const margin = 20;

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
        doc.text("Quran Memorization Program (Boys)", 55, 28);
        doc.setTextColor(0, 0, 0);

        let yPos = 55;
        const lineHeight = 8;
        const leftCol = margin;
        const rightCol = pageWidth / 2 + 10;

        // Helper to add lines
        const addLine = (label, value, x = leftCol) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(`${label}: `, x, yPos);
            doc.setFont("helvetica", "normal");
            doc.text(String(value || ""), x + doc.getTextWidth(`${label}: `) + 2, yPos);
        };

        // Section Title
        const addSection = (title) => {
            yPos += 10;
            doc.setFillColor(39, 86, 155);
            doc.rect(margin, yPos - 6, pageWidth - (margin * 2), 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.text(title, margin + 5, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += 10;
        };

        // Student Info
        addSection("STUDENT INFORMATION");
        addLine("Name", formData.studentName);
        yPos += lineHeight;
        addLine("Grade", formData.grade);
        addLine("Age", formData.age, rightCol);
        yPos += lineHeight;
        addLine("School", formData.school);
        yPos += lineHeight;
        addLine("Address", formData.address);
        yPos += 5;

        // Guardian Info
        addSection("GUARDIAN INFORMATION");
        addLine("Name", formData.guardianName);
        yPos += lineHeight;
        addLine("Kinship", formData.kinship);
        addLine("Job/Title", formData.guardianJob, rightCol);
        yPos += 5;

        // Contact Info
        addSection("CONTACT INFORMATION");
        addLine("Mobile", formData.mobile);
        addLine("Home", formData.homePhone, rightCol);
        yPos += lineHeight;
        addLine("Email", formData.email);
        addLine("Work", formData.workPhone, rightCol);
        yPos += 15;

        // Acknowledgement
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.text("I acknowledge that I have read and agreed to the program policies.", margin, yPos);
        yPos += 10;

        // Signatures
        doc.setFont("helvetica", "bold");
        doc.text("Guardian Name: " + formData.guardianNameAck, margin, yPos);
        yPos += 8;
        doc.text("Signature: " + formData.signature, margin, yPos);

        doc.save(`IIC_Quran_Boys_${formData.studentName.replace(/\s+/g, '_')}.pdf`);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
            setStatus({
                type: 'error',
                message: 'Please fix the validation errors before submitting.'
            });
            // Scroll to first error
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setStatus({ type: 'info', message: 'Processing application...' });

        // 1. EmailJS Configuration
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_QURAN_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        console.log("EmailJS Config Check:", {
            hasService: !!serviceId,
            hasTemplate: !!templateId,
            hasKey: !!publicKey
        });

        if (!serviceId || !templateId || !publicKey) {
            const errorMsg = 'System Error: Email configuration is missing. Keys loaded: ' +
                (serviceId ? 'Service✅ ' : 'Service❌ ') +
                (templateId ? 'Template✅ ' : 'Template❌ ') +
                (publicKey ? 'Key✅' : 'Key❌');
            console.error(errorMsg);
            setStatus({ type: 'error', message: errorMsg });
            generatePDF();
            return;
        }

        emailjs.init(publicKey);

        const templateParams = {
            studentName: formData.studentName,
            parentName: formData.guardianName,
            phone: formData.mobile,
            email: formData.email,
            to_email: formData.email
        };

        try {
            const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
            console.log('Email sent successfully!', response.status, response.text);
            setStatus({
                type: 'success',
                message: `Application Success! Confirmation email sent to ${formData.email}. Downloading PDF...`
            });
        } catch (err) {
            console.error('Failed to send email:', err);
            setStatus({
                type: 'warning',
                message: 'Application submitted, but failed to send email. Error: ' + (err.text || JSON.stringify(err)) + '. Downloading PDF...'
            });
        } finally {
            // 2. Generate PDF regardless of email success
            try {
                generatePDF();
            } catch (error) {
                console.error("PDF Generation Error", error);
            }
        }
    };

    return (
        <div className="quran-boys-application-page">
            <div className="container py-5">
                <div className="quran-application-card">
                    <h1 className="application-title">{t('quranBoys.title')}</h1>
                    <p className="application-subtitle">{t('quranBoys.subtitle')}</p>

                    <form onSubmit={handleSubmit}>
                        {/* Student Information */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranBoys.studentInfo')}</h3>

                            <div className="mb-3">
                                <label className="form-label">{t('quranBoys.studentName')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranBoys.age')}</label>
                                    <select
                                        className={`form-control ${validationErrors.age ? 'is-invalid' : ''}`}
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">{t('common.select')}</option>
                                        {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                    {validationErrors.age && (
                                        <small className="text-danger">{validationErrors.age}</small>
                                    )}
                                </div>
                                <div className="col-md-8 mb-3">
                                    <label className="form-label">{t('quranBoys.grade')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">{t('quranBoys.address')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="Lincoln, NE"
                                />
                                {validationErrors.address && (
                                    <small className="text-danger">{validationErrors.address}</small>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">{t('quranBoys.school')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Guardian Information */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranBoys.guardianInfo')}</h3>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label className="form-label">{t('quranBoys.guardianName')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="guardianName"
                                        value={formData.guardianName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">{t('quranBoys.kinship')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="kinship"
                                        value={formData.kinship}
                                        onChange={handleChange}
                                        placeholder={t('quranBoys.kinshipPlaceholder')}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranBoys.guardianJob')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="guardianJob"
                                        value={formData.guardianJob}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranBoys.contactInfo')}</h3>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranBoys.workPhone')}</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${validationErrors.workPhone ? 'is-invalid' : ''}`}
                                        name="workPhone"
                                        value={formData.workPhone}
                                        onChange={handleChange}
                                        placeholder="(402)123-4567"
                                        maxLength="13"
                                    />
                                    {validationErrors.workPhone && (
                                        <small className="text-danger">{validationErrors.workPhone}</small>
                                    )}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranBoys.homePhone')}</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${validationErrors.homePhone ? 'is-invalid' : ''}`}
                                        name="homePhone"
                                        value={formData.homePhone}
                                        onChange={handleChange}
                                        placeholder="(402)123-4567"
                                        maxLength="13"
                                    />
                                    {validationErrors.homePhone && (
                                        <small className="text-danger">{validationErrors.homePhone}</small>
                                    )}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranBoys.mobile')}</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${validationErrors.mobile ? 'is-invalid' : ''}`}
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="(402)123-4567"
                                        maxLength="13"
                                        required
                                    />
                                    {validationErrors.mobile && (
                                        <small className="text-danger">{validationErrors.mobile}</small>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">{t('quranBoys.email')}</label>
                                <input
                                    type="email"
                                    className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    required
                                />
                                {validationErrors.email && (
                                    <small className="text-danger">{validationErrors.email}</small>
                                )}
                            </div>
                        </div>

                        {/* Program Policies */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranBoys.programPolicies')}</h3>
                            <ol className="policies-list">
                                <li>{t('quranBoys.policy1')}</li>
                                <li>{t('quranBoys.policy2')}</li>
                                <li>{t('quranBoys.policy3')}</li>
                                <li>{t('quranBoys.policy4')}</li>
                                <li>{t('quranBoys.policy5')}</li>
                                <li>{t('quranBoys.policy6')}</li>
                                <li>{t('quranBoys.policy7')}</li>
                                <li>{t('quranBoys.policy8')}</li>
                                <li>{t('quranBoys.policy9')}</li>
                            </ol>
                        </div>

                        {/* Acknowledgement */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranBoys.acknowledgement')}</h3>

                            <div className="acknowledgement-text">
                                <p><strong>{t('quranBoys.ackStatement1')}</strong></p>
                                <p>{t('quranBoys.ackStatement2')}</p>
                                <p>{t('quranBoys.ackStatement3')}</p>
                                <p>{t('quranBoys.ackStatement4')}</p>
                            </div>

                            <div className="row mt-4">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">{t('quranBoys.guardianNameAck')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="guardianNameAck"
                                        value={formData.guardianNameAck}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">{t('quranBoys.signature')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="signature"
                                        value={formData.signature}
                                        onChange={handleChange}
                                        placeholder={t('quranBoys.signaturePlaceholder')}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                    required
                                    id="agreeToTerms"
                                />
                                <label className="form-check-label" htmlFor="agreeToTerms">
                                    {t('quranBoys.agreeToTerms')}
                                </label>
                            </div>
                        </div>

                        {/* Status Modal */}
                        <StatusModal
                            show={!!status.message}
                            status={status}
                            onClose={() => setStatus({ type: '', message: '' })}
                        />

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary btn-submit">
                                {t('quranBoys.submitButton')}
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default QuranBoysApplication;
