// lib/memoryCacheAdapter.ts

import { Adapter } from 'next-auth/adapters';
import { setToken, getToken, deleteToken } from './memoryCache';

export const MemoryCacheAdapter: Adapter = {
  async createVerificationToken({ identifier, token, expires }) {
    setToken(identifier, token);
    return { identifier, token, expires };
  },
  async useVerificationToken({ identifier, token }) {
    const storedToken = getToken(identifier);
    if (storedToken === token) {
      deleteToken(identifier);
      return { identifier, token };
    }
    return null;
  },
  // 他のメソッドもモックするが、必要ない場合は空の関数として実装
  async createUser(user: any) {
    return user; // 実際のデータベースは使用せず、そのままユーザー情報を返す
  },
  async getUser(id) {
    return null; // このサンプルではユーザー取得は行わないためnullを返す
  },
  async getUserByEmail(email) {
    return null; // 必要に応じて実装
  },
  async updateUser(user) {
    return user; // 実際のデータベースは使用せず、そのままユーザー情報を返す
  },
  async deleteUser(userId) {
    return; // 実際のデータベースは使用せず、関数だけ用意
  },
};
