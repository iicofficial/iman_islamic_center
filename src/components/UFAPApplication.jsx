
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaFileInvoiceDollar, FaUser, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import { sendEmail } from "../utils/emailService";
import StatusModal from './StatusModal';
import jsPDF from 'jspdf';
import './UFAPApplication.css';

const UFAPApplication = () => {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        utilityType: '',
        accountNumber: '',
        amountRequested: '',
        monthlyIncome: '',
        householdSize: '',
        reason: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Utility Financial Assistance Program (UFAP)', pageWidth / 2, 20, { align: 'center' });
        doc.text('Iman Islamic Center', pageWidth / 2, 28, { align: 'center' });

        // Line separator
        doc.setLineWidth(0.5);
        doc.line(20, 32, pageWidth - 20, 32);

        // Application details
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        let yPos = 45;

        const addField = (label, value) => {
            doc.setFont('helvetica', 'bold');
            doc.text(label + ':', 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(value || 'N/A', 80, yPos);
            yPos += 8;
        };

        addField('Full Name', formData.fullName);
        addField('Email', formData.email);
        addField('Phone Number', formData.phone);
        addField('Address', formData.address);
        addField('Utility Type', formData.utilityType);
        addField('Account Number', formData.accountNumber);
        addField('Amount Requested', '$' + formData.amountRequested);
        addField('Monthly Income', '$' + formData.monthlyIncome);
        addField('Household Size', formData.householdSize);
        addField('Reason for Assistance', formData.reason);
        addField('Application Date', formData.date);

        // Footer
        yPos += 10;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.text('This application will be reviewed by the IIC assistance committee.', pageWidth / 2, yPos, { align: 'center' });
        doc.text('You will be contacted within 3-5 business days.', pageWidth / 2, yPos + 5, { align: 'center' });

        return doc;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Generate PDF
            const pdf = generatePDF();
            pdf.save(`UFAP_Application_${formData.fullName.replace(/\s+/g, '_')}.pdf`);

            // Prepare params for sendEmail utility (GAS)
            const templateParams = {
                form_title: 'Utility Financial Assistance Program (UFAP)',
                user_name: formData.fullName,
                sender_name: "Iman Islamic Center (IIC)",
                from_name: "Iman Islamic Center (IIC)",
                user_email: formData.email,
                to_email: "dev@iman-islam.org", // Organization email
                reply_to: formData.email,
                date: formData.date,
                location: 'Iman Islamic Center',
                phone: formData.phone,
                message: `New UFAP application received.
Utility Type: ${formData.utilityType}
Account: ${formData.accountNumber}
Amount Requested: $${formData.amountRequested}
Income: $${formData.monthlyIncome}
Household: ${formData.householdSize}
Reason: ${formData.reason} `,
                // Additional fields for sheet
                formType: 'Utility Assistance',
                sheetName: 'Utility Assistance',
                sheet_name: 'Utility Assistance',
                tabName: 'Utility Assistance',
                table_name: 'Utility Assistance',
                address: formData.address,
                utilityType: formData.utilityType,
                accountNumber: formData.accountNumber,
                amountRequested: formData.amountRequested,
                monthlyIncome: formData.monthlyIncome,
                householdSize: formData.householdSize,
                reason: formData.reason
            };

            // Use the centralized sendEmail utility
            await sendEmail(templateParams);

            setStatus({
                type: 'success',
                message: language === 'ar'
                    ? 'تم إرسال طلبك بنجاح! سيتم مراجعته قريباً.'
                    : 'Your application has been submitted successfully! It will be reviewed shortly.'
            });

            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                address: '',
                utilityType: '',
                accountNumber: '',
                amountRequested: '',
                monthlyIncome: '',
                householdSize: '',
                reason: '',
                date: new Date().toISOString().split('T')[0]
            });

        } catch (error) {
            console.error('Submission error:', error);
            setStatus({
                type: 'error',
                message: language === 'ar'
                    ? 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.'
                    : 'An error occurred while submitting. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`ufap-container ${language === 'ar' ? 'rtl' : ''} `} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="ufap-header">
                <FaFileInvoiceDollar className="ufap-icon" />
                <h1>{language === 'ar' ? 'برنامج المساعدة المالية للمرافق (UFAP)' : 'Utility Financial Assistance Program (UFAP)'}</h1>
                <p>{language === 'ar'
                    ? 'املأ النموذج أدناه للحصول على المساعدة في فواتير المرافق الخاصة بك'
                    : 'Fill out the form below to request assistance with your utility bills'}</p>
            </div>

            <form onSubmit={handleSubmit} className="ufap-form">
                <div className="form-section">
                    <h3><FaUser className="section-icon" /> {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}</h3>

                    <div className="form-group">
                        <label>{language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label><FaEnvelope className="input-icon" /> {language === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label><FaPhone className="input-icon" /> {language === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="(402) 123-4567"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label><FaHome className="input-icon" /> {language === 'ar' ? 'العنوان *' : 'Address *'}</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder={language === 'ar' ? 'أدخل عنوانك الكامل' : 'Enter your full address'}
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3><FaFileInvoiceDollar className="section-icon" /> {language === 'ar' ? 'تفاصيل المساعدة' : 'Assistance Details'}</h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label>{language === 'ar' ? 'نوع المرافق *' : 'Utility Type *'}</label>
                            <select
                                name="utilityType"
                                value={formData.utilityType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">{language === 'ar' ? 'اختر نوع المرافق' : 'Select utility type'}</option>
                                <option value="Electric">{language === 'ar' ? 'كهرباء' : 'Electric'}</option>
                                <option value="Gas">{language === 'ar' ? 'غاز' : 'Gas'}</option>
                                <option value="Water">{language === 'ar' ? 'ماء' : 'Water'}</option>
                                <option value="Internet">{language === 'ar' ? 'إنترنت' : 'Internet'}</option>
                                <option value="Other">{language === 'ar' ? 'أخرى' : 'Other'}</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>{language === 'ar' ? 'رقم الحساب' : 'Account Number'}</label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                placeholder={language === 'ar' ? 'رقم حساب المرافق' : 'Utility account number'}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>{language === 'ar' ? 'المبلغ المطلوب *' : 'Amount Requested *'}</label>
                            <input
                                type="number"
                                name="amountRequested"
                                value={formData.amountRequested}
                                onChange={handleChange}
                                required
                                placeholder="$"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="form-group">
                            <label>{language === 'ar' ? 'الدخل الشهري *' : 'Monthly Income *'}</label>
                            <input
                                type="number"
                                name="monthlyIncome"
                                value={formData.monthlyIncome}
                                onChange={handleChange}
                                required
                                placeholder="$"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="form-group">
                            <label>{language === 'ar' ? 'حجم الأسرة *' : 'Household Size *'}</label>
                            <input
                                type="number"
                                name="householdSize"
                                value={formData.householdSize}
                                onChange={handleChange}
                                required
                                placeholder={language === 'ar' ? 'عدد الأفراد' : 'Number of people'}
                                min="1"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>{language === 'ar' ? 'سبب طلب المساعدة *' : 'Reason for Assistance *'}</label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder={language === 'ar' ? 'يرجى شرح وضعك المالي الحالي...' : 'Please explain your current financial situation...'}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting
                            ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...')
                            : (language === 'ar' ? 'إرسال الطلب' : 'Submit Application')}
                    </button>
                </div>

                <p className="form-note">
                    {language === 'ar'
                        ? '* سيتم مراجعته من قبل لجنة المساعدة في المركز وسيتم الاتصال بك خلال 3-5 أيام عمل.'
                        : '* Your application will be reviewed by the IIC assistance committee and you will be contacted within 3-5 business days.'}
                </p>
            </form>

            <StatusModal
                show={!!status.message}
                status={status}
                onClose={() => setStatus({ type: '', message: '' })}
            />
        </div>
    );
};

export default UFAPApplication;
