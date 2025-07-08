export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY
    console.log(process.env.PLANT_ID_API_KEY)
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    const response = await axios.post('https://plant.id/api/v3/identification', {
      images: [`data:${file.type};base64,${base64Image}`],
      latitude: 28.6139,         // Optional: your coordinates
      longitude: 77.2090,
      similar_images: true
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': process.env.PLANT_ID_API_KEY as string,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Plant ID Error:', error?.response?.data || error.message);
    return NextResponse.json({ error: 'Plant identification failed' }, { status: 500 });
  }
}
