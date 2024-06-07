const { Loggerlog, LoggerWarn, LoggerError } = require('@handlers/logger');

module.exports = class Validator {
    
  static validateConfiguration() {
    Loggerlog("Validating config file and environment variables...");

    if (!process.env.OPENAI_API_BASE) {
      LoggerError("env: OPENAI_API_BASE is missing.\nIf you are using default api, use https://api.openai.com/v1.\nAI commands won't work");
        process.exit(1);
      }
      if (!process.env.OPENAI_API_KEY) {
        LoggerError("env: OPENAI_API_KEY is missing. AI commands won't work");
        process.exit(1);
      }

      Loggerlog("Config file and environment variables validated!");
};
}
