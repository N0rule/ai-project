const { AICHAT } = require("@root/config.js");
const { OpenAI } = require("openai");
const { Loggerlog, LoggerWarn, LoggerError } = require('@handlers/logger');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
});

let conversationHistory = [];

module.exports = { aiChat };

async function aiChat(message) {
  conversationHistory.push({ role: "user", content: message });

  const timeoutPromise = new Promise((reject) => {
    setTimeout(() => {
      reject(new Error("Server did not respond"));
    }, 35000);
  });

  try {
    const completionPromise = await openai.chat.completions.create({
      model: AICHAT.MODEL,
      max_tokens: AICHAT.TOKENS,
      presence_penalty: AICHAT.PRESENCE_PENALTY,
      temperature: AICHAT.TEMPERATURE,
      messages: [
        { role: "system", content: AICHAT.IMAGINEMESSAGE },
        ...conversationHistory,
      ],
    });

    const completion = await Promise.race([timeoutPromise, completionPromise]);
    if (completion && completion.choices && completion.choices.length > 0) {
      const assistantResponse = completion.choices[0].message.content;
      conversationHistory.push({
        role: "assistant",
        content: assistantResponse,
      });
      return assistantResponse;
    } else {
      return "Unable to generate response. Please try again.";
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      LoggerWarn(error.response.data);
      return error.response.data.error.message;
    } else {
      LoggerError(error);
      return "An error occurred while processing your request. Please try again later.";
    }
  }
}