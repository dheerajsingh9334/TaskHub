/**
 * Environment Configuration
 * Centralizes all environment variable access with validation and defaults.
 */

const requiredVars = ["MONGO_URI", "JWT_SECRET"];

const missingVars = requiredVars.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingVars.join(", ")}`,
  );
  process.exit(1);
}

const env = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || process.env.JWT_SECRET,
  isDev: (process.env.NODE_ENV || "development") === "development",
  isProd: process.env.NODE_ENV === "production",
};

export default env;
