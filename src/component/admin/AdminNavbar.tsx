    'use client';

import { useRouter } from 'next/navigation';

export default function AdminNavbar() {
  const router = useRouter();

  return (
    <nav className="bg-black text-white flex justify-between items-center p-4 shadow-md">
      <h1 className="text-2xl font-bold text-green-500">🌿 NursuryAI</h1>
      <div className="flex space-x-6">
        <span onClick={() => router.push('/admin/workers')} className="cursor-pointer hover:text-green-400">Workers</span>
        <span onClick={() => router.push('/admin/plants')} className="cursor-pointer hover:text-green-400">Plants</span>
      </div>
    </nav>
  );
}
