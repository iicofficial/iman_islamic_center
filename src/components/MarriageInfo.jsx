import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './MarriageInfo.css';
import Logo from '../assets/riblogo_pink.png';
import MarriageContractIcon from '../assets/marriage_contract.png';

function MarriageInfo() {
    const { t } = useLanguage();

    return (
        <div className="marriage-info-container">
            <div className="container my-5">
                <div className="marriage-content-wrapper">
                    {/* Header Images with Rose in middle */}
                    <div className="d-flex justify-content-between align-items-start mb-4 header-images">
                        <img src={Logo} alt="Iman Islamic Center Logo" className="header-logo" />
                        <img src={MarriageContractIcon} alt="Marriage Contract Icon" className="header-right-icon" />
                    </div>

                    {/* Header Section */}
                    <div className="text-center mb-5">
                        <h1 className="section-heading marriage-page-title">{t('marriageInfo.pageTitle')}</h1>
                        <div className="divider mx-auto"></div>
                    </div>

                    {/* Content Section */}
                    <div className="marriage-text-section mb-5">
                        <p className="lead-text">
                            {t('marriageInfo.para1')}
                        </p>
                        <p>
                            {t('marriageInfo.para2')}
                        </p>
                        <p>
                            {t('marriageInfo.para3')}
                        </p>
                        <p>
                            {t('marriageInfo.para4')}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons-container text-center mt-5">
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <Link to="/marriage-certificate" className="btn btn-primary btn-lg apply-btn">
                                {t('navbar.applyOnlineForm')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarriageInfo;
