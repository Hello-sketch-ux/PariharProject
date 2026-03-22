import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

const Feedback: React.FC = () => {
  const token = localStorage.getItem("token");

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    toast.loading("Loading...");

    try {
      const res = await axios.post(
        `${apiUrl}/api/feedback`,
        { name, email, rating, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.dismiss();
      toast.success(res?.data?.message || "Feedback submitted successfully");
    } catch (err: unknown) {
      toast.dismiss();
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <MessageSquare className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-green-500" />
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            We Value Your Feedback
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            Your feedback helps us improve our products and services
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="rounded-md bg-green-50 p-4 mb-6">
            <div className="flex">
              <svg
                className="h-5 w-5 text-green-400 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Feedback Submitted
                </h3>
                <p className="mt-1 text-sm text-green-700">
                  Thank you for your feedback! We appreciate your input.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rate Your Experience
                </label>
                <div className="mt-2 flex items-center flex-wrap gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                    >
                      <svg
                        className={`h-7 w-7 sm:h-8 sm:w-8 ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {rating > 0 ? `${rating}/5` : 'Select rating'}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Feedback
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>

              {/* Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Feedback;
