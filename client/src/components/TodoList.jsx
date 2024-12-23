import { useEffect } from 'react';
import useTodoStore from '../stores/todoStore';
import Todo from './Todo';

export default function TodoList({ filter }) {
  const { todos, fetchTodos } = useTodoStore((state) => ({
    todos: state.todos,
    fetchTodos: state.fetchTodos,
  }));

  useEffect(() => {
    fetchTodos(); // Zustand에서 Todo 데이터 가져오기
  }, [fetchTodos]);

  const getFilteredTodos = (todos, filter) => {
    if (filter === 'all') return todos;
    return todos.filter((todo) => todo.status === filter);
  };

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
