import { useState } from 'react';
import useTodoStore from '../stores/todoStore';

export default function AddTodo() {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={text}
        placeholder='할 일 적으셈'
        onChange={handleChange}
      />
      <button>추가</button>
    </form>
  );
}
