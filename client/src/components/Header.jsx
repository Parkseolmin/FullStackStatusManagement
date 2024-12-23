export default function Header({ filters, filter, onFilterChange }) {
  return (
    <header>
      <ul>
        {filters.map((filter, i) => (
          <li key={i}>
            <button onClick={() => onFilterChange(filter)}>{filter}</button>
          </li>
        ))}
      </ul>
    </header>
  );
}
