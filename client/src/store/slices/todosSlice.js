import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// 비동기 Thunk
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await api.get('/todos');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
  const response = await api.post('/todos', { text, status: 'active' });
  return response.data;
});

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, status }) => {
    const response = await api.put(`/todos/${id}`, { status });
    return response.data;
  },
);

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await api.delete(`/todos/${id}`);
  return id;
});

// 슬라이스 생성
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Add Todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update Todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
