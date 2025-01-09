import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restoreUser } from './userSlice';

export default function AuthProvider({ children }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('토큰:', token);
    console.log('사용자:', user);

    if (token && !user) {
      console.log('restoreUser 실행!');
      dispatch(restoreUser());
    } else if (!token) {
      console.log('로그인 페이지로 리디렉션!');
      navigate('/'); // 로그인 페이지로 리디렉션
    }
  }, [dispatch, user, navigate]);

  return children;
}
