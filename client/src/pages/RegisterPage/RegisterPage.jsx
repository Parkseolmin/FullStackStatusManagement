// src/pages/RegisterPage/RegisterPage.jsx
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import useUserStore from '../../store/userStore';
import api from '../../api/api'; // 공용 API 설정 가져오기

export default function RegisterPage() {
  const { register, handleSubmit, errors } = useRegisterForm();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/user', data); // Axios를 통한 POST 요청

      if (response.status === 201) {
        const result = response.data;
        setUser({ id: result.id, name: result.name, email: result.email });
        alert('회원가입이 성공적으로 완료되었습니다!');
        navigate('/'); // 로그인 페이지로 이동
      } else {
        alert(response.data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert(
        `서버와의 연결에 문제가 발생했습니다: ${
          error.response?.data?.message || error.message
        }`,
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            className={styles.input}
            placeholder='이름'
            {...register('name')}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}

          <input
            type='email'
            className={styles.input}
            placeholder='이메일'
            {...register('email')}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <input
            type='password'
            className={styles.input}
            placeholder='비밀번호'
            {...register('password')}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <input
            type='password'
            className={styles.input}
            placeholder='비밀번호 확인'
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}

          <button type='submit' className={styles.button}>
            회원가입
          </button>
        </form>
        <p className={styles.login}>
          이미 계정이 있으신가요?{' '}
          <span onClick={() => navigate('/')} className={styles.link}>
            로그인
          </span>
        </p>
      </div>
    </div>
  );
}
