const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
require("dotenv").config({path: path.resolve(__dirname, ".env") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run(test) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
  const result = await model.generateContent(test);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

//run();
module.exports = { run };
