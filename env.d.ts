declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    NEXT_PUBLIC_API_ENDPOINT: string;
    NEXT_PUBLIC_STORAGE: string;
  }
}

declare module "sweetalert2/src/sweetalert2.js" {
  export * from "sweetalert2";
  // "export *" does not matches the default export, so do it explicitly.
  export { default } from "sweetalert2";
}
