import { useState } from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import { useSelector } from 'react-redux';

export default function TodoPage() {
  const filters = ['all', 'active', 'completed'];
  const [filter, setFilter] = useState(filters[0]);
  const user = useSelector((state) => state.user.user);
  console.log('현재 사용자 정보:', user);
  return (
    <section>
      <div>
        <h1>TODO List</h1>
        <p>안녕하세요, {user?.name}님!</p>
      </div>
      <Header
        filters={filters}
        filter={filters[0]}
        onFilterChange={setFilter}
      />
      <TodoList filter={filter} />
    </section>
  );
}
