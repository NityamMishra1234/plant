export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { generateToken } from '@/lib/jwt';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db('nursury');

  const user = await db.collection('users').findOne({ email });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = generateToken({ email, role: 'user' });

  // Remove password before returning user info
  const { password: _, ...userWithoutPassword } = user;

  return NextResponse.json(
    {
      token,
      user: userWithoutPassword,
    },
    { status: 200 }
  );
}
