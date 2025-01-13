import { useEffect, useState } from 'react';
import Todo from './Todo';
// import api from '../api/api';
import AddTodo from './AddTodo';
import SearchInput from './SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodo,
  fetchTodos,
  updateTodo,
} from '../store/features/todos/todosSlice';

export default function TodoList({ category, filter }) {
  // const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();
  // 리덕스 상태에서 필요한 데이터 가져오기
  const todos = useSelector((state) => state.todos.byCategory[category] || []);
  const error = useSelector((state) => state.todos.error);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // const fetchTodos = async () => {
    //   try {
    //     const response = await api.get(
    //       `/todos/search?category=${category}&search=${search}&filter=${filter}`,
    //     );
    //     setTodos(response.data);
    //   } catch (err) {
    //     console.error('Failed to fetch todos:', err);
    //   }
    // };

    // fetchTodos();
    dispatch(fetchTodos({ category, filter, search }));
  }, [category, search, filter]);

  if (error) return <p>Error: {error}</p>;

  // const handleAdd = (newTodo) => {
  //   setTodos((prev) => [...prev, newTodo]);
  // };

  const handleUpdate = async (updated) => {
    //   try {
    //     const response = await api.put(`/todos/${updated.id}`, {
    //       text: updated.text,
    //       status: updated.status,
    //     });
    //     setTodos((prev) =>
    //       prev.map((todo) =>
    //         todo.id === response.data.id ? response.data : todo,
    //       ),
    //     );
    //     setEditingId(null);
    //   } catch (err) {
    //     console.error('Failed to update todo:', err);
    //   }
    dispatch(updateTodo(updated));
    setEditingId(null);
  };

  const handleDelete = async (deleted) => {
    //   try {
    //     await api.delete(`/todos/${deleted.id}`);
    //     setTodos((prev) => prev.filter((todo) => todo.id !== deleted.id));
    //   } catch (err) {
    //     console.error('Failed to delete todo:', err);
    //   }
    dispatch(deleteTodo({ id: deleted.id, category }));
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
      <AddTodo category={category} />
    </section>
  );
}
