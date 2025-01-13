export default function SearchInput({ search, onSearchChange }) {
  // 검색어 상태
  return (
    <input
      type='text'
      placeholder='...'
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}
