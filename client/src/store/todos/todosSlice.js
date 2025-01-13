import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// 비동기 Thunk
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({ category, filter, search }, thunkAPI) => {
    try {
      const response = await api.get(
        `/todos/search?category=${category}&filter=${filter}&search=${search}`,
      );
      return { category, todos: response.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to fetch todos',
      );
    }
  },
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async ({ category, text }, thunkAPI) => {
    try {
      const response = await api.post('/todos', {
        category,
        text,
        status: 'active',
      });
      return { category, todo: response.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to add todo',
      );
    }
  },
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todo, thunkAPI) => {
    try {
      const response = await api.put(`/todos/${todo.id}`, {
        text: todo.text,
        status: todo.status,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to update todo',
      );
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/todos/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to delete todo',
      );
    }
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    byCategory: {
      today: [],
      work: [],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.byCategory[action.payload.category] = action.payload.todos;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.byCategory[action.payload.category].push(action.payload.todo);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const categoryTodos = state.byCategory[action.meta.arg.category];
        const index = categoryTodos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (index !== -1) categoryTodos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const categories = Object.keys(state.byCategory);
        categories.forEach((category) => {
          state.byCategory[category] = state.byCategory[category].filter(
            (todo) => todo.id !== action.payload,
          );
        });
      });
  },
});

export default todosSlice.reducer;
