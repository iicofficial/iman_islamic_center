import React from 'react';
import { useLanguage } from "../context/LanguageContext";
import './ProgramPolicies.css';
import ribbonLogo from '../assets/riblogo_green.png';

const ProgramPolicies = () => {
    const { t, language } = useLanguage();

    // Using quranMemorization.policies which has the combined gender policies
    const policies = t('quranMemorization.policies');

    return (
        <div className="policies-page">
            <img src={ribbonLogo} alt="" className="policies-ribbon" />
            <div className="container">
                <div className="policies-content">
                    <div className="policies-badge">
                        {language === 'ar' ? 'السياسات العامة' : 'Program Guidelines'}
                    </div>
                    <h1 className="policies-title">{t('quranBoys.programPolicies')}</h1>

                    <div className="policies-card">
                        <ul className="policies-list-main">
                            {policies.map((policy, index) => (
                                <li key={index} className="policy-item">
                                    {policy}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramPolicies;
