// トークンデータの型を定義
interface TokenData {
  token: string;
  expires: number;
}

const cache: Map<string, TokenData> = new Map();

export function setToken(email: string, token: string): void {
  const expires = Date.now() + 10 * 60 * 1000; // 10分間有効
  cache.set(email, { token, expires });
}

export function getToken(email: string): string | null {
  const data = cache.get(email);
  if (!data) return null;
  if (Date.now() > data.expires) {
    cache.delete(email);
    return null;
  }
  return data.token;
}

export function deleteToken(email: string): void {
  cache.delete(email);
}
