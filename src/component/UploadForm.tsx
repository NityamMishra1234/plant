'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { identifyPlant } from '../store/plantSlice';
import { RootState, AppDispatch } from '../store/store';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, result, error } = useSelector((state: RootState) => state.plant);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    dispatch(identifyPlant(formData));
  };

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col gap-4 items-center text-center">
      <h1 className="text-2xl font-bold">Identify a Plant 🌿</h1>

      <label htmlFor="plant-image-upload" className="sr-only">
        Upload plant image
      </label>
      <input
        id="plant-image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
        title="Upload plant image"
        placeholder="Choose an image"
      />

      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          className="w-64 h-64 object-cover rounded-md border shadow"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Identifying...' : 'Identify Plant'}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {result && (
        <>
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <div className="mt-6 w-full flex flex-wrap justify-center gap-8">
            {result.result.classification.suggestions.slice(0, 3).map((plant: any, index: number) => (
              <div
                key={index}
                className="w-64 p-4 border rounded-md bg-black text-white shadow-md flex flex-col items-center"
              >
                <p className="font-bold text-center">{plant.name}</p>
                <p className="text-sm text-green-400 mt-1">
                  Confidence: {(plant.probability * 100).toFixed(2)}%
                </p>
                {plant.similar_images?.[0]?.url_small && (
                  <img
                    src={plant.similar_images[0].url_small}
                    alt="similar"
                    className="mt-3 w-full h-64 object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
