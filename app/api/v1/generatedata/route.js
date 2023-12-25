import { CONSTANTS } from "@/app/variables/Constatnts";
import CustomLogger from "@/helpers/Log/CustomLogger";
import getQueryParams from "@/helpers/Request/GetQueryParams"
import fs from "fs";
import { NextResponse } from "next/server";

const hostUrl = process.env.HOST_URL;
const logger = new CustomLogger();
export const POST=async(request)=>{
    try {
        const {jobRole,description,template} = await request.json();
    const additionalInfo = description;

    //Read Sample JSON Data
    const sampleJsonFilePath = CONSTANTS.PATHS.TEMPLATE.TEMPLATES_DIR_PATH + `/${template}/` + CONSTANTS.PATHS.TEMPLATE.SAMPLE_JSON_PATH;
    const fileContent = fs.readFileSync(sampleJsonFilePath,'utf-8');
    const sampleJSON = JSON.parse(fileContent);

    //Send Request to AI to get conetnt for resume
    logger.info(`Request sent to AI with data : ${{jobRole,additionalInfo,sampleJSON}}`)
    const reqAi = await fetch(hostUrl+'/api/v1/ai/',{
        method:"POST",
        body:JSON.stringify({jobRole,additionalInfo,sampleJSON})
    });
    const resAi = await reqAi.json();
    if(resAi.status){
        logger.info(`Data from AI is ${resAi}`)
        const data = resAi.data;
        return NextResponse.json(data,{status:200});
    }else{
        logger.error("Unable to connect with AI.")
        return NextResponse.json({status:false,message:"Unable to connect with AI."})
    }
    } catch (error) {
        logger.error(error);
        return NextResponse.json({status:false,message:error.message})
    }
}