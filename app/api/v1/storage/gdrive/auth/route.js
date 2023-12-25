import { getNewToken } from "@/services/storage/gdrive/gdrive"
import { NextResponse } from "next/server";

export const GET = async (request) =>{
    const getTokenUrl = await getNewToken();
    return NextResponse.redirect(getTokenUrl);
}