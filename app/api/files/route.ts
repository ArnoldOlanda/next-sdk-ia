import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import unzipper from 'unzipper';
import { getDirectoryStructure } from './tools';
import { join } from 'path';
import * as fs from 'fs';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Define the path where the file will be saved
  const fileName = file.name;
  const uploadPath = join(process.cwd(), 'public', 'uploads');
  const filePath = join(uploadPath, fileName);

  // Create the directory if it doesn't exist
  await mkdir(uploadPath, { recursive: true });

  // Write the file to the filesystem
  await writeFile(filePath, buffer);
  console.log(`File uploaded to ${filePath}`);

  // Unzip the file using unzipper
  const extractPath = join(uploadPath, fileName.replace('.zip', ''));
  await mkdir(extractPath, { recursive: true });

  await new Promise((resolve, reject) => {
    const zipStream = fs.createReadStream(filePath)
      .pipe(unzipper.Extract({ path: extractPath }));

    zipStream.on('close', resolve);
    zipStream.on('error', reject);
  });

  console.log(`File unzipped to ${extractPath}`);

  // Get the directory structure
  const directoryStructure = await getDirectoryStructure(extractPath);

  return NextResponse.json({ success: true, directoryStructure });
}
