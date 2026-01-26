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
        navigate('/member-login');
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
                <div className="portal-header d-flex justify-content-between align-items-start mb-5">
                    <div>
                        <img src={logo} alt="IIC Logo" style={{ height: '70px', marginBottom: '15px' }} />
                        <div className="d-block"></div>
                        <span className="badge bg-gold mb-2"><FaLock className="me-1" /> {t('announcements.secureBadge')}</span>
                        <h1 className="portal-title">{t('announcements.portalTitle')}</h1>
                        <div className="d-flex align-items-center flex-wrap gap-3">
                            <p className="portal-subtitle mb-0">{t('announcements.welcome')} <span className="admin-name">{currentUser?.displayName}</span></p>
                            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1" style={{ fontSize: '0.8rem' }}>
                                <FaSignOutAlt className="me-2" /> {t('announcements.signOut')}
                            </button>
                        </div>
                    </div>

                    {/* Clean Test Mode Badge */}
                    <div className="d-flex align-items-center">
                        <div style={{
                            background: '#fff3cd',
                            color: '#856404',
                            border: '1px solid #ffeeba',
                            padding: '10px 20px',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            letterSpacing: '0.5px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <i className="bi bi-exclamation-circle-fill"></i>
                            TEST MODE - DEMO CONTENT
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Announcement 1 - Urgent */}
                    <div className="col-md-8">
                        <div className="portal-panel main-panel p-4 h-100">
                            <div className="panel-header mb-4">
                                <h3 className="portal-section-title"><FaBullhorn className="me-2 text-primary" /> {t('announcements.priorityTitle')}</h3>
                            </div>

                            {/* Urgent Update */}
                            <div className="announcement-item p-3 mb-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <span className="badge bg-danger">{t('announcements.urgentBadge')}</span>
                                    <small className="text-muted">Jan 26, 2026</small>
                                </div>
                                <h5 className="announcement-title">{t('announcements.ramadanTitle')}</h5>
                                <p className="announcement-text">{t('announcements.ramadanText')}</p>
                            </div>

                            {/* General Update */}
                            <div className="announcement-item p-3 mb-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <span className="badge bg-primary">{t('announcements.updateBadge')}</span>
                                    <small className="text-muted">Jan 24, 2026</small>
                                </div>
                                <h5 className="announcement-title">{t('announcements.constructionTitle')}</h5>
                                <p className="announcement-text">{t('announcements.constructionText')}</p>
                            </div>

                            {/* Event Update */}
                            <div className="announcement-item p-3 mb-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <span className="badge bg-success">{t('navbar.events')}</span>
                                    <small className="text-muted">Jan 20, 2026</small>
                                </div>
                                <h5 className="announcement-title">{t('announcements.meetingTitle')}</h5>
                                <p className="announcement-text">{t('announcements.meetingText')}</p>
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
                                <li><a href="#">{t('announcements.booking')}</a></li>
                                <li><a href="#">{t('announcements.incidentReport')}</a></li>
                            </ul>
                        </div>

                        <div className="portal-panel sidebar-panel p-4">
                            <h4 className="portal-section-title mb-3"><FaCalendarCheck className="me-2 text-success" /> {t('announcements.dutiesTitle')}</h4>

                            <div className="duty-card mb-3 p-2 border-start border-4 border-warning bg-light">
                                <strong className="d-block text-dark">{t('announcements.jummahDuty')}</strong>
                                <span className="text-muted small">Friday, Jan 30</span>
                                <div className="mt-1 fw-bold text-primary">Abdulaziz Abdullah Al-Abbasi</div>
                            </div>

                            <div className="duty-card mb-3 p-2 border-start border-4 border-info bg-light">
                                <strong className="d-block text-dark">{t('announcements.securityDuty')}</strong>
                                <span className="text-muted small">Sat-Sun, Jan 31-Feb 1</span>
                                <div className="mt-1 fw-bold text-primary">Br. Omar & Team</div>
                            </div>

                            <div className="duty-card p-2 border-start border-4 border-success bg-light">
                                <strong className="d-block text-dark">{t('announcements.cleaningDuty')}</strong>
                                <span className="text-muted small">{t('common.select') || 'Checklist'}</span>
                                <div className="mt-1 fw-bold text-primary">Group B (Sisters)</div>
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
