import { useState } from 'react';
// import api from '../api/api';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/features/todos/todosSlice';

export default function AddTodo({ category, onAdd }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      try {
        //   const response = await api.post('/todos', {
        //     text,
        //     category,
        //     status: 'active',
        //   });
        dispatch(addTodo({ text, category }));
        setText('');

        // onAdd(response.data); // 새로운 투두를 부모로 전달
      } catch (err) {
        console.error('Failed to add todo:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={text}
        placeholder={`"${category}"에 할 일을 추가하세요`}
        onChange={handleChange}
      />
      <button type='submit'>추가</button>
    </form>
  );
}
