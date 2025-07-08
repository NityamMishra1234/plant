'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlant } from '@/store/plantManagementSlice';
import { RootState, AppDispatch } from '@/store/store';

export default function PlantAddForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.admin);
  const [form, setForm] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setForm((prev) => ({ ...prev, image: e.target.files![0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name.trim());
    formData.append('type', form.type.trim());
    formData.append('description', form.description.trim());
    formData.append('price', form.price);
    if (form.image) formData.append('image', form.image);

    dispatch(addPlant({ formData, token: token! }));
  };

  return (
    <div className="bg-white text-black rounded-xl p-6 shadow-xl w-full max-w-xl mx-auto border-2 border-black">
      <h2 className="text-2xl text-green-700 font-bold mb-4 text-center">Add New Plant 🌿</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Name" required className="input" />
        <input name="type" onChange={handleChange} placeholder="Type (Indoor/Outdoor)" required className="input" />
        <textarea name="description" onChange={handleChange} placeholder="Description" required className="input" />
        <input name="price" type="number" onChange={handleChange} placeholder="Price (INR)" required className="input" />
        <label htmlFor="image" className="block font-medium text-gray-700">Image</label>
        <input
          id="image"
          name="image"
          type="file"
          onChange={handleImage}
          required
          className="input"
          title="Upload plant image"
          placeholder="Upload plant image"
        />
        <button type="submit" className="bg-green-700 text-white w-full py-2 rounded hover:bg-green-800">
          Add Plant
        </button>
      </form>
    </div>
  );
}
