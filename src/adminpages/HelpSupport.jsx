import { useState } from "react";
import { BsClock } from "react-icons/bs";
import { CiCircleInfo } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";

export function HelpSupport() {

  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqItems = [
    {
      q: "How do I reset my password?",
      a: "Go to Settings → Account → Reset Password. You'll receive a verification code on your registered email or mobile. Enter the code and set a new strong password (minimum 8 characters with uppercase, lowercase, number, and special character).",
    },
    {
      q: "How can I contact support?",
      a: "You can reach our support team via:\n• Email: support@loanhub.com\n• In-app chat (available 9AM - 6PM IST)\n• Phone: +91 98765 43210 (Mon-Fri, 9AM-6PM)",
    },
    {
      q: "Is my data safe with LoanHub?",
      a: "Yes, we use bank-grade encryption (AES-256), HTTPS/TLS 1.3, and comply with RBI guidelines. We never sell or share your personal data without consent. All data is stored securely on encrypted servers.",
    },
    {
      q: "How do I update my profile or KYC details?",
      a: "Go to Dashboard → Profile → Edit Profile. You can update name, mobile, address, or upload new documents. For KYC changes, verification takes 24-48 hours.",
    },
    {
      q: "What should I do if my account is locked?",
      a: "If your account gets locked after multiple failed attempts, wait 30 minutes or contact support. You can also reset password using the 'Forgot Password' option on login page.",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10 pt-4">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            How can we help?
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
            Quick answers or contact our team.
          </p>
        </div>

        {/* Quick Help – 4 small cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
          {[
            { icon: '📖', title: 'Guides' },
            { icon: '🎥', title: 'Tutorials' },
            { icon: '👥', title: 'Community' },
            { icon: '📚', title: 'Resources' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 text-center hover:border-orange-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* FAQ Section – Accordion Style */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-5 md:p-8">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6">
              <CiCircleInfo className="w-7 h-7 text-orange-600 shrink-0 " />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-orange-300"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <h3 className="text-sm md:text-base font-semibold text-gray-900">{item.q}</h3>
                    <span className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  <div
                    className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${expandedFaq === index ? 'max-h-[1000px] opacity-100 py-5' : 'max-h-0 opacity-0 py-0'
                      }`}
                  >
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Options – 3 small cards */}
        <div className="mb-12 m-[10px]">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 text-center">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '📧', title: 'Email', desc: 'support@loanhub.com' },
              { icon: '📞', title: 'Call', desc: '+91 98765 43210' },
              { icon: '🗓️', title: 'Meetup', desc: 'Schedule a call' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 text-center border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 break-words">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Form – smaller */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
            Send Message
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Tell us your issue...
          </p>

          <textarea
            rows={4}
            placeholder="Describe your issue or question..."
            className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none text-sm"
          />

          <div className="border-t border-gray-200 mt-5 pt-4 text-center">
            <p className="text-xs text-gray-500">
              We usually reply within 24 hours.
            </p>
          </div>

          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl shadow-md transition-all">
              Send Message
            </button>
          </div>
        </div>

        {/* Support Hours */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-orange-100 p-5 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-gray-700 text-sm font-medium">
            <BsClock className="w-5 h-5 text-orange-600" />
            <span>9AM - 6PM, Monday to Friday</span>
          </div>
        </div>
      </div>
    </div>
  );
}