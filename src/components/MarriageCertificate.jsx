import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./MarriageCertificate.css";

function MarriageCertificate() {
    const { t } = useLanguage();
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
        nikaahDate: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Marriage Certificate Application submitted successfully!`);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const usStates = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
        "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
        "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
        "New Hampshire", "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
        "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
        "West Virginia", "Wisconsin", "Wyoming"
    ];

    return (
        <div className="marriage-certificate-page">
            <section className="marriage-certificate-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="marriage-certificate-card">
                                <div className="text-center mb-4">
                                    <h2 className="marriage-title">{t('marriageCertificate.title')}</h2>
                                    <p className="marriage-subtitle">{t('marriageCertificate.subtitle')}</p>
                                </div>

                                <form onSubmit={handleSubmit}>
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
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">{t('marriageCertificate.imamName')}</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value="Abdelaziz Al Abbasi"
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
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            {t('marriageCertificate.submitButton')}
                                        </button>
                                    </div>
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
