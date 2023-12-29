import CustomLogger from "@/helpers/Log/CustomLogger";
import getQueryParams from "@/helpers/Request/GetQueryParams"
import fs from "fs";
import { NextResponse } from "next/server";

const hostUrl = process.env.HOST_URL;
const logger = new CustomLogger();
export const POST=async(request)=>{
    try {
        const {html} = await request.json();
        
        logger.info(`Input data to build is : ${html}`)
        //Build Request with data from AI
        logger.info(`Request sent to build PDF with data : ${html}`);
        const buildReq = await fetch(hostUrl+'/api/v1/render/PDF',{
            method:"POST",
            body:JSON.stringify({html})
        });
        const buildRes = await buildReq.json();
        if(buildReq.status===200){
            const {blob} = buildRes;
            return NextResponse.json({status:true,blob},{status:200});
        }
        logger.error("Unable to get build file.")
        throw Error("Unable to get build file.");
    }catch(err){
        return NextResponse.json({status:false,message:err.message},{status:500});
    }
}