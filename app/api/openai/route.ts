import { NextRequest, NextResponse } from "next/server"
import {OpenAI} from "openai"

const openai = new OpenAI({
    apiKey : process.env.OPENAI_SECRET
})
export async function POST (req : NextRequest) {
try {
    const {question} = await req.json()
if(!question){
    return NextResponse.json({message : "Question is required"}, {status : 401})
}

const response = await openai.chat.completions.create({
    model : "gpt-4o-mini",
    messages : [{role : "user", content : question}]
})

return NextResponse.json({message : response.choices[0].message.content})
} catch (error : any) {
    console.log("Error in openai Api" ,error.message)
    return NextResponse.json({message : "Internal Error"}, {status : 500})
}
}