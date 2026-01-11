import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './QuranMemorization.css';
import Logo from '../assets/logo.png';
import QuranMemorizationIcon from '../assets/quran_memorization.png';
import QuranLight from '../assets/quran_light.jpeg';

function QuranMemorization() {
    const { t } = useLanguage();

    return (
        <div className="quran-page-container">
            <div className="container my-5">
                <div className="quran-content-wrapper">
                    {/* Header Images */}
                    <div className="d-flex justify-content-between align-items-center mb-4 header-images">
                        <img src={Logo} alt="Iman Islamic Center Logo" className="header-logo" />
                        <img src={QuranMemorizationIcon} alt="Quran Memorization" className="header-program-logo" />
                        <img src={QuranLight} alt="Quran Light" className="header-middle-icon" />
                    </div>

                    {/* Header Section */}
                    <div className="text-center mb-5">
                        <h1 className="section-heading quran-page-title">{t('quranMemorization.pageTitle')}</h1>
                        <div className="divider mx-auto"></div>
                    </div>

                    {/* Introduction Text */}
                    <div className="quran-text-section mb-5">
                        <p className="quran-lead-text">
                            {t('quranMemorization.introPara1')}
                        </p>
                        <p>
                            {t('quranMemorization.introPara2')}
                        </p>
                        <p>
                            {t('quranMemorization.introPara3')}
                        </p>
                        <p>
                            {t('quranMemorization.introPara4')}
                        </p>
                    </div>

                    {/* Vision Section */}
                    <div className="quran-section mb-5">
                        <h2 className="section-subheading">{t('quranMemorization.visionTitle')}</h2>
                        <p>
                            {t('quranMemorization.visionText')}
                        </p>
                    </div>

                    {/* Mechanism Section */}
                    <div className="quran-section mb-5">
                        <h2 className="section-subheading">{t('quranMemorization.mechanismTitle')}</h2>
                        <h3 className="program-title">{t('quranMemorization.studentProgram')}</h3>

                        <ol className="program-list">
                            {t('quranMemorization.rules', { returnObjects: true }).map((rule, index) => (
                                <li key={index}>{rule}</li>
                            ))}
                        </ol>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons-container text-center mt-5">
                        <h3 className="mb-4">{t('quranMemorization.applyToday')}</h3>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <Link to="/quran-boys-application" className="btn btn-primary btn-lg apply-btn">
                                {t('navbar.quranBoys')}
                            </Link>
                            <Link to="/quran-girls-application" className="btn btn-primary btn-lg apply-btn">
                                {t('navbar.quranGirls')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuranMemorization;
