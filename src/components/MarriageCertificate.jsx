import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./MarriageCertificate.css";

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
        homeAddress: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            window.scrollTo(0, 0);
        } else {
            alert(`Application and Appointment Scheduled Successfully!`);
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
                                    <p className="marriage-subtitle">
                                        {step === 1 ? t('marriageCertificate.subtitle') : t('marriageCertificate.appointmentNote')}
                                    </p>
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
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.groomName}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseId')}</label>
                                                    <input
                                                        type="text"
                                                        name="groomLicenseId"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.groomLicenseId}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.state')}</label>
                                                    <select
                                                        name="groomLicenseState"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.groomLicenseState}
                                                    >
                                                        <option value="">{t('marriageCertificate.selectState')}</option>
                                                        {usStates.map(state => (
                                                            <option key={state} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.placeOfBirth')}</label>
                                                    <input
                                                        type="text"
                                                        name="groomBirthPlace"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.groomBirthPlace}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.dateOfBirth')}</label>
                                                    <input
                                                        type="date"
                                                        name="groomBirthDate"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.groomBirthDate}
                                                    />
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
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.brideName}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseId')}</label>
                                                    <input
                                                        type="text"
                                                        name="brideLicenseId"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.brideLicenseId}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.state')}</label>
                                                    <select
                                                        name="brideLicenseState"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.brideLicenseState}
                                                    >
                                                        <option value="">{t('marriageCertificate.selectState')}</option>
                                                        {usStates.map(state => (
                                                            <option key={state} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.placeOfBirth')}</label>
                                                    <input
                                                        type="text"
                                                        name="brideBirthPlace"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.brideBirthPlace}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.dateOfBirth')}</label>
                                                    <input
                                                        type="date"
                                                        name="brideBirthDate"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.brideBirthDate}
                                                    />
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
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.groomSignature}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.date')}</label>
                                                    <input
                                                        type="date"
                                                        name="groomSignatureDate"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.groomSignatureDate}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">{t('marriageCertificate.brideRepSignature')}</label>
                                                    <input
                                                        type="text"
                                                        name="brideRepSignature"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.brideRepSignature}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="form-label">{t('marriageCertificate.date')}</label>
                                                    <input
                                                        type="date"
                                                        name="brideRepSignatureDate"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.brideRepSignatureDate}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                    <input
                                                        type="text"
                                                        name="brideRepLicenseId"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.brideRepLicenseId}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label">{t('marriageCertificate.state')}</label>
                                                    <select
                                                        name="brideRepLicenseState"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.brideRepLicenseState}
                                                    >
                                                        <option value="">{t('marriageCertificate.selectState')}</option>
                                                        {usStates.map(state => (
                                                            <option key={state} value={state}>{state}</option>
                                                        ))}
                                                    </select>
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
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.witness1Name}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                    <input
                                                        type="text"
                                                        name="witness1Id"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.witness1Id}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.witness2Name')}</label>
                                                    <input
                                                        type="text"
                                                        name="witness2Name"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.witness2Name}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                    <input
                                                        type="text"
                                                        name="witness2Id"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.witness2Id}
                                                    />
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
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.authorizedPersonName}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                    <input
                                                        type="text"
                                                        name="authorizedPersonId"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.authorizedPersonId}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.imamName')}</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={t('marriageCertificate.imamNameValue')}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.imamLicenseId')}</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={t('marriageCertificate.imamPlaceholder')}
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
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.dowryAmount}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">{t('marriageCertificate.nikaahDate')}</label>
                                                    <input
                                                        type="date"
                                                        name="nikaahDate"
                                                        className="form-control"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.nikaahDate}
                                                    />
                                                </div>
                                            </div>

                                            <div className="text-center mt-4">
                                                <button type="submit" className="btn btn-primary btn-lg">
                                                    {t('marriageCertificate.nextButton')}
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {step === 2 && (
                                        <div className="appointment-section">
                                            <div className="row mb-4">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">{t('marriageCertificate.appointmentDate')}</label>
                                                    <input
                                                        type="date"
                                                        name="appointmentDate"
                                                        className="form-control form-control-lg"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.appointmentDate}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">{t('marriageCertificate.appointmentTime')}</label>
                                                    <input
                                                        type="time"
                                                        name="appointmentTime"
                                                        className="form-control form-control-lg"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.appointmentTime}
                                                    />
                                                </div>
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
                                                        className="form-control form-control-lg"
                                                        required={formData.appointmentLocation === 'home'}
                                                        onChange={handleChange}
                                                        value={formData.homeAddress}
                                                    />
                                                </div>
                                            )}

                                            <div className="d-flex justify-content-between mt-5">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-lg"
                                                    onClick={handleBack}
                                                >
                                                    {t('marriageCertificate.backButton')}
                                                </button>
                                                <button type="submit" className="btn btn-primary btn-lg">
                                                    {t('marriageCertificate.submitButton')}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MarriageCertificate;
