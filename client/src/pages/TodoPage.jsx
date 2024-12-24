import { useState } from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';

export default function TodoPage() {
  const filters = ['all', 'active', 'completed'];
  const [filter, setFilter] = useState(filters[0]);
  return (
    <section>
      <Header filters={filters} filter={filter} onFilterChange={setFilter} />
      <TodoList filter={filter} />
    </section>
  );
}
