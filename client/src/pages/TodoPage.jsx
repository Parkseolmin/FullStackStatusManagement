import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import api from '../api/api';

export default function TodoPage() {
  const filters = ['all', 'active', 'completed'];
  const [filter, setFilter] = useState(filters[0]);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await api.get('/user/me');
        setUser(userResponse.data.user);
      } catch (err) {
        console.error(`세션 만료 또는 인증 실패 ${err.message}`);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, setUser]);

  const handleLogout = () => {
    useUserStore.getState().clearUser();
    navigate('/');
  };

  return (
    <section>
      <header>
        {user ? (
          <div>
            <span>{`안녕하세요, ${user.name}님!`}</span>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          <span>로그인 상태가 아닙니다.</span>
        )}
      </header>
      <Header
        filters={filters}
        filter={filters[0]}
        onFilterChange={setFilter}
      />
      <TodoList filter={filter} />
    </section>
  );
}
