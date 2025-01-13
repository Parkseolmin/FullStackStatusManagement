import { useEffect, useState } from 'react';
import Todo from './Todo';
import api from '../api/api';
import AddTodo from './AddTodo';
import SearchInput from './SearchInput';

export default function TodoList({ category, filter }) {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get(
          `/todos/search?category=${category}&search=${search}&filter=${filter}`,
        );
        setTodos(response.data);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };

    fetchTodos();
  }, [category, search, filter]);

  const handleAdd = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
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

  return (
    <section>
      <SearchInput search={search} onSearchChange={setSearch} />
      <ul>
        {todos.map((todo) => (
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
