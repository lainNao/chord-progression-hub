declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_HOST: string;
      NEXT_PUBLIC_MAINTENANCE_MODE?: string; // NOTE: "falsy"以外のtruthyな値が入っていればメンテナンスモードとして扱いたい
    }
  }
}

export {};
