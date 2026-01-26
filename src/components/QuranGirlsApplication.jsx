import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./QuranGirlsApplication.css";
import { sendEmail } from "../utils/emailService";
import StatusModal from './StatusModal';
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import { generateArabicPdf, buildPdfTemplate } from "../utils/pdfGenerator";

function QuranGirlsApplication() {
    const { t, language } = useLanguage();
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
        phoneAck: "",
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
        const phoneRegex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const formatPhoneNumber = (value) => {
        const phoneNumber = value.replace(/\D/g, '');
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

        if (name === 'workPhone' || name === 'homePhone' || name === 'mobile' || name === 'phoneAck') {
            newValue = formatPhoneNumber(value);
        }

        setFormData({ ...formData, [name]: newValue });

        if (validationErrors[name]) {
            setValidationErrors({ ...validationErrors, [name]: '' });
        }
    };

    // Validate individual field on blur
    // Validate individual field on blur
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const errors = { ...validationErrors };

        // Generic required check for most fields
        const requiredFields = [
            'studentName', 'grade', 'age', 'school', 'address',
            'guardianName', 'kinship', 'guardianJob',
            'email', 'guardianNameAck', 'signature', 'phoneAck'
        ];

        if (requiredFields.includes(name) && (!value || value.trim() === '')) {
            errors[name] = 'This field is required';
        } else {
            // Remove "required" error if value exists, then check specific formats
            delete errors[name];

            if (name === 'age' && !validateAge(value)) {
                errors.age = 'Student must be between 5-15 years of age';
            }

            if (name === 'address' && !validateAddress(value)) {
                errors.address = 'Student must currently reside in Lincoln, NE';
            }

            if (name === 'email' && !validateEmail(value)) {
                errors.email = 'Please enter a valid email address';
            }
        }

        // Phone specific validation
        if (['workPhone', 'homePhone', 'mobile', 'phoneAck'].includes(name)) {
            if (value && value.trim() !== '' && !validatePhone(value)) {
                errors[name] = 'Invalid phone format: (123)456-7890';
            } else {
                delete errors[name];
            }
        }

        setValidationErrors(errors);
    };

    const validateForm = () => {
        const errors = {};

        if (!validateAge(formData.age)) {
            errors.age = 'Student must be between 5-15 years of age';
        }

        if (!validateAddress(formData.address)) {
            errors.address = 'Student must currently reside in Lincoln, NE';
        }

        if (!formData.studentName || formData.studentName.trim() === '') errors.studentName = 'Student name is required';
        if (!formData.grade || formData.grade.trim() === '') errors.grade = 'Grade is required';
        if (!formData.school || formData.school.trim() === '') errors.school = 'School is required';
        if (!formData.guardianName || formData.guardianName.trim() === '') errors.guardianName = 'Guardian name is required';
        if (!formData.kinship || formData.kinship.trim() === '') errors.kinship = 'Kinship is required';
        if (!formData.guardianJob || formData.guardianJob.trim() === '') errors.guardianJob = 'Guardian job is required';
        // Note: Mobile/phoneAck is required, others are optional
        if (!formData.mobile || formData.mobile.trim() === '') errors.mobile = 'Mobile number is required';
        if (!formData.phoneAck || formData.phoneAck.trim() === '') errors.phoneAck = 'Phone number is required';

        // Validate format of provided phone numbers
        if (formData.workPhone && !validatePhone(formData.workPhone)) {
            errors.workPhone = 'Please enter a valid US phone number: (123)456-7890';
        }
        if (formData.homePhone && !validatePhone(formData.homePhone)) {
            errors.homePhone = 'Please enter a valid US phone number: (123)456-7890';
        }
        if (formData.mobile && !validatePhone(formData.mobile)) {
            errors.mobile = 'Please enter a valid US phone number: (123)456-7890';
        }
        if (formData.phoneAck && !validatePhone(formData.phoneAck)) {
            errors.phoneAck = 'Please enter a valid US phone number: (123)456-7890';
        }

        if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const generatePDF = async () => {
        const title = t('quranGirls.title');
        const sections = [
            {
                title: t('quranGirls.studentInfo'),
                fields: [
                    { label: t('quranGirls.studentName'), value: formData.studentName },
                    { label: t('quranGirls.age'), value: formData.age },
                    { label: t('quranGirls.grade'), value: formData.grade },
                    { label: t('quranGirls.school'), value: formData.school },
                    { label: t('quranGirls.address'), value: formData.address },
                ]
            },
            {
                title: t('quranGirls.guardianInfo'),
                fields: [
                    { label: t('quranGirls.guardianName'), value: formData.guardianName },
                    { label: t('quranGirls.kinship'), value: formData.kinship },
                    { label: t('quranGirls.guardianJob'), value: formData.guardianJob },
                    { label: t('quranGirls.mobile'), value: formData.mobile },
                    { label: t('quranGirls.email'), value: formData.email },
                ]
            },
            {
                title: t('quranGirls.acknowledgement'),
                fields: [
                    { label: t('quranGirls.guardianNameAck'), value: formData.guardianNameAck },
                    { label: t('quranGirls.signature'), value: formData.signature },
                    { label: t('quranGirls.phoneAck'), value: formData.phoneAck },
                ]
            }
        ];

        const template = buildPdfTemplate(title, sections, language, t('navbar.brandName'));
        await generateArabicPdf(template, `IIC_Quran_Girls_${formData.studentName.replace(/\s+/g, '_')}.pdf`);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
            setStatus({
                type: 'error',
                message: 'Please fix the validation errors before submitting.'
            });
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setStatus({ type: 'info', message: 'Processing application...' });

        // 1. EmailJS Configuration
        const templateParams = {
            form_title: "Quran Memorization Program (Girls)",
            user_name: formData.studentName,
            sender_name: "Iman Islamic Center (IIC)",
            from_name: "Iman Islamic Center (IIC)",
            user_email: formData.email,
            to_email: "dev@iman-islam.org", // Organization email
            reply_to: formData.email,
            date: new Date().toLocaleDateString(),
            location: "Iman Islamic Center",
            phone: formData.mobile,
            message: `New application received for ${formData.studentName}.
Grade: ${formData.grade}
Age: ${formData.age}
School: ${formData.school}
Address: ${formData.address}
Guardian: ${formData.guardianName} (${formData.kinship})
Contact: ${formData.mobile} / ${formData.email}`,
            formType: 'girls',
            studentName: formData.studentName,
            age: formData.age,
            grade: formData.grade,
            school: formData.school,
            guardianName: formData.guardianName,
            mobile: formData.mobile,
            address: formData.address
        };

        try {
            await sendEmail(templateParams);
            console.log('Email sent successfully via GAS');

            setStatus({
                type: 'success',
                message: `Application Submitted! Confirmation emails have been sent to you and IIC. PDF is downloading.`
            });
        } catch (err) {
            console.error('Failed to send email:', err);
            setStatus({
                type: 'warning',
                message: 'Application Submitted, but we had trouble sending the email. Your PDF is downloading below.'
            });
        } finally {
            // 2. Generate PDF regardless of email success
            try {
                await generatePDF();
            } catch (error) {
                console.error("PDF Generation Error", error);
            }
        }
    };

    return (
        <div className="quran-girls-application-page">
            <div className="container py-5">
                <div className="quran-application-card">
                    <h1 className="application-title">{t('quranGirls.title')}</h1>
                    <p className="application-subtitle" style={{ color: 'red', fontWeight: 'bold' }}>* All Fields Required</p>
                    <p className="application-subtitle">{t('quranGirls.subtitle')}</p>

                    <form onSubmit={handleSubmit}>
                        {/* Student Information */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranGirls.studentInfo')}</h3>

                            <div className="mb-3">
                                <label className="form-label">{t('quranGirls.studentName')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors.studentName ? 'is-invalid' : ''}`}
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {validationErrors.studentName && (
                                    <div className="error-message"><small className="text-danger">{validationErrors.studentName}</small></div>
                                )}
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.age')}</label>
                                    <select
                                        className={`form-control ${validationErrors.age ? 'is-invalid' : ''}`}
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    >
                                        <option value="">{t('common.select')}</option>
                                        {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                    {validationErrors.age && (
                                        <div className="error-message"><small className="text-danger">{validationErrors.age}</small></div>
                                    )}
                                </div>
                                <div className="col-md-8 mb-3">
                                    <label className="form-label">{t('quranGirls.grade')}</label>
                                    <input
                                        type="text"
                                        className={`form-control ${validationErrors.grade ? 'is-invalid' : ''}`}
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {validationErrors.grade && (
                                        <div className="error-message"><small className="text-danger">{validationErrors.grade}</small></div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">{t('quranGirls.address')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    placeholder="Lincoln, NE"
                                />
                                {validationErrors.address && (
                                    <div className="error-message"><small className="text-danger">{validationErrors.address}</small></div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">{t('quranGirls.school')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors.school ? 'is-invalid' : ''}`}
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {validationErrors.school && (
                                    <div className="error-message"><small className="text-danger">{validationErrors.school}</small></div>
                                )}
                            </div>
                        </div>

                        {/* Guardian Information */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranGirls.guardianInfo')}</h3>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label className="form-label">{t('quranGirls.guardianName')}</label>
                                    <input
                                        type="text"
                                        className={`form-control ${validationErrors.guardianName ? 'is-invalid' : ''}`}
                                        name="guardianName"
                                        value={formData.guardianName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {validationErrors.guardianName && (
                                        <div className="error-message"><small className="text-danger">{validationErrors.guardianName}</small></div>
                                    )}
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">{t('quranGirls.kinship')}</label>
                                    <input
                                        type="text"
                                        className={`form-control ${validationErrors.kinship ? 'is-invalid' : ''}`}
                                        name="kinship"
                                        value={formData.kinship}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={t('quranGirls.kinshipPlaceholder')}
                                        required
                                    />
                                    {validationErrors.kinship && (
                                        <div className="error-message"><small className="text-danger">{validationErrors.kinship}</small></div>
                                    )}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.guardianJob')}</label>
                                    <input
                                        type="text"
                                        className={`form-control ${validationErrors.guardianJob ? 'is-invalid' : ''}`}
                                        name="guardianJob"
                                        value={formData.guardianJob}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {validationErrors.guardianJob && (
                                        <div className="error-message"><small className="text-danger">{validationErrors.guardianJob}</small></div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">{t('quranGirls.mobile')}</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${validationErrors.mobile ? 'is-invalid' : ''}`}
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        maxLength="13"
                                        required
                                    />
                                    {validationErrors.mobile && (
                                        <div className="error-message"><small className="text-danger">{validationErrors.mobile}</small></div>
                                    )}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">{t('quranGirls.email')}</label>
                                    <input
                                        type="email"
                                        className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="example@email.com"
                                        required
                                    />
                                    {validationErrors.email && (
                                        <div className="error-message"><small className="text-danger">{validationErrors.email}</small></div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Program Policies */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranGirls.programPolicies')}</h3>
                            <ol className="policies-list">
                                <li>{t('quranGirls.policy1')}</li>
                                <li>{t('quranGirls.policy2')}</li>
                                <li>{t('quranGirls.policy3')}</li>
                                <li>{t('quranGirls.policy4')}</li>
                                <li>{t('quranGirls.policy5')}</li>
                                <li>{t('quranGirls.policy6')}</li>
                                <li>{t('quranGirls.policy7')}</li>
                                <li>{t('quranGirls.policy8')}</li>
                                <li>{t('quranGirls.policy9')}</li>
                            </ol>
                        </div>

                        {/* Acknowledgement */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranGirls.acknowledgement')}</h3>

                            <div className="acknowledgement-text">
                                <p><strong>{t('quranGirls.ackStatement1')}</strong></p>
                                <p>{t('quranGirls.ackStatement2')}</p>
                            </div>

                            <div className="row mt-4">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.guardianNameAck')}</label>
                                    <input
                                        type="text"
                                        className={`form-control ${validationErrors.guardianNameAck ? 'is-invalid' : ''}`}
                                        name="guardianNameAck"
                                        value={formData.guardianNameAck}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {validationErrors.guardianNameAck && (
                                        <div className="error-message"><small className="text-danger">{validationErrors.guardianNameAck}</small></div>
                                    )}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.signature')}</label>
                                    <input
                                        type="text"
                                        className={`form-control ${validationErrors.signature ? 'is-invalid' : ''}`}
                                        name="signature"
                                        value={formData.signature}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={t('quranGirls.signaturePlaceholder')}
                                        required
                                    />
                                    {validationErrors.signature && (
                                        <div className="error-message"><small className="text-danger">{validationErrors.signature}</small></div>
                                    )}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.phoneAck')}</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${validationErrors.phoneAck ? 'is-invalid' : ''}`}
                                        name="phoneAck"
                                        value={formData.phoneAck}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {validationErrors.phoneAck && (
                                        <div className="error-message"><small className="text-danger">{validationErrors.phoneAck}</small></div>
                                    )}
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
                                    {t('quranGirls.agreeToTerms')}
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
                            <button
                                type="submit"
                                className="btn btn-primary btn-submit"
                                disabled={status.type === 'info'}
                            >
                                {status.type === 'info' ? t('common.processing') || 'Processing...' : t('quranGirls.submitButton')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default QuranGirlsApplication;
