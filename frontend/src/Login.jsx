import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import authService from './services/authService';

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    userType: 'user' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      
      switch (formData.userType) {
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
        
        // Redirect based on role
        switch (response.user.role) {
          case 'user':
            navigate('/profile');
            break;
          case 'organizer':
            navigate('/organizer/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .floating-card {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url("https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)',
          zIndex: 1
        }}></div>

        <div 
          className="floating-card"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: '50px 40px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: 'white',
              margin: '0 0 8px 0',
              letterSpacing: '-1px',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              EventHub
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '16px',
              margin: 0
            }}>
              Welcome back
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                backdropFilter: 'blur(10px)'
              }}
            >
              <option value="user" style={{ background: '#333', color: 'white' }}>User</option>
              <option value="organizer" style={{ background: '#333', color: 'white' }}>Organizer</option>
            </select>

            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                backdropFilter: 'blur(10px)'
              }}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                backdropFilter: 'blur(10px)'
              }}
            />

            <div style={{ textAlign: 'right', marginTop: '-12px' }}>
              <Link to="/forgot-password" style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '14px'
              }}>
                Forgot Password?
              </Link>
            </div>

            {error && (
              <div style={{
                color: '#ff6b6b',
                fontSize: '14px',
                textAlign: 'center',
                background: 'rgba(255, 107, 107, 0.1)',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 107, 107, 0.3)'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '16px',
                backgroundColor: loading ? 'rgba(255, 107, 53, 0.6)' : '#ff6b35',
                color: 'white',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)'
              }}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '16px', 
              margin: 0
            }}>
              Don't have an account?{' '}
              <Link to="/register" style={{
                color: '#ff6b35',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;