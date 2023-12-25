import { NextResponse } from 'next/server';
import { authorize, uploadFileToDrive } from '@/services/storage/gdrive/gdrive';

export const POST = async (request) => {
  try {
    const { file, fileName } = await request.json();
    const auth = await authorize();

    const fileId = await uploadFileToDrive(auth, file, fileName,"ank/assets");
    return NextResponse.json({ fileId }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};