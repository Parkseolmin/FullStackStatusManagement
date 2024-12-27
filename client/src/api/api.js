import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api', // 기본값 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Axios 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러 처리: 인증 실패
    if (error.response && error.response.status === 401) {
      const isLogout = window.location.pathname === '/'; // 현재 경로가 로그인 페이지인지 확인
      if (!isLogout) {
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('accessToken');
        window.location.href = '/'; // 로그인 페이지로 이동
      }
    }
    return Promise.reject(error);
  },
);

export default api;
