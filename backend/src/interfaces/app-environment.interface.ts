export interface AppEnvironment {
  ENV: string;
  APP: {
    NAME: string;
    PORT: number;
    IP: string;
    GATEWAY_CONFIG: {
      METHOD: string;
      HOST: string;
    };
    SECURE: {
      CORS: {
        ORIGIN: string[];
        METHODS: string[];
        ALLOWED_HEADERS: string[];
        EXPOSED_HEADERS: string[];
        CREDENTIALS: boolean;
        PREFLIGHT_CONTINUE: boolean;
      };
      JWT: {
        JWT_SECRET: string;
        TOKEN_EXPIRE: number;
      };
    };
  };
  DATABASE: {
    MYSQL?: {
      USERNAME: string;
      PASSWORD: string;
      HOST: string;
      PORT: number;
      NAME: string;
    };
    MONGO?: {
      HOST: string;
      PORT: number;
      USERNAME: string;
      PASSWORD: string;
      DATABASE: string;
      IS_CLUSTER: boolean;
    };
  };
  GOOGLE: {
    AUTH: {
      PROJECT_ID: string;
    };
    MEET?: {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      REFRESH_TOKEN: string;
    };
    POSTMASTER: string;
    MAIL: {
      ADMIN: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      REFRESH_TOKEN: string;
    };
  };
  PAYMENT: {
    BANK_CODE: string;
    BANK_NO: string;
    CURRENCY_API_KEY: string;
  };
  OPEN_AI: {
    TOKEN: string;
    CHANCE_MODEL: string;
  };
}
