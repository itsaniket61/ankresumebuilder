import CustomLogger from "@/helpers/Log/CustomLogger";
import getQueryParams from "@/helpers/Request/GetQueryParams"
import fs from "fs";
import { NextResponse } from "next/server";

const hostUrl = process.env.HOST_URL;
const logger = new CustomLogger();
export const POST=async(request)=>{
    try {
        const {data,template} = await request.json();
        
        logger.info(`Input data to build is : ${data}`)
        //Build Request with data from AI
        logger.info(`Request sent to build PDF with data : ${data} and template : ${template}`)
        const buildReq = await fetch(hostUrl+'/api/v1/render',{
            method:"POST",
            body:JSON.stringify({data,template})
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