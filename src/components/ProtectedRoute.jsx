import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    const [isDelayedLoading, setIsDelayedLoading] = useState(true);

    // Prevent flicker by showing loading state for at least a brief moment or until auth resolves
    useEffect(() => {
        if (!loading) {
            setIsDelayedLoading(false);
        }
    }, [loading]);

    if (loading || isDelayedLoading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
                <div className="spinner-border text-light" role="status"></div>
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/member-login" />;
    }

    // Double security check for domain (Frontend only, backend rules should also exist in Firestore)
    if (!currentUser.email.endsWith('@iman-islam.org')) {
        return <Navigate to="/member-login" />;
    }

    return children;
};

export default ProtectedRoute;
