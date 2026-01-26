import React from 'react';
import { Palette, Globe, Clock, Film, Calendar, MapPin, Ticket, ChevronDown } from 'lucide-react';
import SharedNavbar from './SharedNavbar';
import SharedFooter from './SharedFooter';

const MovieDetail = ({ movie, isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBack, onBookTickets }) => {
  const [isTermsOpen, setIsTermsOpen] = React.useState(false);
  
  if (!movie) {
    return (
      <div style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        backgroundColor: isDark ? '#111827' : '#f8fafc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          color: isDark ? '#f9fafb' : '#111827'
        }}>
          <h2>Movie not found</h2>
          <button 
            onClick={() => onNavigate('movies')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: isDark ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Navbar */}
      <SharedNavbar 
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onAuthOpen={onAuthOpen}
        onProfileClick={onProfileClick}
        onNavigate={onNavigate}
        activePage="movies"
        searchOnly={true}
      />

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        width: 'calc(100% - 40px)',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}>
        {/* Back Button */}
        <button 
          onClick={onBack}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: isDark ? '#f9fafb' : '#374151',
            border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          Back
        </button>

        {/* Movie Details Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 400px' : '1fr',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Left Section - Movie Info */}
          <div>
            <div style={{
              backgroundImage: `url(${movie.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '12px',
              height: '400px',
              marginBottom: '20px'
            }}></div>

            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '12px'
            }}>{movie.title}</h1>

            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '20px',
              fontSize: '14px',
              color: isDark ? '#9ca3af' : '#6b7280'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Palette size={16} /> {movie.genre}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={16} /> {movie.language}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} /> 2h 30m
              </span>
            </div>

            {/* About the Event */}
            <div style={{
              backgroundColor: isDark ? '#1f2937' : 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '20px',
              boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '12px'
              }}>About the Movie</h3>
              <p style={{
                color: isDark ? '#d1d5db' : '#4b5563',
                lineHeight: '1.6'
              }}>
                Experience the ultimate cinematic journey with {movie.title}. This {(movie.genre || 'movie').toLowerCase()} masterpiece 
                brings together stellar performances, breathtaking visuals, and an unforgettable storyline that will 
                keep you on the edge of your seat.
              </p>
            </div>
          </div>

          {/* Right Section - Booking Info */}
          <div>
            <div style={{
              backgroundColor: isDark ? '#1f2937' : 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
              position: 'sticky',
              top: '100px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '20px'
              }}>{movie.title}</h2>

              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <Film size={16} />
                  <span style={{
                    color: isDark ? '#d1d5db' : '#4b5563',
                    fontSize: '14px'
                  }}>Performances, {movie.genre}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <Calendar size={16} />
                  <span style={{
                    color: isDark ? '#d1d5db' : '#4b5563',
                    fontSize: '14px'
                  }}>Today, 6:45 PM</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '20px'
                }}>
                  <MapPin size={16} />
                  <span style={{
                    color: isDark ? '#d1d5db' : '#4b5563',
                    fontSize: '14px'
                  }}>Phoenix Citadel Mall, Indore</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <span style={{
                  color: isDark ? '#d1d5db' : '#4b5563',
                  fontSize: '14px'
                }}>Starts from</span>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: isDark ? '#f9fafb' : '#111827'
                }}>₹599</span>
              </div>

              <button 
                onClick={() => onBookTickets && onBookTickets(movie)}
                style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 25%, #4f46e5 50%, #7c3aed 75%, #8b5cf6 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientMove 3s ease infinite',
                color: 'white',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
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
                BOOK TICKETS
              </button>
            </div>
          </div>
        </div>

        {/* Event Guide Section */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '20px'
          }}>Event Guide</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Globe size={20} />
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827',
                  marginBottom: '4px'
                }}>Language</h4>
                <p style={{
                  fontSize: '14px',
                  color: isDark ? '#9ca3af' : '#6b7280'
                }}>Hindi, Hinglish</p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Clock size={20} />
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827',
                  marginBottom: '4px'
                }}>Duration</h4>
                <p style={{
                  fontSize: '14px',
                  color: isDark ? '#9ca3af' : '#6b7280'
                }}>3 Hours and 15 Minutes</p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Ticket size={20} />
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827',
                  marginBottom: '4px'
                }}>Age Restriction</h4>
                <p style={{
                  fontSize: '14px',
                  color: isDark ? '#9ca3af' : '#6b7280'
                }}>18+ Only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Section */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '16px'
          }}>Venue</h3>
          
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '4px'
            }}>Phoenix Citadel Mall</h4>
            <p style={{
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: '14px'
            }}>MR 10 Rd. Junction, Indore, Madhya Pradesh 452016, India</p>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div 
            onClick={() => setIsTermsOpen(!isTermsOpen)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827'
            }}>Terms & Conditions</h3>
            <ChevronDown 
              size={18}
              style={{
                color: isDark ? '#9ca3af' : '#6b7280',
                transform: isTermsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            />
          </div>
          
          <div style={{
            maxHeight: isTermsOpen ? '500px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
            paddingTop: isTermsOpen ? '16px' : '0'
          }}>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                'Please carry a valid ID proof along with you.',
                'No refunds on purchased ticket are possible, even in case of any rescheduling.',
                'Security procedures, including frisking remain the right of the management.',
                'No dangerous or potentially hazardous objects including but not limited to weapons, knives, guns, fireworks, helmets, lazer devices, bottles, musical instruments will be allowed in the venue and may be ejected with or without the owner from the venue',
                'The sponsors/performers/organizers are not responsible for any injury or damage occurring due to the event. Any claims regarding the same would be settled in courts in Mumbai.',
                'People in an inebriated state may not be allowed entry.',
                'Organizers hold the right to deny late entry to the event.',
                'Venue rules apply.'
              ].map((term, index) => (
                <li key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  marginBottom: '12px',
                  fontSize: '14px',
                  color: isDark ? '#d1d5db' : '#4b5563',
                  lineHeight: '1.5'
                }}>
                  <span style={{
                    color: isDark ? '#9ca3af' : '#6b7280',
                    fontSize: '12px',
                    marginTop: '2px',
                    minWidth: '4px'
                  }}>•</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <SharedFooter isDark={isDark} onNavigate={onNavigate} />
      
      {/* Global CSS Reset */}
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background-color: ${isDark ? '#111827' : '#f8fafc'};
        }
        #root {
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }
        
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
      `}</style>
    </div>
  );
};

export default MovieDetail;