import React, { useState } from 'react';
import { Eye, EyeOff, User, Users } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from './services/authService';

const AuthModal = ({ isOpen, onClose, onAuthSuccess, isDark }) => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // 'success' or 'error'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (currentScreen === 'register' && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (currentScreen === 'register' && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (currentScreen !== 'forgot' && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (currentScreen !== 'forgot' && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (currentScreen === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Clear message when user starts typing
    if (message.text) {
      setMessage({ text: '', type: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      let response;

      if (currentScreen === 'login') {
        switch (formData.role) {
          case 'user':
            response = await authService.userLogin(formData.email, formData.password);
            break;
          case 'organizer':
            response = await authService.organizerLogin(formData.email, formData.password);
            break;
          case 'admin':
            response = await authService.adminLogin(formData.email, formData.password);
            break;
          default:
            throw new Error('Invalid user type');
        }

        if (response.success) {
          login(response.token, response.user);
          setMessage({ text: 'Login successful!', type: 'success' });

          setTimeout(() => {
            onAuthSuccess(response.user);
            onClose();
            resetForm();
          }, 1000);
        } else {
          setMessage({ text: response.message || 'Login failed', type: 'error' });
        }
      } else if (currentScreen === 'register') {
        const userData = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role
        };

        switch (formData.role) {
          case 'user':
            response = await authService.userRegister(userData);
            break;
          case 'organizer':
            response = await authService.organizerRegister(userData);
            break;
          default:
            throw new Error('Admin registration not allowed');
        }

        if (response.success) {
          login(response.token, response.user);
          setMessage({ text: 'Registration successful!', type: 'success' });

          setTimeout(() => {
            onAuthSuccess(response.user);
            onClose();
            resetForm();
          }, 1000);
        } else {
          setMessage({ text: response.message || 'Registration failed', type: 'error' });
        }
      } else if (currentScreen === 'forgot') {
        const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/forgot-password`, { email: formData.email });
        if (response.data.success) {
          setMessage({ text: response.data.message, type: 'success' });
          setTimeout(() => {
            onClose();
            navigate(`/reset-password?email=${formData.email}`);
          }, 2000);
        } else {
          setMessage({ text: response.data.message || 'Something went wrong', type: 'error' });
        }
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage({ text: error.response.data.message, type: 'error' });
      } else {
        setMessage({ text: error.message || 'An error occurred', type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', role: 'user' });
    setErrors({});
    setMessage({ text: '', type: '' });
    setShowPassword(false);
    setCurrentScreen('login');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const switchScreen = (screen) => {
    setCurrentScreen(screen);
    setErrors({});
    setMessage({ text: '', type: '' });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      animation: 'fadeIn 0.3s ease-out'
    }}
      onClick={handleClose}
    >
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '48px',
        width: '100%',
        maxWidth: '520px',
        minHeight: '640px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column'
      }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6b7280',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f3f4f6';
            e.target.style.color = '#374151';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#6b7280';
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '8px'
          }}>
            {currentScreen === 'login' && 'Welcome Back'}
            {currentScreen === 'register' && 'Create Account'}
            {currentScreen === 'forgot' && 'Reset Password'}
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '15px',
            margin: 0
          }}>
            {currentScreen === 'login' && 'Sign in to access your dashboard'}
            {currentScreen === 'register' && 'Join EventHub to discover amazing events'}
            {currentScreen === 'forgot' && 'Enter your email for the reset link'}
          </p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            backgroundColor: message.type === 'success' ? '#f0f9ff' : '#fef2f2',
            border: `1px solid ${message.type === 'success' ? '#bfdbfe' : '#fecaca'}`,
            color: message.type === 'success' ? '#1e40af' : '#dc2626',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          marginBottom: '32px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: currentScreen === 'login' ? 'center' : 'flex-start'
        }}>
          {(currentScreen === 'register' || currentScreen === 'login') && (
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: currentScreen === 'login' ? '32px' : '16px'
            }}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'user' })}
                style={{
                  flex: 1,
                  padding: '16px 12px',
                  borderRadius: '12px',
                  border: `2px solid ${formData.role === 'user' ? '#8b5cf6' : '#e5e7eb'}`,
                  background: formData.role === 'user' ? '#f3f4f6' : 'white',
                  color: formData.role === 'user' ? '#8b5cf6' : '#6b7280',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                <User size={12} />
                User
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'organizer' })}
                style={{
                  flex: 1,
                  padding: '16px 12px',
                  borderRadius: '12px',
                  border: `2px solid ${formData.role === 'organizer' ? '#8b5cf6' : '#e5e7eb'}`,
                  background: formData.role === 'organizer' ? '#f3f4f6' : 'white',
                  color: formData.role === 'organizer' ? '#8b5cf6' : '#6b7280',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                <Users size={12} />
                Organizer
              </button>
              {currentScreen === 'login' && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  style={{
                    flex: 1,
                    padding: '16px 12px',
                    borderRadius: '12px',
                    border: `2px solid ${formData.role === 'admin' ? '#8b5cf6' : '#e5e7eb'}`,
                    background: formData.role === 'admin' ? '#f3f4f6' : 'white',
                    color: formData.role === 'admin' ? '#8b5cf6' : '#6b7280',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  <Users size={12} />
                  Admin
                </button>
              )}
            </div>
          )}
          {/* Full Name - Only for Register */}
          {currentScreen === 'register' && (
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: `1.5px solid ${errors.fullName ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#f9fafb',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.fullName ? '#ef4444' : '#e5e7eb';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
              />
              {errors.fullName && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.fullName}
                </p>
              )}
            </div>
          )}

          {/* Phone - Only for Register */}
          {currentScreen === 'register' && (
            <div style={{ marginBottom: '12px' }}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: `1.5px solid ${errors.phone ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#f9fafb',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.phone ? '#ef4444' : '#e5e7eb';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
              />
              {errors.phone && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.phone}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: currentScreen === 'login' ? '24px' : '12px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '16px 20px',
                border: `1.5px solid ${errors.email ? '#ef4444' : '#e5e7eb'}`,
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: '#f9fafb',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.backgroundColor = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? '#ef4444' : '#e5e7eb';
                e.target.style.backgroundColor = '#f9fafb';
              }}
            />
            {errors.email && (
              <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password - Not for Forgot Password */}
          {currentScreen !== 'forgot' && (
            <div style={{ marginBottom: currentScreen === 'login' ? '32px' : '12px', position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '16px 50px 16px 20px',
                  border: `1.5px solid ${errors.password ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#f9fafb',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.password ? '#ef4444' : '#e5e7eb';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#8b5cf6'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
              </button>
              {errors.password && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.password}
                </p>
              )}
            </div>
          )}

          {/* Confirm Password - Only for Register */}
          {currentScreen === 'register' && (
            <div style={{ marginBottom: '20px', position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '16px 50px 16px 20px',
                  border: `1.5px solid ${errors.confirmPassword ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#f9fafb',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#e5e7eb';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#8b5cf6'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
              </button>
              {errors.confirmPassword && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: isLoading ? '#9ca3af' : '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: isLoading ? 'none' : '0 4px 12px rgba(139, 92, 246, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#7c3aed';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#8b5cf6';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {isLoading ? 'Please wait...' : (
              currentScreen === 'login' ? 'Sign In' :
                currentScreen === 'register' ? 'Create Account' :
                  'Send Reset Link'
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div style={{ textAlign: 'center' }}>
          {currentScreen === 'login' && (
            <>
              <button
                onClick={() => switchScreen('forgot')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8b5cf6',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  marginBottom: '16px',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.color = '#8b5cf6'}
              >
                Forgot Password?
              </button>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                Don't have an account?{' '}
                <button
                  onClick={() => switchScreen('register')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8b5cf6',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                  onMouseLeave={(e) => e.target.style.color = '#8b5cf6'}
                >
                  Register
                </button>
              </p>
            </>
          )}

          {currentScreen === 'register' && (
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
              Already have an account?{' '}
              <button
                onClick={() => switchScreen('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8b5cf6',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.color = '#8b5cf6'}
              >
                Login
              </button>
            </p>
          )}

          {currentScreen === 'forgot' && (
            <button
              onClick={() => switchScreen('login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#8b5cf6',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
              onMouseLeave={(e) => e.target.style.color = '#8b5cf6'}
            >
              Back to Login
            </button>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
        
        @media (max-width: 480px) {
          .auth-modal-content {
            margin: 0;
            padding: 20px !important;
            border-radius: 0;
            min-height: 100vh;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthModal;