import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import { User, Mail, Phone, Lock, UserPlus, ArrowRight, Loader2, Users, ShieldCheck } from 'lucide-react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      let response;
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.userType
      };

      switch (formData.userType) {
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

        // Redirect based on role
        switch (response.user.role) {
          case 'user':
            navigate('/dashboard');
            break;
          case 'organizer':
            navigate('/organizer/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during registration');
      }
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
            <UserPlus size={32} />
          </div>
          <h2 style={{
            fontSize: 'clamp(24px, 5vw, 28px)',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Create Account
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
            Join EventHub today and start your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>Register As</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                <Users size={20} />
              </div>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  backgroundColor: '#f9fafb',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
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
              >
                <option value="user">User Account</option>
                <option value="organizer">Organizer Account</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                <User size={20} />
              </div>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
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
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                <Mail size={20} />
              </div>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
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
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>Phone Number</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                <Phone size={20} />
              </div>
              <input
                name="phone"
                type="tel"
                required
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
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
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                <Lock size={20} />
              </div>
              <input
                name="password"
                type="password"
                required
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
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
                <ShieldCheck size={20} />
              </div>
              <input
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
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
              marginTop: '8px'
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
                Create Account
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: '#8b5cf6',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
              onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
              onMouseLeave={(e) => e.target.style.color = '#8b5cf6'}
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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

export default RegisterForm;
