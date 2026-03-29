import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react'; // Assuming lucide-react for icons

export default function SignUp() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const responseText = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Text:', responseText);

      if (!response.ok) {
        const errorData = responseText ? JSON.parse(responseText) : { error: 'Unknown error' };
        throw new Error(errorData.error || 'Registration failed');
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/auth/signin');
      }, 1500);
    } catch (error: any) {
      setError(error.message);
      console.error('Registration Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register Admin</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 text-blue-500" /> Username
          </label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Lock className="w-4 h-4 text-blue-500" /> Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Sudah punya akun?{' '}
          <Link to="/auth/signin" className="text-blue-600 hover:underline">
            Login sekarang
          </Link>
        </p>
      </form>
    </div>
  );
}
