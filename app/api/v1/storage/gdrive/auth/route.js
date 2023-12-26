import CustomLogger from "@/helpers/Log/CustomLogger";
import { getNewToken } from "@/services/storage/gdrive/gdrive"
import { NextResponse } from "next/server";

export const POST = async (request) =>{
    const getTokenUrl = getNewToken();
    const logger = new CustomLogger();
    logger.info(getTokenUrl);
    if(getTokenUrl){
        return NextResponse.json({url:getTokenUrl},{status:200});
    }
    return NextResponse.json({error:'error',getTokenUrl},{status:500});
}

export const GET = async(request) =>{
    const reqUrl = process.env.HOST_URL + '/api/v1/storage/gdrive/auth';
    const req = await fetch(reqUrl,{method:'POST'});
    if(req.status==200){
        const {url} = await req.json();
        return NextResponse.redirect(url);
    }else{
        return NextResponse.json({error:"Server Error"});
    }
}