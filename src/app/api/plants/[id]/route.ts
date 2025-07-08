import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/jwt';
import { ObjectId } from 'mongodb';
import type { NextApiRequestContext } from 'next'; // ✅ Import this

export async function DELETE(
  req: NextRequest,
  context: NextApiRequestContext
) {
  try {
    const { id } = context.params; // ✅ Destructure like this

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (typeof decoded !== 'object' || !decoded || (decoded as any).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - Not admin' }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db('nursury');

    const result = await db.collection('plants').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Plant deleted successfully' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
