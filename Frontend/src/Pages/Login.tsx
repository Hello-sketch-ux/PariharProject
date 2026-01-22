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
    if (!firstName || !email || !mobile || !password) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, mobile, password }),
      });

      const data = await response.json();
      console.log("login-response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ firstName, lastName, email, mobile }));

        onLogin({ firstName, lastName, email, mobile });
        navigate('/');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (error) {
      setError('Server error. Please try again.');
      console.log(error)
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

          {error && <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField id="firstName" label="First Name" value={firstName} onChange={setFirstName} Icon={User} required />
            <InputField id="lastName" label="Last Name (Optional)" value={lastName} onChange={setLastName} Icon={User} />
            <InputField id="email" label="Email Address" value={email} onChange={setEmail} Icon={Mail} type="email" required />
            <InputField id="mobile" label="Mobile Number" value={mobile} onChange={setMobile} Icon={Phone} type="tel" required />
            <InputField id="password" label="Password" value={password} onChange={setPassword} Icon={Lock} type="password" required />

            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">Forgot your password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-500 hover:bg-green-700 text-white rounded-md text-sm font-medium"
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

const InputField: React.FC<InputFieldProps> = ({ id, label, value, onChange, Icon, type = "text", required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 block w-full py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
    </div>
  </div>
);

export default Login;
