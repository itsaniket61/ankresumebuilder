import getQueryParams from "@/helpers/Request/GetQueryParams";
import { writeToken } from "@/services/storage/gdrive/gdrive";
import { NextResponse } from "next/server";

export const GET = async (request) =>{
    const {code} = getQueryParams(request);
    if(code){
        await writeToken(code);
        return NextResponse.redirect(process.env.HOST_URL);
    }
    return NextResponse.redirect(process.env.HOST_URL+'/error');
}