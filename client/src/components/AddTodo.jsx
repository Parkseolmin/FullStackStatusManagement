import { useState } from 'react';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onAdd({ text: text, status: 'active' }); // 서버에 필요한 데이터만 전송
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
