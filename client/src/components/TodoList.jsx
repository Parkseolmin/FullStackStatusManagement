import { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';
import api from '../api/api';

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // 서버에서 데이터 가져오기
    const fetchTodos = async () => {
      try {
        const response = await api.get('/todos');
        setTodos(response.data);
        console.log('response.data::::', response.data);
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
        status: updated.status,
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === response.data.id ? response.data : todo,
        ),
      );
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
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
