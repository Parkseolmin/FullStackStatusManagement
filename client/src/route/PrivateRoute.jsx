import { Navigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { useEffect } from 'react';
import api from '../api/api';

export default function PrivateRoute({ children }) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const response = await api.get('/user/me');
          setUser(response.data.user);
        } catch (err) {
          localStorage.removeItem('accessToken');
          console.error('유저 정보 확인 실패:', err);
        }
      };

      fetchUser();
    }
  }, [user, setUser]);

  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to='/' replace />;
  }

  return children;
}
