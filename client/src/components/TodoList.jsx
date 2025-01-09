import { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';
import api from '../api/api';

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null); // 수정 중인 투두 ID 추적

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get('/todos');
        setTodos(response.data);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };

    fetchTodos();
  }, []);

  const handleAdd = async (todo) => {
    try {
      const response = await api.post('/todos', todo);
      setTodos((prev) => [...prev, response.data]);
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const handleUpdate = async (updated) => {
    try {
      const response = await api.put(`/todos/${updated.id}`, {
        text: updated.text,
        status: updated.status,
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === response.data.id ? response.data : todo,
        ),
      );
      setEditingId(null); // 수정 완료 후 수정 모드 종료
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const handleDelete = async (deleted) => {
    try {
      await api.delete(`/todos/${deleted.id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== deleted.id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const getFilteredTodos = (todos, filter) => {
    if (filter === 'all') return todos;
    return todos.filter((todo) => todo.status === filter);
  };

  const filteredTodo = getFilteredTodos(todos, filter);

  return (
    <section>
      <ul>
        {filteredTodo.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            isEditing={editingId === todo.id} // 현재 수정 중인지 확인
            setEditing={setEditingId} // 수정 상태 관리 함수 전달
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
