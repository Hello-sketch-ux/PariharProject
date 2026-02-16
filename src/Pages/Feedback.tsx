import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

const Feedback: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const apiUrl = import.meta.env.VITE_API_URL;

  // ✅ Client-side validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = "Valid email is required";
    }

    if (!rating || rating < 1 || rating > 5) {
      newErrors.rating = "Please select a rating (1-5)";
    }

    if (!message.trim() || message.trim().length < 5) {
      newErrors.message = "Feedback must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate form first
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Submitting feedback...");

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error("You must be logged in to submit feedback");
        setIsLoading(false);
        return;
      }

      const res = await axios.post(
        `${apiUrl}/api/feedback`,
        {
          name: name.trim(),
          email: email.trim(),
          rating,
          message: message.trim()
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 10000 // 10 second timeout
        }
      );

      if (res.data.success) {
        toast.update(toastId, {
          render: res?.data?.message || "Feedback submitted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });

        // ✅ Reset form
        setSubmitted(true);
        setName('');
        setEmail('');
        setRating(0);
        setMessage('');
        setErrors({});

        // ✅ Hide success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      }

    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          "Failed to submit feedback. Please try again.";
      
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 4000
      });

      console.error("Feedback submission error:", error);
      console.error("Response data:", error?.response?.data);
      console.error("Status code:", error?.response?.status);
      console.error("Request config:", error?.config);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <MessageSquare className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            We Value Your Feedback
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Your feedback helps us improve our products and services
          </p>
        </div>

        {submitted && (
          <div className="rounded-md bg-green-50 p-4 mb-6">
            <div className="flex">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Feedback Submitted
                </h3>
                <p className="mt-1 text-sm text-green-700">
                  Thank you for your feedback!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow sm:rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      if (errors.rating) setErrors({ ...errors, rating: '' });
                    }}
                  >
                    <svg
                      className={`h-8 w-8 cursor-pointer transition ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {rating ? `${rating}/5 stars` : 'Select rating'}
                </span>
              </div>
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>

            <div>
              <textarea
                rows={4}
                placeholder="Your feedback (minimum 5 characters)..."
                required
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                  errors.message ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'
                }`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
