import React from 'react';

const Navbar = ({ 
  isDark, 
  setIsDark, 
  user, 
  onAuthOpen, 
  onProfileClick, 
  onNavigate, 
  activePage = 'home' 
}) => {
  const tabs = [
    { name: 'For you', key: 'home' },
    { name: 'Dining', key: 'dining' },
    { name: 'Movies', key: 'movies' },
    { name: 'Events', key: 'events' }
  ];

  return (
    <nav style={{
      width: '100%',
      backgroundColor: '#1e293b',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(24px, 4vw, 32px)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          gap: 'clamp(32px, 8vw, 64px)'
        }}>
          {/* Logo */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            minWidth: 'fit-content',
            flex: '0 0 auto'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white'
              }}>EventHub</span>
              <span style={{
                fontSize: '10px',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>EVENT PLATFORM</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            flex: '1 1 auto'
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onNavigate(tab.key)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: activePage === tab.key ? '#7c3aed' : 'transparent',
                  color: activePage === tab.key ? 'white' : '#cbd5e1',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (activePage !== tab.key) {
                    e.target.style.backgroundColor = '#334155';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activePage !== tab.key) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#cbd5e1';
                  }
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            minWidth: 'fit-content',
            flex: '0 0 auto'
          }}>
            {/* Search */}
            <div style={{ 
              position: 'relative', 
              display: 'flex',
              minWidth: '280px'
            }}>
              <input
                type="text"
                placeholder="Search for events, movies and restaurants"
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  border: '1px solid #475569',
                  borderRadius: '25px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#334155',
                  color: 'white'
                }}
              />
              <svg style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '18px',
                height: '18px',
                color: '#94a3b8'
              }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Notification Icon */}
            <button style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: '1px solid #475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              color: '#cbd5e1'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#334155';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#cbd5e1';
            }}
            >
              🔔
            </button>

            {/* Profile/Login */}
            {user ? (
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
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <span style={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            ) : (
              <button 
                onClick={onAuthOpen}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
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