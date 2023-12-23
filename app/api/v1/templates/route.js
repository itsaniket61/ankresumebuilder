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
        let logoPath = process.cwd()+'/templates/'+dir+'/logo.jpg';
        const sampleJsonPath = process.cwd()+'/templates/'+dir+'/sample.json';
        const ejsPath = process.cwd()+'/templates/'+dir+'/index.ejs';
        
        //Check Weather Logo, Samole Data and EJS is presenr
        if(fs.existsSync(logoPath) && fs.existsSync(sampleJsonPath) && fs.existsSync(ejsPath)){
            //Convert Image Path to Base64 Data 
            const imgExt = logoPath.substring(logoPath.lastIndexOf("."),logoPath.length);
            const base64Data = getImageBase64(logoPath);
            logoPath = `data:${imgExt};base64,${base64Data}`;
            
            //Created Template
            const template = {sampleJsonPath,logoPath,ejsPath};
            template['name'] = dir;

            //Added Template
            templates.push(template);
        }
    }
    return templates;
}

export const GET = (request) =>{
    const rootFolderPath = process.cwd()+'/templates';
    const jsonData = getTemplates(rootFolderPath);   
    return NextResponse.json(jsonData,{status:200});
}