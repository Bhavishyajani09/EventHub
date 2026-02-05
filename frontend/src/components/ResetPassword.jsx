import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Lock, KeyRound, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter the OTP sent to your email and your new password.
                    </p>
                </div>

                {message ? (
                    <div className="rounded-md bg-green-50 p-4 text-center">
                        <CheckCircle2 className="mx-auto h-12 w-12 text-green-400 mb-4" />
                        <p className="text-sm font-medium text-green-800">{message}</p>
                        <p className="mt-2 text-xs text-green-600">Redirecting to login...</p>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="relative mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    readOnly
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 bg-gray-50 text-gray-500 rounded-md focus:outline-none sm:text-sm"
                                    value={formData.email}
                                />
                            </div>

                            <div className="relative mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">6-Digit OTP</label>
                                <div className="absolute inset-y-0 left-0 pl-3 pt-6 flex items-center pointer-events-none">
                                    <KeyRound className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="otp"
                                    type="text"
                                    required
                                    maxLength="6"
                                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="123456"
                                    value={formData.otp}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">New Password</label>
                                <div className="absolute inset-y-0 left-0 pl-3 pt-6 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="newPassword"
                                    type="password"
                                    required
                                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Min 6 characters"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Confirm Password</label>
                                <div className="absolute inset-y-0 left-0 pl-3 pt-6 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center font-medium">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-200"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    'Reset Password'
                                )}
                            </button>
                        </div>
                    </form>
                )}

                <div className="text-center">
                    <Link to="/forgot-password" title="Go back" className="font-medium text-blue-600 hover:text-blue-500 text-sm">
                        Request new OTP
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
