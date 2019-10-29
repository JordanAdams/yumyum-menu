if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

type StringEnvValue = string | undefined;
type IntEnvValue = number | undefined;

interface HTTPConfig {
  port: IntEnvValue;
}

interface GoogleConfig {
  clientId: StringEnvValue;
  clientSecret: StringEnvValue;
  accessToken: StringEnvValue;
  refreshToken: StringEnvValue;
}

interface SlackConfig {
  token: StringEnvValue;
  channelId: StringEnvValue;
}

interface FeaturesConfig {
  dateFilter: boolean;
}

interface Config {
  http: HTTPConfig;
  google: GoogleConfig;
  slack: SlackConfig;
  features: FeaturesConfig;
}

const hasEnv = (key: string): boolean => process.env.hasOwnProperty(key);

const env = (key: string, fallback?: string): StringEnvValue =>
  hasEnv(key) ? process.env[key] : fallback;

const intEnv = (key: string, fallback?: number): IntEnvValue =>
  hasEnv(key) ? parseInt(env(key, "")) : fallback;

const boolEnv = (key: string, fallback: boolean = true): boolean =>
  env(key, String(fallback)) === "true";

const config: Config = {
  http: {
    port: intEnv("PORT", 3000)
  },
  google: {
    clientId: env("GOOGLE_CLIENT_ID"),
    clientSecret: env("GOOGLE_CLIENT_SECRET"),
    accessToken: env("GOOGLE_ACCESS_TOKEN"),
    refreshToken: env("GOOGLE_REFRESH_TOKEN")
  },
  slack: {
    token: env("SLACK_TOKEN"),
    channelId: env("SLACK_CHANNEL_ID")
  },
  features: {
    dateFilter: boolEnv("FEATURE_DATE_FILTER", true)
  }
};

export default config;
