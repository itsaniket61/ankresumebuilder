import { CONSTANTS } from '@/app/variables/Constatnts';
import getQueryParams from '@/helpers/Request/GetQueryParams';
import fs from 'fs';
import { NextResponse } from 'next/server';

export const GET = async(request) =>{
    try {
        const {fileId,fileName} = getQueryParams(request);
        const storage = process.env.STORAGE_CLASS;
        if(storage){
            const reqStorage = await fetch(process.env.HOST_URL+`/api/v1/storage/${storage}/checkout`,{
                method:'POST',
                body:JSON.stringify({fileId,fileName})
            });
            if(reqStorage.status==200){
                const fileContent = fs.readFileSync(CONSTANTS.PATHS.STORAGE.ASSETS_DIR_PATH+'/'+fileName,{encoding:'utf-8'});
                return NextResponse.json({content:fileContent},{status:200});
            }else{
                console.log("Failed to uploaded to "+storage);
            }
        }
        
    } catch (error) {
        return  NextResponse.json({error:error.message},{status:500});
    }
}