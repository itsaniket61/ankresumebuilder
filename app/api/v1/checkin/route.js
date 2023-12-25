import { CONSTANTS } from '@/app/variables/Constatnts';
import fs from 'fs';
import { NextResponse } from 'next/server';

export const POST = async (request) =>{
    const { fileName, content } = await request.json();

    try {
        const assetsPath = CONSTANTS.PATHS.STORAGE.ASSETS_DIR_PATH
        if(!fs.existsSync(assetsPath)) fs.mkdirSync(assetsPath);
        // Use fs.writeFile to create a new file
        const file = assetsPath+'/'+fileName;
        fs.writeFileSync(file, content);
        const storage = process.env.STORAGE_CLASS;
        if(storage){
            const reqStorage = await fetch(process.env.HOST_URL+`/api/v1/storage/${storage}/checkin`,{
                method:'POST',
                body:JSON.stringify({file,fileName})
            });
            if(reqStorage.status==200){
                const {fileId} = await reqStorage.json();
                console.log("Uploaded Sucessfully to "+storage);
                fs.rmSync(file);
                return NextResponse.json({ fileId,fileName },{status:201});
            }else{
                console.log("Failed to uploaded to "+storage);
            }
        }
        return NextResponse.json({ reqStorage },{status:201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message },{status:500});
    }
}