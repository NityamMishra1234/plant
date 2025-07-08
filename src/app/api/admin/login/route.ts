import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { generateToken } from '@/lib/jwt';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db('nursury');

  const admin = await db.collection('admins').findOne({ email });
  if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = generateToken({ email, role: 'admin' });

  return NextResponse.json({ token }, { status: 200 });
}
