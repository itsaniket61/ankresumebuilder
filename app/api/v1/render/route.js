import { CONSTANTS } from "@/variables/Constatnts";
import CustomLogger from "@/helpers/Log/CustomLogger";
import {renderEjsFile} from "@/helpers/Render/EJSRender";
import { generateHTML, generatePDF } from "@/helpers/Render/PDFRender";
import { NextResponse } from "next/server";


export const POST = async(request)=>{
    const logger = new CustomLogger();
    try {
        const {template,data} = await request.json();
        const ejsPath =CONSTANTS.PATHS.TEMPLATE.TEMPLATES_DIR_PATH+"/"+template;
        const html = renderEjsFile(ejsPath+'/index.ejs',data);
        logger.debug(html);
        return NextResponse.json({html});
    } catch (error) {
        logger.error(error);
        return NextResponse.json({error:error.message},{status:500});
    }
}