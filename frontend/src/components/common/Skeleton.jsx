import React from 'react';

const Skeleton = ({ width, height, borderRadius = '8px', className = '' }) => {
    return (
        <div
            className={`skeleton-shimmer ${className}`}
            style={{
                width: width || '100%',
                height: height || '20px',
                borderRadius: borderRadius,
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite linear'
            }}
        />
    );
};

export const EventCardSkeleton = ({ isDark }) => (
    <div style={{
        backgroundColor: isDark ? '#1f2937' : 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
        height: '420px',
        display: 'flex',
        flexDirection: 'column',
        border: isDark ? '1px solid #374151' : '1px solid #e5e7eb'
    }}>
        <div style={{
            height: '220px',
            background: isDark ? '#374151' : '#f3f4f6',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="skeleton-overlay" />
        </div>
        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Skeleton width="60%" height="14px" />
            <Skeleton width="90%" height="24px" />
            <Skeleton width="40%" height="14px" />
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width="30%" height="24px" />
                <Skeleton width="40%" height="36px" borderRadius="8px" />
            </div>
        </div>
        <style>{`
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .skeleton-shimmer {
        position: relative;
        overflow: hidden;
      }
      .skeleton-shimmer::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.2) 20%,
          rgba(255, 255, 255, 0.5) 60%,
          rgba(255, 255, 255, 0)
        );
        animation: shimmer 2s infinite;
      }
    `}</style>
    </div>
);

export const ArtistSkeleton = ({ isDark }) => (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{
            width: 'clamp(80px, 15vw, 120px)',
            height: 'clamp(80px, 15vw, 120px)',
            borderRadius: '50%',
            background: isDark ? '#374151' : '#f3f4f6',
            animation: 'shimmer 1.5s infinite linear',
            backgroundSize: '200% 100%'
        }} />
        <Skeleton width="80px" height="14px" />
    </div>
);

export const BookingCardSkeleton = ({ isDark }) => (
    <div style={{
        backgroundColor: isDark ? '#1f2937' : 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: isDark ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
        height: '350px',
        display: 'flex',
        flexDirection: 'column'
    }}>
        <div style={{ height: '120px', background: isDark ? '#374151' : '#f3f4f6' }} />
        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Skeleton width="80%" height="24px" />
            <Skeleton width="60%" height="16px" />
            <Skeleton width="50%" height="16px" />
            <Skeleton width="40%" height="16px" />
            <div style={{ marginTop: 'auto', borderTop: isDark ? '1px solid #374151' : '1px solid #e5e7eb', paddingTop: '16px' }}>
                <Skeleton width="100%" height="40px" borderRadius="8px" />
            </div>
        </div>
    </div>
);

export default Skeleton;
