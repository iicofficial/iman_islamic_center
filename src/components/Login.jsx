import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.png';
import bgImage from '../assets/iicmasjed1.png';
import { FaGoogle, FaHome } from 'react-icons/fa';
import './Login.css';

const Login = () => {
    const { login, currentUser, error } = useAuth();
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Translation object for internal use
    const t = {
        title: language === 'ar' ? "بوابة الإدارة وموظفي اللجنة القيادية التنفيذية" : "Directors & ELC staff Portal",
        centerName: language === 'ar' ? "مركز الإيمان الإسلامي" : "Iman Islamic Center",
        instruction: language === 'ar' ? "يرجى تسجيل الدخول باستخدام حساب Google Workspace الرسمي الخاص بك." : "Please sign in with your official google workspace account.",
        signIn: language === 'ar' ? "تسجيل الدخول عبر Google" : "Sign in with Google",
        verifying: language === 'ar' ? "جارٍ التحقق..." : "Verifying...",
        backHome: language === 'ar' ? "الرئيسية" : "Homepage",
        footer: language === 'ar' ? "دخول مقيد - للمصرح لهم فقط" : "Restricted Access - Authorized Personnel Only"
    };

    useEffect(() => {
        if (currentUser) {
            navigate('/announcements');
        }
    }, [currentUser, navigate]);

    const handleLogin = async () => {
        setIsLoggingIn(true);
        await login();
        setIsLoggingIn(false);
    };

    return (
        <div
            className={`login-container ${language === 'ar' ? 'rtl' : ''}`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="glass-card">
                <div className="login-header">
                    <img src={logo} alt="IIC Logo" className="login-logo" />
                    <h2>{t.title}</h2>
                    <p>{t.centerName}</p>
                </div>

                <div className="login-body">
                    <p className="login-instruction">
                        {t.instruction}
                    </p>
                    <p className="domain-badge" dir="ltr">@iman-islam.org</p>

                    {error && <div className="login-error">{error}</div>}

                    <button
                        className="btn-google-login"
                        onClick={handleLogin}
                        disabled={isLoggingIn}
                    >
                        <FaGoogle />
                        {isLoggingIn ? t.verifying : t.signIn}
                    </button>

                    <button
                        className="btn-back-home"
                        onClick={() => navigate('/')}
                        style={{
                            marginTop: '1rem',
                            backgroundColor: '#27569b',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <FaHome />
                        {t.backHome}
                    </button>
                </div>

                <div className="login-footer">
                    <small>{t.footer}</small>
                </div>
            </div>
        </div>
    );
};

export default Login;
