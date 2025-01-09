import { useEffect, useState } from 'react';
import Todo from './Todo';
import api from '../api/api';
import AddTodo from './AddTodo';

export default function TodoList({ category, filter }) {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get(`/todos?category=${category}`);
        setTodos(response.data);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };

    fetchTodos();
  }, [category]);

  const handleAdd = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]); // 새로운 투두 추가
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
      setEditingId(null);
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

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <section>
      <ul>
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            isEditing={editingId === todo.id}
            setEditing={setEditingId}
          />
        ))}
      </ul>
      <AddTodo category={category} onAdd={handleAdd} />
    </section>
  );
}
