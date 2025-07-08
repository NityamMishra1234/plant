export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import { verifyAdmin } from '@/lib/verifyAdmin';

export async function POST(req: NextRequest) {
  try {
    // Skip this check entirely if headers are unavailable
    const contentType = req.headers?.get?.('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const user = verifyAdmin(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.formData();
    const file = data.get('image') as File;

    const name = data.get('name') as string;
    const type = data.get('type') as string;
    const description = data.get('description') as string;
    const price = Number(data.get('price'));

    if (!file || !name || !type || !description || !price) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'nursury' }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }).end(buffer);
    });

    const db = (await clientPromise).db('nursury');
    await db.collection('plants').insertOne({
      name,
      type,
      description,
      price,
      imageUrl: upload.secure_url,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Plant added successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error in POST /api/addplants:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = (await clientPromise).db('nursury');
    const plants = await db.collection('plants').find().toArray();
    return NextResponse.json(plants);
  } catch (error) {
    console.error('Error in GET /api/addplants:', error);
    return NextResponse.json({ error: 'Failed to fetch plants' }, { status: 501 });
  }
}
