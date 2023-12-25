import { CONSTANTS } from "@/app/variables/Constatnts";
import fs from "fs"
import { NextResponse } from "next/server";

function getImageBase64(filePath) {
    try {
      // Read the image file synchronously
      const imageData = fs.readFileSync(filePath);
  
      // Convert the binary data to base64
      const base64Data = imageData.toString('base64');
  
      return base64Data;
    } catch (error) {
      console.error('Error reading or converting the image:', error);
      return null;
    }
  }

const getTemplates = (rootFolderPath)=>{
    const dirs = fs.readdirSync(rootFolderPath);
    const templates = [];
    for (let index = 0; index < dirs.length; index++) {
        const dir = dirs[index];

        // Prepare paths of all template dependents
        let logoPath = CONSTANTS.PATHS.TEMPLATE.TEMPLATES_DIR_PATH+'/'+dir+CONSTANTS.PATHS.TEMPLATE.LOGO_PATH;
        const sampleJsonPath = CONSTANTS.PATHS.TEMPLATE.TEMPLATES_DIR_PATH+'/'+dir+CONSTANTS.PATHS.TEMPLATE.SAMPLE_JSON_PATH;
        const ejsPath = CONSTANTS.PATHS.TEMPLATE.TEMPLATES_DIR_PATH+'/'+dir+CONSTANTS.PATHS.TEMPLATE.EJS_PATH;
        
        //Check Weather Logo, Samole Data and EJS is presenr
        if(fs.existsSync(logoPath) && fs.existsSync(sampleJsonPath) && fs.existsSync(ejsPath)){
            //Created Template
            const template = {
              sampleJsonPath:sampleJsonPath.replace(CONSTANTS.PATHS.PUBLIC_DIR,''),
              logoPath:logoPath.replace(CONSTANTS.PATHS.PUBLIC_DIR,''),
              ejsPath:ejsPath.replace(CONSTANTS.PATHS.PUBLIC_DIR,'')
            };
            template['name'] = dir;

            //Added Template
            templates.push(template);
        }
    }
    return templates;
}

export const GET = (request) =>{
    const rootFolderPath = CONSTANTS.PATHS.TEMPLATE.TEMPLATES_DIR_PATH;
    const jsonData = getTemplates(rootFolderPath);   
    return NextResponse.json(jsonData,{status:200});
}