import React from 'react';

const Navbar = ({ isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, activePage = 'home', hideNavigation = false, searchOnly = false, pageTitle }) => {
  return (
    <nav style={{
      width: '100%',
      backgroundColor: isDark ? '#1f2937' : 'white',
      boxShadow: isDark ? '0 1px 3px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
      borderBottom: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Centered Container */}
      <div style={{
        maxWidth: '2000px',
        margin: '0 auto',
        padding: '0 clamp(20px, 4vw, 80px)',
        overflowX: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
          gap: searchOnly ? '20px' : 'clamp(80px, 15vw, 150px)'
        }}>
          {/* Left Section - Logo & Brand */}
          <div 
            onClick={() => onNavigate('home')}
            style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            minWidth: 'fit-content',
            flex: '0 0 auto',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: 'bold',
                color: isDark ? '#f9fafb' : '#111827',
              }}>EventHub</span>
              <span style={{
                fontSize: 'clamp(8px, 2vw, 10px)',
                color: isDark ? '#9ca3af' : '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>EVENT PLATFORM</span>
            </div>
          </div>

          {/* Page Title for Booking */}
          {pageTitle && (
            <div style={{
              flex: 1,
              textAlign: 'center'
            }}>
              <h1 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: isDark ? '#f9fafb' : '#111827',
                margin: 0
              }}>{pageTitle}</h1>
            </div>
          )}

          {/* Center Section - Navigation */}
          {!hideNavigation && !searchOnly && (
            <div style={{
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              flex: '1 1 auto'
            }}>
              {[
                { name: 'For you', key: 'home' },
                { name: 'Movies', key: 'movies' },
                { name: 'Events', key: 'events' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => onNavigate(tab.key)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '24px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: activePage === tab.key ? (isDark ? '#581c87' : '#f3e8ff') : 'transparent',
                    color: activePage === tab.key ? (isDark ? '#f3e8ff' : '#7c3aed') : (isDark ? '#d1d5db' : '#374151'),
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (activePage !== tab.key) {
                      e.target.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activePage !== tab.key) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          )}

          {/* Right Section - Search & Profile */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            minWidth: 'fit-content',
            flex: '0 0 auto'
          }}>
            {/* Search Input */}
            {(!hideNavigation || searchOnly) && (
              <div style={{ 
                position: 'relative', 
                display: 'flex',
                minWidth: searchOnly ? '200px' : '300px',
                maxWidth: searchOnly ? '300px' : '350px',
                width: '100%'
              }}>
                <input
                  type="text"
                  placeholder="Search events..."
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
                    borderRadius: '20px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: isDark ? '#374151' : 'white',
                    color: isDark ? '#f9fafb' : '#111827'
                  }}
                />
                <svg style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '18px',
                  height: '18px',
                  color: isDark ? '#9ca3af' : '#6b7280'
                }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}

            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDark(!isDark)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                color: isDark ? '#f9fafb' : '#374151'
              }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Login/Profile Section */}
            {user ? (
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div 
                  onClick={onProfileClick}
                  style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.borderColor = 'transparent';
                }}
                title={`${user.name} - Click to open profile menu`}
                >
                  <span style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
                  </span>
                </div>
              </div>
            ) : (
              <button 
                onClick={onAuthOpen}
                style={{
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'scale(1)';
              }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;