
interface D1Database {
  prepare(query: string): {
    first<T>(): Promise<T | null>;
  };
}
