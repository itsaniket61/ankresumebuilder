import { CONSTANTS } from '@/app/variables/Constatnts';
import getQueryParams from '@/helpers/Request/GetQueryParams';
import fs from 'fs';
import { NextResponse } from 'next/server';

export const GET = (request) =>{
    try {
        const {fileName} = getQueryParams(request);
        const fileContent = fs.readFileSync(CONSTANTS.PATHS.STORAGE.ASSETS_DIR_PATH+'/'+fileName,{encoding:'utf-8'});
        return NextResponse.json({content:fileContent},{status:200});
    } catch (error) {
        return  NextResponse.json({error:error.message},{status:500});
    }
}