import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function verifyAdmin(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if ((decoded as any).role === 'admin') return decoded;
    return null;
  } catch (err) {
    return null;
  }
}
