type Primitive = string | number;

type Pathify<T extends string> = T extends `${infer A}:${infer B}`
  ? `${A}:${Pathify<B>}`
  : T;

export type ObjectToPathsArrayRecursive<T> = T extends ReadonlyArray<Primitive>
  ? T[number]
  : {
      [K in keyof T]: T[K] extends object
        ? // @ts-expect-error ts(2589)
          Pathify<`${K}:${ObjectToPathsArrayRecursive<T[K]>}`>
        : never;
    }[keyof T];
