import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaHome, FaUser, FaEnvelope, FaPhone, FaFileInvoiceDollar, FaCalendar } from 'react-icons/fa';
import { sendEmail } from "../utils/emailService";
import StatusModal from './StatusModal';
import { DatePicker } from './DateTimePicker';
import jsPDF from 'jspdf';
import './URAPApplication.css';

const URAPApplication = () => {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        currentAddress: '',
        landlordName: '',
        landlordPhone: '',
        monthlyRent: '',
        amountOwed: '',
        monthsBehind: '',
        monthlyIncome: '',
        householdSize: '',
        evictionNotice: 'no',
        evictionDate: '',
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
        doc.text('Urgent Rental Assistance Program (URAP)', pageWidth / 2, 20, { align: 'center' });
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
        addField('Current Address', formData.currentAddress);
        addField('Landlord Name', formData.landlordName);
        addField('Landlord Phone', formData.landlordPhone);
        addField('Monthly Rent', '$' + formData.monthlyRent);
        addField('Amount Owed', '$' + formData.amountOwed);
        addField('Months Behind', formData.monthsBehind);
        addField('Monthly Income', '$' + formData.monthlyIncome);
        addField('Household Size', formData.householdSize);
        addField('Eviction Notice', formData.evictionNotice === 'yes' ? 'Yes' : 'No');
        if (formData.evictionNotice === 'yes') {
            addField('Eviction Date', formData.evictionDate);
        }
        addField('Reason for Assistance', formData.reason);
        addField('Application Date', formData.date);

        // Footer
        yPos += 10;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.text('This application will be reviewed urgently by the IIC assistance committee.', pageWidth / 2, yPos, { align: 'center' });
        doc.text('You will be contacted within 24-48 hours.', pageWidth / 2, yPos + 5, { align: 'center' });

        return doc;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Generate PDF
            const pdf = generatePDF();
            pdf.save(`URAP_Application_${formData.fullName.replace(/\s+/g, '_')}.pdf`);

            // Prepare params for sendEmail utility (GAS)
            const templateParams = {
                form_title: 'Urgent Rental Assistance Program (URAP)',
                user_name: formData.fullName,
                sender_name: "Iman Islamic Center (IIC)",
                from_name: "Iman Islamic Center (IIC)",
                user_email: formData.email,
                to_email: "dev@iman-islam.org", // Organization email
                reply_to: formData.email,
                date: formData.date,
                location: 'Iman Islamic Center',
                phone: formData.phone,
                message: `URGENT: Rental Assistance Application.
Landlord: ${formData.landlordName} (${formData.landlordPhone})
Rent: $${formData.monthlyRent}
Owed: $${formData.amountOwed} (${formData.monthsBehind} months)
Eviction Notice: ${formData.evictionNotice === 'yes' ? 'YES - Date: ' + formData.evictionDate : 'No'}
Reason: ${formData.reason}`,
                // Additional fields for sheet
                formType: 'Rental Assistance',
                sheetName: 'Rental Assistance',
                sheet_name: 'Rental Assistance',
                tabName: 'Rental Assistance',
                table_name: 'Rental Assistance',
                currentAddress: formData.currentAddress,
                landlordName: formData.landlordName,
                landlordPhone: formData.landlordPhone,
                monthlyRent: formData.monthlyRent,
                amountOwed: formData.amountOwed,
                monthsBehind: formData.monthsBehind,
                monthlyIncome: formData.monthlyIncome,
                householdSize: formData.householdSize,
                evictionNotice: formData.evictionNotice,
                evictionDate: formData.evictionDate,
                reason: formData.reason
            };

            // Use the centralized sendEmail utility
            await sendEmail(templateParams);

            setStatus({
                type: 'success',
                message: language === 'ar'
                    ? 'تم إرسال طلبك العاجل بنجاح! سيتم مراجعته في أقرب وقت ممكن.'
                    : 'Your urgent application has been submitted successfully! It will be reviewed as soon as possible.'
            });

            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                currentAddress: '',
                landlordName: '',
                landlordPhone: '',
                monthlyRent: '',
                amountOwed: '',
                monthsBehind: '',
                monthlyIncome: '',
                householdSize: '',
                evictionNotice: 'no',
                evictionDate: '',
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
        <div className={`urap-container ${language === 'ar' ? 'rtl' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="urap-header">
                <FaHome className="urap-icon" />
                <h1>{language === 'ar' ? 'برنامج المساعدة العاجلة للإيجار (URAP)' : 'Urgent Rental Assistance Program (URAP)'}</h1>
                <p>{language === 'ar'
                    ? 'املأ النموذج أدناه للحصول على مساعدة عاجلة في دفع الإيجار'
                    : 'Fill out the form below to request urgent assistance with rent payment'}</p>
            </div>

            <form onSubmit={handleSubmit} className="urap-form">
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
                        <label><FaHome className="input-icon" /> {language === 'ar' ? 'العنوان الحالي *' : 'Current Address *'}</label>
                        <input
                            type="text"
                            name="currentAddress"
                            value={formData.currentAddress}
                            onChange={handleChange}
                            required
                            placeholder={language === 'ar' ? 'أدخل عنوانك الحالي' : 'Enter your current address'}
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3><FaFileInvoiceDollar className="section-icon" /> {language === 'ar' ? 'معلومات المالك والإيجار' : 'Landlord & Rent Information'}</h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label>{language === 'ar' ? 'اسم المالك *' : 'Landlord Name *'}</label>
                            <input
                                type="text"
                                name="landlordName"
                                value={formData.landlordName}
                                onChange={handleChange}
                                required
                                placeholder={language === 'ar' ? 'اسم مالك العقار' : 'Property owner name'}
                            />
                        </div>

                        <div className="form-group">
                            <label><FaPhone className="input-icon" /> {language === 'ar' ? 'هاتف المالك *' : 'Landlord Phone *'}</label>
                            <input
                                type="tel"
                                name="landlordPhone"
                                value={formData.landlordPhone}
                                onChange={handleChange}
                                required
                                placeholder="(402) 123-4567"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>{language === 'ar' ? 'الإيجار الشهري *' : 'Monthly Rent *'}</label>
                            <input
                                type="number"
                                name="monthlyRent"
                                value={formData.monthlyRent}
                                onChange={handleChange}
                                required
                                placeholder="$"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="form-group">
                            <label>{language === 'ar' ? 'المبلغ المستحق *' : 'Amount Owed *'}</label>
                            <input
                                type="number"
                                name="amountOwed"
                                value={formData.amountOwed}
                                onChange={handleChange}
                                required
                                placeholder="$"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="form-group">
                            <label>{language === 'ar' ? 'عدد الأشهر المتأخرة *' : 'Months Behind *'}</label>
                            <input
                                type="number"
                                name="monthsBehind"
                                value={formData.monthsBehind}
                                onChange={handleChange}
                                required
                                placeholder={language === 'ar' ? 'عدد الأشهر' : 'Number of months'}
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3><FaUser className="section-icon" /> {language === 'ar' ? 'المعلومات المالية' : 'Financial Information'}</h3>

                    <div className="form-row">
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
                </div>

                <div className="form-section urgent-section">
                    <h3><FaCalendar className="section-icon" /> {language === 'ar' ? 'إشعار الإخلاء' : 'Eviction Notice'}</h3>

                    <div className="form-group">
                        <label>{language === 'ar' ? 'هل تلقيت إشعار إخلاء؟ *' : 'Have you received an eviction notice? *'}</label>
                        <select
                            name="evictionNotice"
                            value={formData.evictionNotice}
                            onChange={handleChange}
                            required
                        >
                            <option value="no">{language === 'ar' ? 'لا' : 'No'}</option>
                            <option value="yes">{language === 'ar' ? 'نعم' : 'Yes'}</option>
                        </select>
                    </div>

                    {formData.evictionNotice === 'yes' && (
                        <div className="form-group">
                            <DatePicker
                                label={language === 'ar' ? 'تاريخ الإخلاء المتوقع *' : 'Expected Eviction Date *'}
                                value={formData.evictionDate}
                                onChange={handleChange}
                                name="evictionDate"
                                required={formData.evictionNotice === 'yes'}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>{language === 'ar' ? 'سبب طلب المساعدة *' : 'Reason for Assistance *'}</label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder={language === 'ar' ? 'يرجى شرح وضعك المالي وسبب التأخر في دفع الإيجار...' : 'Please explain your financial situation and reason for rent delay...'}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn urgent-btn" disabled={isSubmitting}>
                        {isSubmitting
                            ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...')
                            : (language === 'ar' ? 'إرسال الطلب العاجل' : 'Submit Urgent Application')}
                    </button>
                </div>

                <p className="form-note urgent-note">
                    {language === 'ar'
                        ? '⚠️ هذا طلب عاجل. سيتم مراجعته من قبل لجنة المساعدة في المركز خلال 24-48 ساعة.'
                        : '⚠️ This is an urgent application. It will be reviewed by the IIC assistance committee within 24-48 hours.'}
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

export default URAPApplication;
