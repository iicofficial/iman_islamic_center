import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Login.css';

const Login = () => {
    const { login, currentUser, error } = useAuth();
    const navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

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
        <div className="login-container">
            <div className="glass-card">
                <div className="login-header">
                    <img src={logo} alt="IIC Logo" className="login-logo" />
                    <h2>Directors & ELC staff Portal</h2>
                    <p>Iman Islamic Center</p>
                </div>

                <div className="login-body">
                    <p className="login-instruction">
                        Please sign in with your official google workspace account.
                    </p>
                    <p className="domain-badge">@iman-islam.org</p>

                    {error && <div className="login-error">{error}</div>}

                    <button
                        className="btn-google-login"
                        onClick={handleLogin}
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? 'Verifying...' : 'Sign in with Google'}
                    </button>

                    <button
                        className="btn-back-home"
                        onClick={() => navigate('/')}
                        style={{ marginTop: '1rem', backgroundColor: '#27569b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
                    >
                        Back to Home
                    </button>
                </div>

                <div className="login-footer">
                    <small>Restricted Access - Authorized Personnel Only</small>
                </div>
            </div>
        </div>
    );
};

export default Login;
