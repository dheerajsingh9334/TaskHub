import env from "../config/env.js";

/**
 * Logger utility — structured logging with levels.
 * In production, suppresses debug logs and avoids leaking stack traces.
 */
const logger = {
  info: (message, data = {}) => {
    console.log(
      JSON.stringify({
        level: "info",
        timestamp: new Date().toISOString(),
        message,
        ...(env.isDev && Object.keys(data).length > 0 ? { data } : {}),
      }),
    );
  },

  error: (message, error = null) => {
    console.error(
      JSON.stringify({
        level: "error",
        timestamp: new Date().toISOString(),
        message,
        ...(env.isDev && error ? { stack: error.stack } : {}),
      }),
    );
  },

  warn: (message, data = {}) => {
    console.warn(
      JSON.stringify({
        level: "warn",
        timestamp: new Date().toISOString(),
        message,
        ...(env.isDev && Object.keys(data).length > 0 ? { data } : {}),
      }),
    );
  },

  debug: (message, data = {}) => {
    if (env.isDev) {
      console.log(
        JSON.stringify({
          level: "debug",
          timestamp: new Date().toISOString(),
          message,
          ...(Object.keys(data).length > 0 ? { data } : {}),
        }),
      );
    }
  },
};

export default logger;
