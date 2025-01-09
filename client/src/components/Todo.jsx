import { useState } from 'react';

export default function Todo({
  todo,
  onUpdate,
  onDelete,
  isEditing,
  setEditing,
}) {
  const { id, text, status } = todo;

  const [editText, setEditText] = useState(text); // 수정 중인 텍스트
  const [editStatus, setEditStatus] = useState(status); // 수정 중인 상태

  const handleDelete = () => {
    onDelete(todo);
  };

  const handleEditClick = () => {
    // 수정 버튼이 눌리면 현재 항목을 수정 중으로 설정
    setEditing(id);
  };

  const handleSaveClick = () => {
    if (editText.trim() !== '') {
      onUpdate({ ...todo, text: editText, status: editStatus }); // 텍스트와 상태 함께 업데이트
    }
  };

  const handleCancelClick = () => {
    setEditing(null); // 수정 취소
    setEditText(text); // 텍스트 복원
    setEditStatus(status); // 상태 복원
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && editText.trim() !== '') {
      handleSaveClick(); // Enter 키로 저장
    }
  };

  return (
    <li className={isEditing ? 'todo-editing' : ''}>
      {isEditing ? (
        <div className='todo-edit-mode'>
          {/* 텍스트 수정 */}
          <input
            type='text'
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
          />
          {/* 상태 수정 */}
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
          >
            <option value='active'>Active</option>
            <option value='completed'>Completed</option>
          </select>
          {/* 저장 및 취소 버튼 */}
          <button onClick={handleSaveClick} disabled={!editText.trim()}>
            저장
          </button>
          <button onClick={handleCancelClick}>취소</button>
        </div>
      ) : (
        <div className='todo-view-mode'>
          <input
            type='checkbox'
            id={id}
            checked={status === 'completed'}
            onChange={(e) =>
              onUpdate({
                ...todo,
                status: e.target.checked ? 'completed' : 'active',
              })
            }
            disabled={isEditing} // 수정 중이면 체크박스 비활성화
          />
          <label htmlFor={id}>{text}</label>
          <button onClick={handleEditClick} disabled={isEditing}>
            수정
          </button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
    </li>
  );
}
