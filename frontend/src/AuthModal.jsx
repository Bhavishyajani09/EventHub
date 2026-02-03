import React, { useState } from 'react';
import { Eye, EyeOff, User, Users } from 'lucide-react';
import { useAuth } from './context/AuthContext';
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
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();

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
        setMessage({ text: 'Reset link sent to your email', type: 'success' });
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
    setFormData({ fullName: '', email: '', phone: '', password: '', role: 'user' });
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
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: 'clamp(32px, 6vw, 48px)',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        animation: 'slideUp 0.3s ease-out',
        maxHeight: '90vh'
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
            fontSize: 'clamp(24px, 5vw, 28px)',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px'
          }}>
            {currentScreen === 'login' && 'Welcome Back'}
            {currentScreen === 'register' && 'Create Account'}
            {currentScreen === 'forgot' && 'Reset Password'}
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '16px',
            margin: 0
          }}>
            {currentScreen === 'login' && 'Sign in to your EventHub account'}
            {currentScreen === 'register' && 'Join EventHub to discover amazing events'}
            {currentScreen === 'forgot' && 'Enter your email to receive reset link'}
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
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          {/* Role Selection - For Login and Register */}
          {(currentScreen === 'register' || currentScreen === 'login') && (
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'user'})}
                style={{
                  flex: 1,
                  padding: '16px 12px',
                  borderRadius: '12px',
                  border: `2px solid ${formData.role === 'user' ? '#8b5cf6' : '#e5e7eb'}`,
                  background: formData.role === 'user' ? '#f3f4f6' : 'white',
                  color: formData.role === 'user' ? '#8b5cf6' : '#6b7280',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <User size={24} />
                User
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'organizer'})}
                style={{
                  flex: 1,
                  padding: '16px 12px',
                  borderRadius: '12px',
                  border: `2px solid ${formData.role === 'organizer' ? '#8b5cf6' : '#e5e7eb'}`,
                  background: formData.role === 'organizer' ? '#f3f4f6' : 'white',
                  color: formData.role === 'organizer' ? '#8b5cf6' : '#6b7280',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Users size={24} />
                Organizer
              </button>
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
                  border: `2px solid ${errors.fullName ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#f9fafb',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!errors.fullName) {
                    e.target.style.borderColor = '#8b5cf6';
                  }
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  if (!errors.fullName) {
                    e.target.style.borderColor = '#e5e7eb';
                  }
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
            <div style={{ marginBottom: '20px' }}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: `2px solid ${errors.phone ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#f9fafb',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!errors.phone) {
                    e.target.style.borderColor = '#8b5cf6';
                  }
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  if (!errors.phone) {
                    e.target.style.borderColor = '#e5e7eb';
                  }
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
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '16px 20px',
                border: `2px solid ${errors.email ? '#ef4444' : '#e5e7eb'}`,
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: '#f9fafb',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#8b5cf6';
                }
                e.target.style.backgroundColor = 'white';
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#e5e7eb';
                }
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
            <div style={{ marginBottom: '24px', position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '16px 50px 16px 20px',
                  border: `2px solid ${errors.password ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#f9fafb',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#8b5cf6';
                  }
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#e5e7eb';
                  }
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
                  color: '#6b7280',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.password}
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
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: isLoading ? 'none' : '0 4px 12px rgba(139, 92, 246, 0.4)'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#7c3aed';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#8b5cf6';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)';
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
                  textDecoration: 'underline',
                  marginBottom: '16px'
                }}
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
                    textDecoration: 'underline',
                    fontWeight: '600'
                  }}
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
                  textDecoration: 'underline',
                  fontWeight: '600'
                }}
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
                textDecoration: 'underline'
              }}
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
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @media (max-width: 480px) {
          .auth-modal-content {
            margin: 10px;
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthModal;