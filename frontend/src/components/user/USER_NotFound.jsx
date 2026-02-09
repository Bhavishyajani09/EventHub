import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft, Frown } from 'lucide-react';

const NotFound = ({ isDark = false }) => {
    const navigate = useNavigate();

    return (
        <div style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            background: isDark
                ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)'
                : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
            minHeight: '100vh',
            width: '100vw',
            margin: 0,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                animation: 'float 6s ease-in-out infinite',
                zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                animation: 'float 8s ease-in-out infinite reverse',
                zIndex: 0
            }}></div>

            {/* Main Content */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                padding: '40px 20px',
                maxWidth: '600px'
            }}>
                {/* 404 Number with Gradient */}
                <div style={{
                    fontSize: 'clamp(80px, 20vw, 160px)',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 25%, #4f46e5 50%, #7c3aed 75%, #8b5cf6 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientMove 3s ease infinite',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1',
                    marginBottom: '24px',
                    textShadow: '0 4px 20px rgba(139, 92, 246, 0.3)'
                }}>
                    404
                </div>

                {/* Sad Icon */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.15)',
                    marginBottom: '32px',
                    animation: 'bounce 2s ease-in-out infinite'
                }}>
                    <Frown
                        size={40}
                        style={{
                            color: '#8b5cf6',
                            animation: 'wiggle 1s ease-in-out infinite'
                        }}
                    />
                </div>

                {/* Title */}
                <h1 style={{
                    fontSize: 'clamp(28px, 6vw, 48px)',
                    fontWeight: '800',
                    color: isDark ? '#f9fafb' : '#111827',
                    marginBottom: '16px',
                    lineHeight: '1.2'
                }}>
                    Oops! Page Not Found
                </h1>

                {/* Description */}
                <p style={{
                    fontSize: 'clamp(16px, 3.5vw, 20px)',
                    color: isDark ? '#9ca3af' : '#6b7280',
                    marginBottom: '48px',
                    lineHeight: '1.6',
                    maxWidth: '500px',
                    margin: '0 auto 48px'
                }}>
                    The page you're looking for seems to have wandered off to enjoy an event. Let's get you back on track!
                </p>

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    {/* Go Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '16px 32px',
                            backgroundColor: isDark ? '#374151' : 'white',
                            color: isDark ? '#f9fafb' : '#111827',
                            border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>

                    {/* Home Button */}
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '16px 32px',
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 25%, #4f46e5 50%, #7c3aed 75%, #8b5cf6 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradientMove 3s ease infinite',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        }}
                    >
                        <Home size={20} />
                        Go Home
                    </button>

                    {/* Browse Events Button */}
                    <button
                        onClick={() => navigate('/events')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '16px 32px',
                            backgroundColor: isDark ? '#374151' : 'white',
                            color: isDark ? '#f9fafb' : '#111827',
                            border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <Search size={20} />
                        Browse Events
                    </button>
                </div>
            </div>

            {/* Animations */}
            <style>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }
      `}</style>
        </div>
    );
};

export default NotFound;
