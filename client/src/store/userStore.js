// src/store/userStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => {
    // 사용자 정보 저장
    set({ user: userData });
    if (userData) {
      localStorage.setItem(`user-${userData.id}`, JSON.stringify(userData));
      localStorage.setItem('active-user', userData.id);
    }
  },
  clearUser: () => {
    // 활성 사용자 정보 삭제
    const activeUser = localStorage.getItem('active-user');
    if (activeUser) {
      localStorage.removeItem(`user-${activeUser}`);
      localStorage.removeItem('active-user');
      localStorage.removeItem('accessToken');
    }
    set({ user: null });
  },
}));

export default useUserStore;
