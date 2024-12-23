import { useEffect } from 'react';
import useTodoStore from '../stores/todoStore';
import Todo from './Todo';
import AddTodo from './AddTodo';
import React from 'react';

export default function TodoList({ filter }) {
  const todos = useTodoStore((state) => state.todos); // 상태만 구독
  const fetchTodos = useTodoStore((state) => state.fetchTodos); // 액션만 구독

  useEffect(() => {
    fetchTodos(); // 상태를 불러오기
  }, [fetchTodos]);

  const getFilteredTodos = (todos, filter) => {
    if (filter === 'all') return todos;
    return todos.filter((todo) => todo.status === filter);
  };

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <>
      <ul>
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      <AddTodo />
    </>
  );
}
