import { create } from 'zustand';
import api from '../api/api';

const useUserStore = create((set) => ({
  user: null, // 초기 사용자 상태
  setUser: (userData, token) => {
    set({ user: userData });
    if (token) {
      localStorage.setItem('accessToken', token);
    }
  },
  clearUser: () => {
    localStorage.removeItem('accessToken');
    set({ user: null });
  },
  restoreUser: async () => {
    try {
      const response = await api.get('/user/me'); // Authorization 헤더 자동 추가
      set({ user: response.data.user });
    } catch (err) {
      console.error('Failed to restore user:', err.message);
      localStorage.removeItem('accessToken');
      set({ user: null });
    }
  },
}));

export default useUserStore;
