import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  message: string;
  completed: boolean;
}

export const todos = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: 'fjeowjfo', message: action.payload, completed: false });
      return state;
    },
    deleteTodo: (state, action: PayloadAction<string>) =>
      state.filter(todo => todo.id !== action.payload),
    completeTodo: (state, action: PayloadAction<string>) => {
      const completedTodo = state.find(todo => todo.id === action.payload);
      if (completedTodo) {
        completedTodo.completed = true;
      }

      return state;
    },
    sort: state => state.sort((a, b) => a.message.localeCompare(b.message))
  }
});
