declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_SECRET: string;
      ACCESS_EXPIRATION: string;
      REFRESH_SECRET: string;
      REFRESH_EXPIRATION: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
