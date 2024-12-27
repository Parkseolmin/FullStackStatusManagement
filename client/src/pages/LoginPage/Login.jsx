import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Login.module.css';
import useUserStore from '../../store/userStore';
import api from '../../api/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // 로그인 상태 확인
  useEffect(() => {
    const activeUser = localStorage.getItem('active-user');
    if (user || activeUser) {
      navigate(location.state?.from || '/todos'); // 이전 페이지 또는 기본 경로로 이동
    }
  }, [user, navigate, location.state]);

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

        // Zustand와 로컬스토리지에 사용자 정보 저장
        setUser(userData);
        localStorage.setItem('accessToken', tokens.accessToken);

        alert('로그인에 성공했습니다!');
        navigate('/todos');
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
