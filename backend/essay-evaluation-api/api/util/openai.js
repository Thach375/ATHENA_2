const { Configuration, OpenAIApi } = require("openai");

// Leave this empty for user to fill in
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function analyzeEssay(essay, prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4", // User may adjust model as needed
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: essay
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to analyze essay");
  }
}

module.exports = { analyzeEssay };