'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlants } from '@/store/plantManagementSlice';
import { RootState, AppDispatch } from '@/store/store';

export default function PlantShowcase() {
  const dispatch = useDispatch<AppDispatch>();
  const { plants, loading } = useSelector((state: RootState) => state.plantManagement);

  useEffect(() => {
    dispatch(fetchPlants());
  }, [dispatch]);

  return (
    <div className="bg-black text-white py-10 px-4 sm:px-8 lg:px-20 mt-20">
      <h2 className="text-3xl font-bold text-green-500 text-center mb-8">🌿 Featured Plants</h2>

      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plants.map((plant) => (
            <div key={plant._id} className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition">
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold text-green-700">{plant.name}</h3>
              <p className="text-sm text-gray-600">{plant.type}</p>
              <p className="text-gray-800 mt-1">{plant.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-black">₹{plant.price}</span>
                <button 
                 className="bg-green-700 hover:bg-green-800 text-white py-1 px-3 rounded text-sm">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
