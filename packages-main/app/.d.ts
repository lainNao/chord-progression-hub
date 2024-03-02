declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_HOST: string;
      NEXT_PUBLIC_MAINTENANCE_MODE?: string; // NOTE: truthyな値を入れていればメンテナンスモード、そうでなければメンテナンスモードでない、と扱う
    }
  }
}

export {};
