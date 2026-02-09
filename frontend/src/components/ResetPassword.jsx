import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Lock, KeyRound, Loader2, CheckCircle2, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setFormData(prev => ({ ...prev, email: emailParam }));
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
        if (formData.newPassword.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/reset-password`, {
                email: formData.email,
                otp: formData.otp,
                newPassword: formData.newPassword
            });
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
            padding: '20px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: 'clamp(32px, 6vw, 48px)',
                width: '100%',
                maxWidth: '480px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
                animation: 'slideUp 0.5s ease-out'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        color: '#6366f1'
                    }}>
                        <ShieldCheck size={32} />
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(24px, 5vw, 28px)',
                        fontWeight: '800',
                        color: '#111827',
                        marginBottom: '8px'
                    }}>
                        Reset Password
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
                        Securely update your account credentials
                    </p>
                </div>

                {message ? (
                    <div style={{
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '16px',
                        padding: '32px',
                        textAlign: 'center',
                        animation: 'fadeIn 0.3s ease-in'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#dcfce7',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                            color: '#16a34a'
                        }}>
                            <CheckCircle2 size={24} />
                        </div>
                        <p style={{ color: '#166534', fontWeight: '600', fontSize: '18px', marginBottom: '8px' }}>Success!</p>
                        <p style={{ color: '#166534', margin: 0 }}>{message}</p>
                        <p style={{ color: '#16a34a', fontSize: '14px', marginTop: '16px' }}>Redirecting to login...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                    <Mail size={20} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    readOnly
                                    value={formData.email}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px 14px 48px',
                                        backgroundColor: '#f3f4f6',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        color: '#6b7280',
                                        cursor: 'not-allowed',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>6-Digit OTP</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                    <KeyRound size={20} />
                                </div>
                                <input
                                    name="otp"
                                    type="text"
                                    required
                                    maxLength="6"
                                    placeholder="Enter OTP"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px 14px 48px',
                                        backgroundColor: '#f9fafb',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        transition: 'all 0.2s',
                                        boxSizing: 'border-box',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#8b5cf6';
                                        e.target.style.backgroundColor = 'white';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e5e7eb';
                                        e.target.style.backgroundColor = '#f9fafb';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>New Password</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                    <Lock size={20} />
                                </div>
                                <input
                                    name="newPassword"
                                    type="password"
                                    required
                                    placeholder="Min 6 characters"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px 14px 48px',
                                        backgroundColor: '#f9fafb',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        transition: 'all 0.2s',
                                        boxSizing: 'border-box',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#8b5cf6';
                                        e.target.style.backgroundColor = 'white';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e5e7eb';
                                        e.target.style.backgroundColor = '#f9fafb';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                    <Lock size={20} />
                                </div>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px 14px 48px',
                                        backgroundColor: '#f9fafb',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        transition: 'all 0.2s',
                                        boxSizing: 'border-box',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#8b5cf6';
                                        e.target.style.backgroundColor = 'white';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e5e7eb';
                                        e.target.style.backgroundColor = '#f9fafb';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {error && (
                            <div style={{
                                color: '#ef4444',
                                fontSize: '14px',
                                textAlign: 'center',
                                backgroundColor: '#fef2f2',
                                padding: '10px',
                                borderRadius: '8px',
                                fontWeight: '500'
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
                                backgroundSize: '200% 200%',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '700',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '10px'
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 15px 25px -5px rgba(139, 92, 246, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(139, 92, 246, 0.3)';
                                }
                            }}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Update Password
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                )}

                {!message && (
                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <Link to="/forgot-password" style={{
                            color: '#8b5cf6',
                            fontSize: '14px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            transition: 'color 0.2s'
                        }}
                            onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                            onMouseLeave={(e) => e.target.style.color = '#8b5cf6'}
                        >
                            Need a new OTP? Request here
                        </Link>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default ResetPassword;

