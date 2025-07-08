'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlants, deletePlant } from '@/store/plantManagementSlice';
import { RootState, AppDispatch } from '@/store/store';

export default function PlantList() {
  const dispatch = useDispatch<AppDispatch>();
  const { plants, loading } = useSelector((state: RootState) => state.plantManagement);
  const { token } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(fetchPlants());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deletePlant({ id, token: token! }));
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl text-green-700 font-bold mb-4">🌱 All Plants</h2>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <div key={plant._id} className="bg-white rounded-lg p-4 shadow">
              <img src={plant.imageUrl} alt={plant.name} className="w-full h-40 object-cover rounded" />
              <h3 className="text-xl font-semibold text-green-700 mt-2">{plant.name}</h3>
              <p className="text-sm">{plant.type}</p>
              <p className="text-gray-700 mt-1">{plant.description}</p>
              <p className="text-black mt-2 font-bold">₹ {plant.price}</p>
              <button
                onClick={() => handleDelete(plant._id!)}
                className="mt-2 bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
