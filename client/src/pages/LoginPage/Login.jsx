import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/userSlice'; // Redux 액션 가져오기
import api from '../../api/api'; // API 호출 로직
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Redux 상태에서 사용자 정보 가져오기
  const user = useSelector((state) => state.user.user);
  console.log('user::', user);

  // 로그인 상태 확인
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken || user) {
      navigate(location.state?.from || '/todos'); // 이전 페이지 또는 기본 경로로 이동
    }
  }, [navigate, location.state, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const response = await api.post('/user/login', { email, password });
      if (response.status === 200) {
        const { user: userData, tokens } = response.data;
        dispatch(setUser({ user: userData, token: tokens.accessToken })); // Redux 상태에 사용자 정보 저장
        navigate('/todos'); // 리디렉션
      } else {
        setError(response.data.message || '로그인 실패.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || '서버와의 연결에 문제가 발생했습니다.',
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>로그인</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            className={styles.input}
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            className={styles.input}
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className={styles.button}>
            로그인
          </button>
        </form>
        <p className={styles.register}>
          계정이 없으신가요?{' '}
          <span onClick={() => navigate('/register')} className={styles.link}>
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
}
