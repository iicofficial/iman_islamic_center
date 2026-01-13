import React from 'react';
import { useLanguage } from "../context/LanguageContext";
import './ProgramPolicies.css';
import ribbonLogo from '../assets/riblogo_green.png';

const ProgramPolicies = () => {
    const { t, language } = useLanguage();

    // Using the quranBoys keys since the content is identical
    const policies = [
        'policy1', 'policy2', 'policy3', 'policy4', 'policy5',
        'policy6', 'policy7', 'policy8', 'policy9'
    ];

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
                            {policies.map((policyKey, index) => (
                                <li key={index} className="policy-item">
                                    {t(`quranBoys.${policyKey}`)}
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
