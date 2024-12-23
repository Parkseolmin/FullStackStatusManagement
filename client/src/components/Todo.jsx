export default function Todo({ todo, onUpdate, onDelete }) {
  const { id, text, status } = todo;

  const handleChange = (e) => {
    const newStats = e.target.checked ? 'completed' : 'active';
    onUpdate({ ...todo, status: newStats });
  };

  const handleDelete = () => {
    onDelete(todo);
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
