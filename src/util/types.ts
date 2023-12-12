export type ArrayToEnum<T extends ReadonlyArray<string>, V = string> = keyof {
  [Key in T extends ReadonlyArray<infer U> ? U : never]: V;
};

export type ExcludesUndefined<T> = {
  [Key in keyof T]-?: T[Key];
};
