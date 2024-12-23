import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../store/slices/todosSlice';
import AddTodo from './AddTodo';
import Todo from './Todo';

export default function TodoList({ filter }) {
  const dispatch = useDispatch();
  const {
    items: todos,
    isLoading,
    error,
  } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = (text) => {
    dispatch(addTodo(text));
  };

  const handleUpdate = (id, status) => {
    dispatch(updateTodo({ id, status }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const getFilteredTodos = (todos, filter) => {
    if (filter === 'all') return todos;
    return todos.filter((todo) => todo.status === filter);
  };

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {filteredTodos.map((todo) => (
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
