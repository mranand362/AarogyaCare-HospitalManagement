// frontend/src/pages/FAQs.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment by clicking on the 'Book Appointment' button.",
      category: "Appointments"
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment.",
      category: "Appointments"
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept UPI, cards, net banking, etc.",
      category: "Payments"
    },
    {
      question: "Can I get a refund if I cancel?",
      answer: "Yes, based on cancellation time.",
      category: "Payments"
    },
    {
      question: "How do I access my medical reports?",
      answer: "Available in dashboard under medical records.",
      category: "Medical Records"
    },
    {
      question: "Is my medical information secure?",
      answer: "Yes, fully encrypted and secure.",
      category: "Technical Support"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 🔥 FILTER LOGIC
  const filteredFAQs = faqs.filter((faq) => {
    return (
      (category === "All" || faq.category === category) &&
      faq.question.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-emerald-50 py-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions
          </p>
        </div>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search your question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
        />

        {/* 🎯 Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Appointments", "Payments", "Medical Records", "Technical Support"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm ${
                category === cat
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📋 FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex justify-between items-center"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span>{openIndex === index ? "▲" : "▼"}</span>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found</p>
          )}
        </div>

        {/* 🚀 CTA */}
        <div className="mt-12 bg-teal-600 p-8 text-center text-white rounded-xl">
          <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
          <div className="flex justify-center gap-4 mt-4">
            <Link to="/contact" className="bg-white text-teal-600 px-4 py-2 rounded">
              Contact
            </Link>
            <Link to="/appointment" className="border px-4 py-2 rounded">
              Book
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQs;