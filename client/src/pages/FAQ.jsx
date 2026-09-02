import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Where does ShopSphere deliver?",
    answer: "We deliver across multiple regions. You can check your specific location at checkout.",
  },
  {
    question: "Can I edit my order after it’s placed?",
    answer: "You can modify your order within 1 hour of placing it from your account dashboard.",
  },
  {
    question: "Does ShopSphere charge a delivery fee?",
    answer: "Delivery fees vary based on location and order total. Orders above $50 qualify for free shipping.",
  },
  {
    question: "What should I do with the packaging?",
    answer: "Our packaging is eco-friendly and recyclable. Please dispose of it responsibly or reuse it.",
  },
  {
    question: "How do I report an issue with my order?",
    answer: "You can report an issue by contacting our support team through the ‘Get in Touch’ page.",
  },
];

const FAQ = ({navbarHeight}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6" style={{paddingTop: `10px`}}>
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-lg">
            <button
              className="w-full text-left p-4 flex justify-between items-center text-lg font-semibold"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <FaChevronDown
                className={`transform transition-transform ${openIndex === index ? "rotate-180" : "rotate-0"}`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700 border-t border-gray-300">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
