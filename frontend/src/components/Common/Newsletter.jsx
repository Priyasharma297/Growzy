import React, { useState } from 'react';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/send-subscribe-email`, {
        email,
      });

      if (res.status === 200) {
        setStatus('✅ Subscription email sent!');
        setEmail('');
      } else {
        setStatus('❌ Failed to send email.');
      }
    } catch (error) {
      console.error('Email error:', error);
      setStatus('❌ Error sending email.');
    }
  };

  return (
    <div>
      <h3 className="text-lg text-green-800 font-semibold mb-4">Newsletter</h3>
      <p className="text-gray-600 mb-4">
        Be the first to hear about new indoor & outdoor plant arrivals.
      </p>
      <p className="font-medium text-sm text-gray-700 mb-6">
        Sign up and get 10% off your first order.
      </p>

      <form className="flex" onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 w-full text-sm border-t border-l border-b border-green-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 text-sm rounded-r-md hover:bg-green-700 transition-all"
        >
          Subscribe
        </button>
      </form>

      {status && <p className="mt-2 text-sm text-green-700">{status}</p>}
    </div>
  );
};

export default Newsletter;
