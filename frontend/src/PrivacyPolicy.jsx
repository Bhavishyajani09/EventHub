import React from 'react';

const PrivacyPolicy = ({ onBack }) => {
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
          gap: '8px',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#8b5cf6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            E
          </div>
          <div>
            <div style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827'
            }}>
              EventHub
            </div>
            <div style={{
              fontSize: '10px',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              BY EVENTHUB
            </div>
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
          Privacy policy
        </h1>

        {/* Last Updated */}
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          fontStyle: 'italic',
          marginBottom: '20px'
        }}>
          Last updated on July 25, 2025.
        </p>

        {/* Introduction */}
        <p style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.7',
          marginBottom: '20px'
        }}>
          EventHub Limited (Formerly known as EventHub Limited) and/or its affiliates ("<strong>EventHub</strong>", "<strong>EventHub</strong>", the "<strong>Company</strong>", "<strong>we</strong>", "<strong>us</strong>", and "<strong>our</strong>") respect your privacy and are committed to protecting it. This policy describes:
        </p>

        <ul style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.7',
          marginBottom: '20px',
          paddingLeft: '20px'
        }}>
          <li style={{ marginBottom: '8px' }}>
            The types of information that EventHub may collect from you when you access or use its websites, applications and other online services (collectively, referred to as "Services"); and
          </li>
          <li style={{ marginBottom: '8px' }}>
            Its practices for collecting, using, maintaining, protecting and disclosing that information.
          </li>
        </ul>

        <p style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.7',
          marginBottom: '20px'
        }}>
          This policy applies only to the information EventHub collects through its Services, in email, text and other electronic communications sent through or in connection with its Services.
        </p>

        <p style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.7',
          marginBottom: '20px'
        }}>
          This policy does not apply to information that you provide to, or that is collected by, any third-party, such as restaurants at which you make reservations and/or pay through EventHub Services and social networks that you use in connection with its Services. EventHub encourages you to consult directly with such third-parties about their privacy practices.
        </p>

        <p style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.7',
          marginBottom: '20px'
        }}>
          Please read this policy carefully to understand EventHub's policies and practices regarding processing of your information. By accessing or using EventHub's Services and/or registering for an account with EventHub or any of its affiliates, you agree to this privacy policy and you provide your informed consent to the collection, use, disclosure, retention, and protection of your personal information as described here. If you do not provide the information EventHub requires, EventHub and its platforms may decline to provide Services to you.
        </p>

        <p style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.7',
          marginBottom: '20px'
        }}>
          This policy may change from time to time, your continued use of EventHub's Services after it makes any change is deemed to be acceptance of those changes, so please check the policy periodically for any updates.
        </p>

        <p style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.7',
          marginBottom: '20px'
        }}>
          <strong>Permissible Age:</strong> By using the Services, you represent and warrant that you are either at least 18 years of age or have the express permission of a parent or legal guardian to use the Services. If you are a parent or legal guardian of a minor who uses the Services, you are fully responsible for his or her use of the Services, including all legal liability they may incur.
        </p>

        <p style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.7',
          marginBottom: '30px'
        }}>
          <strong>Scope:</strong> This Privacy Policy outlines EventHub and its affiliates' practices regarding the processing of personal information concerning individuals engaging with our Platform and Services. This applies comprehensively to customers, merchant partners, delivery / service partners, users of our digital platforms (websites and applications), participants in events facilitated by EventHub, and personnel including employees, contractors, interns and third parties.
        </p>

        {/* The information we collect */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            The information we collect and how we use it
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            EventHub and its platforms and affiliate companies collect information from and about users of our Services, which includes:
          </p>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '12px'
            }}>
              Your Personal Information
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              lineHeight: '1.7',
              marginBottom: '16px'
            }}>
              Information that relates to an identified or identifiable individual. This may include data you provide directly, data generated through your use of the Services, or data obtained from third parties, which, either alone or in combination with other information we possess or are likely to access, can identify you. Examples are further detailed throughout this policy.
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '12px'
            }}>
              Other Information
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              lineHeight: '1.7',
              marginBottom: '16px'
            }}>
              Data related to your use of the Services that may not directly identify you by itself but is collected in connection with your account or activities. This includes, but is not limited to, information about your internet connection, the specific device(s) and equipment you use to access our Services, and details about your usage patterns and interactions with the Services.
            </p>
          </div>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            As detailed elsewhere in this policy, we collect this information through various means: directly from you, automatically during your interaction with our Services (utilizing technologies like cookies and tracking tools), and indirectly from third-party sources.
          </p>
        </section>

        {/* Information Collection Methods */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            How We Collect Information
          </h2>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '12px'
            }}>
              Information You Provide Directly
            </h3>
            <ul style={{
              fontSize: '16px',
              color: '#374151',
              lineHeight: '1.7',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '8px' }}>Account registration information (name, email, phone number)</li>
              <li style={{ marginBottom: '8px' }}>Profile information and preferences</li>
              <li style={{ marginBottom: '8px' }}>Payment and billing information</li>
              <li style={{ marginBottom: '8px' }}>Reviews, ratings, and feedback</li>
              <li style={{ marginBottom: '8px' }}>Communications with customer support</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '12px'
            }}>
              Information Collected Automatically
            </h3>
            <ul style={{
              fontSize: '16px',
              color: '#374151',
              lineHeight: '1.7',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '8px' }}>Device information (IP address, browser type, operating system)</li>
              <li style={{ marginBottom: '8px' }}>Usage data (pages visited, time spent, click patterns)</li>
              <li style={{ marginBottom: '8px' }}>Location information (with your permission)</li>
              <li style={{ marginBottom: '8px' }}>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </section>

        {/* How We Use Information */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            How We Use Your Information
          </h2>
          
          <ul style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            paddingLeft: '20px'
          }}>
            <li style={{ marginBottom: '8px' }}>To provide and maintain our Services</li>
            <li style={{ marginBottom: '8px' }}>To process bookings and transactions</li>
            <li style={{ marginBottom: '8px' }}>To communicate with you about your account and bookings</li>
            <li style={{ marginBottom: '8px' }}>To personalize your experience and provide recommendations</li>
            <li style={{ marginBottom: '8px' }}>To improve our Services and develop new features</li>
            <li style={{ marginBottom: '8px' }}>To prevent fraud and ensure security</li>
            <li style={{ marginBottom: '8px' }}>To comply with legal obligations</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Information Sharing and Disclosure
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            We may share your information in the following circumstances:
          </p>

          <ul style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            paddingLeft: '20px'
          }}>
            <li style={{ marginBottom: '8px' }}>With merchants to fulfill your bookings</li>
            <li style={{ marginBottom: '8px' }}>With service providers who assist in our operations</li>
            <li style={{ marginBottom: '8px' }}>With your consent or at your direction</li>
            <li style={{ marginBottom: '8px' }}>To comply with legal requirements</li>
            <li style={{ marginBottom: '8px' }}>To protect our rights and prevent fraud</li>
            <li style={{ marginBottom: '8px' }}>In connection with business transfers</li>
          </ul>
        </section>

        {/* Data Security */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Data Security
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
        </section>

        {/* Your Rights */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Your Rights and Choices
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            You have certain rights regarding your personal information, including:
          </p>

          <ul style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            paddingLeft: '20px'
          }}>
            <li style={{ marginBottom: '8px' }}>Access to your personal information</li>
            <li style={{ marginBottom: '8px' }}>Correction of inaccurate information</li>
            <li style={{ marginBottom: '8px' }}>Deletion of your information (subject to legal requirements)</li>
            <li style={{ marginBottom: '8px' }}>Opt-out of marketing communications</li>
            <li style={{ marginBottom: '8px' }}>Data portability</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Contact Us
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '16px'
          }}>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
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
              Email: privacy@eventhub.com
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

export default PrivacyPolicy;