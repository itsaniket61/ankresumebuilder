import getQueryParams from "@/helpers/Request/GetQueryParams";
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

const getTemplate = (rootFolderPath,templateName)=>{
    
    const publicDir = process.cwd()+'/public';
        // Prepare paths of all template dependents
    const logoPath = '/templates/'+templateName+'/logo.jpg';
    const sampleJsonPath = '/templates/'+templateName+'/sample.json';
    const ejsPath = '/templates/'+templateName+'/index.ejs';
        
    //Check Weather Logo, Samole Data and EJS is presenr
    if(fs.existsSync(publicDir+logoPath) && fs.existsSync(publicDir+sampleJsonPath) && fs.existsSync(publicDir+ejsPath)){
        
      const sampleJsonDataFileContent = fs.readFileSync(publicDir+sampleJsonPath,{encoding:'utf-8'});

        const sampleJsonData = JSON.parse(sampleJsonDataFileContent);

        //Created Template
        const template = {sampleJsonPath,logoPath,ejsPath,sampleJsonData};
        template['name'] = templateName;

        //Added Template
        return template
    }
    return null;
}

export const GET = (request) =>{
    const {templateName} = getQueryParams(request);
    const rootFolderPath = process.cwd()+'/public/templates';
    const jsonData = getTemplate(rootFolderPath,templateName);   
    return NextResponse.json(jsonData,{status:200});
}