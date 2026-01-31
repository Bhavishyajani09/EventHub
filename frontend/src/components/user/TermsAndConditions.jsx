import React from 'react';

const TermsAndConditions = ({ onBack }) => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        
        {/* Logo */}
        <div 
          onClick={() => {
            window.location.href = '/';
          }}
          style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src="/new_icon_favicon.png" 
            alt="EventHub Logo" 
            style={{
              width: '60px',
              height: '54px'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#111827'
            }}>EventHub</span>
            <span style={{
              fontSize: '8px',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>EVENT PLATFORM</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Title */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#111827',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          Terms of service
        </h1>

        {/* Last Updated */}
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          fontStyle: 'italic',
          marginBottom: '20px'
        }}>
          Last updated on January 23, 2026.
        </p>

        <p style={{
          fontSize: '16px',
          color: '#374151',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          Thank you for using EventHub.
        </p>

        {/* Acceptance of terms */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Acceptance of terms
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            These Terms of Service (the "<strong>Terms</strong>") are intended to make you aware of your legal rights and responsibilities with respect to your access to and use of the EventHub website and any other related mobile or software applications under the brand name EventHub (collectively "<strong>Platform</strong>").
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            Please read these Terms carefully. By accessing or using the Platform, you are agreeing to these Terms and concluding a legally binding contract with EventHub Limited ("<strong>EventHub</strong>"/"<strong>We</strong>"/"<strong>Us</strong>"/"<strong>Our</strong>"). You may not use the Platform if you do not accept the Terms or are unable to be bound by the Terms.
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            By visiting our Platform and/or purchasing something from us, you engage in our Services and agree to be bound by these Terms, including any additional terms and conditions and policies referenced herein and/or available by hyperlink on the Platform. These Terms apply to all users of the Platform, including users who are browsers, vendors, customers, merchants, and/or contributors of content displayed on the Platform.
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            Your use/access of the Platform shall be governed by these Terms and the Privacy Policy as available on the Platform ("<strong>Privacy Policy</strong>").
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            These Terms may be updated from time to time without notice. It is therefore recommended that you review these Terms, as available on the Platform, each time you access and/or use the Platform. In the event there is any conflict or inconsistency between these Terms and any other terms and conditions that appear on the Platform, these Terms will prevail.
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            For the purposes of these Terms:
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            "<strong>Customer</strong>" or "<strong>You</strong>" or "<strong>Your</strong>" refers to you, as a customer of the Services. A customer is someone who accesses or uses the Services for the purpose of sharing, displaying, hosting, publishing, transacting, or uploading information or views or pictures and includes other things like accessing business page to manage claimed business listings or otherwise.
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            "<strong>Merchant</strong>" includes the shall mean the restaurants, event organisers, cinema/theatres, sports facilities, brand outlets or any other third-party onboarded with EventHub.
          </p>
        </section>

        {/* Services Overview */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Services Overview
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            'EventHub' is a platform for Customers to avail services with respect to events, dining, table reservations, movies, sports, entertainment, ticketing, etc., listed by the Merchants on the Platform from time to time ("<strong>Services</strong>"). Services on the Platform are available to select geographies in India.
          </p>
        </section>

        {/* Eligibility */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Eligibility
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872 are not eligible to use/access the Platform. However, if you are a minor, i.e. under the age of 18 years, you may use/access the Platform under the supervision of an adult parent or legal guardian who is "competent to contract" and agrees to be bound by these Terms.
          </p>
        </section>

        {/* Account Registration */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Account Registration
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            To access certain features of the Platform, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            You are responsible for safeguarding the password and for all activities that occur under your account. You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.
          </p>
        </section>

        {/* Booking and Payment */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Booking and Payment
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            All bookings made through the Platform are subject to availability and confirmation. EventHub reserves the right to refuse or cancel any booking at any time for any reason.
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            Payment for Services must be made through the payment methods available on the Platform. All prices are inclusive of applicable taxes unless otherwise stated.
          </p>
        </section>

        {/* Cancellation and Refund */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Cancellation and Refund
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            Cancellation and refund policies vary by Merchant and Service type. Please review the specific cancellation policy for each booking before confirming your purchase.
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            EventHub will process refunds according to the applicable cancellation policy and may charge a processing fee for cancellations.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Limitation of Liability
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            EventHub acts as an intermediary between Customers and Merchants. We are not responsible for the quality, safety, or legality of the Services provided by Merchants.
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            In no event shall EventHub be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Platform or Services.
          </p>
        </section>

        {/* Contact Information */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Contact Information
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            If you have any questions about these Terms, please contact us at:
          </p>

          <div style={{
            backgroundColor: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              margin: '0 0 8px 0'
            }}>
              <strong>EventHub Limited</strong>
            </p>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              margin: '0 0 8px 0'
            }}>
              Email: legal@eventhub.com
            </p>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              margin: '0 0 8px 0'
            }}>
              Phone: +91 1234567890
            </p>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              margin: 0
            }}>
              Address: 123 Tech Park, Bangalore, Karnataka 560001, India
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;