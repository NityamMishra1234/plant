'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '@/store/adminSlice';
import { RootState, AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, token } = useSelector((state: RootState) => state.admin);

  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginAdmin(form));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white text-black rounded-xl p-8 w-full max-w-md shadow-2xl space-y-4">
        <h1 className="text-3xl font-bold text-green-700 text-center">🌿 NursuryAI - Admin Login</h1>

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="input" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="input" required />

        <button type="submit" disabled={loading} className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition">
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <span onClick={() => router.push('/admin/signup')} className="text-green-700 hover:underline cursor-pointer">
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
