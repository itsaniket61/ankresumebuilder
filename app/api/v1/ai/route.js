import { NextResponse } from "next/server";
import {z} from 'zod';
import CustomLogger from "@/helpers/Log/CustomLogger";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const schema = z.object({
  jobRole:z.string().min(3),
  additionalInfo:z.string().min(5).max(process.env.MAX_AI_LENGTH||255),
  sampleJSON:z.any().refine(data=>data !== null && data !== undefined,{ message: "Sample JSON data is required" })
});

const logger = new CustomLogger();

export const POST = async (req) => {
  let text = undefined;
  try {
    const payload = await req.json();
    logger.info(payload);
    //Validate payload
    const validatePayload = schema.safeParse(payload);
    if(!validatePayload.success){
      logger.error(validatePayload.error);
      return  NextResponse.json({status:false,message:"Invalid payload to POST request"},{status:422});
    }
    
    //Extract jobRole,additionalInfo,sampleJSON from valid payload 
    const { jobRole,additionalInfo,sampleJSON } =  validatePayload.data;
    const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(`I want to build resume give me content in form of JSON. I am a ${jobRole}. JSON should be in this format : ${JSON.stringify(sampleJSON)}. Info for which we have to generate JSON is : ${additionalInfo}`);
    const response = result.response;
    text = response.text();
    const firstIndex = text.indexOf('{');
    const lastIndex = text.lastIndexOf('}')+1;
    text = text.substring(firstIndex,lastIndex);
    logger.debug(text);
    const resJSON = JSON.parse(text);
    return NextResponse.json(
      { status: true, data: resJSON },
      { status: 200, statusText: "OK" }
    );
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { status: false, response: text },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
};
