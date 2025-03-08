import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const Feedback: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    console.log({ name, email, rating, message });
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setName('');
      setEmail('');
      setRating(0);
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-black w-full min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <MessageSquare className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-2 text-3xl font-bold text-white">We Value Your Feedback</h2>
          <p className="mt-2 text-lg text-white">
            Your feedback helps us improve our products and services
          </p>
        </div>

        {submitted ? (
          <div className="rounded-md bg-green-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Feedback Submitted</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Thank you for your feedback! We appreciate your input.</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Your Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-white rounded-mf text-white"
                      placeholder='John Doe'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md text-white"
                      placeholder='abc@example.com'
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Rate Your Experience
                </label>
                <div className="mt-1 flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`h-8 w-8 ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-300">
                    {rating > 0 ? `${rating} out of 5 stars` : 'Select a rating'}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white">
                  Your Feedback
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md text-white"
                    placeholder="Please share your thoughts, suggestions, or concerns..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10 bg-gray-900 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-white">
              Why Your Feedback Matters
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="prose prose-green max-w-none text-white">
              <p>
                At Parihar India, we are committed to providing the best possible experience for our customers. Your feedback helps us:
              </p>
              <ul>
                <li>Improve our products and services</li>
                <li>Identify areas where we can do better</li>
                <li>Understand your needs and preferences</li>
                <li>Develop new features and offerings</li>
              </ul>
              <p>
                We carefully review all feedback and use it to make meaningful improvements. Thank you for taking the time to share your thoughts with us!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;