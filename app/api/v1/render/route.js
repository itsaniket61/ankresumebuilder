import CustomLogger from "@/helpers/Log/CustomLogger";
import {renderEjsFile} from "@/helpers/Render/EJSRender";
import { generatePDF } from "@/helpers/Render/PDFRender";
import { NextResponse } from "next/server";


export const POST = async(request)=>{
    const logger = new CustomLogger();
    try {
        const {template,data} = await request.json();
        const html = renderEjsFile(process.cwd()+"/templates/"+template,data);
        logger.debug(html);
        const blobCode = await generatePDF(html,'output.pdf');
        logger.debug(`Blob generated is ${blobCode}`);
        return NextResponse.json({blob:'/api/v1/blob?blobCode='+blobCode});
    } catch (error) {
        logger.error(error);
        return NextResponse.json({error:error.message},{status:500});
    }
}