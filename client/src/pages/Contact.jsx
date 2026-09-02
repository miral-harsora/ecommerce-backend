import React from 'react';
import { Link } from 'react-router-dom';

const Contact = ({navbarHeight}) => {
    return (
        <>
            <div className='flex flex-col ' style={{paddingTop: `10px`}}>
                <div className='mx-4 text-gray-500'>
                    <Link to="/"> Home</Link> / <span className='font-bold'>Contact Us</span>
                </div>
                <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - FAQ & Contact */}
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
          <ul className="text-[#F7569B] space-y-2">
            <li><a href="#">Where does ShopSphere deliver?</a></li>
            <li><a href="#">Can I edit my order after it’s placed?</a></li>
            <li><a href="#">Does ShopSphere charge a delivery fee?</a></li>
            <li><a href="#">What should I do with the packaging?</a></li>
            <li><a href="#">How do I report an issue with my order?</a></li>
          </ul>

          <h3 className="mt-6 text-xl font-semibold">Prefer to text?</h3>
          <p className="text-gray-700">Text us anytime at (415) 966-4133. We’re here for you.</p>
        </div>

        {/* Right Column - Contact Form */}
        <div className="col-span-2">
          {/* Get in Touch Heading Above Form */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-left">Get in touch</h1>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <form className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium">Your email address *</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                  placeholder="Enter your email"
                />
              </div>

              {/* Dropdowns */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">Region *</label>
                  <select className="w-full border border-gray-300 p-2 rounded mt-1">
                    <option value="">Select Region</option>
                    <option value="CA">Canada</option>
                    <option value="US">United States</option>
                    <option value="IN">India</option>
                    <option value="EU">Europe</option>
                    <option value="AS">Asia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Select a Topic *</label>
                  <select className="w-full border border-gray-300 p-2 rounded mt-1">
                    <option value="">Choose a topic</option>
                    <option value="order">Order Issues</option>
                    <option value="delivery">Delivery Questions</option>
                    <option value="returns">Returns & Refunds</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-gray-700 font-medium">Subject *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                  placeholder="Enter subject"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-medium">Tell us more about what we can help with. *</label>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded mt-1 h-32"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-gray-700 font-medium">Attachments</label>
                <input type="file" className="w-full border border-gray-300 p-2 rounded mt-1" />
              </div>

              {/* Submit Button */}
              <button className="bg-[#F7569B] text-white px-6 py-2 rounded w-full hover:bg-pink-600">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
            </div>
        </>
    );
};

export default Contact;