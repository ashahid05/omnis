declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: "production" | "development";
    POSTGRES_URL: string;
    SESSION_SECRET: string;
  }
}
