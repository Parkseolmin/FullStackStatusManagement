import React from 'react';
import useTodoStore from '../stores/todoStore';

export default function Todo({ todo }) {
  const { id, text, status } = todo;
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleStatusChange = () => {
    const newStatus = status === 'active' ? 'completed' : 'active';
    updateTodo(id, newStatus); // 상태 업데이트
  };

  const handleDelete = () => {
    deleteTodo(id); // Todo 삭제
  };

  return (
    <li>
      <input
        type='checkbox'
        id={id}
        checked={status === 'completed'}
        onChange={handleStatusChange}
      />
      <label htmlFor={id}>{text}</label>
      <button onClick={handleDelete}>삭제</button>
    </li>
  );
}
