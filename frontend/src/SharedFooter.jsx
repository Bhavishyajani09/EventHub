import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const SharedFooter = ({ isDark }) => {
  const navigate = useNavigate();
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
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(24px, 5vw, 40px)',
            marginBottom: '32px'
          }}>
          {/* Company Info */}
          <div className="footer-section">
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
          <div className="footer-section">
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
              {['Events', 'Movies'].map((link, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    if (link === 'Movies') {
                      navigate('/movies');
                    } else if (link === 'Events') {
                      navigate('/events');
                    }
                  }} style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                    onMouseEnter={(e) => e.target.style.color = '#8b5cf6'}
                    onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
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
              {[
                { name: 'Music Events', value: 'MUSIC' },
                { name: 'Comedy Shows', value: 'COMEDY' },
                { name: 'Sports', value: 'SPORTS' },
                { name: 'Art Exhibitions', value: 'ART' },
                { name: 'Seasonal Events', value: 'SEASONAL EVENT' }
              ].map((category, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate('/events', { state: { category: category.value } });
                  }} style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                    onMouseEnter={(e) => e.target.style.color = '#8b5cf6'}
                    onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                  >{category.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'white'
            }}>Contact</h4>
            <div style={{ color: '#d1d5db', fontSize: '14px', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} /> <a href="mailto:support@eventhub.com" style={{ color: 'inherit', textDecoration: 'none' }}>support@eventhub.com</a>
              </p>
              <p style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} /> 6262780000
              </p>
              <p style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} /> Indore, Madhya Pradesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="footer-bottom"
          style={{
            borderTop: '1px solid #374151',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '13px',
            margin: 0
          }}>© 2026 EventHub. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
              <a key={index} href="#" style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'color 0.2s'
              }}
                onMouseEnter={(e) => e.target.style.color = '#d1d5db'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >{link}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Component Styles */}
      <style>{`
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 40px !important;
          }
 
          .footer-section {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
 
          .footer-section ul {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
 
          .footer-section p {
            justify-content: center !important;
          }
 
          .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
            gap: 16px !important;
          }
 
          .footer-bottom div {
            justify-content: center !important;
            width: 100% !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default SharedFooter;