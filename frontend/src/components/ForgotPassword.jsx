import React, { useState } from 'react';
import axios from 'axios';
import { Mail, ArrowRight, Loader2, CheckCircle2, ShieldQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
            setMessage(response.data.message);
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
                        <ShieldQuestion size={32} />
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(24px, 5vw, 28px)',
                        fontWeight: '800',
                        color: '#111827',
                        marginBottom: '8px'
                    }}>
                        Forgot Password
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
                        We'll send you an OTP to reset your password safely
                    </p>
                </div>

                {message ? (
                    <div style={{
                        backgroundColor: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        borderRadius: '16px',
                        padding: '32px',
                        textAlign: 'center',
                        animation: 'fadeIn 0.3s ease-in'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#e0f2fe',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                            color: '#0284c7'
                        }}>
                            <CheckCircle2 size={24} />
                        </div>
                        <p style={{ color: '#0369a1', fontWeight: '600', fontSize: '18px', marginBottom: '12px' }}>OTP Sent!</p>
                        <p style={{ color: '#0c4a6e', margin: '0 0 24px 0' }}>{message}</p>

                        <Link
                            to={`/reset-password?email=${email}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                color: 'white',
                                padding: '14px 24px',
                                borderRadius: '12px',
                                fontWeight: '700',
                                textDecoration: 'none',
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                            }}
                        >
                            Reset Password Now
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                gap: '8px'
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
                                    Send OTP
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                )}

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Link to="/login" style={{
                        color: '#6b7280',
                        fontSize: '14px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                    }}
                        onMouseEnter={(e) => e.target.style.color = '#111827'}
                        onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                    >
                        Back to Login
                    </Link>
                </div>
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

export default ForgotPassword;

