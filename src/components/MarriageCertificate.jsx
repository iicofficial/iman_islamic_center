import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import "./MarriageCertificate.css";
import emailjs from '@emailjs/browser';
import StatusModal from './StatusModal';
import { DatePicker, TimePicker } from './DateTimePicker';

function MarriageCertificate() {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        groomName: "",
        groomLicenseId: "",
        groomLicenseState: "",
        groomBirthPlace: "",
        groomBirthDate: "",
        brideName: "",
        brideLicenseId: "",
        brideLicenseState: "",
        brideBirthPlace: "",
        brideBirthDate: "",
        groomSignature: "",
        groomSignatureDate: "",
        brideRepSignature: "",
        brideRepSignatureDate: "",
        brideRepLicenseId: "",
        brideRepLicenseState: "",
        witness1Name: "",
        witness1Id: "",
        witness2Name: "",
        witness2Id: "",
        authorizedPersonName: "",
        authorizedPersonId: "",
        dowryAmount: "",
        nikaahDate: "",
        appointmentDate: "",
        appointmentTime: "",
        appointmentLocation: "masjid",
        homeAddress: "",
        email: ""
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors({ ...validationErrors, [name]: '' });
        }
    };

    const validateField = (name, value) => {
        let error = '';

        // Conditional validation for Home Address
        if (name === 'homeAddress') {
            if (formData.appointmentLocation === 'home' && (!value || value.trim() === '')) {
                return 'Home address is required for home visits';
            }
            return '';
        }

        // Dowry is optional but must be numeric if provided
        if (name === 'dowryAmount') {
            if (value && value.trim() !== '') {
                const numericRegex = /^\d+(\.\d{1,2})?$/; // Allows simple numbers or decimals
                // Or looser check: /^[0-9$.,]+$/ to allow currency symbols
                if (!/^[\d$.,]+$/.test(value)) {
                    return 'Dowry amount should be a valid number';
                }
            }
            return ''; // Optional
        }

        // Alphanumeric checks for IDs
        if (name.toLowerCase().includes('licenseid') || name.toLowerCase().includes('id')) {
            // Check if it's one of the ID fields
            if (!value || value.trim() === '') {
                return 'This field is required';
            }
            // Basic alphanumeric check (allowing hyphens/underscores if standard)
            // User requested "alphanumeric (no spaces)" for groomLicenseId especially
            if (!/^[a-zA-Z0-9-]+$/.test(value)) {
                return 'ID must be alphanumeric (no spaces)';
            }
            return '';
        }

        // Required field validation (Default for others)
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            error = 'This field is required';
        }

        // Email validation
        if (name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email address';
            }
        }

        // Date validations
        if (name.includes('BirthDate') && value) {
            const birthDate = new Date(value);
            const today = new Date();
            // Clear time for fair comparison
            today.setHours(0, 0, 0, 0);
            if (birthDate >= today) {
                error = 'Date of birth must be in the past';
            }
        }

        if (name.includes('SignatureDate') && value) {
            const sigDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Compare dates only
            // Signature date logic: typically today or past, definitely not future?
            // User said: "past or today"
            if (sigDate > today) {
                error = 'Signature date cannot be in the future';
            }
        }

        if (name === 'appointmentDate' && value) {
            const appointmentDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (appointmentDate < today) {
                error = 'Appointment date cannot be in the past';
            }
        }

        return error;
    };



    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setValidationErrors({ ...validationErrors, [name]: error });
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const margin = 15;
        const contentWidth = pageWidth - (margin * 2);

        // Helper function to convert 24-hour time to 12-hour AM/PM format
        const formatTime12Hour = (time24) => {
            if (!time24) return "_______________";
            const [h, m] = time24.split(':');
            const hourNum = parseInt(h);
            const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
            const ampm = hourNum >= 12 ? 'PM' : 'AM';
            return `${hour12}:${m} ${ampm}`;
        };

        // Helper function to draw section box
        const drawSectionBox = (startY, height, title) => {
            // Draw shaded header
            doc.setFillColor(39, 86, 155); // Blue color matching your theme
            doc.rect(margin, startY, contentWidth, 8, 'F');

            // Title in white
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text(title, margin + 3, startY + 5.5);

            // Reset text color
            doc.setTextColor(0, 0, 0);

            // Draw border around section
            doc.setDrawColor(39, 86, 155);
            doc.setLineWidth(0.3);
            doc.rect(margin, startY, contentWidth, height);

            return startY + 8; // Return position after header
        };

        // Helper function to add field in two-column layout
        const addField = (label, value, xPos, yPos, isFullWidth = false) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text(label + ":", xPos, yPos);

            doc.setFont("helvetica", "normal");
            const labelWidth = doc.getTextWidth(label + ": ");
            const maxWidth = isFullWidth ? contentWidth - 6 : (contentWidth / 2) - 8;
            const lines = doc.splitTextToSize(value || "_______________", maxWidth - labelWidth);
            doc.text(lines, xPos + labelWidth, yPos);

            return yPos + (lines.length * 4);
        };

        let yPos = 15;

        // ===== HEADER =====
        doc.setFillColor(181, 216, 255); // Lighter blue color
        doc.rect(0, 0, pageWidth, 45, 'F');

        // Add stretched logo on the left
        doc.addImage(logo, 'PNG', 12, 8, 40, 30);

        doc.setTextColor(0, 0, 0); // Black text for better contrast on light blue
        doc.setFontSize(18); // Smaller heading
        doc.setFont("helvetica", "bold");
        doc.text("IMAN ISLAMIC CENTER", pageWidth / 2, 16, { align: "center" });

        doc.setFontSize(12); // Smaller subtitle
        doc.setFont("helvetica", "normal");
        doc.text("Marriage Certificate Application", pageWidth / 2, 25, { align: "center" });

        doc.setFontSize(8);
        doc.text("901 W Dawes Avenue, Lincoln, NE 68521", pageWidth / 2, 33, { align: "center" });
        doc.text("Phone: (402) 730-3883 | Email: info@iman-islam.org", pageWidth / 2, 39, { align: "center" });

        doc.setTextColor(0, 0, 0);
        yPos = 53;

        // ===== GROOM'S INFORMATION =====
        let sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 38, "GROOM'S INFORMATION");
        yPos += 3;

        const leftCol = margin + 3;
        const rightCol = margin + (contentWidth / 2) + 3;

        yPos = addField("Full Name", formData.groomName, leftCol, yPos, true);
        yPos += 1;

        let tempY = addField("License ID", formData.groomLicenseId, leftCol, yPos);
        addField("State", formData.groomLicenseState, rightCol, yPos);
        yPos = tempY + 1;

        tempY = addField("Place of Birth", formData.groomBirthPlace, leftCol, yPos);
        addField("Date of Birth", formData.groomBirthDate, rightCol, yPos);
        yPos = tempY + 5;

        // ===== BRIDE'S INFORMATION =====
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 38, "BRIDE'S INFORMATION");
        yPos += 3;

        yPos = addField("Full Name", formData.brideName, leftCol, yPos, true);
        yPos += 1;

        tempY = addField("License ID", formData.brideLicenseId, leftCol, yPos);
        addField("State", formData.brideLicenseState, rightCol, yPos);
        yPos = tempY + 1;

        tempY = addField("Place of Birth", formData.brideBirthPlace, leftCol, yPos);
        addField("Date of Birth", formData.brideBirthDate, rightCol, yPos);
        yPos = tempY + 5;

        // ===== SIGNATURES =====
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 42, "SIGNATURES");
        yPos += 3;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("Groom's Signature:", leftCol, yPos);
        yPos += 4;

        tempY = addField("Name", formData.groomSignature, leftCol, yPos);
        addField("Date", formData.groomSignatureDate, rightCol, yPos);
        yPos = tempY + 2;

        doc.setFont("helvetica", "bold");
        doc.text("Bride's Representative:", leftCol, yPos);
        yPos += 4;

        tempY = addField("Name", formData.brideRepSignature, leftCol, yPos);
        addField("Date", formData.brideRepSignatureDate, rightCol, yPos);
        yPos = tempY + 1;

        tempY = addField("License ID", formData.brideRepLicenseId, leftCol, yPos);
        addField("State", formData.brideRepLicenseState, rightCol, yPos);
        yPos = tempY + 5;

        // ===== WITNESSES =====
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 22, "WITNESSES");
        yPos += 3;

        tempY = addField("Witness 1", formData.witness1Name, leftCol, yPos);
        addField("ID Number", formData.witness1Id, rightCol, yPos);
        yPos = tempY + 1;

        tempY = addField("Witness 2", formData.witness2Name, leftCol, yPos);
        addField("ID Number", formData.witness2Id, rightCol, yPos);
        yPos = tempY + 5;

        // ===== IIC OFFICIALS =====
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 18, "IIC OFFICIALS");
        yPos += 3;

        tempY = addField("Authorized Person", formData.authorizedPersonName, leftCol, yPos);
        addField("License ID", formData.authorizedPersonId, rightCol, yPos);
        yPos = tempY + 5;

        // ===== ADDITIONAL INFORMATION =====
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 18, "ADDITIONAL INFORMATION");
        yPos += 3;

        tempY = addField("Dowry Amount", formData.dowryAmount, leftCol, yPos);
        addField("Date of Marriage", formData.nikaahDate, rightCol, yPos);
        yPos = tempY + 5;

        // ===== APPOINTMENT DETAILS =====
        const appointmentHeight = formData.appointmentLocation === 'home' && formData.homeAddress ? 26 : 22;
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, appointmentHeight, "APPOINTMENT DETAILS");
        yPos += 3;

        tempY = addField("Date", formData.appointmentDate, leftCol, yPos);
        addField("Time", formatTime12Hour(formData.appointmentTime), rightCol, yPos);
        yPos = tempY + 1;

        const location = formData.appointmentLocation === 'masjid' ? 'At the Masjid' : 'Home Visit';
        yPos = addField("Location", location, leftCol, yPos, true);

        if (formData.appointmentLocation === 'home' && formData.homeAddress) {
            yPos += 1;
            yPos = addField("Address", formData.homeAddress, leftCol, yPos, true);
        }
        yPos += 5;

        // ===== FOOTER =====
        yPos += 5;
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos, contentWidth, 18, 'F');

        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(60, 60, 60);
        doc.text("This is a copy of your marriage certificate application.", pageWidth / 2, yPos + 6, { align: "center" });
        doc.text("Please bring this document to your appointment at the Islamic Center.", pageWidth / 2, yPos + 11, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("For questions, contact: (402) 730-3883 | info@iman-islam.org", pageWidth / 2, yPos + 15, { align: "center" });

        // Save the PDF
        doc.save("Marriage_Certificate_Application.pdf");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            window.scrollTo(0, 0);
        } else {
            setStatus({ type: 'info', message: 'Processing application...' });

            // 1. Send Confirmation Email via EmailJS FIRST
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                console.error('EmailJS configuration missing');
                generatePDF();
                return;
            }

            // Explicitly initialize with public key
            emailjs.init(publicKey);

            // Prepare template parameters
            const templateParams = {
                form_title: "Marriage Certificate Application",
                user_name: `${formData.groomName} & ${formData.brideName}`,
                date: formData.nikaahDate,
                location: formData.appointmentLocation === 'home' ? 'Home Visit' : 'At Masjid',
                to_email: formData.email,
                phone: "Not provided"
            };

            try {
                const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
                console.log('Email sent successfully!', response.status, response.text);

                // Google Sheets Submission
                try {
                    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyBbx7DHeVbKQqNBZPMDUQm6i0b57x67--mTpgBFsNEyQ_do3Q2m0-GAnm3tIlZYKdI4w/exec";
                    await fetch(SCRIPT_URL, {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...formData, formType: 'marriage' }),
                    });
                } catch (sheetError) {
                    console.error("Google Sheets Error:", sheetError);
                }

                setStatus({
                    type: 'success',
                    message: `Application Success! Confirmation email sent to ${formData.email}. Downloading PDF...`
                });
            } catch (err) {
                console.error('Failed to send email:', err);
                setStatus({
                    type: 'warning',
                    message: 'Application Success! Failed to send confirmation email, but downloading PDF. Error: ' + (err.text || JSON.stringify(err))
                });
            } finally {
                // 2. Generate and download PDF regardless of email success
                generatePDF();
            }
        }
    };

    const handleBack = () => {
        setStep(1);
        window.scrollTo(0, 0);
    };

    const usStates = t('states') || [];

    return (
        <div className="marriage-certificate-page">
            <section className="marriage-certificate-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="marriage-certificate-card">
                                <div className="text-center mb-4">
                                    <h2 className="marriage-title">
                                        {step === 1 ? t('marriageCertificate.title') : t('marriageCertificate.appointmentTitle')}
                                    </h2>
                                    <div className="required-note mb-4">
                                        <span style={{ color: '#dc3545', fontWeight: 'bold' }}>All Fields Required</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {step === 1 && (
                                        <>
                                            {/* Groom's Information */}
                                            <h4 className="section-heading">{t('marriageCertificate.groomInfo')}</h4>

                                            <div className="row mb-3">
                                                <div className="col-md-12">
                                                    <label className="form-label">{t('marriageCertificate.groomName')}</label>
                                                    <input
                                                        type="text"
                                                        name="groomName"
                                                        className={`form-control ${validationErrors.groomName ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.groomName}
                                                    />
                                                    {validationErrors.groomName && (
                                                        <div className="invalid-feedback">{validationErrors.groomName}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseId')}</label>
                                                    <input
                                                        type="text"
                                                        name="groomLicenseId"
                                                        className={`form-control ${validationErrors.groomLicenseId ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.groomLicenseId}
                                                    />
                                                    {validationErrors.groomLicenseId && (
                                                        <div className="invalid-feedback">{validationErrors.groomLicenseId}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.state')}</label>
                                                    <select
                                                        name="groomLicenseState"
                                                        className={`form-control ${validationErrors.groomLicenseState ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.groomLicenseState}
                                                    >
                                                        <option value="">{t('marriageCertificate.selectState')}</option>
                                                        {usStates.map(state => (
                                                            <option key={state} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                    {validationErrors.groomLicenseState && (
                                                        <div className="invalid-feedback">{validationErrors.groomLicenseState}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.placeOfBirth')}</label>
                                                    <input
                                                        type="text"
                                                        name="groomBirthPlace"
                                                        className={`form-control ${validationErrors.groomBirthPlace ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.groomBirthPlace}
                                                    />
                                                    {validationErrors.groomBirthPlace && (
                                                        <div className="invalid-feedback">{validationErrors.groomBirthPlace}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <DatePicker
                                                        label={t('marriageCertificate.dateOfBirth')}
                                                        name="groomBirthDate"
                                                        value={formData.groomBirthDate}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {validationErrors.groomBirthDate && (
                                                        <div className="invalid-feedback d-block">{validationErrors.groomBirthDate}</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Bride's Information */}
                                            <h4 className="section-heading">{t('marriageCertificate.brideInfo')}</h4>

                                            <div className="row mb-3">
                                                <div className="col-md-12">
                                                    <label className="form-label">{t('marriageCertificate.brideName')}</label>
                                                    <input
                                                        type="text"
                                                        name="brideName"
                                                        className={`form-control ${validationErrors.brideName ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.brideName}
                                                    />
                                                    {validationErrors.brideName && (
                                                        <div className="invalid-feedback">{validationErrors.brideName}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseId')}</label>
                                                    <input
                                                        type="text"
                                                        name="brideLicenseId"
                                                        className={`form-control ${validationErrors.brideLicenseId ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.brideLicenseId}
                                                    />
                                                    {validationErrors.brideLicenseId && (
                                                        <div className="invalid-feedback">{validationErrors.brideLicenseId}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.state')}</label>
                                                    <select
                                                        name="brideLicenseState"
                                                        className={`form-control ${validationErrors.brideLicenseState ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.brideLicenseState}
                                                    >
                                                        <option value="">{t('marriageCertificate.selectState')}</option>
                                                        {usStates.map(state => (
                                                            <option key={state} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                    {validationErrors.brideLicenseState && (
                                                        <div className="invalid-feedback">{validationErrors.brideLicenseState}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.placeOfBirth')}</label>
                                                    <input
                                                        type="text"
                                                        name="brideBirthPlace"
                                                        className={`form-control ${validationErrors.brideBirthPlace ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.brideBirthPlace}
                                                    />
                                                    {validationErrors.brideBirthPlace && (
                                                        <div className="invalid-feedback">{validationErrors.brideBirthPlace}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <DatePicker
                                                        label={t('marriageCertificate.dateOfBirth')}
                                                        name="brideBirthDate"
                                                        value={formData.brideBirthDate}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {validationErrors.brideBirthDate && (
                                                        <div className="invalid-feedback d-block">{validationErrors.brideBirthDate}</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Signatures */}
                                            <h4 className="section-heading">{t('marriageCertificate.signatures')}</h4>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.groomSignature')}</label>
                                                    <input
                                                        type="text"
                                                        name="groomSignature"
                                                        className={`form-control ${validationErrors.groomSignature ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.groomSignature}
                                                    />
                                                    {validationErrors.groomSignature && (
                                                        <div className="invalid-feedback">{validationErrors.groomSignature}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <DatePicker
                                                        label={t('marriageCertificate.date')}
                                                        name="groomSignatureDate"
                                                        value={formData.groomSignatureDate}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {validationErrors.groomSignatureDate && (
                                                        <div className="invalid-feedback d-block">{validationErrors.groomSignatureDate}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-8">
                                                    <label className="form-label">Bride's Representative Signature-Wali (Print name)</label>
                                                    <input
                                                        type="text"
                                                        name="brideRepSignature"
                                                        className={`form-control ${validationErrors.brideRepSignature ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.brideRepSignature}
                                                    />
                                                    {validationErrors.brideRepSignature && (
                                                        <div className="invalid-feedback">{validationErrors.brideRepSignature}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-4">
                                                    <DatePicker
                                                        label={t('marriageCertificate.date')}
                                                        name="brideRepSignatureDate"
                                                        value={formData.brideRepSignatureDate}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {validationErrors.brideRepSignatureDate && (
                                                        <div className="invalid-feedback d-block">{validationErrors.brideRepSignatureDate}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                    <input
                                                        type="text"
                                                        name="brideRepLicenseId"
                                                        className={`form-control ${validationErrors.brideRepLicenseId ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.brideRepLicenseId}
                                                    />
                                                    {validationErrors.brideRepLicenseId && (
                                                        <div className="invalid-feedback">{validationErrors.brideRepLicenseId}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.state')}</label>
                                                    <select
                                                        name="brideRepLicenseState"
                                                        className={`form-control ${validationErrors.brideRepLicenseState ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.brideRepLicenseState}
                                                    >
                                                        <option value="">{t('marriageCertificate.selectState')}</option>
                                                        {usStates.map(state => (
                                                            <option key={state} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                    {validationErrors.brideRepLicenseState && (
                                                        <div className="invalid-feedback">{validationErrors.brideRepLicenseState}</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Witnesses */}
                                            <h4 className="section-heading">{t('marriageCertificate.witnesses')}</h4>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.witness1Name')}</label>
                                                    <input
                                                        type="text"
                                                        name="witness1Name"
                                                        className={`form-control ${validationErrors.witness1Name ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.witness1Name}
                                                    />
                                                    {validationErrors.witness1Name && (
                                                        <div className="invalid-feedback">{validationErrors.witness1Name}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                    <input
                                                        type="text"
                                                        name="witness1Id"
                                                        className={`form-control ${validationErrors.witness1Id ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.witness1Id}
                                                    />
                                                    {validationErrors.witness1Id && (
                                                        <div className="invalid-feedback">{validationErrors.witness1Id}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.witness2Name')}</label>
                                                    <input
                                                        type="text"
                                                        name="witness2Name"
                                                        className={`form-control ${validationErrors.witness2Name ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.witness2Name}
                                                    />
                                                    {validationErrors.witness2Name && (
                                                        <div className="invalid-feedback">{validationErrors.witness2Name}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                    <input
                                                        type="text"
                                                        name="witness2Id"
                                                        className={`form-control ${validationErrors.witness2Id ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.witness2Id}
                                                    />
                                                    {validationErrors.witness2Id && (
                                                        <div className="invalid-feedback">{validationErrors.witness2Id}</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* IIC Officials */}
                                            <h4 className="section-heading">{t('marriageCertificate.iicOfficials')}</h4>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.authorizedPerson')}</label>
                                                    <input
                                                        type="text"
                                                        name="authorizedPersonName"
                                                        className="form-control"
                                                        style={{ backgroundColor: "#e9ecef" }}
                                                        required
                                                        readOnly
                                                        value={formData.authorizedPersonName}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                    <input
                                                        type="text"
                                                        name="authorizedPersonId"
                                                        className="form-control"
                                                        style={{ backgroundColor: "#e9ecef" }}
                                                        required
                                                        readOnly
                                                        value={formData.authorizedPersonId}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.imamName')}</label>
                                                    <input
                                                        type="text"
                                                        name="imamName"
                                                        className="form-control"
                                                        style={{ backgroundColor: "#e9ecef" }}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.imamLicenseId')}</label>
                                                    <input
                                                        type="text"
                                                        name="imamLicenseId"
                                                        className="form-control"
                                                        style={{ backgroundColor: "#e9ecef" }}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>



                                            {/* Additional Information */}
                                            <h4 className="section-heading">{t('marriageCertificate.additionalInfo')}</h4>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.dowryAmount')}</label>
                                                    <input
                                                        type="text"
                                                        name="dowryAmount"
                                                        className={`form-control ${validationErrors.dowryAmount ? 'is-invalid' : ''}`}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.dowryAmount}
                                                    />
                                                    {validationErrors.dowryAmount && (
                                                        <div className="invalid-feedback">{validationErrors.dowryAmount}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Date of Marriage</label>
                                                    <input
                                                        type="text"
                                                        name="nikaahDate"
                                                        className="form-control"
                                                        style={{ backgroundColor: "#e9ecef" }}
                                                        readOnly
                                                        value={formData.nikaahDate}
                                                    />
                                                </div>
                                            </div>

                                            <div className="btn-container">
                                                <button type="submit" className="apply-btn">
                                                    {t('marriageCertificate.nextButton')}
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {step === 2 && (
                                        <div className="appointment-section">
                                            <div className="row mb-4">
                                                <div className="col-md-6 mb-3">
                                                    <DatePicker
                                                        label={t('marriageCertificate.appointmentDate')}
                                                        value={formData.appointmentDate}
                                                        onChange={handleChange}
                                                        name="appointmentDate"
                                                        required
                                                        minDate={new Date().toISOString().split('T')[0]}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <TimePicker
                                                        label={t('marriageCertificate.appointmentTime')}
                                                        value={formData.appointmentTime}
                                                        onChange={handleChange}
                                                        name="appointmentTime"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label">Contact Email (for confirmation)</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className={`form-control form-control-lg ${validationErrors.email ? 'is-invalid' : ''}`}
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={formData.email}
                                                    placeholder="example@email.com"
                                                />
                                                {validationErrors.email && (
                                                    <div className="invalid-feedback">{validationErrors.email}</div>
                                                )}
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label d-block mb-3">{t('marriageCertificate.appointmentLocation')}</label>

                                                <div className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="appointmentLocation"
                                                        id="locationMasjid"
                                                        value="masjid"
                                                        checked={formData.appointmentLocation === 'masjid'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="locationMasjid">
                                                        {t('marriageCertificate.masjidOption')}
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="appointmentLocation"
                                                        id="locationHome"
                                                        value="home"
                                                        checked={formData.appointmentLocation === 'home'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="locationHome">
                                                        {t('marriageCertificate.homeOption')}
                                                    </label>
                                                </div>
                                            </div>

                                            {formData.appointmentLocation === 'home' && (
                                                <div className="mb-4 fade-in">
                                                    <label className="form-label">{t('marriageCertificate.homeAddressLabel')}</label>
                                                    <input
                                                        type="text"
                                                        name="homeAddress"
                                                        className={`form-control form-control-lg ${validationErrors.homeAddress ? 'is-invalid' : ''}`}
                                                        required={formData.appointmentLocation === 'home'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.homeAddress}
                                                    />
                                                    {validationErrors.homeAddress && (
                                                        <div className="invalid-feedback">{validationErrors.homeAddress}</div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Status Modal */}
                                            <StatusModal
                                                show={!!status.message}
                                                status={status}
                                                onClose={() => setStatus({ type: '', message: '' })}
                                            />

                                            <div className="btn-container">
                                                <button
                                                    type="button"
                                                    className="back-btn"
                                                    onClick={handleBack}
                                                >
                                                    {t('marriageCertificate.backButton')}
                                                </button>
                                                <button type="submit" className="apply-btn">
                                                    {t('marriageCertificate.submitButton')}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            </section >
        </div >
    );
}

export default MarriageCertificate;
