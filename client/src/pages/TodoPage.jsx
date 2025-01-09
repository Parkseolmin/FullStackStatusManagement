import { useState } from 'react';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import { useSelector } from 'react-redux';

export default function TodoPage() {
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState('today'); // 현재 활성화된 카테고리
  const filters = ['all', 'active', 'completed']; // 필터 옵션
  const [filter, setFilter] = useState(filters[0]); // 현재 필터 상태

  const handleTabChange = (tab) => {
    setActiveTab(tab); // 탭 변경
    setFilter('all'); // 탭 변경 시 필터 초기화
  };

  return (
    <section>
      <div>
        <h1>TODO List</h1>
        <p>안녕하세요, {user?.name}님!</p>
      </div>

      {/* 탭 전환 버튼 */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => handleTabChange('today')}
          style={{
            fontWeight: activeTab === 'today' ? 'bold' : 'normal',
            marginRight: '10px',
          }}
        >
          오늘
        </button>
        <button
          onClick={() => handleTabChange('work')}
          style={{
            fontWeight: activeTab === 'work' ? 'bold' : 'normal',
          }}
        >
          작업
        </button>
      </div>

      {/* 필터 버튼 */}
      <div style={{ marginBottom: '20px' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontWeight: filter === f ? 'bold' : 'normal',
              marginRight: '10px',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 선택된 탭과 필터에 따라 TodoList 및 AddTodo 렌더링 */}
      <TodoList category={activeTab} filter={filter} />
      {/* <AddTodo category={activeTab} /> */}
    </section>
  );
}
