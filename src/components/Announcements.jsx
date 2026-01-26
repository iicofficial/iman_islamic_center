import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Navbar from './Navbar';
import Footer from './Footer';
import logo from '../assets/hero.png';
import './Announcements.css';
import { FaBullhorn, FaFileAlt, FaCalendarCheck, FaSignOutAlt, FaLock } from 'react-icons/fa';

const Announcements = () => {
    const { currentUser, logout } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking/loading data
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="portal-loading">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">{t('announcements.verifying')}</p>
            </div>
        );
    }

    return (
        <div className="portal-wrapper">
            <Navbar /> {/* Optional: Keep main navbar or make a custom one */}

            <div className="portal-container container pb-5">
                <div className="portal-header d-flex justify-content-between align-items-end mb-5">
                    <div>
                        <img src={logo} alt="IIC Logo" style={{ height: '70px', marginBottom: '15px' }} />
                        <div className="d-block"></div>
                        <span className="badge bg-gold mb-2"><FaLock className="me-1" /> {t('announcements.secureBadge')}</span>
                        <h1 className="portal-title">{t('announcements.portalTitle')}</h1>
                        <p className="portal-subtitle">{t('announcements.welcome')} <span className="admin-name">{currentUser?.displayName}</span></p>
                    </div>
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                        <FaSignOutAlt className="me-2" /> {t('announcements.signOut')}
                    </button>
                </div>

                <div className="row g-4">
                    {/* Announcement 1 - Urgent */}
                    <div className="col-md-8">
                        <div className="portal-panel main-panel p-4 h-100">
                            <div className="panel-header mb-4">
                                <h3 className="portal-section-title"><FaBullhorn className="me-2 text-primary" /> {t('announcements.priorityTitle')}</h3>
                            </div>

                            <div className="announcement-item p-3 mb-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <span className="badge bg-danger">{t('announcements.urgentBadge')}</span>
                                    <small className="text-muted">Jan 24, 2026</small>
                                </div>
                                <h5 className="announcement-title">{t('announcements.announcement1Title')}</h5>
                                <p className="announcement-text">
                                    {t('announcements.announcement1Text')}
                                </p>
                            </div>

                            <div className="announcement-item p-3 mb-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <span className="badge bg-info text-dark">{t('announcements.updateBadge')}</span>
                                    <small className="text-muted">Jan 20, 2026</small>
                                </div>
                                <h5 className="announcement-title">{t('announcements.announcement2Title')}</h5>
                                <p className="announcement-text">
                                    {t('announcements.announcement2Text')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Quick Links */}
                    <div className="col-md-4">
                        <div className="portal-panel sidebar-panel p-4 mb-4">
                            <h4 className="portal-section-title mb-3"><FaFileAlt className="me-2 text-primary" /> {t('announcements.resourcesTitle')}</h4>
                            <ul className="portal-links">
                                <li><a href="#">{t('announcements.handbook')}</a></li>
                                <li><a href="#">{t('announcements.leaveRequest')}</a></li>
                                <li><a href="#">{t('announcements.incidentReport')}</a></li>
                            </ul>
                        </div>

                        <div className="portal-panel sidebar-panel p-4">
                            <h4 className="portal-section-title mb-3"><FaCalendarCheck className="me-2 text-success" /> {t('announcements.dutiesTitle')}</h4>
                            <div className="duty-item mb-2">
                                <strong className="d-block duty-title">{t('announcements.dutiesWeekend')}</strong>
                                <span className="duty-person">{t('announcements.duty1Person')}</span>
                            </div>
                            <div className="duty-item">
                                <strong className="d-block duty-title">{t('announcements.dutiesCleaning')}</strong>
                                <span className="duty-person">{t('announcements.duty2Person')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Announcements;
