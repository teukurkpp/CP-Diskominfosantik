import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const responseText = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Text:', responseText);

      if (!response.ok) {
        const errorData = responseText ? JSON.parse(responseText) : { error: 'Unknown error' };
        throw new Error(errorData.error || 'Login gagal');
      }

      const data = JSON.parse(responseText);
      if (!data.token || !data.user) throw new Error('Token atau data user tidak ditemukan dalam respons');
      
      setSuccess('Login berhasil! Mengarahkan ke dashboard...');
      setTimeout(() => {
        signIn(data.token, data.user); // Use signIn from AuthContext
      }, 1500);
    } catch (error: any) {
      setError(error.message);
      console.error('Login Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login Admin</h2>
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
          Login
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun?{' '}
          <a href="/auth/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
