import React, { useState } from 'react';
import SharedNavbar from './SharedNavbar';
import SharedFooter from './SharedFooter';

const EventSeatSelection = ({ event, isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBack, onProceedToBooking }) => {
  const [selectedSection, setSelectedSection] = useState(null);

  if (!event) {
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
          <h2>Event not found</h2>
          <button 
            onClick={() => onNavigate('events')}
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
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { name: 'STAGE', price: null, color: '#e5e7eb', textColor: '#6b7280', selectable: false },
    { name: 'PLATINUM', price: '₹3999', color: '#c4b5fd', textColor: '#581c87', selectable: true },
    { name: 'GOLD', price: '₹1799', color: '#fbbf24', textColor: '#92400e', selectable: true },
    { name: 'SILVER', price: '₹999', color: '#a3e635', textColor: '#365314', selectable: true }
  ];

  const handleSectionClick = (section) => {
    if (section.selectable) {
      setSelectedSection(section);
    }
  };

  const handleProceed = () => {
    if (selectedSection && onProceedToBooking) {
      onProceedToBooking(event, selectedSection);
    }
  };

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: isDark ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0
    }}>
      <SharedNavbar 
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onAuthOpen={onAuthOpen}
        onProfileClick={onProfileClick}
        onNavigate={onNavigate}
        searchOnly={true}
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
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
          ← Back
        </button>

        {/* Event Info */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '8px'
          }}>{event.title}</h1>
          <p style={{
            color: isDark ? '#9ca3af' : '#6b7280',
            fontSize: '14px'
          }}>{event.venue} • {event.fullDate} • {event.time}</p>
        </div>

        {/* Seat Map */}
        <div style={{
          borderRadius: '12px',
          padding: '40px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '30px'
          }}>Select Your Section</h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {/* Stage */}
            <div style={{
              width: '200px',
              height: '50px',
              backgroundColor: sections[0].color,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '600',
              color: sections[0].textColor
            }}>
              {sections[0].name}
            </div>

            {/* Platinum */}
            <div
              onClick={() => handleSectionClick(sections[1])}
              style={{
                width: '300px',
                height: '60px',
                backgroundColor: selectedSection?.name === sections[1].name ? '#3b82f6' : sections[1].color,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: selectedSection?.name === sections[1].name ? 'white' : sections[1].textColor,
                cursor: 'pointer',
                border: selectedSection?.name === sections[1].name ? '2px solid #1d4ed8' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <div>{sections[1].name}</div>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>{sections[1].price}</div>
            </div>

            {/* Gold */}
            <div
              onClick={() => handleSectionClick(sections[2])}
              style={{
                width: '320px',
                height: '60px',
                backgroundColor: selectedSection?.name === sections[2].name ? '#3b82f6' : sections[2].color,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: selectedSection?.name === sections[2].name ? 'white' : sections[2].textColor,
                cursor: 'pointer',
                border: selectedSection?.name === sections[2].name ? '2px solid #1d4ed8' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <div>{sections[2].name}</div>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>{sections[2].price}</div>
            </div>

            {/* Silver */}
            <div
              onClick={() => handleSectionClick(sections[3])}
              style={{
                width: '340px',
                height: '60px',
                backgroundColor: selectedSection?.name === sections[3].name ? '#3b82f6' : sections[3].color,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: selectedSection?.name === sections[3].name ? 'white' : sections[3].textColor,
                cursor: 'pointer',
                border: selectedSection?.name === sections[3].name ? '2px solid #1d4ed8' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <div>{sections[3].name}</div>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>{sections[3].price}</div>
            </div>
          </div>

          {/* Legend */}
          <div style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            fontSize: '12px',
            color: isDark ? '#9ca3af' : '#6b7280'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}></div>
              <span>ALL THE SECTIONS ARE STANDING</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#9ca3af', borderRadius: '2px' }}></div>
              <span>ELEVATED SECTIONS</span>
            </div>
          </div>
        </div>

        {/* Selected Section & Proceed */}
        {selectedSection && (
          <div style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '4px'
              }}>Selected: {selectedSection.name}</h3>
              <p style={{
                color: isDark ? '#9ca3af' : '#6b7280',
                fontSize: '14px'
              }}>Price: {selectedSection.price}</p>
            </div>
            <button
              onClick={handleProceed}
              style={{
                padding: '12px 24px',
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
              PROCEED TO BOOKING
            </button>
          </div>
        )}
      </div>

      <SharedFooter isDark={isDark} onNavigate={onNavigate} />
    </div>
  );
};

export default EventSeatSelection;