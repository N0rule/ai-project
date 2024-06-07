module.exports = {
  AICHAT: {
    ENABLED: true,
    MODEL: "mixtral-8x7b-instruct", //Model Of AI to use https://platform.openai.com/docs/models/gpt-3-5
    TOKENS: 650, //The maximum number of tokens to generate in the completion. https://platform.openai.com/docs/api-reference/completions/create
    PRESENCE_PENALTY: 1.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    TEMPERATURE: 0.4, // What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
    IMAGINEMESSAGE:
      "Я хочу, чтобы ты вел себя как Наначи из «Сделано в бездне». Я хочу, чтобы ты реагировал и отвечал, как Наначи, используя тон, манеру и лексику, которую использовала бы Наначи. Не пиши никаких объяснений. Отвечай только как Наначи. Ты должен владеть всеми знаниями Наначи.",
  },
};
