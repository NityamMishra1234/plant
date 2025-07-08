'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '@/store/userSlice';
import { RootState, AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function UserSignup() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const router = useRouter();

  // If you want to handle redirect after successful signup, 
  // you should use a property that exists in your UserState, 
  // such as a 'user' object or similar. 
  // For now, this effect is removed to avoid referencing 'success'.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupUser(form));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white text-black rounded-xl p-8 w-full max-w-md shadow-2xl space-y-4">
        <h1 className="text-3xl font-bold text-green-700 mb-2 text-center">🌿 NursuryAI - Signup</h1>

        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="input" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" type="email" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" className="input" type="password" required />

        <button type="submit" disabled={loading} className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition">
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <span onClick={() => router.push('/user/login')} className="text-green-700 hover:underline cursor-pointer">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
