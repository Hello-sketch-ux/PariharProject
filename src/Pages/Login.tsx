import React, { useState } from 'react';
import { User, Mail, Lock, Phone } from 'lucide-react';

const Login: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !mobile || !password) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, mobile, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Login successful! 🎉');
        setError('');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black">Welcome Back</h2>
            <p className="mt-2 text-black">Sign in to your account</p>
          </div>

          {error && <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md text-sm">{error}</div>}
          {success && <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md text-sm">{success}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="pl-10 block w-full py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Other input fields remain unchanged */}

            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;