import { getNewToken } from "@/services/storage/gdrive/gdrive"
import { NextResponse } from "next/server";

export const GET = (request) =>{
    const getTokenUrl = getNewToken();
    if(getTokenUrl){
        return NextResponse.redirect(getTokenUrl);
    }
    return NextResponse.json({error},{status:500});
}