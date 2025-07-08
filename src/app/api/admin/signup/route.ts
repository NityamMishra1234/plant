import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db('nursury');

  const exists = await db.collection('admins').findOne({ email });
  if (exists) return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.collection('admins').insertOne({
    email,
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date(),
  });

  return NextResponse.json({ message: 'Admin account created' }, { status: 201 });
}
