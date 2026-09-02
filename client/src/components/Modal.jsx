import React from "react";

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="max-h-120 overflow-y-auto text-gray-700">
          {title.includes("Privacy") ?
            <div className="max-w-3xl mx-auto p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
              <p className="text-gray-600"><strong>Effective Date:</strong> March 5, 2025</p>

              <p className="mt-4 text-gray-700">
                Welcome to <strong>ShopSphere</strong>. We are committed to protecting your privacy and ensuring the security of your personal information.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">1. Information We Collect</h2>
              <p className="text-gray-700">We may collect the following information when you use our website:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Personal details (name, email, phone number, shipping address)</li>
                <li>Payment information for purchases</li>
                <li>Browsing behavior and preferences</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">2. How We Use Your Information</h2>
              <p className="text-gray-700">We use your information to:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Process orders and transactions</li>
                <li>Improve our website and services</li>
                <li>Send promotional offers and updates (if opted-in)</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">3. Data Protection</h2>
              <p className="text-gray-700">We implement security measures to safeguard your personal information from unauthorized access or disclosure.</p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">4. Third-Party Services</h2>
              <p className="text-gray-700">We may share data with trusted third parties for:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Payment processing</li>
                <li>Order fulfillment</li>
                <li>Marketing and analytics</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">5. Cookies & Tracking</h2>
              <p className="text-gray-700">Our website uses cookies to enhance user experience. You can manage cookie preferences in your browser settings.</p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">6. Your Rights</h2>
              <p className="text-gray-700">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Access and update your personal data</li>
                <li>Request data deletion</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">7. Changes to Policy</h2>
              <p className="text-gray-700">We may update this Privacy Policy periodically. Any changes will be posted on this page.</p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">8. Contact Us</h2>
              <p className="text-gray-700">
                📧 <strong>Email:</strong> <a href="mailto:support@shopsphere.com" className="text-blue-600 underline">support@shopsphere.com</a>
              </p>
              <p className="text-gray-700">
                📍 <strong>Address:</strong> 123 Market Street, Pune, India
              </p>
            </div>
            : <div className="max-w-3xl mx-auto p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms & Conditions</h1>
              <p className="text-gray-600"><strong>Effective Date:</strong> March 5, 2025</p>

              <p className="mt-4 text-gray-700">
                Welcome to <strong>ShopSphere</strong>. By accessing and using our website, you agree to comply with the following terms and conditions. Please read them carefully.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">1. Acceptance of Terms</h2>
              <p className="text-gray-700">By using ShopSphere, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website.</p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">2. Use of Our Website</h2>
              <p className="text-gray-700">When using our platform, you agree:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Not to misuse or harm our website in any way.</li>
                <li>To provide accurate and complete information when creating an account or placing an order.</li>
                <li>To comply with all applicable laws and regulations.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">3. Account Registration</h2>
              <p className="text-gray-700">To make purchases, you may need to create an account. You are responsible for maintaining the confidentiality of your login details.</p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">4. Orders & Payments</h2>
              <ul className="list-disc pl-6 text-gray-700">
                <li>You agree to provide valid payment details.</li>
                <li>All orders are subject to availability.</li>
                <li>ShopSphere reserves the right to cancel or refuse any order at its discretion.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">5. Returns & Refunds</h2>
              <p className="text-gray-700">We offer a return policy for eligible items. For full details, please review our <a href="/return-policy" className="text-blue-600 underline">Return Policy</a>.</p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">6. Intellectual Property</h2>
              <p className="text-gray-700">All content on this website, including text, images, logos, and graphics, is the property of ShopSphere and protected by copyright laws.</p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">7. Limitation of Liability</h2>
              <p className="text-gray-700">We are not liable for any indirect, incidental, or consequential damages arising from your use of our website or services.</p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">8. Changes to Terms</h2>
              <p className="text-gray-700">We may update these Terms & Conditions at any time. Changes will be effective once posted on this page.</p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">9. Governing Law</h2>
              <p className="text-gray-700">These terms are governed by the laws of India. Any disputes will be resolved in the courts of Pune.</p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">10. Contact Us</h2>
              <p className="text-gray-700">
                📧 <strong>Email:</strong> <a href="mailto:support@shopsphere.com" className="text-blue-600 underline">support@shopsphere.com</a>
              </p>
              <p className="text-gray-700">
                📍 <strong>Address:</strong> 123 Market Street, Pune, India
              </p>
            </div>}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
