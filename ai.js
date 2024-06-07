// Importing necessary modules
require("dotenv").config();
require("module-alias/register");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Loggerlog, LoggerWarn, LoggerError } = require("@handlers/logger");

const { aiChat } = require("@handlers/chatGen");
const { validateConfiguration } = require("@handlers/validator");

validateConfiguration();
Loggerlog("Bot is ready! Server is starting...");

const app = express();
const port = process.env.PORT || 25566;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  Loggerlog("User: " + userMessage);

  try {
    Loggerlog("Answering...");
    const response = await aiChat(userMessage);
    Loggerlog("> " + response);
    res.json({ response });
  } catch (err) {
    LoggerError(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

(async () => {
  app.listen(port, async () => {
    Loggerlog(`Server is running on http://localhost:${port}`);
    const open = await import("open"); // Use dynamic import here
    open.default(`http://localhost:${port}`); // Use open.default since it's the default export
  });
})();
