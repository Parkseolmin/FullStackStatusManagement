import { useState } from 'react';
import useTodoStore from '../stores/todoStore';

export default function AddTodo() {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text); // Zustand의 addTodo 호출
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='할 일을 입력하세요'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type='submit'>추가</button>
    </form>
  );
}
