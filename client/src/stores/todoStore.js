import { create } from 'zustand';
import api from '../api/api';

const useTodoStore = create((set) => {
  // 공통 헬퍼 함수
  const setLoading = (loading) => set({ isLoading: loading });
  const setError = (error) => set({ error });

  return {
    todos: [], // 초기 상태
    isLoading: false,
    error: null,

    fetchTodos: async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/todos');
        set({ todos: response.data });
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch todos:', err);
      } finally {
        setLoading(false);
      }
    },

    addTodo: async (text) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post('/todos', { text, status: 'active' });
        set((state) => ({
          todos: [...state.todos, response.data],
        }));
      } catch (err) {
        setError(err.message);
        console.error('Failed to add todo:', err);
      } finally {
        setLoading(false);
      }
    },

    updateTodo: async (id, status) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.put(`/todos/${id}`, { status });
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? response.data : todo,
          ),
        }));
      } catch (err) {
        setError(err.message);
        console.error('Failed to update todo:', err);
      } finally {
        setLoading(false);
      }
    },

    deleteTodo: async (id) => {
      setLoading(true);
      setError(null);
      try {
        await api.delete(`/todos/${id}`);
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      } catch (err) {
        setError(err.message);
        console.error('Failed to delete todo:', err);
      } finally {
        setLoading(false);
      }
    },
  };
});

export default useTodoStore;
