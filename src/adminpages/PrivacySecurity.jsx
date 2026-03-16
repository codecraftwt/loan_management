import { useState } from 'react';
import { FiLock, FiShield, FiEyeOff, FiCheckCircle, FiAlertTriangle, FiMail } from 'react-icons/fi';
import { BsShieldCheck } from 'react-icons/bs';


const sections = [
  {
    title: '1. Acceptance of Terms',
    content:
      'By accessing and using the LoanHub application, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
  },
  {
    title: '2. Description of Service',
    content:
      'LoanHub provides a platform for managing personal loans between lenders and borrowers. Our service facilitates loan tracking, payment management, and financial record keeping. We do not provide financial advice or act as a financial institution.',
  },
  {
    title: '3. User Accounts',
    content:
      'To use our services, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.',
  },
  {
    title: '4. User Responsibilities',
    content:
      'Users agree to use the service only for lawful purposes and in accordance with these terms. You shall not use the service to engage in any fraudulent, misleading, or illegal activities. All loan agreements made through the platform are between the respective parties.',
  },
  {
    title: '5. Privacy & Data',
    content:
      'Your use of the service is also governed by our Privacy Policy. We collect and process personal data as described in our Privacy Policy. By using our service, you consent to such processing and warrant that all data provided by you is accurate.',
  },
  {
    title: '6. Intellectual Property',
    content:
      'The service and its original content, features, and functionality are owned by LoanHub and are protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute any part of our service without permission.',
  },
  {
    title: '7. Limitation of Liability',
    content:
      'LoanHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. We do not guarantee the accuracy of loan calculations or the reliability of user-provided information.',
  },
  {
    title: '8. Termination',
    content:
      'We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.',
  },
  {
    title: '9. Changes to Terms',
    content:
      'We reserve the right to modify these terms at any time. We will notify users of any material changes via the app or email. Your continued use of the service after such modifications constitutes acceptance of the updated terms.',
  },
  {
    title: '10. Contact Information',
    content:
      'If you have any questions about these Terms of Service, please contact us at support@loanhub.com or through our in-app support feature.',
  },
];

export function PrivacySecurity() {
  const [expanded, setExpanded] = useState(null); // accordion state

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto mb-8 md:mb-12 text-center">
        <div className="inline-flex items-center gap-2 md:gap-3 mb-4 bg-gradient-to-r from-orange-300 to-orange-500 text-white px-5 py-2.5 md:px-8 md:py-3.5 rounded-full shadow-lg">
          <BsShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
          <h1 className="text-lg md:text-2xl font-bold tracking-tight">Privacy & Security</h1>
        </div>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
          At LoanHub, protecting your personal and financial information is our top priority. We follow strict security standards and comply with all applicable data protection regulations.
        </p>
      </div>

      {/* Security Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16 max-w-5xl mx-auto">
        {/* Card 1 - Data Encryption */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-5 md:p-6 hover:shadow-xl hover:border-orange-300 transition-all duration-300 group">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors flex-shrink-0">
              <FiShield className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Data Encryption
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            All data is encrypted in transit (TLS 1.3) and at rest (AES-256).
          </p>
        </div>

        {/* Card 2 - Two-Factor Authentication */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-6 hover:shadow-xl hover:border-orange-300 transition-all duration-300 group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors flex-shrink-0">
              <FiLock className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Two-Factor Authentication
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Enable 2FA for an extra layer of protection on your account.
          </p>
        </div>

        {/* Card 3 - Privacy First */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-6 hover:shadow-xl hover:border-orange-300 transition-all duration-300 group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors flex-shrink-0">
              <FiEyeOff className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Privacy First
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            We never sell your data. Full control over your personal information.
          </p>
        </div>
      </div>

      {/* Main Content - Accordion Style Sections */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 mb-10 overflow-hidden">
        <div className="p-5 md:p-10">
          <h2 className="flex items-center gap-3 text-lg md:text-2xl font-bold text-gray-900 mb-6 md:mb-10">
            <FiShield className="w-6 h-6 md:w-8 md:h-8 text-orange-600 shrink-0 mt-0.5" />
            Privacy Policy & Security Guidelines
          </h2>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-orange-300"
              >
                <button
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <h3 className="text-sm md:text-base font-bold text-gray-800 pr-4">{section.title}</h3>
                  <span className={`transform transition-transform cursor-pointer ${expanded === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                <div
                  className={`px-4 md:px-6 transition-all duration-300 ease-in-out ${expanded === index ? 'max-h-[1000px] opacity-100 pt-5' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Security Note */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-6 md:py-8 border-t border-gray-200 text-center">
          <p className="flex flex-col md:flex-row text-gray-700 flex items-center justify-center font-bold text-sm md:text-base mb-2">
            <FiCheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            Your security is our priority. Last updated: March 2026
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 mt-2">
            For any privacy concerns, contact us at <a href="mailto:privacy@loanhub.com" className="text-blue-600 hover:underline">privacy@loanhub.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}