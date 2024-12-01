require("dotenv").config();
import express from "express";
import Groq from "groq-sdk";

import OpenAI from "openai";


import Anthropic from "@anthropic-ai/sdk";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { ContentBlock, TextBlock } from "@anthropic-ai/sdk/resources";
import {basePrompt as nodeBasePrompt} from "./defaults/node";
import {basePrompt as reactBasePrompt} from "./defaults/react";
import cors from "cors";

// const anthropic = new Anthropic();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const openai = new OpenAI({
    apiKey: "xai-cdYuTWv6FRaqO0cZYGpJ8RNvu0jcGle5RrHTteJmtJkUzY12PdCS1VLkmLCIkk9CqcSmtobWk2vxbwmQ",
    baseURL: "https://api.x.ai/v1",
  });

  const anthropic = new Anthropic({
    apiKey: "xai-cdYuTWv6FRaqO0cZYGpJ8RNvu0jcGle5RrHTteJmtJkUzY12PdCS1VLkmLCIkk9CqcSmtobWk2vxbwmQ",
    baseURL: "https://api.x.ai/",
  });
  
// const app = express();
// app.use(cors())
// app.use(express.json())

// app.post("/template", async (req, res) => {
//     const prompt = req.body.prompt;
    
//     // const response = await anthropic.messages.create({
//     //     messages: [{
//     //         role: 'user', content: prompt
//     //     }],
//     //     model: 'claude-3-5-sonnet-20241022',
//     //     max_tokens: 200,
//     //     system: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
//     // })

//     const completion = await openai.chat.completions.create({
//         model: "grok-beta",
//         messages: [{
//             role: 'user', content: prompt
//         },{
//             role : "system", 
//             content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
//         }],

//       });

//       const answer = completion.choices?.[0]?.message?.content?.trim() ?? "";
//     if (answer == "react") {
//         res.json({
//             prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
//             uiPrompts: [reactBasePrompt]
//         })
//         return;
//     }

//     if (answer === "node") {
//         res.json({
//             prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
//             uiPrompts: [nodeBasePrompt]
//         })
//         return;
//     }

//     res.status(403).json({message: "You cant access this"})
//     return;

// })

// app.post("/chat", async (req, res) => {
//     const messages = req.body.messages;
//     const response = await anthropic.messages.create({
//         model: 'grok-beta',
//         messages: messages,
//         max_tokens: 8000,
//         system: getSystemPrompt()
//     })
//     // const response = await anthropic.messages.create({
//     //     messages: messages,
//     //     model: 'claude-3-5-sonnet-20241022',
//     //     max_tokens: 8000,
//     //     system: getSystemPrompt()
//     // })

//     // const response = await openai.chat.completions.create({
//     //     model: "grok-beta",
//     //     messages: messages,
//     //   });

//     console.log(response);

//     res.json({
//         response: (response.content[0] as TextBlock)?.text
//     });
// })



// app.listen(3000);



export async function main() {
    const chatCompletion = await getGroqChatCompletion();
    console.log(chatCompletion.choices[0]?.message?.content || "");
  }
  
  export async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Explain the importance of fast language models",
        },
      ],
      model: "llama3-8b-8192",
    });
}
