const pino = require("pino");

const pinoLogger = pino.default(
  {
    level: "info",
  },
  pino.transport({
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
      ignore: "pid,hostname",
      singleLine: false,
      hideObject: false,
      customColors: "info:blue,warn:yellow,error:red",
    },
  }),
);

module.exports = class Logger {
  /**
   * @param {string} content
   */
  static success(content) {
    pinoLogger.info(content);
  }

  /**
   * @param {string} content
   */
  static Loggerlog(content) {
    pinoLogger.info(content);
  }

  /**
   * @param {string} content
   */
  static LoggerWarn(content) {
    pinoLogger.warn(content);
  }

  /**
   * @param {string} content
   * @param {object} ex
   */
  static LoggerError(content, ex) {
    pinoLogger.error(ex, `${content}: ${ex?.message}`);
  }
};
