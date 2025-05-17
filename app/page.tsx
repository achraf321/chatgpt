"use client"
import { Send } from 'lucide-react'
import React, { useState } from 'react'

const page = () => {

const [question , setQuestion] = useState("")
const [messages , setMessages] = useState<{type : "sender" | "receiver" , message : string }[]>([])


async function GetAiResponse () {
if(!question.trim()) return;

setMessages(prev => [...prev , {type : "sender" , message : question}])

const response = await fetch("/api/openai", {
  method : "POST", 
  headers : {
    "Content-Type" : "application/json"
  },
  body : JSON.stringify({
    question
  })
})
const data = await response.json()
setMessages(prev => [...prev , {type : "receiver" , message : data.message}])
setQuestion("")
}


  return (
    <div className="max-w-3xl mx-auto m-4 p-4 border rounded-sm">
      <div className="min-h-98 space-y-3">
{messages.map((message, index) => (
  <div key={index} className={`flex ${message.type === "sender" ? "justify-end" : "justify-start"}`}>
    <div className={`p-2 rounded-sm ${message.type === "sender" ? "bg-blue-300 text-white" : "bg-gray-200"}`}>
{message.message}
    </div>
  </div>
))}
      </div>

      <div>
        <div className="flex items-center gap-3">
          <input type="text"
          placeholder='What is youre question !'
          className="p-2 border border-gray-300 rounded-sm w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          />
          <span onClick={GetAiResponse} className="p-2 bg-gray-100 hover:bg-gray-200 transition-all duration-150 rounded-sm"><Send/></span>
        </div>
      </div>
    </div>
  )
}

export default page