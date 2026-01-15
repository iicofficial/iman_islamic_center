import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./QuranGirlsApplication.css";
import emailjs from '@emailjs/browser';
import jsPDF from "jspdf";
import logo from "../assets/logo.png";

function QuranGirlsApplication() {
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
        phoneAck: "",
        agreeToTerms: false
    });

    const [status, setStatus] = useState({ type: '', message: '' });

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
        doc.text("Quran Memorization Program (Girls)", 55, 28);
        doc.setTextColor(0, 0, 0);

        let yPos = 55;
        const lineHeight = 8;
        const leftCol = margin;
        const rightCol = pageWidth / 2 + 10;

        // Helper to add lines
        const addLine = (label, value, x = leftCol) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(`${label}:`, x, yPos);
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
        yPos += 8;
        doc.text("Emergency Phone: " + formData.phoneAck, margin, yPos);

        doc.save(`IIC_Quran_Girls_${formData.studentName.replace(/\s+/g, '_')}.pdf`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <div className="quran-girls-application-page">
            <div className="container py-5">
                <div className="quran-application-card">
                    <h1 className="application-title">{t('quranGirls.title')}</h1>
                    <p className="application-subtitle">{t('quranGirls.subtitle')}</p>

                    <form onSubmit={handleSubmit}>
                        {/* Student Information */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranGirls.studentInfo')}</h3>

                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <label className="form-label">{t('quranGirls.studentName')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.grade')}</label>
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

                            <div className="row">
                                <div className="col-md-2 mb-3">
                                    <label className="form-label">{t('quranGirls.age')}</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-10 mb-3">
                                    <label className="form-label">{t('quranGirls.address')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">{t('quranGirls.school')}</label>
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
                            <h3 className="section-title">{t('quranGirls.guardianInfo')}</h3>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label className="form-label">{t('quranGirls.guardianName')}</label>
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
                                    <label className="form-label">{t('quranGirls.kinship')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="kinship"
                                        value={formData.kinship}
                                        onChange={handleChange}
                                        placeholder={t('quranGirls.kinshipPlaceholder')}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.guardianJob')}</label>
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
                            <h3 className="section-title">{t('quranGirls.contactInfo')}</h3>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.workPhone')}</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="workPhone"
                                        value={formData.workPhone}
                                        onChange={handleChange}
                                        placeholder="(402) 123-4567"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.homePhone')}</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="homePhone"
                                        value={formData.homePhone}
                                        onChange={handleChange}
                                        placeholder="(402) 123-4567"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.mobile')}</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="(402) 123-4567"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">{t('quranGirls.email')}</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    required
                                />
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
                                        className="form-control"
                                        name="guardianNameAck"
                                        value={formData.guardianNameAck}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.signature')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="signature"
                                        value={formData.signature}
                                        onChange={handleChange}
                                        placeholder={t('quranGirls.signaturePlaceholder')}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.phoneAck')}</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phoneAck"
                                        value={formData.phoneAck}
                                        onChange={handleChange}
                                        placeholder="(402) 123-4567"
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
                                    {t('quranGirls.agreeToTerms')}
                                </label>
                            </div>
                        </div>

                        {/* Status Message Display */}
                        {status.message && (
                            <div className={`alert mt-4 ${status.type === 'success' ? 'alert-success' :
                                    status.type === 'error' ? 'alert-danger' :
                                        'alert-warning'
                                }`} role="alert">
                                {status.message}
                            </div>
                        )}

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary btn-submit">
                                {t('quranGirls.submitButton')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default QuranGirlsApplication;
