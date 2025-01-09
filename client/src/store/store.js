import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // userSlice에서 reducer 가져오기

const store = configureStore({
  reducer: {
    user: userReducer, // 사용자 상태 관리 슬라이스 추가
  },
});

export default store;
