import { CONSTANTS } from '@/variables/Constatnts';
import getQueryParams from '@/helpers/Request/GetQueryParams';
import { authorize, readFileFromDrive } from '@/services/storage/gdrive/gdrive';
import fs from 'fs';
import { NextResponse } from 'next/server';

export const POST = async (request) =>{
    try {
        const {fileId,fileName} = await request.json();
        const auth = await authorize();
        await readFileFromDrive(auth,fileId,CONSTANTS.PATHS.STORAGE.ASSETS_DIR_PATH+'/'+fileName);
        const fileContent = fs.readFileSync(CONSTANTS.PATHS.STORAGE.ASSETS_DIR_PATH+'/'+fileName,{encoding:'utf-8'});
        return NextResponse.json({content:fileContent},{status:200});
    } catch (error) {
        return  NextResponse.json({error:error.message},{status:500});
    }
}