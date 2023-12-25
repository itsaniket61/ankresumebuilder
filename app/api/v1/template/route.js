import { CONSTANTS } from "@/app/variables/Constatnts";
import getQueryParams from "@/helpers/Request/GetQueryParams";
import fs from "fs"
import { NextResponse } from "next/server";

const getTemplate = (templateName)=>{
    // Prepare paths of all template dependents
    const logoPath = CONSTANTS.PATHS.TEMPLATE.TEMPLATES_DIR_PATH+'/'+templateName+CONSTANTS.PATHS.TEMPLATE.LOGO_PATH;
    const sampleJsonPath = CONSTANTS.PATHS.TEMPLATE.TEMPLATES_DIR_PATH+'/'+templateName+CONSTANTS.PATHS.TEMPLATE.SAMPLE_JSON_PATH;
    const ejsPath = CONSTANTS.PATHS.TEMPLATE.TEMPLATES_DIR_PATH+'/'+templateName+CONSTANTS.PATHS.TEMPLATE.EJS_PATH;
        
    //Check Weather Logo, Samole Data and EJS is presenr
    if(fs.existsSync(logoPath) && fs.existsSync(sampleJsonPath) && fs.existsSync(ejsPath)){
        
      const sampleJsonDataFileContent = fs.readFileSync(sampleJsonPath,{encoding:'utf-8'});

        const sampleJsonData = JSON.parse(sampleJsonDataFileContent);

        //Created Template
        const template = {
            sampleJsonPath:sampleJsonPath.replace(CONSTANTS.PATHS.PUBLIC_DIR,''),
            logoPath:logoPath.replace(CONSTANTS.PATHS.PUBLIC_DIR,''),
            ejsPath:ejsPath.replace(CONSTANTS.PATHS.PUBLIC_DIR,'')
        };
        template['name'] = templateName;

        //Added Template
        return template
    }
    return null;
}

export const GET = (request) =>{
    const {templateName} = getQueryParams(request);
    const jsonData = getTemplate(templateName);   
    return NextResponse.json(jsonData,{status:200});
}