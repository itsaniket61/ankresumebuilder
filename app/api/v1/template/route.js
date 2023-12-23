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
    const dir = rootFolderPath+'/'+templateName;

    // Prepare paths of all template dependents
    let logoPath = dir+'/logo.jpg';
    const sampleJsonPath = dir+'/sample.json';
    const ejsPath = dir+'/index.ejs';
    
    //Check Weather Logo, Samole Data and EJS is presenr
    if(fs.existsSync(logoPath) && fs.existsSync(sampleJsonPath) && fs.existsSync(ejsPath)){
        //Convert Image Path to Base64 Data 
        const imgExt = logoPath.substring(logoPath.lastIndexOf("."),logoPath.length);
        const base64Data = getImageBase64(logoPath);
        logoPath = `data:${imgExt};base64,${base64Data}`;
        
        const sampleJsonDataFileContent = fs.readFileSync(sampleJsonPath,{encoding:'utf-8'});

        const sampleJsonData = JSON.parse(sampleJsonDataFileContent);

        //Created Template
        const template = {sampleJsonPath,logoPath,ejsPath,sampleJsonData};
        template['name'] = dir;

        //Added Template
        return template
    }
    return null;
}

export const GET = (request) =>{
    const {templateName} = getQueryParams(request);
    const rootFolderPath = process.cwd()+'/templates';
    const jsonData = getTemplate(rootFolderPath,templateName);   
    return NextResponse.json(jsonData,{status:200});
}