import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      // TODO: Replace with actual login API call
      const response = await fakeLoginAPI(email, password);

      if (response.success) {
        localStorage.setItem('token', response.token); // Store token
        navigate('/todos'); // Navigate to Todo page
      } else {
        setError(response.message || '로그인 실패.');
      }
    } catch (err) {
      setError(`서버와의 연결에 문제가 발생했습니다.${err}`);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>로그인</h1>
        {error && <p className={styles.error}>{error}</p>}
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
        <button className={styles.button} onClick={handleLogin}>
          로그인
        </button>
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

// Simulated login API for demo purposes
const fakeLoginAPI = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        resolve({ success: true, token: 'dummy-jwt-token' });
      } else {
        resolve({
          success: false,
          message: '잘못된 이메일 또는 비밀번호입니다.',
        });
      }
    }, 1000);
  });
};
