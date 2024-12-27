export default function Todo({ todo, onUpdate, onDelete }) {
  const { id, text, status, author } = todo;
  console.log('todo컴포넌트:', todo);
  const handleChange = (e) => {
    const newStats = e.target.checked ? 'completed' : 'active';
    // 기존 author를 명시적으로 유지
    onUpdate({ ...todo, status: newStats, author });
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
      <label htmlFor={id}> 작성자 : {author.name}</label>
      <button onClick={handleDelete}>삭제</button>
    </li>
  );
}
