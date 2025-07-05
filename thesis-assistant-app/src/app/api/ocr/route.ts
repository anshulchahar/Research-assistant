import { NextRequest, NextResponse } from 'next/server';
import { ImageAnnotatorClient } from '@google-cloud/vision';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const credentialsString = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credentialsString) {
    return NextResponse.json({ error: 'Google credentials not set in .env.local' }, { status: 500 });
  }

  const credentials = JSON.parse(credentialsString);
  // The private key has escaped newlines. Let's un-escape them.
  credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

  const client = new ImageAnnotatorClient({
    credentials,
  });

  const buffer = await file.arrayBuffer();
  const image = {
    content: Buffer.from(buffer),
  };

  try {
    const [result] = await client.textDetection({ image });
    const detections = result.textAnnotations;
    const text = detections?.[0]?.description || '';
    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error calling Google Vision API:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
