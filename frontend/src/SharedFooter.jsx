import React from 'react';

const SharedFooter = ({ isDark, onNavigate }) => {
  return (
    <footer style={{
      backgroundColor: isDark ? '#0f172a' : '#1f2937',
      color: 'white',
      padding: 'clamp(32px, 6vw, 48px) clamp(16px, 4vw, 32px)',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(24px, 5vw, 40px)',
          marginBottom: '32px'
        }}>
          {/* Company Info */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textTransform: 'lowercase'
              }}>EventHub</span>
              <div style={{
                fontSize: '10px',
                color: '#9ca3af',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>EVENT PLATFORM</div>
            </div>
            <p style={{
              color: '#d1d5db',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>Discover amazing events, movies, and experiences in your city.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'white'
            }}>Quick Links</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['Events', 'Movies', 'About Us', 'Contact'].map((link, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    if (link === 'Movies' && onNavigate) {
                      onNavigate('movies');
                    } else if (link === 'Events' && onNavigate) {
                      onNavigate('events');
                    }
                  }} style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'white'
            }}>Categories</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['Music Events', 'Tech Summits', 'Workshops', 'Sports', 'Comedy Shows'].map((category, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                  >{category}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'white'
            }}>Contact</h4>
            <div style={{ color: '#d1d5db', fontSize: '14px', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '8px' }}>📧 support@eventhub.com</p>
              <p style={{ marginBottom: '8px' }}>📞 +91 98765 43210</p>
              <p style={{ marginBottom: '8px' }}>📍 Indore, Madhya Pradesh</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '14px',
            margin: 0
          }}>© 2024 EventHub. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
              <a key={index} href="#" style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#d1d5db'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SharedFooter;