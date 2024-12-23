import useTodoStore from '../stores/todoStore';

export default function Todo({ todo }) {
  const { id, text, status } = todo;
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleChange = (e) => {
    const newStats = e.target.checked ? 'completed' : 'active';
    updateTodo(id, newStats);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  return (
    <li>
      <input
        type='checkbox'
        id={id}
        checked={status === 'completed'}
        onChange={handleChange}
      />
      <label htmlFor={id}>{text}</label>
      <button onClick={handleDelete}>삭제</button>
    </li>
  );
}
