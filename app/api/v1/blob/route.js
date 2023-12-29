import { getBlobStream} from "@/helpers/BlobManager/blobManager";
import CustomLogger from "@/helpers/Log/CustomLogger";
import getQueryParams from "@/helpers/Request/GetQueryParams";
import fs from "fs";
import { NextResponse } from "next/server";

export const GET = (request) =>{
    const logger = new CustomLogger();
    try {
        const {blobCode} = getQueryParams(request);
        const blobData = getBlobStream(blobCode);
        if(!blobData){
            logger.error("File not found")
            throw Error("File not found");
        };
        const {stream,contentType} = blobData;
        const headers = new Headers();
        headers.set('Content-Type', contentType);
        const ext = contentType.split('/')[1];
        headers.set('Content-Disposition', `inline; filename=ResumeOutput.${ext}`)
        const streamExist = fs.existsSync(stream.path);
        if(streamExist){
            return new NextResponse(stream, { status: 200, statusText: "OK", headers });
        }else{
            logger.error("File not found")
            throw Error("File not found");
        }
    } catch (error) {
        return NextResponse.json({status:false,message:error.message}, { status: 500});
    }
}