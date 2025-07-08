export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { name, email, password, address } = await req.json();

    const client = await clientPromise;
    const db = client.db('nursury');

    const existing = await db.collection('users').findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      address,
      role: 'user',
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'User signed up successfully' }, { status: 201 });
  } catch (err) {
    console.error('Signup Error:', err);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
