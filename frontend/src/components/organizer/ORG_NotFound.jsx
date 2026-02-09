import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Frown } from 'lucide-react';

const OrganizerNotFound = ({ isDark = false }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: 'clamp(150px, 30vw, 250px)',
        height: 'clamp(150px, 30vw, 250px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        width: 'clamp(200px, 40vw, 350px)',
        height: 'clamp(200px, 40vw, 350px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 0
      }}></div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '20px',
        maxWidth: '500px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 40px)'
      }}>
        <div></div> {/* Spacer */}

        {/* Content Group */}
        <div>
          {/* 404 Number with Gradient */}
          <div style={{
            fontSize: 'clamp(72px, 18vw, 140px)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientMove 3s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1',
            marginBottom: 'clamp(16px, 4vw, 24px)',
            letterSpacing: '-0.02em'
          }}>
            404
          </div>

          {/* Sad Icon */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'clamp(60px, 15vw, 80px)',
            height: 'clamp(60px, 15vw, 80px)',
            borderRadius: '50%',
            backgroundColor: isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.2)',
            marginBottom: 'clamp(20px, 5vw, 32px)',
            animation: 'bounce 2s ease-in-out infinite'
          }}>
            <Frown
              size={window.innerWidth < 640 ? 32 : 40}
              style={{
                color: '#8b5cf6',
                animation: 'wiggle 1s ease-in-out infinite'
              }}
            />
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(24px, 5vw, 40px)',
            fontWeight: '800',
            color: isDark ? '#f8fafc' : '#0f172a',
            marginBottom: 'clamp(12px, 3vw, 16px)',
            lineHeight: '1.2',
            letterSpacing: '-0.01em'
          }}>
            Page Not Found
          </h1>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            color: isDark ? '#94a3b8' : '#64748b',
            lineHeight: '1.6',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '0 10px'
          }}>
            The page you're looking for doesn't exist. Let's get you back to the dashboard!
          </p>
        </div> {/* End Content Group */}

        {/* Button at Bottom */}
        <div style={{ paddingBottom: 'clamp(20px, 5vw, 40px)' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(8px, 2vw, 12px)',
              padding: 'clamp(14px, 3.5vw, 18px) clamp(32px, 8vw, 48px)',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradientMove 3s ease infinite',
              color: 'white',
              border: 'none',
              borderRadius: 'clamp(10px, 2.5vw, 14px)',
              fontSize: 'clamp(15px, 3.5vw, 18px)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.35)',
              width: '100%',
              maxWidth: '280px',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.35)';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Home size={window.innerWidth < 640 ? 18 : 20} />
            Go to Dashboard
          </button>
        </div> {/* End Button Wrapper */}
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

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default OrganizerNotFound;
