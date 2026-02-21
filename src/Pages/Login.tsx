
import React, { useState } from 'react';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (data: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
  }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !email.trim() || !mobile.trim() || !password.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        password: password.trim()
      };

      const response = await fetch(`${apiUrl}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ firstName, lastName, email, mobile })
        );

        onLogin({ firstName, lastName, email, mobile });
        navigate('/');
      } else {
        const errorMsg = data.message || data.error || JSON.stringify(data) || 'Login failed.';
        setError(errorMsg);
        console.error("Login error details:", { status: response.status, data, errorMsg });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Server error. Please try again.';
      setError(errorMessage);
      console.error("Login fetch error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-8 sm:py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-5 py-6 sm:px-6 sm:py-8">

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              Welcome Back
            </h2>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700">
              Sign in to your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <InputField
              id="firstName"
              label="First Name"
              value={firstName}
              onChange={setFirstName}
              Icon={User}
              required
            />

            <InputField
              id="lastName"
              label="Last Name (Optional)"
              value={lastName}
              onChange={setLastName}
              Icon={User}
            />

            <InputField
              id="email"
              label="Email Address"
              value={email}
              onChange={setEmail}
              Icon={Mail}
              type="email"
              required
            />

            <InputField
              id="mobile"
              label="Mobile Number"
              value={mobile}
              onChange={setMobile}
              Icon={Phone}
              type="tel"
              required
            />

            <InputField
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
              Icon={Lock}
              type="password"
              required
            />

            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-500 hover:bg-green-700 text-white rounded-md text-sm font-medium transition"
            >
              Sign in
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  Icon: React.ElementType;
  type?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  Icon,
  type = 'text',
  required = false,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>

    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>

      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 block w-full py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"
      />
    </div>
  </div>
);

export default Login;
