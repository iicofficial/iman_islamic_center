import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import { generateArabicPdf, buildPdfTemplate } from "../utils/pdfGenerator";
import "./MarriageCertificate.css";
import { sendEmail } from "../utils/emailService";
import StatusModal from './StatusModal';
import { DatePicker, TimePicker } from './DateTimePicker';

function MarriageCertificate() {
    const { t, language } = useLanguage();
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
        email: "",
        phone: ""
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

    // Helper function to convert 24-hour time to 12-hour AM/PM format
    const formatTime12Hour = (time24) => {
        if (!time24) return "_______________";
        const [h, m] = time24.split(':');
        const hourNum = parseInt(h);
        const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        return `${hour12}:${m} ${ampm}`;
    };

    const generatePDF = async () => {
        const title = t('marriageCertificate.title');
        const sections = [
            {
                title: t('marriageCertificate.groomInfo'),
                fields: [
                    { label: t('marriageCertificate.groomName'), value: formData.groomName },
                    { label: t('marriageCertificate.licenseId'), value: formData.groomLicenseId },
                    { label: t('marriageCertificate.state'), value: formData.groomLicenseState },
                    { label: t('marriageCertificate.placeOfBirth'), value: formData.groomBirthPlace },
                    { label: t('marriageCertificate.dateOfBirth'), value: formData.groomBirthDate },
                ]
            },
            {
                title: t('marriageCertificate.brideInfo'),
                fields: [
                    { label: t('marriageCertificate.brideName'), value: formData.brideName },
                    { label: t('marriageCertificate.licenseId'), value: formData.brideLicenseId },
                    { label: t('marriageCertificate.state'), value: formData.brideLicenseState },
                    { label: t('marriageCertificate.placeOfBirth'), value: formData.brideBirthPlace },
                    { label: t('marriageCertificate.dateOfBirth'), value: formData.brideBirthDate },
                ]
            },
            {
                title: t('marriageCertificate.signatures'),
                fields: [
                    { label: t('marriageCertificate.groomSignature'), value: formData.groomSignature },
                    { label: "Bride's Representative (Wali)", value: formData.brideRepSignature },
                ]
            },
            {
                title: t('marriageCertificate.witnesses'),
                fields: [
                    { label: t('marriageCertificate.witness1Name'), value: formData.witness1Name },
                    { label: t('marriageCertificate.witness2Name'), value: formData.witness2Name },
                ]
            },
            {
                title: t('marriageCertificate.appointmentTitle'),
                fields: [
                    { label: t('marriageCertificate.appointmentDate'), value: formData.appointmentDate },
                    { label: t('marriageCertificate.appointmentTime'), value: formatTime12Hour(formData.appointmentTime) },
                    { label: t('marriageCertificate.appointmentLocation'), value: formData.appointmentLocation === 'home' ? t('marriageCertificate.homeOption') : t('marriageCertificate.masjidOption') },
                    { label: "Address", value: formData.homeAddress || 'N/A' },
                ]
            }
        ];

        const template = buildPdfTemplate(title, sections, language, t('navbar.brandName'));
        await generateArabicPdf(template, "Marriage_Certificate_Application.pdf");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            window.scrollTo(0, 0);
        } else {
            setStatus({ type: 'info', message: 'Processing application...' });

            // 1. Send Confirmation Email via EmailJS FIRST
            const formattedTime = formatTime12Hour(formData.appointmentTime);

            // Prepare template parameters
            const templateParams = {
                form_title: "Marriage Certificate Application",
                user_name: `${formData.groomName} & ${formData.brideName}`,
                sender_name: "Iman Islamic Center (IIC)",
                from_name: "Iman Islamic Center (IIC)",
                user_email: formData.email,
                to_email: "dev@iman-islam.org", // Organization email
                reply_to: formData.email,
                date: formData.nikaahDate,
                location: formData.appointmentLocation === 'home' ? 'Home Visit' : 'At Masjid',
                phone: formData.phone || "Not provided",
                message: `New Marriage Certificate Application:
Phone: ${formData.phone}
Groom: ${formData.groomName}
Bride: ${formData.brideName}
Nikaah Date: ${formData.nikaahDate}
Email: ${formData.email}
Location: ${formData.appointmentLocation}
Appointment Date: ${formData.appointmentDate}
Appointment Time: ${formattedTime}`,
                formType: 'marriage',
                groomName: formData.groomName,
                brideName: formData.brideName,
                appointmentDate: formData.appointmentDate,
                appointmentTime: formData.appointmentTime,
                appointmentLocation: formData.appointmentLocation,
                nikaahDate: formData.nikaahDate
            };

            try {
                await sendEmail(templateParams);
                console.log('Email sent successfully via GAS');

                setStatus({
                    type: 'success',
                    message: `Application Submitted! Confirmation emails have been sent to you and IIC. Your PDF is being generated.`
                });
            } catch (err) {
                console.error('Failed to send email:', err);
                setStatus({
                    type: 'warning',
                    message: 'Application Submitted, but we had trouble sending the confirmation email. Your PDF is downloading below.'
                });
            } finally {
                // 2. Generate and download PDF regardless of email success
                try {
                    await generatePDF();
                } catch (pdfError) {
                    console.error("PDF generation failed:", pdfError);
                }
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
                                                <button
                                                    type="submit"
                                                    className="apply-btn"
                                                    disabled={status.type === 'info'}
                                                >
                                                    {status.type === 'info' ? t('common.processing') || 'Processing...' : t('marriageCertificate.nextButton')}
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
                                                <label className="form-label">Contact Phone</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className={`form-control form-control-lg ${validationErrors.phone ? 'is-invalid' : ''}`}
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={formData.phone}
                                                    placeholder="(123) 456-7890"
                                                />
                                                {validationErrors.phone && (
                                                    <div className="invalid-feedback">{validationErrors.phone}</div>
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
                                                <button
                                                    type="submit"
                                                    className="apply-btn"
                                                    disabled={status.type === 'info'}
                                                >
                                                    {status.type === 'info' ? t('common.processing') || 'Processing...' : t('marriageCertificate.submitButton')}
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
