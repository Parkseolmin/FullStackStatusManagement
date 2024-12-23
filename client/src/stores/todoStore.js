import create from 'zustand';
import api from '../api/api';

const useTodoStore = create((set) => ({
  todos: [], // 초기 상태
  fetchTodos: async () => {
    try {
      const response = await api.get('/todos');
      set({ todos: response.data });
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  },
  addTodo: async (text) => {
    try {
      const response = await api.post('/todos', { text, status: 'active' });
      set((state) => ({ todos: [...state.todos, response.data] }));
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  },
  updateTodo: async (id, status) => {
    try {
      const response = await api.put(`/todos/${id}`, { status });
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? response.data : todo,
        ),
      }));
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  },
  deleteTodo: async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  },
}));

export default useTodoStore;
