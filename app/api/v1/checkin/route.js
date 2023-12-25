import { CONSTANTS } from '@/app/variables/Constatnts';
import fs from 'fs';
import { NextResponse } from 'next/server';

export const POST = async (request) =>{
    const { fileName, content } = await request.json();

    try {
        const assetsPath = CONSTANTS.PATHS.STORAGE.ASSETS_DIR_PATH;
        if(!fs.existsSync(assetsPath)) fs.mkdirSync(assetsPath);
        // Use fs.writeFile to create a new file
        fs.writeFileSync(assetsPath+'/'+fileName, content);

        return NextResponse.json({ message: 'File created successfully.' },{status:201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message },{status:500});
    }
}