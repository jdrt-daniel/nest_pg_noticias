//NodeJS.ProcessEnv

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    FRONTEND_CLIENT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
  }
}
