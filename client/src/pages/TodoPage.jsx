import { useState } from 'react';
import TodoList from '../components/TodoList';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function TodoPage() {
  const user = useSelector((state) => state.user.user); // 사용자 정보 가져오기
  const filters = ['all', 'active', 'completed']; // 필터 옵션
  const [filterToday, setFilterToday] = useState(filters[0]); // '오늘' 필터 상태
  const [filterWork, setFilterWork] = useState(filters[0]); // '작업' 필터 상태
  const navigate = useNavigate();
  return (
    <section>
      <div>
        <h1>TODO List</h1>
        <p>안녕하세요, {user?.name}님!</p>
        <p
          onClick={() => {
            navigate('/dashboard'); // navigate 함수 호출로 대시보드로 이동
          }}
          style={{ cursor: 'pointer' }} // 시각적 피드백을 위해 스타일 추가
        >
          대시보드 이동
        </p>
      </div>

      {/* 검색창 */}

      {/* '오늘' 투두리스트 */}
      <div style={{ marginBottom: '40px', borderBottom: '1px solid #ddd' }}>
        <h2>오늘 할 일</h2>

        {/* 필터 버튼 */}
        <div style={{ marginBottom: '20px' }}>
          {filters.map((f) => (
            <button
              key={`today-${f}`}
              onClick={() => setFilterToday(f)}
              style={{
                fontWeight: filterToday === f ? 'bold' : 'normal',
                marginRight: '10px',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* TodoList 및 AddTodo 컴포넌트 */}
        <TodoList category='today' filter={filterToday} />
      </div>

      {/* '작업' 투두리스트 */}
      <div>
        <h2>일정</h2>

        {/* 필터 버튼 */}
        <div style={{ marginBottom: '20px' }}>
          {filters.map((f) => (
            <button
              key={`work-${f}`}
              onClick={() => setFilterWork(f)}
              style={{
                fontWeight: filterWork === f ? 'bold' : 'normal',
                marginRight: '10px',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* TodoList 및 AddTodo 컴포넌트 */}
        <TodoList category='work' filter={filterWork} />
      </div>
    </section>
  );
}
