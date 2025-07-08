'use client';
import React from 'react';
import AdminNavbar from '../../../component/admin/AdminNavbar';
import PlantAddForm from '../../../component/admin/PlantAddForm';
import PlantList from '../../../component/PlantList';

export default function AdminPlantsPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      <AdminNavbar />
      <div className="p-6 space-y-10">
        <PlantAddForm />
        <PlantList />
      </div>
    </div>
  );
}
